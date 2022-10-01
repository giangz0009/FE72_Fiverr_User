import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import useWindowSize from "common/hocs/useWindowSize";

import "./globalStyles.scss";
import SmallDisplay from "./SmallDisplay";
import LargeDisplay from "./LargeDisplay";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Slider from "react-slick";

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
const settings = ["Sign In", "Join"];

const HeaderComp = () => {
  const { width } = useWindowSize();

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

  return (
    <AppBar position="fixed" className="header">
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
      <Box className="headerBrowseCategories">
        <Container maxWidth="xl">
          <Slider
            className="slider variable-width"
            dots={true}
            infinite={true}
            centerMode={true}
            slidesToShow={1}
            slidesToScroll={1}
            variableWidth={true}
          >
            <div style={{ width: 100 }}>
              <p>100</p>
            </div>
            <div style={{ width: 200 }}>
              <p>200</p>
            </div>
            <div style={{ width: 75 }}>
              <p>75</p>
            </div>
            <div style={{ width: 300 }}>
              <p>300</p>
            </div>
            <div style={{ width: 225 }}>
              <p>225</p>
            </div>
            <div style={{ width: 175 }}>
              <p>175</p>
            </div>
          </Slider>
        </Container>
      </Box>
    </AppBar>
  );
};
export default HeaderComp;
