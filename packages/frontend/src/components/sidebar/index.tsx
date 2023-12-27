'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import useSWR from 'swr';

import { SetPassword } from '@/app/auth/modal';
import { ChatList } from '@/components/chat/chat-list';
import { Loading } from '@/components/loading';
import { Markdown } from '@/components/markdown';
import { Modal, showModal } from '@/components/ui-lib';
import { usePremiumData } from '@/hooks/data/use-premium';
import { useUserData } from '@/hooks/data/use-user';
import { useSwitchTheme } from '@/hooks/switch-theme';
import AddIcon from '@/icons/add.svg';
import AnnouncementIcon from '@/icons/announcement.svg';
import ChatGptIcon from '@/icons/chatgpt.svg';
import CheckMarkIcon from '@/icons/checkmark.svg';
import FileChatIcon from '@/icons/file-chat.svg';
import LogoutIcon from '@/icons/logout.svg';
import MoreIcon from '@/icons/more.svg';
import PersonIcon from '@/icons/person.svg';
import PluginIcon from '@/icons/plugin.svg';
import PremiumIcon from '@/icons/premium.svg';
import SettingsIcon from '@/icons/settings.svg';
import UserIcon from '@/icons/user.svg';
import Locale from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/home.module.scss';
import { isMobileScreen } from '@/utils/client-utils';

import { IUserData } from 'shared';

/* 修复水合错误 */
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

function Premium({ userData }: { userData: IUserData }) {
  const { setShowSideBar } = useStore();
  const { isPremium } = userData;
  const { limitData } = usePremiumData();

  return (
    <Link
      href="/premium"
      onClick={() => {
        setShowSideBar(false);
      }}
      prefetch={true}
      className={styles['link-full']}
    >
      <button className={styles['sidebar-premium']}>
        <div>
          <div className={styles['icon']}>
            {isPremium ? <CheckMarkIcon /> : <PremiumIcon />}
          </div>
          {isPremium ? (
            limitData && (
              <div className={styles['text']}>
                {Locale.Index.PremiumLimit(limitData.times)}
              </div>
            )
          ) : (
            <div className={styles['text']}>{Locale.Index.UpgradePremium}</div>
          )}
        </div>
      </button>
    </Link>
  );
}

function bindPassword() {
  const div = document.createElement('div');
  div.className = 'modal-mask';
  document.body.appendChild(div);

  const root = createRoot(div);
  const closeModal = () => {
    root.unmount();
    div.remove();
  };

  div.onclick = (e) => {
    if (e.target === div) {
      closeModal();
    }
  };
  root.render(
    <Modal
      title={Locale.Auth.SetUp}
      onClose={closeModal}
      className={styles['force-auth-modal']}
    >
      <SetPassword onClose={closeModal} />
    </Modal>,
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    fetcher,
    clearAuthToken,
    showSideBar,
    setShowSideBar,
    latestAnnouncementId,
    setLatestAnnouncementId,
    config,
  } = useStore();
  // componentState
  const [newbtnExpanded, setNewbtnExpanded] = useState<boolean>(false);
  const [morebtnExpanded, setMorebtnExpanded] = useState<boolean>(false);

  useSWR('/announcement/recent', (url) =>
    fetcher(url)
      .then((res) => res.json())
      .then((res) => res.data)
      .then((latestAnnouncement) => {
        if (latestAnnouncement.id !== latestAnnouncementId) {
          showModal({
            title: latestAnnouncement.title,
            children: <Markdown content={latestAnnouncement.content} />,
          });
          setLatestAnnouncementId(latestAnnouncement.id as number);
        }
      }),
  );

  const { data: userData, isLoading: isUserDataLoading } = useSWR<IUserData>(
    '/user/info',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            if (res.data.todos) {
              res.data.todos = res.data.todos.map((todo: string) => {
                switch (todo) {
                  case 'password':
                    bindPassword();
                    break;
                  default:
                    break;
                }
              });
            }
            return res.data;
          }
        }),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  function logout() {
    clearAuthToken();
    router.push('/auth');
  }

  const loading = !useHasHydrated();

  useSwitchTheme();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        config.tightBorder && !isMobileScreen()
          ? styles['tight-container']
          : styles.container
      }`}
    >
      <div
        className={styles.sidebar + ` ${showSideBar && styles['sidebar-show']}`}
      >
        <div className={styles['sidebar-header']}>
          <div className={styles['sidebar-title']}>{Locale.Index.Title}</div>
          {!!process.env.NEXT_PUBLIC_OA && (
            <div className={styles['sidebar-sub-title']}>
              {Locale.Index.SubTitle}
              <span className={styles['sidebar-wechat-oa']}>
                {process.env.NEXT_PUBLIC_OA}
              </span>
            </div>
          )}
          <div className={styles['sidebar-logo']}>
            {process.env.LOGO_SIDEBAR ? (
              <Image
                src={process.env.LOGO_SIDEBAR}
                alt="Logo"
                width="48"
                height="48"
              />
            ) : (
              <ChatGptIcon />
            )}
          </div>
        </div>
        <div className={styles['sidebar-newbtn']}>
          {!newbtnExpanded ? (
            <button
              className={styles['sidebar-new']}
              onClick={() => setNewbtnExpanded(true)}
            >
              <div>
                <div className={styles['icon']}>
                  <AddIcon />
                </div>
                <div className={styles['text']}>{Locale.Home.NewChat}</div>
              </div>
            </button>
          ) : (
            <>
              <Link
                href="/chat/new"
                onClick={() => {
                  setShowSideBar(false);
                  setNewbtnExpanded(false);
                  setMorebtnExpanded(false);
                }}
                className={styles['link-full']}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <button className={styles['sidebar-new']}>
                  <div>
                    <div className={styles['icon']}>
                      <AddIcon />
                    </div>
                    <div className={styles['text']}>
                      {Locale.Home.NewBlankChat}
                    </div>
                  </div>
                </button>
              </Link>

              <button className={styles['sidebar-new']}>
                <Link
                  href="/plugin"
                  onClick={() => {
                    setShowSideBar(false);
                    setNewbtnExpanded(false);
                    setMorebtnExpanded(false);
                  }}
                  className={styles['link-full']}
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  <div>
                    <div className={styles['icon']}>
                      <PluginIcon />
                    </div>
                    <div className={styles['text']}>{Locale.Home.Plugin}</div>
                  </div>
                </Link>
              </button>
            </>
          )}
        </div>
        <div
          className={styles['sidebar-body']}
          onClick={() => {
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles['sidebar-tail']}>
          {userData && <Premium userData={userData} />}
          <div className={styles['sidebar-accountbtn']}>
            <div
              className={
                morebtnExpanded
                  ? styles['sidebar-account-ext']
                  : clsx(
                      styles['sidebar-account-ext'],
                      styles['sidebar-account-ext-dis'],
                    )
              }
            >
              <Link
                href="/profile"
                onClick={() => {
                  setShowSideBar(false);
                  setNewbtnExpanded(false);
                  setMorebtnExpanded(false);
                }}
                className={styles['link-full']}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <div className={styles['sidebar-account-ext-item']}>
                  <div className={styles['icon']}>
                    <PersonIcon />
                  </div>
                  <div className={styles['text']}>{Locale.Index.Profile}</div>
                </div>
              </Link>
              <Link
                href="/settings"
                onClick={() => {
                  setShowSideBar(false);
                  setNewbtnExpanded(false);
                  setMorebtnExpanded(false);
                }}
                className={styles['link-full']}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <div className={styles['sidebar-account-ext-item']}>
                  <div className={styles['icon']}>
                    <SettingsIcon />
                  </div>
                  <div className={styles['text']}>{Locale.Index.Settings}</div>
                </div>
              </Link>
              <Link
                href="/announcement"
                onClick={() => {
                  setShowSideBar(false);
                  setNewbtnExpanded(false);
                  setMorebtnExpanded(false);
                }}
                className={styles['link-full']}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <div className={styles['sidebar-account-ext-item']}>
                  <div className={styles['icon']}>
                    <AnnouncementIcon />
                  </div>
                  <div className={styles['text']}>
                    {Locale.Index.Announcement}
                  </div>
                </div>
              </Link>
              <div
                className={styles['sidebar-account-ext-item']}
                onClick={logout}
              >
                <div className={styles['icon']}>
                  <LogoutIcon />
                </div>
                <div className={styles['text']}>{Locale.Index.LogOut}</div>
              </div>
            </div>
            <div
              className={styles['sidebar-account']}
              onClick={() => setMorebtnExpanded(!morebtnExpanded)}
            >
              <div className={styles['avatar']}>
                <UserIcon />
              </div>
              <div className={styles['account-name']}>
                {userData?.name ?? Locale.Index.DefaultUser}
              </div>
              <div className={styles['account-settingbtn']}>
                <MoreIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['window-content']}>{children}</div>
    </div>
  );
}
