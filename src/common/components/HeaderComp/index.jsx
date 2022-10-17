import * as React from "react";
import AppBar from "@mui/material/AppBar";

import lodashIsEmpty from "lodash.isempty";

import "./globalStyles.scss";

import SmallDisplay from "./SmallDisplay";
import LargeDisplay from "./LargeDisplay";
import { useDispatch, useSelector } from "react-redux";
import BrowseCatergories from "./BrowseCatergories";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useWindowSize from "common/hooks/useWindowSize";
import { useLocation, useNavigate } from "react-router-dom";
import { authActionTypes } from "features/auth/action";

const pages = [
  {
    id: 0,
    title: "Fiverr Business",
  },
  {
    id: 1,
    title: "Explore",
    items: [
      {
        title: "Discover",
        desc: "Inspiring projects made on Fiverr",
        path: "https://discover.fiverr.com/?source=explore-tab",
      },
      {
        title: "Community",
        desc: "Connect with Fiverr’s team and community",
        path: "https://events.fiverr.com/?source=explore-tab",
      },
      {
        title: "Guides",
        desc: "In-depth guides covering business topics",
        path: "https://www.fiverr.com/resources/guides?source=explore-tab",
      },
      {
        title: "Podcast",
        desc: "Inside tips from top business minds",
        path: "https://play.acast.com/s/ninetwentynine?source=explore-tab",
      },
      {
        title: "Learn",
        desc: "Professional online courses, led by experts",
        path: "https://learn.fiverr.com/?source=explore-tab",
      },
      {
        title: "Blog",
        desc: "News, information and community stories",
        path: "https://blog.fiverr.com/?source=explore-tab",
      },
      {
        title: "Logo Maker",
        desc: "Create your logo instantly",
        path: "https://www.fiverr.com/logo-maker?source=explore-tab",
      },
      {
        title: "Fiverr Workspace",
        desc: "One place to manage your business",
        path: "https://workspace.fiverr.com/?utm_source=fiverr&utm_medium=marketing_site&utm_content=menu_visitor",
      },
    ],
  },
  {
    id: 2,
    title: "Become a Seller",
  },
];

const HeaderComp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { width } = useWindowSize();

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const [settings, setSettings] = React.useState([
    { label: "Sign In", link: "/signIn" },
    { label: "Join", link: "/signUp" },
  ]);
  const [open, setOpen] = React.useState(false);

  const location = useLocation();
  const isInDetailsJobPath = !!location.pathname.match("/jobDetails");

  const browseCategories = useSelector(
    (state) => state.bookingReducer.menuJobsType
  );

  const remapBrowseCategories = React.useMemo(() => {
    if (!browseCategories) return null;

    return browseCategories.reduce((currValue, nextValue) => {
      const res = nextValue.dsNhomChiTietLoai.reduce((curVal, nextVal) => {
        return [...curVal, ...nextVal.dsChiTietLoai];
      }, []);

      return [
        ...currValue,
        { title: nextValue.tenLoaiCongViec, list: [...res] },
      ];
    }, []);
  }, [browseCategories]);

  React.useEffect(() => {
    if (lodashIsEmpty(authProfile))
      setSettings([
        {
          label: "Sign In",
          link: "/signIn",
          handleOnClick() {
            navigate("/signIn");
          },
        },
        {
          label: "Join",
          link: "/signUp",
          handleOnClick() {
            navigate("/signUp");
          },
        },
      ]);
    else {
      setSettings([
        {
          label: authProfile.name,
          link: "/profile",
          handleOnClick() {
            navigate("/profile");
          },
        },
        {
          label: "Logout",
          link: "/",
          handleOnClick() {
            setOpen(true);
          },
        },
      ]);
    }
  }, [authProfile]);

  const renderBrowseCatergories = () => {
    if (!browseCategories) return;

    return (
      <BrowseCatergories
        isInDetailsJobPath={isInDetailsJobPath}
        browseCategories={browseCategories}
      />
    );
  };

  const handleCloseModal = () => setOpen(false);
  const handleSubmitModal = () => {
    localStorage.removeItem("authProfile");
    dispatch(authActionTypes.resetAuthProfile({}));
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <AppBar
        position={isInDetailsJobPath ? "static" : "fixed"}
        className="header"
      >
        <Container maxWidth="xl" className="headerMain">
          {width > 900 ? (
            <LargeDisplay pages={pages} settings={settings} />
          ) : (
            <SmallDisplay
              pages={pages}
              settings={settings}
              browseCategories={remapBrowseCategories}
            />
          )}
        </Container>
      </AppBar>
      {width > 900 && renderBrowseCatergories()}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitModal} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default HeaderComp;
