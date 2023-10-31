'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { IconButton } from '@/components/button';
import { List, ListItem } from '@/components/ui-lib';
import { showToast } from '@/components/ui-lib';
import { usePremiumData } from '@/hooks/data/use-premium';
import { useUserData } from '@/hooks/data/use-user';
import CheckmarkIcon from '@/icons/checkmark.svg';
import CloseIcon from '@/icons/close.svg';
import OpenIcon from '@/icons/open.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/profile.module.scss';

function ProfileItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles['settings-title']}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles['settings-sub-title']}>{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </ListItem>
  );
}

export default function Profile() {
  const router = useRouter();
  const { userData } = useUserData();
  const [localUsername, setLocalUsername] = useState<string | null>(null);
  const { fetcher } = useStore();
  const { mutate } = useSWRConfig();

  async function submitChangeUsername() {
    let success = false;
    await fetcher('/user/name', {
      method: 'PUT',
      body: JSON.stringify({ name: localUsername }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          success = true;
          showToast(Locale.Profile.ChangeUsernameSuccess);
        } else {
          showToast(Locale.Profile.ChangeUsernameFail);
        }
      });
    await mutate('/user/info');
    if (success) setLocalUsername(null);
  }

  return (
    <>
      <div className={styles['window-header']}>
        <div className={styles['window-header-title']}>
          <div className={styles['window-header-main-title']}>
            {Locale.Profile.Title}
          </div>
          <div className={styles['window-header-sub-title']}>
            {Locale.Profile.SubTitle}
          </div>
        </div>
        <div className={styles['window-actions']}>
          <div className={styles['window-action-button']}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => router.back()}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles['profile']}>
        <div className={styles['info-overview']}>
          <div className={styles['avatar']}>
            <div>😺</div>
            {/*{userData?.avatar ? <img src={userData?.avatar} /> : <div>😺</div>}*/}
          </div>
          <div className={styles['info']}>
            <div className={styles['username']}>
              {userData?.name ?? 'Username'}
            </div>
            <div className={styles['premium']}>
              {userData?.isPremium
                ? Locale.Premium.PremiumUser
                : Locale.Premium.NormalUser}
            </div>
          </div>
        </div>
        <List>
          <ProfileItem title={Locale.Profile.Username}>
            <div className={styles['set-group']}>
              <input
                value={localUsername ?? userData?.name}
                onChange={(e) => {
                  setLocalUsername(e.target.value);
                }}
              />
              {localUsername && localUsername !== userData?.name ? (
                <IconButton
                  icon={<CheckmarkIcon />}
                  bordered
                  onClick={submitChangeUsername}
                ></IconButton>
              ) : (
                ''
              )}
            </div>
          </ProfileItem>

          <ProfileItem title={Locale.Profile.OrderHistory}>
            <IconButton
              icon={<OpenIcon />}
              bordered
              onClick={() => {
                router.push('/order/history');
              }}
            ></IconButton>
          </ProfileItem>
        </List>
      </div>
    </>
  );
}
