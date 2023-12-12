'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import ChatIcon from '@/icons/chat.svg';
import DeleteIcon from '@/icons/delete.svg';
import Locale from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/home.module.scss';
import { DateFormat, DateFormat2 } from '@/utils/data-format';

import { ChatSession } from 'shared';

import Chat from '..';

/* 左侧对话栏中最小对话单元 */
export function ChatItem(props: {
  onClick?: () => void;
  id: string;
  title: string;
  count: number;
  time: string | number | Date;
  selected: boolean;
}) {
  const { fetcher } = useStore();
  const router = useRouter();

  const date = DateFormat2(props.time);

  async function onDelete() {
    await fetcher(`/chat/sessions/${props.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // TODO directly mutate data
          router.refresh();
        }
      });
  }

  return (
    <Link
      href={`/chat/${props.id}`}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
      prefetch={true}
    >
      <div
        className={`${styles['chat-item']} ${
          props.selected && styles['chat-item-selected']
        }`}
        onClick={props.onClick}
      >
        <div className={styles['chat-item-icon']}>
          <ChatIcon />
        </div>
        <div className={styles['chat-item-main']}>
          <div className={styles['chat-item-title']}>{props.title}</div>
          <div className={styles['chat-item-info']}>
            <div className={styles['chat-item-count']}>
              {Locale.ChatItem.ChatItemCount(props.count)}
            </div>
            <div className={styles['chat-item-date']}>{date}</div>
          </div>
          <div className={styles['chat-item-delete']} onClick={onDelete}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* 左侧边栏对话列表 */
export function ChatList() {
  const { fetcher, currentChatSessionId } = useStore();

  const { data: sessions } = useSWR<ChatSession[], any, string>(
    '/chat/sessions',
    (url) => {
      return fetcher(url)
        .then((res) => res.json())
        .then((res) =>
          res.map(
            (session: ChatSession & { _count: { messages: number } }) => ({
              ...session,
              messagesCount: session._count.messages,
              _count: undefined,
            }),
          ),
        );
    },
  );

  return (
    <div className={styles['chat-list']}>
      {sessions &&
        sessions.map((item, i) => (
          <ChatItem
            key={i}
            id={item.id}
            title={item.topic ?? Locale.ChatItem.DefaultTopic}
            time={item.updatedAt}
            count={item.messagesCount}
            selected={currentChatSessionId === item.id}
          />
        ))}
    </div>
  );
}
