import { ChatResponse } from "@caw/types";

export const apiUserRegister = async ({
  email,
  phone,
  password,
  verificationCode,
  invitationCode,
}: {
  email?: string;
  phone?: string;
  password: string;
  verificationCode: string;
  invitationCode: string;
}) => {
  return (await (
    await fetch("/api/user/register", {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email?.trim() ?? "",
        phone: phone?.trim() ?? "",
        password,
        register_code: verificationCode,
        invitation_code: invitationCode.toLowerCase() ?? "",
      }),
    })
  ).json()) as ChatResponse.UserRegister;
};
