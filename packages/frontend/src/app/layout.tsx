/* eslint-disable @next/next/no-page-custom-font */
import { SWRProvider } from '@/app/provider';

export const metadata = {
  title: process.env.TITLE,
  description: process.env.DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, userRef-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        {process.env.LOGO && (
          <link rel="icon" type="image/svg+xml" href={process.env.LOGO} />
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Poppins&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
