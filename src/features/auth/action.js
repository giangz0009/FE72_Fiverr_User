import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const authActionTypes = {
  setAuthProfile: createAction("AUTH_SET_PROFILE"),
  resetAuthProfile: createAction("AUTH_RESET_PROFILE"),
  setBookedJob: createAction("AUTH_SET_BOOKED_JOB"),
};

// call async action here

const fetchSetBookedJobAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/thue-cong-viec/lay-danh-sach-da-thue",
      method: "GET",
    });

    dispatch(authActionTypes.setBookedJob(res.data.content));
  } catch (error) {
    console.log(error);
  }
};

const fetchSignInAction = (userId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/users/${userId}`,
        method: "GET",
      });

      dispatch(authActionTypes.setAuthProfile(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchSetAuthProfileAction = (data) => {
  return async (dispatch) => {
    try {
      delete data.avatar;
      delete data.password;
      delete data.bookingJob;

      const res = await instance.request({
        url: `/api/users/` + JSON.parse(localStorage.getItem("authProfile")).id,
        method: "PUT",
        data: data,
      });

      const reParseRes = {
        ...res.data.content,
        skill: JSON.parse(res.data.content.skill),
        certification: JSON.parse(res.data.content.certification),
        bookingJob: JSON.parse(res.data.content.bookingJob),
      };

      dispatch(authActionTypes.setAuthProfile(reParseRes));
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  authActionTypes,
  fetchSignInAction,
  fetchSetAuthProfileAction,
  fetchSetBookedJobAction,
};
