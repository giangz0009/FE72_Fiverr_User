import { Tab, Tabs } from "@mui/material";
import React, { memo } from "react";

import "./globalStyles.scss";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = ["History Booking"];

function UserActiveTabs({ value, handleChange }) {
  return (
    <div className="userActiveTabs">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className="tabs"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} {...a11yProps(index)} className="tab" />
        ))}
      </Tabs>
    </div>
  );
}

export default memo(UserActiveTabs);
