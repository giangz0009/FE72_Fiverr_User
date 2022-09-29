const { createAction } = require("@reduxjs/toolkit");

const modalActionTypes = {
  setModal: createAction("Modal/SET_MODAL"),
};

// call async action here

export { modalActionTypes };
