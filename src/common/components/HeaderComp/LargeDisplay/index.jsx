import { Autocomplete, Box, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "common/components/Logo";
import React, { memo } from "react";
import SubMenu from "../SubMenu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function LargeDisplay({ pages, settings }) {
  return (
    <Toolbar disableGutters>
      <Logo />

      <Box
        className="headerMainSearch"
        justifyContent="flex-start"
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mr: 3 }}
      >
        <Autocomplete
          sx={{
            display: "inline-block",
            "& input": {
              width: 200,
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          id="custom-input-demo"
          options={[]}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <input
                  placeholder="Search…"
                  type="text"
                  {...params.inputProps}
                />
              </Search>
            </div>
          )}
        />
      </Box>

      <Box
        className="headerMainNavPages"
        justifyContent="flex-end"
        sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
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
