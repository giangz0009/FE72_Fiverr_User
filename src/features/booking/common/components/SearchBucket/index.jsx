import Grid from "@mui/material/Unstable_Grid2";
import EastIcon from "@mui/icons-material/East";

import React, { memo } from "react";
import lodashIsEmpty from "lodash.isempty";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

function SearchBucket({ data }) {
  const renderData = () =>
    data.dsNhomChiTietLoai.map((item) => {
      return (
        <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
          <div className={styles.item}>
            <img src={item.hinhAnh} alt={item.tenNhom} />
            <div className={styles.content}>
              <h3>{item.tenNhom}</h3>
              <ul>
                {item.dsChiTietLoai.map((itemChild) => (
                  <li key={itemChild.id}>
                    <Link to={`${itemChild.id}`}>
                      {itemChild.tenChiTiet}
                      <EastIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Grid>
      );
    });

  if (lodashIsEmpty(data)) return <></>;

  return (
    <div className={styles.bucketWrapper}>
      <h2>Explore {data.tenLoaiCongViec}</h2>
      <div className={styles.bucket}>
        <Grid container spacing={3}>
          {renderData()}
        </Grid>
      </div>
    </div>
  );
}

export default memo(SearchBucket);
