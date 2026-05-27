import type { TokenAdapter } from "../client/types";

const ACCESS_KEY = "holte_access_token";
const REFRESH_KEY = "holte_refresh_token";

export function createStorageAdapter(): TokenAdapter {
  return {
    async getAccessToken() {
      return localStorage.getItem(ACCESS_KEY);
    },

    async getRefreshToken() {
      return localStorage.getItem(REFRESH_KEY);
    },

    async setTokens(access: string, refresh: string) {
      localStorage.setItem(ACCESS_KEY, access);
      localStorage.setItem(REFRESH_KEY, refresh);
    },

    async clearTokens() {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    },
  };
}
