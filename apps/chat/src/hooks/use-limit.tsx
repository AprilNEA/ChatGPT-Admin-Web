import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { showToast } from "@/components/ui-lib";
import { ResponseStatus } from "@/app/api/typing.d";

export function useLimit() {
  const { data, isLoading } = useSWR("/api/user/info/rate-limit", (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case ResponseStatus.Success:
            return res.data;
          case ResponseStatus.Failed:
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
