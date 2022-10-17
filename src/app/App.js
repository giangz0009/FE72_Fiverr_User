import FooterComp from "common/components/FooterComp";
import BtnScrollToTop from "common/components/BtnScrollToTop";
import HeaderComp from "common/components/HeaderComp";
import { fetchSetMenuJobsTypeAction } from "features/booking/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { fetchSignInAction } from "features/auth/action";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const authProfile = localStorage.getItem("authProfile");
    if (!authProfile) localStorage.removeItem("authProfile");
    else {
      const authData = JSON.parse(authProfile);
      const authId = authData.id;

      dispatch(fetchSignInAction(authId));
    }
  });

  useEffect(() => {
    dispatch(fetchSetMenuJobsTypeAction);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <HeaderComp />
      <Outlet />
      <BtnScrollToTop />
      <FooterComp />
    </div>
  );
}

export default App;
