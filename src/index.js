// import SearchCategories from "features/booking/common/components/SearchCategories";
import PageNotFound from "common/components/PageNotFound";
import SignIn from "features/auth/pages/SignIn";
import SignUp from "features/auth/pages/SignUp";
import UserProfile from "features/auth/pages/UserProfile";
import JobDetails from "features/booking/common/components/JobDetails";
import JobDetailsMain from "features/booking/common/components/JobDetails/JobDetailsMain";
import SearchJobDetail from "features/booking/common/components/SearchJobDetail";
import SearchJobType from "features/booking/common/components/SearchJobType";
import SearchName from "features/booking/common/components/SearchName";
import Home from "features/booking/pages/Home";
import Search from "features/booking/pages/Search";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/App";
import store from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="search/" element={<Search />}>
              <Route index element={<p>Search Main</p>} />
              <Route path="categories/:jobTypeId" element={<SearchJobType />} />
              <Route
                path="categories/:jobTypeId/:jobDetailId"
                element={<SearchJobDetail />}
              />
              <Route path="name/:jobName" element={<SearchName />} />
            </Route>
            <Route path="jobDetails/" element={<JobDetails />}>
              <Route index element={<p>Please Choose Job to view Detail</p>} />
              <Route path=":jobId" element={<JobDetailsMain />} />
            </Route>
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
