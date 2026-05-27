"use client";

import { createContext, useContext } from "react";
import type { AxiosInstance } from "axios";

const ApiClientContext = createContext<AxiosInstance | null>(null);

export const ApiClientProvider = ApiClientContext.Provider;

export function useApiClient(): AxiosInstance {
  const client = useContext(ApiClientContext);
  if (!client) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }
  return client;
}
