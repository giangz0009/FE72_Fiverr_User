import React, { useRef } from "react";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import imgBanner1 from "assets/images/banners/graphics-design-desktop.png";
import imgBanner2 from "assets/images/banners/digital-marketing-desktop.png";
import imgBanner3 from "assets/images/banners/writing_translation.png";
import imgBanner4 from "assets/images/banners/Video_Animation.png";
import imgBanner5 from "assets/images/banners/music-audio-desktop.png";

import styles from "./styles.module.scss";
import VideoModal from "common/hocs/VideoModal";

const srcVideo =
  "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd_nl/v1/video-attachments/generic_asset/asset/ab0907217c9f9a2c1d2eee677beb7619-1626082923646/how_fiverr_works";

const bannersList = [
  {
    id: 1,
    img: imgBanner1,
    title: "Graphics & Design",
    sub: "Designs to make you stand out.",
  },
  {
    id: 2,
    img: imgBanner2,
    title: "Digital Marketing",
    sub: "Get your words across—in any language.",
  },
  {
    id: 3,
    img: imgBanner3,
    title: "Writing & Translation",
    sub: "Designs to make you stand out.",
  },
  {
    id: 4,
    img: imgBanner4,
    title: "Video & Animation",
    sub: "Bring your story to life with creative videos.",
  },
  {
    id: 5,
    img: imgBanner5,
    title: "Music & Audio",
    sub: "Don't miss a beat. Bring your sound to life.",
  },
];

function HerosBanner({ jobTypeId }) {
  const refVideoModal = useRef();

  const mainBanner = bannersList.find((banner) => banner.id === +jobTypeId);

  if (!mainBanner) return <></>;

  const { title, sub, img } = mainBanner;

  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className={styles.herosBannerWrapper}
    >
      <div className={styles.HerosBanner}>
        <h3>{title}</h3>
        <p>{sub}</p>
        <button onClick={() => refVideoModal.current.open()}>
          <PlayCircleIcon />
          How Fiverr works
        </button>
      </div>
      <VideoModal ref={refVideoModal} src={srcVideo} />
    </div>
  );
}

export default HerosBanner;
