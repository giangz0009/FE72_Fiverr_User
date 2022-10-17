import Grid from "@mui/material/Unstable_Grid2/Grid2";
import GradeIcon from "@mui/icons-material/Grade";

import BasicRating from "common/components/BasicRatting";
import React, { memo } from "react";
import BasicSliderRatting from "../BasisSliderRatting";

import "./globalStyles.scss";
import clsx from "clsx";

const JobDetailsReviewRatting = ({
  jobDetailsData,
  commentsData,
  activeRate,
  setActiveRate,
}) => {
  const countAmountRate = (typeRate) =>
    commentsData.filter((comment) => comment.saoBinhLuan === typeRate).length ||
    0;

  const { saoCongViec } = jobDetailsData.congViec;

  const rateAmountList = {
    fiveStars: countAmountRate(5),
    fourStars: countAmountRate(4),
    threeStars: countAmountRate(3),
    twoStars: countAmountRate(2),
    oneStar: countAmountRate(1),
  };

  const { fiveStars, fourStars, threeStars, twoStars, oneStar } =
    rateAmountList;

  const handleChangeFilterRate = (rate, amount) => {
    if (amount !== 0) {
      if (activeRate === rate) setActiveRate(null);
      else setActiveRate(rate);
    }
  };

  const renderRatting = () => {
    return (
      <ul className="left">
        <li
          className={clsx({
            selected: activeRate === 5,
            disable: fiveStars === 0,
          })}
          onClick={() => handleChangeFilterRate(5, fiveStars)}
        >
          <button>5 Starts</button>
          <BasicSliderRatting initialValue={5} />
          <span>({fiveStars})</span>
        </li>
        <li
          className={clsx({
            selected: activeRate === 4,
            disable: fourStars === 0,
          })}
          onClick={() => handleChangeFilterRate(4, fourStars)}
        >
          <button>4 Starts</button>
          <BasicSliderRatting initialValue={4} />
          <span>({fourStars})</span>
        </li>
        <li
          className={clsx({
            selected: activeRate === 3,
            disable: threeStars === 0,
          })}
          onClick={() => handleChangeFilterRate(3, threeStars)}
        >
          <button>3 Starts</button>
          <BasicSliderRatting initialValue={3} />
          <span>({threeStars})</span>
        </li>
        <li
          className={clsx({
            selected: activeRate === 2,
            disable: twoStars === 0,
          })}
          onClick={() => handleChangeFilterRate(2, twoStars)}
        >
          <button>2 Starts</button>
          <BasicSliderRatting initialValue={2} />
          <span>({twoStars})</span>
        </li>
        <li
          className={clsx({
            selected: activeRate === 1,
            disable: oneStar === 0,
          })}
          onClick={() => handleChangeFilterRate(1, oneStar)}
        >
          <button>1 Start</button>
          <BasicSliderRatting initialValue={1} />
          <span>({oneStar})</span>
        </li>
      </ul>
    );
  };

  return (
    <div className="jobDetailsReviewRatting">
      <div className="heading">
        <h3>{commentsData.length} Reviews </h3>
        <BasicRating initialValue={saoCongViec} size="small" />
        <span className="rattingAmount">{saoCongViec}</span>
      </div>
      <div className="main">
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            {renderRatting()}
          </Grid>
          <Grid xs={12} md={6}>
            <div className="right">
              <h3>Rating Breakdown</h3>
              <ul>
                <li>
                  Seller communication level
                  <span>
                    <GradeIcon />
                    4.9
                  </span>
                </li>
                <li>
                  Recommend to a friend
                  <span>
                    <GradeIcon />
                    4.9
                  </span>
                </li>
                <li>
                  Service as described
                  <span>
                    <GradeIcon />
                    4.9
                  </span>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default memo(JobDetailsReviewRatting);
