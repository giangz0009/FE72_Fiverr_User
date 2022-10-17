import React from "react";
import SellerCard from "./SellerCard";
import SellerSegmentation from "./SellerSegmantation";

import styles from "./styles.module.scss";

function UserProfileMain() {
  return (
    <div className={styles.userProfileMain}>
      <SellerCard />
      <SellerSegmentation />
    </div>
  );
}

export default UserProfileMain;
