import { useUserStore } from "@/store";

export default function fetcher(url: string, init?: RequestInit) {
  const sessionToken = useUserStore.getState().sessionToken ?? "";

  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: sessionToken,
    },
  });
}
