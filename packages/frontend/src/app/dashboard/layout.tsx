import { AuthProvider } from "@/app/provider";

export const metadata = {
  title: "CAW Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
