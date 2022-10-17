import { Slider } from "@mui/material";
import React from "react";

import "./globalStyles.scss";

function BasicSliderRatting({ initialValue }) {
  return (
    <Slider
      className="basicSliderRatting"
      disabled
      defaultValue={initialValue}
      max={5}
      aria-label="Disabled slider"
    />
  );
}

export default BasicSliderRatting;
