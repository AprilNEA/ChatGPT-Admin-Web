import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import '@/styles/dashboard.css';

export const metadata = {
  title: 'CAW Dashboard',
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
