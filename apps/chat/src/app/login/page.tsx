"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";

const Login = dynamic(async () => (await import("@/components/login")).Login, {
  loading: () => <Loading noLogo />,
});
export default function LoginPage() {
  return <Login />;
}
