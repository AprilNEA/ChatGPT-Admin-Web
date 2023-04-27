import styles from "@/styles/module/home.module.scss";
import BotIcon from "@/assets/icons/bot.svg";
import LoadingIcon from "@/assets/icons/three-dots.svg";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}
