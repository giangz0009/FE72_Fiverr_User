import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";

import "./globalStyles.scss";

function SubMenu({ page }) {
  const [anchorElNavItem, setAnchorElNavItem] = React.useState(null);

  const handleOpenNavItem = (event) => {
    setAnchorElNavItem(event.currentTarget);
  };

  const handleCloseNavMenuItem = () => {
    setAnchorElNavItem(null);
  };

  return (
    <Box
      key={page.id}
      className={clsx("headerMainNavPage", {
        dropDown: Boolean(anchorElNavItem),
      })}
    >
      <Typography
        aria-controls={`page-app-bar-${page.id}`}
        aria-haspopup="true"
        onClick={handleOpenNavItem}
        sx={{ p: 2, px: 3, color: "white", display: "block", fontSize: 16 }}
      >
        {page.title}
        <KeyboardArrowDownIcon />
      </Typography>
      <Menu
        className="headerMainSubMenu"
        id={`page-app-bar-${page.id}`}
        anchorEl={anchorElNavItem}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElNavItem)}
        onClose={handleCloseNavMenuItem}
      >
        {page.items.map((item, index) => (
          <MenuItem key={index} onClick={handleCloseNavMenuItem}>
            <div>
              <h3>{item.title}</h3>
              <Typography>{item.desc}</Typography>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default SubMenu;
