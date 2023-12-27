import Image from 'next/image';

import BotIcon from '@/icons/bot.svg';
import LoadingIcon from '@/icons/three-dots.svg';
import styles from '@/styles/module/home.module.scss';

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles['loading-content']}>
      {!props.noLogo &&
        (process.env.LOGO_LOADING ? (
          <Image
            src={process.env.LOGO_LOADING}
            alt="logo"
            width="100"
            height="100"
          />
        ) : (
          <BotIcon />
        ))}
      <LoadingIcon />
    </div>
  );
}
