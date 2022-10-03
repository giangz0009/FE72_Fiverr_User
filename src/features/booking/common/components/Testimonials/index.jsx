import { Container } from "@mui/material";
import SlickSlider from "common/hocs/SlickSlider";
import React, { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import companyLogo1 from "assets/images/company-name/naadam-logo-x2.0a3b198.png";
import companyLogo2 from "assets/images/company-name/haerfest-logo-x2.03fa5c5.png";
import companyLogo3 from "assets/images/company-name/rooted-logo-x2.321d79d.png";
import companyLogo4 from "assets/images/company-name/lavender-logo-x2.89c5e2e.png";

import img1 from "assets/images/testimonials/testimonial-video-still-naadam.jpg";
import img2 from "assets/images/testimonials/testimonial-video-still-haerfest.jpg";
import img3 from "assets/images/testimonials/testimonial-video-still-rooted.jpg";
import img4 from "assets/images/testimonials/testimonial-video-still-lavender.jpg";

import "./globalStyle.scss";
import VideoModal from "common/hocs/VideoModal";

const sliders = [
  {
    img: img1,
    name: "Caitlin Tormey, Chief Commercial Officer",
    desc: "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day.",
    companyLogo: companyLogo1,
    src: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl",
  },
  {
    img: img4,
    name: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
    desc: "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.",
    companyLogo: companyLogo4,
    src: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi",
  },
  {
    img: img2,
    name: "Tim and Dan Joo, Co-Founders",
    desc: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.",
    companyLogo: companyLogo2,
    src: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun",
  },
  {
    img: img3,
    name: "Caitlin Tormey, Chief Commercial Officer",
    desc: "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day.",
    companyLogo: companyLogo3,
    src: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw",
  },
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <NavigateNextIcon />
    </button>
  );
};

const PrevButton = (props) => {
  const { className, style, onClick } = props;

  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <NavigateBeforeIcon />
    </button>
  );
};

function Testimonials() {
  const [activeSrc, setActiveSrc] = useState("");

  const refModalVideo = useRef();

  const settings = {
    className: "slider",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevButton />,
  };

  const handleOpenVideoModal = (src) => {
    setActiveSrc(src);

    refModalVideo.current.open();
  };

  const renderSlickSlide = () => {
    return sliders.map((slide, index) => (
      <div className="testimonial" key={index}>
        <div
          className="videoModal"
          onClick={() => handleOpenVideoModal(slide.src)}
        >
          <img src={slide.img} alt="Video Modal" />
          <button onClick={() => handleOpenVideoModal(slide.src)}>
            <PlayArrowIcon />
          </button>
        </div>
        <div className="content">
          <h6>
            {slide.name}{" "}
            <span>
              <img src={slide.companyLogo} alt="logo" />
            </span>
          </h6>
          <p>
            <i>{`"${slide.desc}"`}</i>
          </p>
        </div>
      </div>
    ));
  };
  return (
    <div className="testimonials">
      <Container maxWidth="lg">
        <SlickSlider settings={settings}>{renderSlickSlide()}</SlickSlider>
      </Container>
      <VideoModal ref={refModalVideo} src={activeSrc} />
    </div>
  );
}

export default Testimonials;
