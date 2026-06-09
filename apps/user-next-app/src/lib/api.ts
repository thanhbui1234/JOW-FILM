import { createServerFetch } from "shared-api";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const serverFetch = createServerFetch({
  baseURL: API_URL,
  getToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get("holte_access_token")?.value ?? null;
  },
});
