import React, { useState } from 'react';

import styles from '@/app/auth/auth.module.scss';
import { IconButton } from '@/components/button';
import { showToast } from '@/components/ui-lib';
import { useUserData } from '@/hooks/data/use-user';
import usePreventFormSubmit from '@/hooks/use-prevent-form';
import Locales from '@/locales';
import { useStore } from '@/store';
import clsx from 'clsx';

export function SetUsernameAndPassword(props: { onClose: () => void }) {
  const { fetcher } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, handleSubmit] = usePreventFormSubmit();
  const { userData } = useUserData();

  async function setup() {
    if (!password) return showToast('密码不能为空');
    fetcher('/auth/bindPassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username == '' ? undefined : username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          showToast('设置成功');
          props.onClose();
        } else {
          // TODO error
        }
      });
  }

  return (
    <div className={styles['form-container']}>
      <div className={styles['row']}>
        <input
          type="text"
          id="username"
          value={userData?.name ?? username}
          disabled={!!userData?.name}
          className={styles['auth-input']}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={`${Locales.Auth.Username}`}
          required
        />
      </div>

      <div className={styles['row']}>
        <input
          type="password"
          id="password"
          value={password}
          className={styles['auth-input']}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={Locales.Auth.Password}
          required
        />
      </div>

      <div className={styles['auth-actions']}>
        <IconButton
          disabled={isSubmitting}
          onClick={() => handleSubmit(undefined, setup)}
          text={Locales.Auth.Submit}
          className={clsx(styles['auth-submit-btn'], styles['forceauth-button'])}
          type="primary"
        />
      </div>
    </div>
  );
}
