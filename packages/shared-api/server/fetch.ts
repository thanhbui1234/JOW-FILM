import { ServerFetchError } from "./types";
import type { ServerFetchConfig, NextFetchRequestConfig } from "./types";

export function createServerFetch(config: ServerFetchConfig) {
  return async function serverFetch<T>(
    endpoint: string,
    options?: RequestInit & { next?: NextFetchRequestConfig }
  ): Promise<T> {
    const token = await config.getToken();

    const { next: nextConfig, ...fetchOptions } = options ?? {};

    const res = await fetch(`${config.baseURL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      ...(nextConfig && { next: nextConfig }),
    });

    if (!res.ok) {
      throw new ServerFetchError(res.status, await res.text());
    }

    return res.json();
  };
}
