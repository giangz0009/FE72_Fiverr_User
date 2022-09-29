const { createReducer } = require("@reduxjs/toolkit");
const { modalActionTypes } = require("./action");

const initialSlice = {
  modal: null,
};

const modalReducer = createReducer(initialSlice, (builder) => {
  builder
    .addCase(modalActionTypes, (state, action) => {
      state.modal = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default modalReducer;
