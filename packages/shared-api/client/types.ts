import type { AxiosRequestConfig } from "axios";

export interface TokenAdapter {
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  setTokens(access: string, refresh: string): Promise<void>;
  clearTokens(): Promise<void>;
}

export interface ApiClientConfig {
  baseURL: string;
  tokenAdapter: TokenAdapter;
  refreshEndpoint?: string;
  onRefreshFailed?: () => void;
  onForbidden?: () => void;
  onServerError?: (error: unknown) => void;
}

export interface RetryableRequest extends AxiosRequestConfig {
  _retry?: boolean;
}
