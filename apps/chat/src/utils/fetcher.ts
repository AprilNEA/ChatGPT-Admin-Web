import "client-only";
import { useUserStore } from "@/store";

const BASE_URL = "http://localhost:3000";

export default async function fetcher(url: string, init?: RequestInit) {
  const sessionToken = useUserStore().sessionToken;
  return await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${sessionToken}`,
    },
  });
}
