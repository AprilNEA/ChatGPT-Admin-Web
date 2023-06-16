import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { showToast } from "@/components/ui-lib";
import { serverStatus } from "@caw/types";

export function useSubscription() {
  const { data, isLoading } = useSWR("/api/user/info/subscription", (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case serverStatus.success:
            return res.data;
          case serverStatus.failed:
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
