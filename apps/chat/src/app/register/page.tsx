"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ChatResponse, serverStatus } from "@caw/types";

import { showToast } from "@/components/ui-lib";
import { useUserStore } from "@/store";
import { ReturnButton } from "@/components/ui-lib";
import Locales from "@/locales";
import styles from "@/app/login/login.module.scss";
import { apiUserRegister } from "@/app/api/user/register";
import { apiUserRegisterCode } from "@/app/api/user/register/code";
import usePreventFormSubmit from "@/hooks/use-prevent-form";

const ifVerifyCode = !!process.env.NEXT_PUBLIC_EMAIL_SERVICE;

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, handleSubmit] = usePreventFormSubmit();
  const [isCodeSubmitting, handleCodeSubmit] = usePreventFormSubmit();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [invitationCode, setInvitationCode] = useState<string>(
    searchParams.get("code") ?? "" /* Get from url */
  );

  const [updateSessionToken, updateEmail] = useUserStore((state) => [
    state.updateSessionToken,
    state.updateEmail,
  ]);

  async function handleRegister(event: FormEvent<InputEvent>) {
    event.preventDefault();

    if (!email || !password || !verificationCode)
      return showToast(Locales.Index.NoneData);

    const response = await apiUserRegister({
      email,
      password,
      verificationCode,
      invitationCode,
    });

    switch (response.status) {
      case serverStatus.success: {
        updateSessionToken(response.signedToken.token);
        router.replace("/");
        showToast(Locales.Index.Success(Locales.Index.Register));
        break;
      }
      case serverStatus.alreadyExisted: {
        showToast(Locales.Index.DuplicateRegistration);
        break;
      }
      case serverStatus.invalidCode: {
        showToast(Locales.Index.CodeError);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
  }

  const handleSendVerification = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!email) return showToast("请输入邮箱");

    const response = await apiUserRegisterCode(email);

    switch (response.status) {
      case serverStatus.success: {
        switch (response.code_data.status) {
          case 0:
            showToast("验证码成功发送!");
            break;
          case 1:
            showToast(Locales.Index.DuplicateRegistration);
            break;
          case 2:
            showToast("请求验证码过快，请稍后再试!");
            break;
          case 4:
          default:
            showToast(Locales.UnknownError);
            break;
        }
        break;
      }
      case serverStatus.notExist: {
        showToast(Locales.Index.EmailNonExistent);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
  };

  return (
    <div className={styles["login-form-container"]}>
      <form
        className={styles["login-form"]}
        onSubmit={(event) => handleSubmit(event, handleRegister)}
      >
        <ReturnButton onClick={() => router.push("/enter")} />

        <h2 className={styles["login-form-title"]}>Register</h2>
        <div className={styles["login-form-input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles["login-form-input-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles["login-form-input-group"]}>
          <label htmlFor="email">Verification Code</label>
          <div className={styles["verification-code-container"]}>
            <input
              type="text"
              id="verification-code"
              maxLength={6}
              pattern="\d{6}"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              type="button"
              className={styles["send-verification-button"]}
              onClick={(event) =>
                handleCodeSubmit(event, handleSendVerification)
              }
              disabled={isCodeSubmitting}
            >
              {isCodeSubmitting ? "Already Send to Email" : "Get Code"}
            </button>
          </div>
        </div>

        <div className={styles["login-form-input-group"]}>
          <label htmlFor="email">Invitation Code</label>
          <div className={styles["verification-code-container"]}>
            <input
              type="text"
              id="invitation-code"
              placeholder="可选"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
            />
          </div>
        </div>

        <div className={styles["button-container"]}>
          <button className={styles["login-form-submit"]} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
