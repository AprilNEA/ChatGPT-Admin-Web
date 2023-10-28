/* eslint-disable @next/next/no-page-custom-font */
import { AuthProvider } from '@/app/provider';
import { Sidebar } from '@/components/sidebar';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/prism.scss';

export const metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || 'ChatGPT Admin Web',
  description: 'Your personal ChatGPT Bot.',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Sidebar>{children}</Sidebar>
    </AuthProvider>
  );
}
