import { CircularProgress, Stack } from "@mui/material";
import React from "react";

function LoadingPage() {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="success" />
    </Stack>
  );
}

export default LoadingPage;
