import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import type { ApiClientConfig, RetryableRequest } from "./types";

export function setupInterceptors(
  instance: AxiosInstance,
  config: ApiClientConfig
) {
  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (token) resolve(token);
      else reject(error);
    });
    failedQueue = [];
  };

  // Request interceptor: attach Bearer token
  instance.interceptors.request.use(async (reqConfig) => {
    const token = await config.tokenAdapter.getAccessToken();
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  });

  // Response interceptor: handle errors + refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig &
        RetryableRequest;

      if (!error.response) {
        return Promise.reject(error);
      }

      const { status } = error.response;

      // 401: attempt token refresh
      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await config.tokenAdapter.getRefreshToken();
          if (!refreshToken) throw new Error("No refresh token");

          const refreshURL =
            config.refreshEndpoint || `${config.baseURL}/auth/refresh`;

          const { data } = await axios.post(refreshURL, { refreshToken });

          await config.tokenAdapter.setTokens(
            data.accessToken,
            data.refreshToken
          );

          processQueue(null, data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          await config.tokenAdapter.clearTokens();
          config.onRefreshFailed?.();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 403: forbidden
      if (status === 403) {
        config.onForbidden?.();
      }

      // 5xx: server error
      if (status >= 500) {
        config.onServerError?.(error);
      }

      return Promise.reject(error);
    }
  );
}
