import { bookingActionTypes } from "./action";

const { createReducer } = require("@reduxjs/toolkit");

const initialSlice = {
  menuJobsType: null,
};

const bookingReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(bookingActionTypes.setMenuJobsType, (state, action) => {
      state.menuJobsType = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default bookingReducer;
