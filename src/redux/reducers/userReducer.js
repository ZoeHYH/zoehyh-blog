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
  async ({ goal, ...data }, { rejectWithValue }) => {
    try {
      if (goal === "register") {
        await register(data);
      } else if (goal === "login") {
        await login(data);
      }
      const response = await getUserAPI();
      if (!response.ok) throw new Error(response.message);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        goal,
        error: error.message ? error.message : "失敗",
      });
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: null,
    error: null,
  },
  reducers: {
    resetUserStatus: (state, action) => {
      state.status = "logout";
    },
    resetUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: {
    [verifyUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [verifyUser.rejected]: (state, action) => {
      if (action.payload.goal === "verify") state.status = "logout";
      else state.status = "failed";
      state.error = action.payload.error;
    },
  },
});

export const { resetUserStatus, resetUser } = userReducer.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userReducer.reducer;
