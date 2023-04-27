/* eslint-disable @next/next/no-page-custom-font */
import "@/styles/globals.scss";
import "@/styles/markdown.scss";
import "@/styles/prism.scss";

import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "ChatGPT",
  description: "Your personal ChatGPT Bot.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
