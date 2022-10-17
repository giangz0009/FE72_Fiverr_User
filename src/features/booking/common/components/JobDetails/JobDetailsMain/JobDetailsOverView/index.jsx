import BasicRating from "common/components/BasicRatting";
import React, { memo } from "react";

import styles from "./styles.module.scss";

function JobDetailsOverView({ jobDetailsData }) {
  const { tenCongViec, hinhAnh, saoCongViec, danhGia, maChiTietLoaiCongViec } =
    jobDetailsData.congViec;
  const { tenNguoiTao, avatar } = jobDetailsData;
  const randomLevel = Math.floor(Math.random() * 2) + 1;

  return (
    <div className={styles.jobDetailsOverView} name="jobDetailsOverView">
      <h1>{tenCongViec}</h1>
      <div className={styles.seller}>
        <div className={styles.img}>
          <img src={avatar} alt={tenNguoiTao} />
        </div>
        <div className={styles.info}>
          <div>
            <h3>{tenNguoiTao}</h3>
            <span>Level {randomLevel} Seller</span>
          </div>
          <div>
            <BasicRating initialValue={saoCongViec} size="small" />
            <span>{saoCongViec}</span>
            <span>({danhGia})</span>
            <span>{maChiTietLoaiCongViec} Orders in Queue</span>
          </div>
        </div>
      </div>
      <div className={styles.product}>
        <img src={hinhAnh} alt="Product" />
      </div>
    </div>
  );
}

export default memo(JobDetailsOverView);
