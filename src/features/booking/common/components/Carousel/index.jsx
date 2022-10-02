import React from "react";
import Slider from "react-slick";
import SearchIcon from "@mui/icons-material/Search";

import carouselImg1 from "assets/images/carousels/bg-hero-1-1792-x1.jpg";
import carouselImg2 from "assets/images/carousels/bg-hero-2-1792-x1.jpg";
import carouselImg3 from "assets/images/carousels/bg-hero-3-1792-x1.jpg";
import carouselImg4 from "assets/images/carousels/bg-hero-4-1792-x1.jpg";
import carouselImg5 from "assets/images/carousels/bg-hero-5-1792-x1.jpg";
import { Autocomplete } from "@mui/material";

import "./globalStyle.scss";
import { Container } from "@mui/system";

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
  };

  const popularList = [
    "Website Design",
    "WordPress",
    "Logo Design",
    "Video Editing",
  ];

  const herosList = [
    {
      name: "Andrea",
      career: "Fashion Designer",
      img: carouselImg1,
    },
    {
      name: "Moon",
      career: "Marketing Expert",
      img: carouselImg2,
    },
    {
      name: "Ritika",
      career: "Shoemaker and Designer",
      img: carouselImg3,
    },
    {
      name: "Zach",
      career: "Bar Owner",
      img: carouselImg4,
    },
    {
      name: "Gabrielle",
      career: "Video Editor",
      img: carouselImg5,
    },
  ];

  return (
    <div className="carousel">
      <Slider className="carouselBackground" {...settings}>
        {herosList.map((hero, index) => (
          <div key={index}>
            <div
              className="carouselBackgroundItem"
              style={{ backgroundImage: `url(${hero.img})` }}
            >
              <Container maxWidth="lg">
                <p>
                  {hero.name}
                  <b> {hero.career}</b>
                </p>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
      <Container className="carouselContent" maxWidth="lg">
        <div className="carouselContentWrap">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="searchInput">
            <label>
              <SearchIcon />
              <Autocomplete
                sx={{
                  display: "inline-block",
                  "& input": {
                    width: 200,
                    bgcolor: "background.paper",
                    color: (theme) =>
                      theme.palette.getContrastText(
                        theme.palette.background.paper
                      ),
                  },
                }}
                id="custom-input-demo"
                options={[]}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      placeholder='Try "building mobile app"'
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </label>
            <button>Search</button>
          </div>
          <div className="popularSearch">
            <span>Popular:</span>
            <div className="list">
              {popularList.map((item, index) => (
                <button key={index}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Carousel;
