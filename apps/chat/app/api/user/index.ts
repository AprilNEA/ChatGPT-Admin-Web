import { ChatResponse } from "@caw/types";

export async function apiUserLoginGetTicket() {
  return (await (
    await fetch(`/api/user/login`, {
      method: "GET",
      cache: "no-cache",
    })
  ).json()) as ChatResponse.TicketGet;
}

export async function apiUserLoginGet(token?: string) {
  return (await (
    await fetch(`/api/user/login?ticket=${token}`, {
      method: "GET",
      cache: "no-cache",
    })
  ).json()) as ChatResponse.UserLogin;
}

export async function apiUserLoginResume(token?: string) {
  return (await (
    await fetch(`/api/user/login?token=${token}`, {
      method: "GET",
      cache: "no-cache",
    })
  ).json()) as ChatResponse.UserLogin;
}

export async function apiUserLoginPost(email: string, password: string) {
  return (await (
    await fetch("/api/user/login", {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerId: "email",
        providerContent: { content: email.trim(), password },
      }),
    })
  ).json()) as ChatResponse.UserLogin;
}

export const apiUserRegisterCode = async (
  type: "email" | "phone",
  value: string,
) => {
  return await (
    await fetch("/api/user/register/code", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type,
        value: value,
      }),
    })
  ).json();
};

export const apiUserRegister = async ({
  email,
  phone,
  password,
  verificationCode,
  invitationCode,
}: {
  email?: string;
  phone?: string;
  password?: string;
  verificationCode: string;
  invitationCode?: string;
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
        invitation_code: invitationCode?.toLowerCase() ?? "",
      }),
    })
  ).json()) as ChatResponse.UserRegister;
};
