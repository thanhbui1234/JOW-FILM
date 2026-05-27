import axios from "axios";
import { setupInterceptors } from "./interceptors";
import type { ApiClientConfig } from "./types";

export function createApiClient(config: ApiClientConfig) {
  const instance = axios.create({
    baseURL: config.baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 30000,
  });

  setupInterceptors(instance, config);

  return instance;
}
