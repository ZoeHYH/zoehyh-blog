import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
});
