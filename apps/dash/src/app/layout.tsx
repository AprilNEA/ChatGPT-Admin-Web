import React from "react";
import { ThemeProvider, AuthProvider } from "@/app/provider";

export const metadata = {
  title: "ChatGPT-April Dashboard",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
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
        <ThemeProvider>
          <div style={contentStyle}>
            <AuthProvider>{children}</AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
