import BaseLayout from "@/components/layout";

export const metadata = {
  title: "LMOBEST Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
