export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.users.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.users.all, "detail", id] as const,
  },
  config: {
    all: ["config"] as const,
    site: () => [...queryKeys.config.all, "site"] as const,
  },
  content: {
    all: ["content"] as const,
    banner: () => [...queryKeys.content.all, "banner"] as const,
    highlights: () => [...queryKeys.content.all, "highlights"] as const,
    reels: () => [...queryKeys.content.all, "reels"] as const,
    films: () => [...queryKeys.content.all, "films"] as const,
    about: () => [...queryKeys.content.all, "about"] as const,
    contact: () => [...queryKeys.content.all, "contact"] as const,
  },
} as const;
