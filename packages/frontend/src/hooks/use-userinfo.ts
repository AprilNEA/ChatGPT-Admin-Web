import { useStore } from "@/store";
import useSWR from "swr";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const useUserInfo = () => {
  const { fetcher } = useStore();
  const { data: userInfo } = useSWR("/user/info", (url: string) => {
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          return {
            name: null,
            email: null,
            phone: null,
          };
        } else {
          return res.data;
        }
      }),
      {
        shouldRetryOnError: false,
        keepPreviousData: true,
        revalidateOnFocus: false,
      };
  });

  return userInfo;
};

export default useUserInfo;
