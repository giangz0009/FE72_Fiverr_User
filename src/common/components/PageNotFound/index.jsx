import { Container } from "@mui/system";
import React from "react";

import styles from "./styles.module.scss";

import image from "assets/images/404/404-error-template-3.webp";

function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <Container maxWidth="xl">
        <img src={image} alt="Not Found" />
      </Container>
    </div>
  );
}

export default PageNotFound;
