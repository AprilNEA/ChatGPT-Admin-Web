import useSWR from "swr";
import { serverStatus } from "@caw/types";

import fetcher from "@/utils/fetcher";
import { showToast } from "@/components/ui-lib";

export function useLimit() {
  const { data, isLoading } = useSWR("/api/user/info/rate-limit", (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case serverStatus.success:
            return res.data;
          case serverStatus.failed:
          default:
            showToast("获取剩余用量失败");
            return "";
        }
      })
  );
  return {
    data,
    isLoading,
  };
}
