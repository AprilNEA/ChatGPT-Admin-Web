import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import '@/styles/dashboard.css';

export const metadata = {
  title: 'Dashboard ｜ ChatGPT Admin Web',
  description: 'Manage Dashboard for ChatGPT Admin Web',
};

export default function AdminEndLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Theme className="w-full h-full" hasBackground={true}>
      {children}
    </Theme>
  );
}
