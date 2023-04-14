import React from 'react';
import styles from '@/styles/module/Banner.module.scss';
import Image from 'next/image'
import Link from "next/link";
import BannerImage from "@/assets/banner.png";
import {inspect} from "util";

const Banner = () => {
  return (
    <div className={styles["banner"]}>
      <Link href="https://mp.weixin.qq.com/s/Mu1YnELjD31eRXvDO3qskA">
      <Image src={BannerImage} alt="banner"/>
      </Link>
    </div>
  );
};

export default Banner;
