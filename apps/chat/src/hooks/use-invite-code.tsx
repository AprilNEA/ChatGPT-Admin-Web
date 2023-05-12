import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useUserStore } from "@/store";
import { showToast } from "@/components/ui-lib";
import { ResponseStatus } from "@/app/api/typing.d";

export function useInviteCode(shouldGetInviteCode: boolean) {
  const [inviteCode, updateInviteCode] = useUserStore((store) => [
    store.inviteCode,
    store.updateInviteCode,
  ]);

  if (inviteCode) shouldGetInviteCode = false;

  const { data, isLoading } = useSWR<string>(
    shouldGetInviteCode ? "/api/user/info/invite-code" : null,
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => {
          switch (res.status) {
            case ResponseStatus.Success:
              showToast(`邀请码获取成功：${res.inviteCode}`);
              return res.inviteCode;
            case ResponseStatus.Failed:
            default:
              showToast("邀请码获取失败");
              return null;
          }
        })
  );

  if (!isLoading && data) {
    updateInviteCode(data);
  }

  return {
    data: data ?? inviteCode,
    isLoading,
  };
}
