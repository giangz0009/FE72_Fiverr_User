import { Box, Button, Toolbar, Typography } from "@mui/material";
import Logo from "common/components/Logo";
import React, { memo } from "react";
import SubMenu from "../SubMenu";

function LargeDisplay({ pages, settings }) {
  return (
    <Toolbar disableGutters>
      <Logo />

      <Box
        className="headerMainNavPages"
        justifyContent="flex-end"
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 3 }}
      >
        {pages.map((page) => {
          if (page.items) return <SubMenu key={page.id} page={page} />;
          return (
            <Typography
              key={page.id}
              sx={{ py: 2, color: "white", display: "block", fontSize: 16 }}
            >
              {page.title}
            </Typography>
          );
        })}
      </Box>
      <Box
        className="headerMainSettings"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {settings.map((setting) => (
          <Button
            key={setting}
            sx={{ py: 2, color: "white", display: "block" }}
          >
            {setting}
          </Button>
        ))}
      </Box>
    </Toolbar>
  );
}

export default memo(LargeDisplay);
