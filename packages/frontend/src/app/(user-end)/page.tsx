'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/components/button';
import Chat from '@/components/chat';
import AddIcon from '@/icons/add.svg';
import ChatGptIcon from '@/icons/bot.svg';
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
        <div className={styles['logo']}></div>
        <div className={styles['title']}>{Locale.Index.Title}</div>
        <div className={styles['message']}>
          {process.env.DESCRIPTION ?? Locale.Index.WelcomeCaption}
        </div>
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
