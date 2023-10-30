import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createChatStore } from '@/store/chat';
import { createSharedStore } from '@/store/shared';
import { StoreType } from '@/store/types';

export const useStore = create<StoreType>()(
  persist(
    (...a) => ({
      ...createChatStore(...a),
      ...createSharedStore(...a),
    }),
    {
      name: 'caw',
      partialize: (state) => ({
        sessionToken: state.sessionToken,
        config: state.config,
      }),
      version: 1,
    },
  ),
);
