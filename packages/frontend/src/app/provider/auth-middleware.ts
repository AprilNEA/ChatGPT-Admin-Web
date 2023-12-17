import { useRouter } from 'next/navigation';
import { Middleware, SWRHook } from 'swr';

import { useStore } from '@/store';

import { ErrorCodeEnum } from 'shared';

const authMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    // Handle the next middleware, or the `useSWR` hook if this is the last one.
    const swr = useSWRNext(key, fetcher, config);

    // After hook runs...
    // @ts-ignore
    if (swr.data?.success === false) {
      // @ts-ignore
      if (swr.data?.code === ErrorCodeEnum.AuthFail) {
        useStore().clearAuthToken();
        useRouter().push('/auth');
        throw new Error('Auth failed');
      }
    }
    return swr;
  };
export default authMiddleware;
