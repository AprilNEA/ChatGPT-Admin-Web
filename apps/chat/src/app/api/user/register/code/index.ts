import { showToast } from "@/components/ui-lib";
import { serverStatus } from "@caw/types";
import Locales from "@/locales";

export const apiUserRegisterCode = async (value: string) => {
  return await (
    await fetch("/api/user/register/code", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "email",
        value: value,
      }),
    })
  ).json();
};
