export interface ServerFetchConfig {
  baseURL: string;
  getToken: () => Promise<string | null>;
}

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export class ServerFetchError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`Server fetch failed with status ${status}`);
    this.name = "ServerFetchError";
  }
}
