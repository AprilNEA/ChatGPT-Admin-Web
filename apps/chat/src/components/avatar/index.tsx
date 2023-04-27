import { Message, useSettingStore } from "@/store";
import BotIcon from "@/assets/icons/bot.svg";
import styles from "@/styles/module/home.module.scss";
import dynamic from "next/dynamic";
import LoadingIcon from "@/assets/icons/three-dots.svg";

const Emoji = dynamic(async () => (await import("emoji-picker-react")).Emoji, {
  loading: () => <LoadingIcon />,
});

/**
 * Emoji 头像
 * @param props
 * @constructor
 */
export function Avatar(props: { role: Message["role"] }) {
  const config = useSettingStore((state) => state.config);

  if (props.role === "assistant") {
    return <BotIcon className={styles["user-avtar"]} />;
  }

  return (
    <div className={styles["user-avtar"]}>
      <Emoji unified={config.avatar} size={18} />
    </div>
  );
}
