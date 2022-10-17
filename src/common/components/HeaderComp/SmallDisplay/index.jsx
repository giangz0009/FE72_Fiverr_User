import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LodashIsEmpty from "lodash.isempty";
import SearchIcon from "@mui/icons-material/Search";

import React, { memo, useState } from "react";
import Logo from "common/components/Logo";

import "./globalStyle.scss";
import { useNavigate } from "react-router-dom";
import instance from "app/instance";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";

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

function SmallDisplay({ settings, pages, browseCategories }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pageExpended, setPageExpended] = useState(false);
  const [categoriesExpended, setCategoriesExpended] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const authProfile = useSelector((state) => state.authReducer.authProfile);

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

  const handleChangePageExpended = (panel) => (event, isExpanded) => {
    setPageExpended(isExpanded ? panel : false);
  };
  const handleChangeCategoriesExpended = (panel) => (event, isExpanded) => {
    setCategoriesExpended(isExpanded ? panel : false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (anchor, open, link) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if (link) navigate(link);
  };

  const renderAccordion = (page, anchor) => (
    <Accordion
      expanded={pageExpended === page.title}
      onChange={handleChangePageExpended(page.title)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{page.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {page.items.map((item, index) => (
          <Typography key={index} onClick={toggleDrawer(anchor, false)}>
            {item.title}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );

  const renderBrowseCatergories = (anchor) => {
    if (!browseCategories) return;

    return (
      <ListItem disablePadding>
        <ListItemButton>
          <Accordion
            expanded={pageExpended === "categories"}
            onChange={handleChangePageExpended("categories")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Browse Categories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {browseCategories.map(
                (category, index) =>
                  !LodashIsEmpty(category.list) && (
                    <Accordion
                      key={index}
                      expanded={categoriesExpended === category.title}
                      onChange={handleChangeCategoriesExpended(category.title)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{category.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {category.list.map((item, index) => (
                          <Typography
                            key={index}
                            onClick={toggleDrawer(
                              anchor,
                              false,
                              `/search/categories/${item.id}`
                            )}
                          >
                            {item.tenChiTiet}
                          </Typography>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  )
              )}
            </AccordionDetails>
          </Accordion>
        </ListItemButton>
      </ListItem>
    );
  };

  const list = (anchor) => (
    <Box
      className="headerNavPageSmallMenuWrap"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo color="#62646a" />
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.id} disablePadding>
            <ListItemButton>
              {!page.items ? (
                <ListItemText
                  primary={page.title}
                  onClick={toggleDrawer(anchor, false)}
                />
              ) : (
                renderAccordion(page, anchor)
              )}
            </ListItemButton>
          </ListItem>
        ))}
        {renderBrowseCatergories(anchor)}
      </List>
    </Box>
  );

  return (
    <Toolbar disableGutters>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          onClick={toggleDrawer("left", true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className="headerNavPageSmallMenu"
          anchor="left"
          open={state.left}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: { xs: 1, sm: "unset" },
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
        display="flex"
      >
        <Logo />
      </Box>
      <Box
        className="headerNavSmallSearch"
        sx={{
          flexGrow: 1,
          justifyContent: "flex-start",
        }}
        display="flex"
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
            <div
              className="headerNavSmallSearchInputWrapper"
              ref={params.InputProps.ref}
            >
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
      <Box sx={{ flexGrow: 0 }} className="smallDisplaySettings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {LodashIsEmpty(authProfile) ? (
            <Avatar
              alt={settings[0].label}
              {...stringAvatar(`${settings[0].label}`)}
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
              }}
            />
          ) : (
            <img src={authProfile.avatar} alt="Avatar" />
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
      </Box>
    </Toolbar>
  );
}

export default memo(SmallDisplay);
