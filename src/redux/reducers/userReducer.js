import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../utils";
import {
  getUser as getUserAPI,
  login as loginAPI,
  register as registerAPI,
} from "../../WebAPI";

const login = async ({ username, password }) => {
  const tokenData = await loginAPI(username, password);
  if (!tokenData.ok) throw new Error(tokenData.message);
  setAuthToken(tokenData.token);
};

const register = async ({ nickname, username, password }) => {
  const tokenData = await registerAPI(nickname, username, password);
  if (!tokenData.ok) throw new Error(tokenData.message);
  setAuthToken(tokenData.token);
};

export const verifyUser = createAsyncThunk(
  "user/verify",
  async (data, { rejectWithValue }) => {
    try {
      if (data.goal === "register") {
        await register(data);
      } else if (data.goal === "login") {
        await login(data);
      }
      const response = await getUserAPI();
      if (!response.ok) throw new Error(response.message);
      return { goal: data.goal, data: response.data };
    } catch (error) {
      return rejectWithValue({
        goal: data.goal,
        message: error.message ? error.message : "失敗",
      });
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: {
    status: { verify: "idle", login: "idle", register: "idle" },
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [verifyUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.status[action.payload.goal] = "succeeded";
      state.isLoading = false;
      state.user = action.payload.data;
    },
    [verifyUser.rejected]: (state, action) => {
      state.status[action.payload.goal] = "failed";
      state.isLoading = false;
      state.user = null;
      state.error = action.payload.message;
    },
  },
});

export const selectUser = (store) => store.user.user;
export const selectUserStatus = (store) => store.user.status;
export const selectUserIsLoading = (store) => store.user.isLoading;
export const selectUserError = (store) => store.user.error;

export default userReducer.reducer;
