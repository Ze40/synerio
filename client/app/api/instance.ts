import { FetchClient } from "@/utils/fetch";

export const api = new FetchClient({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  options: {
    credentials: "include",
  },
});
