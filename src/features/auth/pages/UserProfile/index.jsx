import { Container } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";

import React, { useEffect } from "react";
import UserProfileMain from "features/auth/common/components/UserProfileMain";

import styles from "./styles.module.scss";
import UserActive from "features/auth/common/components/UserActive";
import { useSelector } from "react-redux";

import lodashIsEmpty from "lodash.isempty";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const navigate = useNavigate();

  useEffect(() => {
    if (lodashIsEmpty(authProfile)) navigate("/signIn");
  });

  return (
    <div className={styles.userProfile}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <UserProfileMain />
          </Grid>
          <Grid xs={12} md={8}>
            <UserActive />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserProfile;
