'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { IconButton } from '@/components/button';
import { Markdown } from '@/components/markdown';
import { List, ListItem } from '@/components/ui-lib';
import { Loading } from '@/components/ui-lib';
import CloseIcon from '@/icons/close.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { useStore } from '@/store';
import styles from '@/styles/module/announcement.module.scss';
import { DateFormat } from '@/utils/data-format';

export default function AnnouncePage() {
  const router = useRouter();
  const { fetcher } = useStore();
  const { data: announcements, isLoading: announcementsLoading } = useSWR(
    '/announcement/all',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  if (announcementsLoading) return <Loading />;

  return (
    <>
      <div className={styles['window-header']}>
        <div className={styles['window-header-title']}>
          <div className={styles['window-header-main-title']}>
            {Locale.Announcement.Title}
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
      <div className={styles['announcement']}>
        <div className={styles['announcement-coloum']}>
          {announcements ? (
            announcements.map((announce: any) => (
              <>
                <List>
                  <ListItem>
                    <div className={styles['announce-body']}>
                      <div className={styles['title']}>{announce.title}</div>
                      <div className={styles['announcement-date']}>
                        {DateFormat(announce.updatedAt)}
                      </div>
                      <Markdown content={announce.content}></Markdown>
                    </div>
                  </ListItem>
                </List>
              </>
            ))
          ) : (
            <List>
              <ListItem>
                <>{Locale.Announcement.NoEntry}</>
              </ListItem>
            </List>
          )}
        </div>
      </div>
    </>
  );
}
