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
          options={[]}
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
                  {...params.inputProps}
                />
              </Search>
            </div>
          )}
        />
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
            sx={{
              width: { xs: 30, sm: 40 },
              height: { xs: 30, sm: 40 },
            }}
          />
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  );
}

export default memo(SmallDisplay);
