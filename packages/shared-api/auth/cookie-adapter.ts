import type { TokenAdapter } from "../client/types";

export function createCookieAdapter(tokenEndpoint: string): TokenAdapter {
  return {
    async getAccessToken() {
      try {
        const res = await fetch(tokenEndpoint, { method: "GET" });
        if (!res.ok) return null;
        const { accessToken } = await res.json();
        return accessToken;
      } catch {
        return null;
      }
    },

    async getRefreshToken() {
      try {
        const res = await fetch(tokenEndpoint, { method: "GET" });
        if (!res.ok) return null;
        const { refreshToken } = await res.json();
        return refreshToken;
      } catch {
        return null;
      }
    },

    async setTokens(access: string, refresh: string) {
      await fetch(tokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: access, refreshToken: refresh }),
      });
    },

    async clearTokens() {
      await fetch(tokenEndpoint, { method: "DELETE" });
    },
  };
}
