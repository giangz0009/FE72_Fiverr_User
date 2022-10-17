import instance from "app/instance";

const { createAction } = require("@reduxjs/toolkit");

const bookingActionTypes = {
  setMenuJobsType: createAction("Booking/SET_MENU_JOBS_TYPE"),
  setCommentsList: createAction("Booking/SET_COMMENTS_LIST"),
};

// call async action here
const fetchAddCommentAction = (data, jobId) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().authReducer.authProfile.id;

      await instance.request({
        url: `/api/binh-luan`,
        method: "POST",
        data: {
          ...data,
          maNguoiBinhLuan: userId,
        },
      });

      const res = await dispatch(fetchSetCommentsListAction(jobId));
    } catch (error) {
      console.log(error);
    }
  };
};
const fetchSetCommentsListAction = (jobId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/binh-luan/lay-binh-luan-theo-cong-viec/${jobId}`,
        method: "GET",
      });

      dispatch(bookingActionTypes.setCommentsList(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

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

export {
  bookingActionTypes,
  fetchSetMenuJobsTypeAction,
  fetchSetCommentsListAction,
  fetchAddCommentAction,
};
