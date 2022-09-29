import FooterComp from "common/components/FooterComp";
import HeaderComp from "common/components/HeaderComp";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderComp />
      <Outlet />
      <FooterComp />
    </div>
  );
}

export default App;
