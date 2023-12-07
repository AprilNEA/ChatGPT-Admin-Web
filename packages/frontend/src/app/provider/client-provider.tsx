'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

import { Loading } from '@/components/loading';
import { useStore } from '@/store';

export function AuthProvider({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { sessionToken, setSessionToken } = useStore();

  const pathname = usePathname();
  const router = useRouter();

  const [isValidating, setIsValidating] = useState(true);

  function validateSession() {
    if (!sessionToken) return false;

    try {
      if (admin) {
        const payload = JSON.parse(atob(sessionToken.split('.')[1]));
        if (payload.role !== 'Admin') {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  const validate = useCallback(() => {
    const isValid = validateSession();
    if (!isValid) {
      if (admin) {
        return router.push('/');
      }
      return router.push('/auth');
    } else {
      setIsValidating(false);
      if (pathname.startsWith('/auth')) {
        return router.push('/');
      }
    }
  }, [pathname, validateSession, router, admin]);

  useEffect(() => {
    validate();
  }, [pathname, validate]);

  if (isValidating) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
}
