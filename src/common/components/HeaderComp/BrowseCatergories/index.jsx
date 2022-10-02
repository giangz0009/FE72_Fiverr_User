import { Tooltip, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { memo } from "react";
import Slider from "react-slick";
import lodashIsEmpty from "lodash.isempty";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import "./globalStyles.scss";

const NextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <NavigateNextIcon />
    </button>
  );
};

const PrevButton = (props) => {
  const { className, style, onClick } = props;

  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <NavigateBeforeIcon />
    </button>
  );
};

function BrowseCategories({ browseCategories }) {
  return (
    <Box className="headerBrowseCategories">
      <Container maxWidth="xl">
        <Slider
          className="slider variable-width"
          dots={false}
          infinite={true}
          initialSlide={0}
          slidesToShow={1}
          slidesToScroll={1}
          centerMode={true}
          variableWidth={true}
          nextArrow={<NextArrow />}
          prevArrow={<PrevButton />}
        >
          {browseCategories.map((category, index) => {
            if (lodashIsEmpty(category.dsNhomChiTietLoai)) return null;
            return (
              <Box key={index} className="headerBrowseCategory">
                <Tooltip
                  className="headerBrowseCategoryWrap"
                  arrow
                  placement="bottom"
                  title={
                    <Box className="headerBrowseCategoryItem">
                      {category.dsNhomChiTietLoai.map((detailItem, index) => (
                        <Box
                          className="headerBrowseCategoryItemMain"
                          key={index}
                        >
                          <div>
                            <h3>{detailItem.tenNhom}</h3>
                            {detailItem.dsChiTietLoai.map((item) => (
                              <Typography key={item.id}>
                                {item.tenChiTiet}
                              </Typography>
                            ))}
                          </div>
                        </Box>
                      ))}
                    </Box>
                  }
                >
                  <Box>{category.tenLoaiCongViec}</Box>
                </Tooltip>
              </Box>
            );
          })}
        </Slider>
      </Container>
    </Box>
  );
}

export default memo(BrowseCategories);
