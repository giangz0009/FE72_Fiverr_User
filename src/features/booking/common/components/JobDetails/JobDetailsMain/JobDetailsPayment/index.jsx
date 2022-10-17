import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CachedIcon from "@mui/icons-material/Cached";
import CheckIcon from "@mui/icons-material/Check";

import { StickyContainer, Sticky } from "react-sticky";

import React, { useState } from "react";

import "./globalStyle.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "app/instance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = ["Basic", "Standard", "Premium"];

function JobDetailsPayment({ jobDetailsData }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const { giaTien, moTaNgan } = jobDetailsData.congViec;

  const pannels = [
    {
      type: "Basic",
      price: giaTien,
      delivery: "1 Day",
      revisions: "3",
      features: [
        {
          feature: "Up to 500 words",
          isActive: true,
        },
        {
          feature: "Topic research",
          isActive: true,
        },
        {
          feature: "SEO keywords",
          isActive: true,
        },
        {
          feature: "SEO Keyword Research",
          isActive: false,
        },
        {
          feature: "References & citations",
          isActive: false,
        },
        {
          feature: "Data chart",
          isActive: false,
        },
      ],
    },
    {
      type: "Standard",
      price: giaTien * 2,
      delivery: "1 Day",
      revisions: "6",
      features: [
        {
          feature: "Up to 1000 words",
          isActive: true,
        },
        {
          feature: "Topic research",
          isActive: true,
        },
        {
          feature: "SEO keywords",
          isActive: true,
        },
        {
          feature: "SEO Keyword Research",
          isActive: true,
        },
        {
          feature: "References & citations",
          isActive: true,
        },
        {
          feature: "Data chart",
          isActive: false,
        },
      ],
    },
    {
      type: "Premium",
      price: giaTien * 3,
      delivery: "2 Days",
      revisions: "Unlimited",
      features: [
        {
          feature: "Up to 1,500 words",
          isActive: true,
        },
        {
          feature: "Topic research",
          isActive: true,
        },
        {
          feature: "SEO keywords",
          isActive: true,
        },
        {
          feature: "SEO Keyword Research",
          isActive: true,
        },
        {
          feature: "References & citations",
          isActive: true,
        },
        {
          feature: "Data chart",
          isActive: true,
        },
      ],
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickPayment = () => {
    const authProfile = localStorage.getItem("authProfile");

    if (!authProfile) {
      navigate("/signIn");
    } else {
      setOpen(true);
    }
  };

  const getToDay = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    return formattedToday;
  };

  const handleCloseModal = () => setOpen(false);
  const handleCloseSuccessModal = () => setOpenSuccess(false);
  const handleSubmitModal = async () => {
    try {
      const data = {
        maCongViec: jobDetailsData.id,
        maNguoiThue: authProfile.id,
        hoanThanh: false,
        ngayThue: getToDay(),
      };

      await instance.request({
        url: "/api/thue-cong-viec",
        method: "POST",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
    setOpenSuccess(true);
  };

  const handleSubmitSuccessModal = () => {
    setOpenSuccess(false);
    navigate(-1);
  };

  return (
    <StickyContainer className="jobDetailsPaymentMain">
      <Sticky>
        {({ style }) => (
          <div className="reactSticky" style={style}>
            <div className="wrapper">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {tabs.map((tab, index) => (
                    <Tab key={index} label={tab} {...a11yProps(index)} />
                  ))}
                </Tabs>
              </Box>
              {pannels.map((pannel, index) => (
                <TabPanel
                  className="pannel"
                  key={index}
                  value={value}
                  index={index}
                >
                  <div className="header">
                    <h3>
                      <b>{pannel.type}</b>
                      <div className="price">
                        <span>US${pannel.price}</span>
                      </div>
                    </h3>
                    <p>{moTaNgan}</p>
                  </div>
                  <article>
                    <div className="additionInfo">
                      <div className="delivery">
                        <AccessTimeIcon />
                        <b>{pannel.delivery} Delivery</b>
                      </div>
                      <div className="revision">
                        <CachedIcon />
                        <b>{pannel.revisions} Revisions</b>
                      </div>
                    </div>
                    <ul className="features">
                      {pannel.features.map((feature, index) => (
                        <li
                          key={index}
                          className={clsx({ active: feature.isActive })}
                        >
                          <CheckIcon />
                          {feature.feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                  <button onClick={handleClickPayment}>
                    Continue (US${pannel.price})
                  </button>
                </TabPanel>
              ))}
            </div>
            <div className="sellerInfo">
              <button>Contact Seller</button>
            </div>
          </div>
        )}
      </Sticky>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to order this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitModal} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSuccess}
        onClose={handleCloseSuccessModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success Modal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Order success!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal}>Cancel</Button>
          <Button onClick={handleSubmitSuccessModal} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </StickyContainer>
  );
}

export default JobDetailsPayment;
