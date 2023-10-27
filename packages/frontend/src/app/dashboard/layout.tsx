import { AuthProvider } from "@/app/provider";

export const metadata = {
  title: "CAW Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider admin={true}>{children}</AuthProvider>;
}
