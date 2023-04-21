"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";

const Login = dynamic(async () => (await import("@/components/login")).Login, {
  loading: () => <Loading noLogo />,
});
export default function LoginPage() {
  return <Login />;
}
