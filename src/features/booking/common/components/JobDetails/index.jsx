import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import JobDetailsTopNav from "./JobDetailsTopNav";

import styles from "./styles.module.scss";

function JobDetails() {
  return (
    <StickyContainer className={styles.jobDetails}>
      <Sticky>
        {({ style }) => (
          <div style={style} className={styles.jobNav}>
            <JobDetailsTopNav />
          </div>
        )}
      </Sticky>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </StickyContainer>
  );
}

export default JobDetails;
