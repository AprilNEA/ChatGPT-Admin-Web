'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

import authMiddleware from '@/app/provider/auth-middleware';
import { Loading } from '@/components/loading';
import { useStore } from '@/store';

export function AuthProvider({
  children,
  admin = false,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const { sessionToken, refreshToken, setAuthToken, clearAuthToken } =
    useStore();

  const pathname = usePathname();
  const router = useRouter();

  const [isValidating, setIsValidating] = useState(true);

  function validateSession() {
    if (!sessionToken) return false;

    try {
      const payload = JSON.parse(atob(sessionToken.split('.')[1]));
      if (admin) {
        if (payload.role !== 'Admin') {
          return false;
        }
      }
      return payload.exp >= Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  function refreshSession() {
    if (!refreshToken) return false;

    try {
      const payload = JSON.parse(atob(refreshToken.split('.')[1]));
      if (payload.exp <= Date.now() / 1000) {
        return false;
      }
      fetch('/api/auth/refresh', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAuthToken(data.sessionToken, data.refreshSession);
        });
      return true;
    } catch (e) {
      return false;
    }
  }

  const validate = useCallback(() => {
    const isValid = validateSession();
    if (!isValid) {
      if (!refreshSession()) {
        clearAuthToken();
        if (admin) {
          return router.push('/');
        }
        return router.push('/auth');
      }
    }
    setIsValidating(false);
    if (pathname.startsWith('/auth')) {
      return router.push('/');
    }
  }, [
    router,
    pathname,
    clearAuthToken,
    validateSession,
    refreshSession,
    admin,
  ]);

  useEffect(() => {
    validate();
  }, [pathname, sessionToken, refreshToken, validate]);

  if (isValidating) {
    return <Loading />;
  }

  return <>{children}</>;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ use: [authMiddleware], provider: () => new Map() }}>
      {children}
    </SWRConfig>
  );
}
