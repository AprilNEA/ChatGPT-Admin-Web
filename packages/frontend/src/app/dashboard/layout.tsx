import { AuthProvider } from "@/app/provider";
import { Sidebar } from "@/components/sidebar";
import "@/styles/globals.scss";

export const metadata = {
  title: "CAW Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider admin={false}><Sidebar>{children}</Sidebar></AuthProvider>;
}
