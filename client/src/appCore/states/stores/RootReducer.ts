import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/loginFeature/state/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // chat: chatReducer,
});

export default rootReducer;
