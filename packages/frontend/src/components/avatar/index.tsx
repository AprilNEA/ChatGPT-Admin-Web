import dynamic from 'next/dynamic';
import Image from 'next/image';

import BotIcon from '@/icons/bot.svg';
import LoadingIcon from '@/icons/three-dots.svg';
import { useStore } from '@/store';
import styles from '@/styles/module/home.module.scss';

import { ChatMessage } from 'shared';

const Emoji = dynamic(async () => (await import('emoji-picker-react')).Emoji, {
  loading: () => <LoadingIcon />,
});

/**
 * Emoji 头像
 * @param props
 * @constructor
 */
export function Avatar(props: { role: ChatMessage['role'] }) {
  const config = useStore((state) => state.config);

  if (props.role !== 'user') {
    return process.env.LOGO_BOT ? (
      <Image
        src={process.env.LOGO_BOT}
        alt="Logo"
        className={styles['user-avtar']}
        width="30"
        height="30"
      />
    ) : (
      <BotIcon className={styles['user-avtar']} />
    );
  }

  return (
    <div className={styles['user-avtar']}>
      <Emoji unified="1f603" size={18} />
    </div>
  );
}
