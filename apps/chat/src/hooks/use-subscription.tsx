import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { showToast } from "@/components/ui-lib";
import { ResponseStatus } from "@/app/api/typing.d";

export function useSubscription() {
  const { data, isLoading } = useSWR("/api/user/info/subscription", (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case ResponseStatus.Success:
            return res.data;
          case ResponseStatus.Failed:
          default:
            showToast("数据获取失败");
            return "";
        }
      })
  );
  return {
    data,
    isLoading,
  };
}
