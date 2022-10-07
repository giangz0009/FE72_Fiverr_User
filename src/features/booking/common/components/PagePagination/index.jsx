import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

function PagePagination({ pageConfig, setPageConfig }) {
  const navigate = useNavigate();

  const handleOnChangePage = (e, value) => {
    setPageConfig((prevState) => ({ ...prevState, currPage: value }));
    navigate(`?page=${value}`);
  };

  const renderPagination = () => {
    if (!pageConfig.totalCount) return;

    return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        defaultPage={+pageConfig.currPage}
        count={pageConfig.totalCount}
        onChange={handleOnChangePage}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    );
  };

  return (
    <Stack spacing={2} marginTop={2}>
      {renderPagination()}
    </Stack>
  );
}

export default memo(PagePagination);
