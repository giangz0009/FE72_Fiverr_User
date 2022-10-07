import Grid from "@mui/material/Unstable_Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";

import React, { memo } from "react";

import styles from "./styles.module.scss";
import BasicRating from "common/components/BasicRatting";

function JobItem({ job }) {
  const { hinhAnh, moTaNgan, tenCongViec, danhGia, saoCongViec, giaTien } =
    job.congViec;
  const { avatar, tenNguoiTao } = job;

  return (
    <Grid xs={6} sm={4} lg={3}>
      <div className={styles.jobItem}>
        <header className={styles.header}>
          <img src={hinhAnh} alt="job desc" />
        </header>
        <main className={styles.main}>
          <div className={styles.creator}>
            <img src={avatar} alt="creator" />
            <div>
              <h3>{tenNguoiTao}</h3>
              <p>{tenCongViec}</p>
            </div>
          </div>
          <div className={styles.job}>
            <p>{moTaNgan}</p>
            <div>
              <BasicRating initialValue={saoCongViec} size="small" />
              <span>({danhGia})</span>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <FavoriteIcon />
          <p>
            STARTING AT <span>${giaTien}</span>
          </p>
        </footer>
      </div>
    </Grid>
  );
}

export default memo(JobItem);
