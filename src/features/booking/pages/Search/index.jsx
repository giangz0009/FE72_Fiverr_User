import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

function Search() {
  return (
    <div className={styles.search}>
      <Outlet />
    </div>
  );
}

export default Search;
