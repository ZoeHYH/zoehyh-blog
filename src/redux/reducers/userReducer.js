import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../utils";
import {
  getUser as getUserAPI,
  login as loginAPI,
  register as registerAPI,
} from "../../WebAPI";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    isLoadingUser: false,
    user: null,
  },
  reducers: {
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoadingUser, setUser, setIsRequest } = userReducer.actions;

export const getUser = () => (dispatch) =>
  getUserAPI().then((data) => {
    if (data.ok) dispatch(setUser(data.data));
    return data;
  });
export const login = (username, password) => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  return loginAPI(username, password).then((data) => {
    if (!data.ok) return data;
    setAuthToken(data.token);
    return dispatch(getUser());
  });
};
export const register = (nickname, username, password) => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  return registerAPI(nickname, username, password).then((data) => {
    if (!data.ok) return data;
    setAuthToken(data.token);
    return dispatch(getUser());
  });
};

export const selectIsLoadingUser = (store) => store.user.isLoadingUser;
export const selectUser = (store) => store.user.user;
export const selectIsLogin = (store) => (store.user.user ? true : false);

export default userReducer.reducer;
