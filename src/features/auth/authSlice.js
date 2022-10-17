const { createReducer } = require("@reduxjs/toolkit");
const { authActionTypes } = require("./action");

const initialSlice = {
  authProfile: {},
  bookedJob: null,
};

const authReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(authActionTypes.setBookedJob, (state, action) => {
      state.bookedJob = action.payload;
    })
    .addCase(authActionTypes.resetAuthProfile, (state, action) => {
      state.authProfile = action.payload;
    })
    .addCase(authActionTypes.setAuthProfile, (state, action) => {
      state.authProfile = {
        ...state.authProfile,
        ...action.payload,
      };
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default authReducer;
