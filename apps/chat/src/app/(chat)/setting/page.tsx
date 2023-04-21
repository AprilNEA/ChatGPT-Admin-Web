"use client";

import { useState } from "react";
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
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <Settings
      closeSettings={() => {
        router.back();
      }}
    />
  );
}
