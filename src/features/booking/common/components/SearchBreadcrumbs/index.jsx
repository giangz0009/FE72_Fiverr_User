import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { memo } from "react";

function SearchBreadcrumbs({ breadcrumbsLinkList }) {
  return (
    <div role="presentation" style={{ marginBottom: 16 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbsLinkList.map((list, index) =>
          !list.link ? (
            <Typography key={index} color="text.primary">
              {list.content}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={list.link}
            >
              {list.content}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}

export default memo(SearchBreadcrumbs);
