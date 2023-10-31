'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/components/button';
import Chat from '@/components/chat';
import AddIcon from '@/icons/add.svg';
import ReturnIcon from '@/icons/return.svg';
import Locale from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/welcome.module.scss';

export default function ChatPage() {
  const router = useRouter();
  const [setSideBarOpen] = useStore((state) => [state.setShowSideBar]);

  return (
    <>
      <IconButton
        text={Locale.Index.Return}
        icon={<ReturnIcon />}
        onClick={() => {
          setSideBarOpen(true);
        }}
        className={styles['return-btn']}
      ></IconButton>
      <div className={styles['welcome-container']}>
        <div className={styles['title']}>{Locale.Index.WelcomeTitle}</div>
        <div className={styles['message']}>{Locale.Index.WelcomeMessage}</div>
        <div className={styles['caption']}>{Locale.Index.WelcomeCaption}</div>
        <IconButton
          text={Locale.Home.NewChat}
          icon={<AddIcon />}
          bordered
          onClick={() => router.push('/chat/new')}
        ></IconButton>
      </div>
    </>
  );
}
