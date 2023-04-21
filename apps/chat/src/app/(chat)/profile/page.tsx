"use client";

import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";

const Profile = dynamic(
  async () => (await import("@/components/profile")).Profile,
  {
    loading: () => <Loading noLogo />,
  }
);

export default function ProfilePage() {
  const router = useRouter();
  return (
    <>
      <Profile
        closeSettings={() => {
          router.back();
        }}
      />
    </>
  );
}
