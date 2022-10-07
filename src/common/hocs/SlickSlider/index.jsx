import React, { memo } from "react";
import Slider from "react-slick";

function SlickSlider({ settings, children, className }) {
  return (
    <Slider className={className} {...settings}>
      {children}
    </Slider>
  );
}

export default memo(SlickSlider);
