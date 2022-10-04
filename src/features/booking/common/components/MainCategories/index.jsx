import { Container } from "@mui/material";
import React from "react";

import "./globalStyle.scss";

import img1 from "assets/images/icons/graphics-design.d32a2f8.svg";
import img2 from "assets/images/icons/online-marketing.74e221b.svg";
import img3 from "assets/images/icons/writing-translation.32ebe2e.svg";
import img4 from "assets/images/icons/video-animation.f0d9d71.svg";
import img5 from "assets/images/icons/music-audio.320af20.svg";
import img6 from "assets/images/icons/programming.9362366.svg";
import img7 from "assets/images/icons/business.bbdf319.svg";
import img8 from "assets/images/icons/lifestyle.745b575.svg";
import img9 from "assets/images/icons/data.718910f.svg";

const list = [
  {
    content: "Graphics & Design",
    link: "https://www.fiverr.com/categories/graphics-design?source=hplo_cat_sec&pos=1",
    img: img1,
  },
  {
    content: "Digital Marketing",
    link: "https://www.fiverr.com/categories/online-marketing?source=hplo_cat_sec&pos=2",
    img: img2,
  },
  {
    content: "Writing & Translation",
    link: "https://www.fiverr.com/categories/writing-translation?source=hplo_cat_sec&pos=3",
    img: img3,
  },
  {
    content: "Video & Animation",
    link: "https://www.fiverr.com/categories/video-animation?source=hplo_cat_sec&pos=4",
    img: img4,
  },
  {
    content: "Music & Audio",
    link: "https://www.fiverr.com/categories/music-audio?source=hplo_cat_sec&pos=5",
    img: img5,
  },
  {
    content: "Programming & Tech",
    link: "https://www.fiverr.com/categories/programming-tech?source=hplo_cat_sec&pos=6",
    img: img6,
  },
  {
    content: "Business",
    link: "https://www.fiverr.com/categories/business?source=hplo_cat_sec&pos=7",
    img: img7,
  },
  {
    content: "Lifestyle",
    link: "https://www.fiverr.com/categories/lifestyle?source=hplo_cat_sec&pos=8",
    img: img8,
  },
  {
    content: "Data",
    link: "https://www.fiverr.com/categories/data?source=hplo_cat_sec&pos=9",
    img: img9,
  },
];

function MainCategories() {
  return (
    <div className="mainCategoriesWrapper">
      <Container maxWidth="lg">
        <div className="mainCategories">
          <h3>Explore the marketplace</h3>
          <ul className="categoriesList">
            {list.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noreferrer">
                  <div>
                    <img src={item.img} alt="Icon" />
                  </div>
                  {item.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default MainCategories;
