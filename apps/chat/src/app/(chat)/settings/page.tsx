"use client";

import styles from "@/styles/module/settings.module.scss";

import ResetIcon from "@/assets/icons/reload.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ClearIcon from "@/assets/icons/clear.svg";

import { List, ListItem } from "@/components/ui-lib";

import { IconButton } from "@/components/button";
import { useChatStore, useSettingStore, ALL_MODELS } from "@/store";
import { Model, SubmitKey, Theme } from "@/store/setting/typing";

import Locale, { changeLang, getLang } from "@/locales";
import { useRouter } from "next/navigation";

function SettingItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  return (
    <ListItem>
      <div className={styles["settings-title"]}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles["settings-sub-title"]}>{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </ListItem>
  );
}

export default function Settings() {
  const router = useRouter();

  const [config, updateConfig, resetConfig] = useSettingStore((state) => [
    state.config,
    state.updateConfig,
    state.resetConfig,
  ]);
  const clearChatData = useChatStore((state) => state.clearAllData);

  const [tightBorder, changeTightBorder] = useSettingStore((state) => [
    state.tightBorder,
    state.changeTightBorder,
  ]);

  function clearAllData() {
    clearChatData();
  }

  return (
    <>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Settings.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ClearIcon />}
              onClick={clearAllData}
              bordered
              title={Locale.Settings.Actions.ClearAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<ResetIcon />}
              onClick={resetConfig}
              bordered
              title={Locale.Settings.Actions.ResetAll}
            />
          </div>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => router.back()}
              bordered
              title={Locale.Settings.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["settings"]}>
        <List>
          <SettingItem title={Locale.Settings.SendKey}>
            <select
              value={config.submitKey}
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.submitKey = e.target.value as any as SubmitKey)
                );
              }}
            >
              {Object.values(SubmitKey).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </SettingItem>

          <ListItem>
            <div className={styles["settings-title"]}>
              {Locale.Settings.Theme}
            </div>
            <select
              value={config.theme}
              onChange={(e) => {
                updateConfig(
                  (config) => (config.theme = e.target.value as any as Theme)
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
              checked={tightBorder}
              onChange={(e) => {
                changeTightBorder(e.currentTarget.checked);
                // updateConfig(
                //   (config) => (config.tightBorder = e.currentTarget.checked)
                // );
              }}
            ></input>
          </SettingItem>
        </List>

        <List>
          <SettingItem
            title={Locale.Settings.HistoryCount.Title}
            subTitle={Locale.Settings.HistoryCount.SubTitle}
          >
            <input
              type="range"
              title={config.historyMessageCount.toString()}
              value={config.historyMessageCount}
              min="2"
              max="25"
              step="2"
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.historyMessageCount = e.target.valueAsNumber)
                )
              }
            ></input>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.CompressThreshold.Title}
            subTitle={Locale.Settings.CompressThreshold.SubTitle}
          >
            <input
              type="number"
              min={500}
              max={4000}
              value={config.compressMessageLengthThreshold}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.compressMessageLengthThreshold =
                      e.currentTarget.valueAsNumber)
                )
              }
            ></input>
          </SettingItem>
        </List>

        <List>
          <SettingItem title={Locale.Settings.Model}>
            <select
              value={config.modelConfig.model}
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.modelConfig.model = e.currentTarget.value as Model)
                );
              }}
            >
              {ALL_MODELS.map((v) => (
                <option value={v.name} key={v.name} disabled={!v.available}>
                  {v.name}
                </option>
              ))}
            </select>
          </SettingItem>

          <SettingItem
            title={Locale.Settings.Temperature.Title}
            subTitle={Locale.Settings.Temperature.SubTitle}
          >
            <input
              type="range"
              value={config.modelConfig.temperature.toFixed(1)}
              min="0"
              max="1"
              step="0.1"
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.modelConfig.temperature =
                      e.currentTarget.valueAsNumber)
                );
              }}
            ></input>
          </SettingItem>
          <SettingItem
            title={Locale.Settings.MaxTokens.Title}
            subTitle={Locale.Settings.MaxTokens.SubTitle}
          >
            <input
              type="number"
              min={100}
              max={4096}
              value={config.modelConfig.max_tokens}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.modelConfig.max_tokens =
                      e.currentTarget.valueAsNumber)
                )
              }
            ></input>
          </SettingItem>
          <SettingItem
            title={Locale.Settings.PresencePenlty.Title}
            subTitle={Locale.Settings.PresencePenlty.SubTitle}
          >
            <input
              type="range"
              value={config.modelConfig.presence_penalty.toFixed(1)}
              min="-2"
              max="2"
              step="0.5"
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.modelConfig.presence_penalty =
                      e.currentTarget.valueAsNumber)
                );
              }}
            ></input>
          </SettingItem>
        </List>
      </div>
    </>
  );
}
