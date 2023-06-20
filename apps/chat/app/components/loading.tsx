import styles from "@/app/components/home/home.module.scss";
import BotIcon from "@/app/icons/bot.svg";
import LoadingIcon from "@/app/icons/three-dots.svg";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}
