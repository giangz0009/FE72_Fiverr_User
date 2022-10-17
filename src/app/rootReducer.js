import authReducer from "features/auth/authSlice";
import bookingReducer from "features/booking/bookingSlice";
import modalReducer from "features/modalFeature/modalSlice";

const rootReducer = {
  modalReducer: modalReducer,
  bookingReducer: bookingReducer,
  authReducer: authReducer,
};

export default rootReducer;
