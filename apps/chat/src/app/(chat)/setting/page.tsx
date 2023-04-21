"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";

const Settings = dynamic(
  async () => (await import("@/components/settings")).Settings,
  {
    loading: () => <Loading noLogo />,
  }
);

export default function SettingPage() {
  const router = useRouter();
  return (
    <Settings
      closeSettings={() => {
        router.back();
      }}
    />
  );
}
