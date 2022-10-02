import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";

import "./globalStyles.scss";

function SubMenu({ page }) {
  return (
    <Box key={page.id} className={clsx("headerMainNavPage")}>
      <Tooltip
        className="headerMainNavPageItem"
        arrow
        placement="bottom"
        title={
          <Box className="headerMainSubMenu">
            {page.items.map((item, index) => (
              <Box className="headerMainSubMenuItem" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <Typography>{item.desc}</Typography>
                </div>
              </Box>
            ))}
          </Box>
        }
      >
        <Box>
          {page.title}
          <KeyboardArrowDownIcon />
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SubMenu;
