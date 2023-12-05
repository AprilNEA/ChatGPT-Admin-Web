"use client";

import styles from './plugin.module.scss';
import CloseIcon from '@/icons/close.svg';
import { IconButton } from '@/components/button';
import Locale from '@/locales';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { useState } from 'react';
import clsx from 'clsx';

import ExploreIcon from '@/icons/explore.svg';
import UserIcon from '@/icons/person.svg';
import UploadIcon from '@/icons/upload.svg';
import AddIcon from '@/icons/add.svg';
import MaskIcon from '@/icons/mask.svg';

import Image from 'next/image';

export default function PluginPage() {
    const router = useRouter();
    const { fetcher, setShowSideBar } = useStore();
    const [page, setPage] = useState(1);

    return (
        <>
            <div className={styles['window-header']}>
                <div className={styles['window-header-title']}>
                    <div className={styles['window-header-main-title']}>
                        {page === 1 ? Locale.Plugin.Explore : Locale.Plugin.User}
                    </div>
                </div>
                <div className={styles['window-actions']}>
                    <div className={styles['window-action-button']}>
                        <IconButton
                            icon={<AddIcon />}
                            onClick={() => {

                            }}
                            bordered
                            title={Locale.Settings.Actions.Close}
                        />
                    </div>
                    <div className={styles['window-action-button']}>
                        <IconButton
                            icon={<UploadIcon />}
                            onClick={() => {

                            }}
                            bordered
                            title={Locale.Settings.Actions.Close}
                        />
                    </div>
                    <div className={styles['window-action-button']}>
                        <IconButton
                            icon={<CloseIcon />}
                            onClick={() => {
                                setShowSideBar(true);
                                router.back();
                            }}
                            bordered
                            title={Locale.Settings.Actions.Close}
                        />
                    </div>

                </div>
            </div>

            <div className={styles['plugin-body']}>
                <div className={styles['plugin-sidebar']}>
                    <button className={page === 1 ? styles['plugin-sidebar-item-selected'] : styles['plugin-sidebar-item']} onClick={() => setPage(1)}>
                        <div className={styles['item-logo']}><ExploreIcon /></div>
                    </button>
                    <button className={page === 2 ? styles['plugin-sidebar-item-selected'] : styles['plugin-sidebar-item']} onClick={() => setPage(2)}>
                        <div className={styles['item-logo']}><UserIcon /></div>
                    </button>
                </div>
                <div className={styles['plugin-body']}>
                    <div className={styles['plugin-section']}>
                        <div className={styles['plugin-section-title']}>
                            官方插件
                        </div>
                        <div className={styles['plugin-section-body']}>
                            <div className={styles['plugin']}>
                                <div className={styles['plugin-poster']}>
                                </div>
                                <div className={styles['plugin-content']}>
                                    <div className={styles['plugin-type']}>
                                        <MaskIcon />
                                    </div>
                                    <div className={styles['plugin-info']}>
                                        <div className={styles['plugin-name']}>
                                            MrZhao
                                        </div>
                                        <div className={styles['plugin-description']}>
                                            A ChatGPT Model simulating MrZhao.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}