'use client';

import { useRouter } from 'next/navigation';
import useSWR, { useSWRConfig } from 'swr';

import { IconButton } from '@/components/button';
import { List, ListItem } from '@/components/ui-lib';
import CloseIcon from '@/icons/close.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { Markdown } from '@/components/markdown';
import styles from '@/styles/module/announcement.module.scss';
import { useStore } from '@/store';
import { Loading } from '@/components/ui-lib';

export default function AnnouncePage(){
    const router = useRouter();
    const {fetcher} = useStore();
    const { data: announcement, isLoading: isAnnouncementLoading } = useSWR(
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

    function DateFormat(time: string | number): string {
        const date = new Date(time);
    
        const day: string = ('0' + date.getDate()).slice(-2);
        const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
        const year: number = date.getFullYear();
    
        const hours: string = ('0' + date.getHours()).slice(-2);
        const minutes: string = ('0' + date.getMinutes()).slice(-2);
        const seconds: string = ('0' + date.getSeconds()).slice(-2);
    
        const formattedDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      }

    if (isAnnouncementLoading) return <Loading />;

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
            {announcement ? (
            announcement.map((announce) => (
                <>
                    <div className={styles['announcement-header']}>
                        <div>{`#${announce.id}`}</div>
                        <div className={styles['announcement-date']}>
                            {DateFormat(announce.updatedAt)}
                        </div>
                    </div>
                    <List>
                        <ListItem>
                            <div className={styles['announce-body']}>
                                <div className={styles['title']}>{announce.title}</div>
                                <Markdown content={announce.content}></Markdown>
                            </div>
                        </ListItem>
                    </List>
                </>
            ))) : (
                <List>
                    <ListItem>
                        <>{Locale.Announcement.NoEntry}</>
                    </ListItem>
                </List>
              )}
        </div>
      </div>
        </>
    )
}