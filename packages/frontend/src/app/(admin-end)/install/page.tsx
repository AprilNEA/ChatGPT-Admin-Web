'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Box, Button, Text, TextField } from '@radix-ui/themes';

import usePreventFormSubmit from '@/hooks/use-prevent-form';
import { useStore } from '@/store';

export default function SetupPage() {
  const router = useRouter();
  const { fetcher } = useStore();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, handleInitAdmin] = usePreventFormSubmit();

  async function initAdmin() {
    await fetcher('/auth/admin/setup', {
      method: 'POST',
      body: JSON.stringify({ identity, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push('/auth');
        }
      });
  }

  return (
    <div className="w-full h-full">
      <Box
        className="w-full h-full flex flex-col justify-center items-center space-y-4"
        style={{
          background: 'var(--gray-a2)',
          borderRadius: 'var(--radius-3)',
        }}
      >
        <Text>初始化管理员</Text>
        <TextField.Input
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="Admin Email"
        />
        <TextField.Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
        />
        <Button
          disabled={isSubmitting}
          onClick={() => handleInitAdmin(undefined, initAdmin)}
        >
          提交
        </Button>
      </Box>
    </div>
  );
}
