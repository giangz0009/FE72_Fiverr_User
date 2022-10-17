import Grid from "@mui/material/Unstable_Grid2";

import lodashIsEmpty from "lodash.isempty";

import React, { memo } from "react";
import JobItem from "../JobItem";

function JobsList({ jobsList }) {
  // render functions
  const renderJobsList = () => {
    if (lodashIsEmpty(jobsList)) return <h3>Không tìm thấy dữ liệur</h3>;

    return jobsList.map((job, index) => {
      return <JobItem job={job} key={index} />;
    });
  };

  return (
    <Grid container spacing={3}>
      {renderJobsList()}
    </Grid>
  );
}

export default memo(JobsList);
