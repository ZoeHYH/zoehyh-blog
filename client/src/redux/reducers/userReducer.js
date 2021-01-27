import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../utils";
import {
  verify,
  login as loginAPI,
  register as registerAPI,
} from "../../WebAPI";

const login = async ({ username, password }) => {
  const { ok, token, message } = await loginAPI(username, password);
  if (!ok) throw new Error(message);
  setAuthToken(token);
};

const register = async ({ nickname, username, password }) => {
  const { ok, token, message } = await registerAPI(
    nickname,
    username,
    password
  );
  if (!ok) throw new Error(message);
  setAuthToken(token);
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
      const { ok, user, message } = await verify();
      if (!ok) throw new Error(message);
      return user;
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
