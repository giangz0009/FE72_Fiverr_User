import { Container } from "@mui/material";

import { Link } from "react-scroll";

import React from "react";

import styles from "./styles.module.scss";

function JobDetailsTopNav() {
  return (
    <div className={styles.jobDetailsTopNavWrapper}>
      <Container maxWidth="xl">
        <div className={styles.jobDetailsTopNav}>
          <Link
            activeClass={styles.active}
            to="jobDetailsOverView"
            spy={true}
            offset={-100}
          >
            Overview
          </Link>
          <Link
            activeClass={styles.active}
            to="jobDetailsAbout"
            spy={true}
            offset={-50}
          >
            Description
          </Link>
          <Link
            activeClass={styles.active}
            to="jobDetailsSeller"
            spy={true}
            offset={-20}
          >
            About the Seller
          </Link>
          <Link
            activeClass={styles.active}
            to="jobDetailsFAQ"
            spy={true}
            offset={-20}
          >
            FAQ
          </Link>
          <Link
            activeClass={styles.active}
            to="jobDetailsReview"
            spy={true}
            offset={-20}
          >
            Reviews
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default JobDetailsTopNav;
