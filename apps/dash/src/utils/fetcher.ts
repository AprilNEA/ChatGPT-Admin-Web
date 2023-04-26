import {useAtom} from 'jotai'
import {sessionToken} from "@/store";

export default function fetcher(url: string, init?: RequestInit) {
  const [token] = useAtom(sessionToken)

  return fetch(url, {
    headers: {
      Authorization: token,
      ...init?.headers,
    },
    ...init,
  });
}
