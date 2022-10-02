import BtnScrollToTop from "common/components/BtnScrollToTop";
import FooterComp from "common/components/FooterComp";
import HeaderComp from "common/components/HeaderComp";
import { fetchSetMenuJobsTypeAction } from "features/booking/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSetMenuJobsTypeAction);
  }, [dispatch]);

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
