import bookingReducer from "features/booking/bookingSlice";
import modalReducer from "features/modalFeature/modalSlice";

const rootReducer = {
  modalReducer: modalReducer,
  bookingReducer: bookingReducer,
};

export default rootReducer;
