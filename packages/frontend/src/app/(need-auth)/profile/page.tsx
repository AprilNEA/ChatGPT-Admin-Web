'use client';

import { IconButton } from '@/components/button';
import { List, ListItem } from '@/components/ui-lib';
import ClearIcon from '@/icons/clear.svg';
import CloseIcon from '@/icons/close.svg';
import ResetIcon from '@/icons/reload.svg';
import Locale, { changeLang, getLang } from '@/locales';
import { SubmitKey, Theme, useStore } from '@/store';
import styles from '@/styles/module/profile.module.scss';
import { useRouter } from 'next/navigation';

function SettingItem(props: {
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

export default function Settings() {
  const router = useRouter();

  const [config, updateConfig] = useStore((state) => [
    state.config,
    state.updateConfig,
  ]);

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
        <List>
          <SettingItem title={Locale.Profile.Username}>
            <input value={config.submitKey} onChange={(e) => {}} />
          </SettingItem>

          <ListItem>
            <div className={styles['profile-title']}>
              {Locale.Settings.Theme}
            </div>
            <select
              value={config.theme}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.theme = e.target.value as any as Theme),
                );
              }}
            >
              {Object.values(Theme).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </ListItem>

          <SettingItem title={Locale.Settings.Lang.Name}>
            <div className="">
              <select
                value={getLang()}
                onChange={(e) => {
                  changeLang(e.target.value as any);
                }}
              >
                <option value="en" key="en">
                  {Locale.Settings.Lang.Options.en}
                </option>

                <option value="cn" key="cn">
                  {Locale.Settings.Lang.Options.cn}
                </option>
              </select>
            </div>
          </SettingItem>

          <SettingItem title={Locale.Settings.TightBorder}>
            <input
              type="checkbox"
              checked={config.tightBorder}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.tightBorder = e.currentTarget.checked),
                );
              }}
            ></input>
          </SettingItem>
        </List>
      </div>
    </>
  );
}
