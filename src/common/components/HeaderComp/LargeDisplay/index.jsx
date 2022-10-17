import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "common/components/Logo";
import React, { memo, useState } from "react";
import SubMenu from "../SubMenu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import instance from "app/instance";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";

import lodashIsEmpty from "lodash.isempty";

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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.slice(0, 1).toUpperCase()}`,
  };
}

function LargeDisplay({ pages, settings }) {
  const [searchList, setSearchList] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const navigate = useNavigate();

  let timeOut = null;

  const handleOnInputKeyUp = (e) => {
    const searchValue = e.target.value.trim();

    if (searchValue !== "") {
      clearTimeout(timeOut);

      timeOut = setTimeout(async () => {
        try {
          const res = await instance.request({
            url:
              "/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/" + searchValue,
            method: "GET",
          });

          setSearchList(res.data.content);
        } catch (error) {
          console.log(error);
        }
      }, 600);
    } else {
      setSearchList([]);
    }
  };

  const handleOnInputKeyDown = (e) => {
    const key = e.key;

    if (key === "Enter") {
      navigate(`search/name/${e.target.value}`);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const renderSettingBlock = () => {
    const { avatar } = authProfile;
    if (lodashIsEmpty(authProfile))
      return settings.map((setting, index) => (
        <Button
          key={index}
          sx={{ py: 2, color: "white", display: "block" }}
          onClick={setting.handleOnClick}
        >
          {setting.label}
        </Button>
      ));

    return (
      <>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="largeDisplayAvatarImage"
            />
          ) : (
            <Avatar
              alt={settings[0].label}
              {...stringAvatar(`${settings[0].label}`)}
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
              }}
            />
          )}
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={setting.handleOnClick}>
                {setting.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

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
          id="blur-on-select"
          options={searchList}
          blurOnSelect
          noOptionsText="No options"
          getOptionLabel={(option) => option.congViec.tenCongViec}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.congViec.id;
          }}
          renderOption={(props, option, { inputValue }) => {
            props.key = option.congViec.id;
            return (
              <li {...props}>
                <Highlighter
                  onClick={() =>
                    navigate(`search/name/${option.congViec.tenCongViec}`)
                  }
                  highlightClassName="YourHighlightClass"
                  searchWords={[inputValue]}
                  autoEscape={true}
                  textToHighlight={option.congViec.tenCongViec}
                />
              </li>
            );
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <input
                  placeholder="Search…"
                  type="text"
                  onKeyUp={handleOnInputKeyUp}
                  onKeyDown={handleOnInputKeyDown}
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
        {renderSettingBlock()}
      </Box>
    </Toolbar>
  );
}

export default memo(LargeDisplay);
