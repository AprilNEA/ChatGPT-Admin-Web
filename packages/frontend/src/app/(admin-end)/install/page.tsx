'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Callout,
  IconButton,
  Popover,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes';

import usePreventFormSubmit from '@/hooks/use-prevent-form';
import { InfoIcon } from '@/icons';
import { useStore } from '@/store';

import { ErrorCodeEnum } from 'shared';

export default function SetupPage() {
  const router = useRouter();
  const { jsonFetcher } = useStore();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, handleInitAdmin] = usePreventFormSubmit();

  async function initAdmin() {
    await jsonFetcher('/auth/admin/setup', {
      method: 'POST',
      body: JSON.stringify({ identity, password }),
    }).then((data) => {
      if (!data.success) {
        switch (data.code) {
          case ErrorCodeEnum.AdminExists:
            return setErrorMessage('管理员已存在');
          case ErrorCodeEnum.AuthFail:
            return setErrorMessage('用户密码错误');
          default:
            setErrorMessage(data.message);
            break;
        }
      } else {
        router.push('/auth');
      }
    });
  }

  return (
    <div className="w-full h-full mx-auto">
      <Box
        className="w-full h-full flex flex-col justify-center items-center space-y-4"
        style={{
          background: 'var(--gray-a2)',
          borderRadius: 'var(--radius-3)',
        }}
      >
        <div className="flex flex-row items-center justify-center">
          <Text>初始化管理员</Text>
          <Tooltip content="若数据库中没有用户则输入用户密码后，新建管理员用户；若数据库中已存在用户，则输入某个用户的账户或密码，该用户将获得管理员权限。">
            <IconButton radius="full" variant="ghost" className="ml-1">
              <InfoIcon className="text-blue-700" />
            </IconButton>
          </Tooltip>
        </div>
        {errorMessage && (
          <Callout.Root size="1" color="red">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>{errorMessage}</Callout.Text>
          </Callout.Root>
        )}
        <TextField.Input
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="Admin Phone/Email"
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
