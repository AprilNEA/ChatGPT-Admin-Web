import React from "react";
import styles from "@/styles/module/banner.module.scss";
import Image from "next/image";
import Link from "next/link";
// import BannerImage from "@/assets/banner.png";
// import PostImage from "@/assets/post.png"

const Banner = () => {
  return (
    <div className={styles["banner"]}>
      <Link href="#">{/*<Image src={BannerImage} alt="banner"/>*/}</Link>
    </div>
  );
};

export const Post = () => {
  return (
    <></>
    // <Image src={PostImage} alt="banner" width={400} height={400}/>
  );
};

export default Banner;
