import { AuthProvider } from "@/app/provider";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "CAW Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider admin={false}><Theme>{children}</Theme></AuthProvider>;
}
