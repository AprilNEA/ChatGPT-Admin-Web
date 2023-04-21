import { FormEvent, useState } from "react";
import { useUserStore } from "@/store";
import styles from "@/styles/module/login.module.scss";
import { showToast } from "@/components/ui-lib";
import { RegisterResponse, ResponseStatus } from "@/app/api/typing.d";
import { useRouter, useSearchParams } from "next/navigation";
import Locales from "@/locales";

export function Login() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [showPage, setShowPage] = useState("index");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [invitationCode, setInvitationCode] = useState(
    searchParams.get("code") ?? ""
  );

  // 防止表单重复 提交
  const [submitting, setSubmitting] = useState(false);
  const [updateSessionToken, updateEmail] = useUserStore((state) => [
    state.updateSessionToken,
    state.updateEmail,
  ]);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("请输入邮箱密码");
      setSubmitting(false);
      return;
    }

    const res = await (
      await fetch("/api/user/login", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      })
    ).json();

    handleLoginResponse(res);
  };

  const handleLoginResponse = (res: any) => {
    switch (res.status) {
      case ResponseStatus.Success: {
        updateSessionToken(res.sessionToken);
        updateEmail(email);
        showToast(Locales.Index.Success(Locales.Index.Login), 3000);
        router.replace("/");
        break;
      }
      case ResponseStatus.notExist: {
        showToast(Locales.Index.NotYetRegister);
        break;
      }
      case ResponseStatus.wrongPassword: {
        showToast(Locales.Index.PasswordError);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !verificationCode) {
      showToast(Locales.Index.NoneData);
      setSubmitting(false);
      return;
    }

    const res = (await (
      await fetch("/api/user/register", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          code: verificationCode,
          code_type: "email",
          invitation_code: invitationCode.toLowerCase(),
        }),
      })
    ).json()) as RegisterResponse;

    handleRegisterResponse(res);
  };

  const handleRegisterResponse = (res: RegisterResponse) => {
    switch (res.status) {
      case ResponseStatus.Success: {
        updateSessionToken(res.sessionToken);
        updateEmail(email);
        router.replace("/")
        showToast(Locales.Index.Success(Locales.Index.Register), 3000);
        break;
      }
      case ResponseStatus.alreadyExisted: {
        showToast(Locales.Index.DuplicateRegistration);
        break;
      }
      case ResponseStatus.invalidCode: {
        showToast(Locales.Index.CodeError);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    switch (showPage) {
      case "login":
        await handleLogin();
        break;
      case "register":
        await handleRegister();
        break;
      default:
        break;
    }
    setSubmitting(false);
  };

  const handleSendVerification = async (codeType: string) => {
    setSubmitting(true);
    if (!email) {
      showToast("请输入邮箱");
      setSubmitting(false);
      return;
    }
    const res = await (
      await fetch("/api/user/register?email=" + encodeURIComponent(email), {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    switch (res.status) {
      case ResponseStatus.Success: {
        switch (res.code_data.status) {
          case 0:
            showToast("验证码成功发送!");
            setIsSending(true);
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
      case ResponseStatus.notExist: {
        showToast(Locales.Index.EmailNonExistent);
        break;
      }
      default: {
        showToast(Locales.UnknownError);
        break;
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className={styles["login-form-container"]}>
        <div
          className={`${showPage !== "index" && styles["login-form-visible"]}`}
        >
          <div className={styles["content"]}>
            <h2 className={styles["text"]}>ChatGPT</h2>
            <div className={styles["buttons"]}>
              <button
                className={styles["button"]}
                onClick={() => setShowPage("login")}
              >
                登录
              </button>
              <button
                className={styles["button"]}
                onClick={() => setShowPage("register")}
              >
                注册
              </button>
            </div>
          </div>
        </div>
        <form
          className={
            styles["login-form"] +
            ` ${showPage !== "login" && styles["login-form-visible"]}`
          }
          onSubmit={handleSubmit}
        >
          <h2 className={styles["login-form-title"]}>Login</h2>
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
          <div className={styles["button-container"]}>
            <button
              className={styles["login-form-submit"]}
              type="submit"
              disabled={submitting}
            >
              Login
            </button>
          </div>
        </form>

        <form
          className={
            styles["login-form"] +
            ` ${showPage !== "register" && styles["login-form-visible"]}`
          }
          onSubmit={handleSubmit}
        >
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
                className={styles["send-verification-button"]}
                onClick={() => handleSendVerification("email")}
                disabled={submitting}
              >
                {isSending ? "Already Send to Email" : "Get Code"}
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
    </>
  );
}
