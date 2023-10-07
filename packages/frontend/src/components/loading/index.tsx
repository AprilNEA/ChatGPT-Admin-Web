import styles from "@/styles/module/home.module.scss";
import BotIcon from "@/icons/bot.svg";
import LoadingIcon from "@/icons/three-dots.svg";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}
