import React, { memo } from "react";
import Slider from "react-slick";

function SlickSlider({ settings, children }) {
  return <Slider {...settings}>{children}</Slider>;
}

export default memo(SlickSlider);
