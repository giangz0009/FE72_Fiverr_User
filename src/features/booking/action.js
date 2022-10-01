import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const bookingActionTypes = {
  setMenuJobsType: createAction("Booking/SET_MENU_JOBS_TYPE"),
};

// call async action here
const fetchSetMenuJobsTypeAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/cong-viec/lay-menu-loai-cong-viec",
      method: "GET",
    });

    dispatch(bookingActionTypes.setMenuJobsType(res.data.content));
  } catch (error) {
    console.log(error);
  }
};

export { bookingActionTypes, fetchSetMenuJobsTypeAction };
