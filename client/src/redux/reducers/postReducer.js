import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  getPostsSearch as getPostsSearchAPI,
  createPost as createAPI,
  updatePost as updateAPI,
  deletePost as deleteAPI,
} from "../../WebAPI";
import { LIST_LIMIT } from "../../constants/variable";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async () => await getPostsAPI()
);

export const getPostsSearch = createAsyncThunk(
  "post/getPostsSearch",
  async (query, rejectWithValue) => {
    try {
      const response = await await getPostsSearchAPI(query);
      if (response.ok === 0) throw new Error(response.message);
      return { query, posts: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (id) => await getPostAPI(id)
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ title, body }, { rejectWithValue }) => {
    try {
      const response = await createAPI(title, body);
      if (response.ok === 0) throw new Error(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, body }, { rejectWithValue }) => {
    try {
      const response = await updateAPI(id, title, body);
      if (response.ok === 0) throw new Error(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  await deleteAPI(id);
  return id;
});

const handlePending = (state, action) => {
  state.status = "loading";
};

const handleError = (state, action) => {
  state.status = "failed";
  state.error = action.payload;
};

export const postReducer = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    posts: [],
    result: { query: "", posts: [] },
    pages: 1,
    post: null,
    error: null,
  },
  reducers: {
    resetPostStatus: (state, action) => {
      state.status = "ready";
      state.error = null;
    },
    resetPost: (state, action) => {
      state.post = null;
    },
    resetResult: (state, action) => {
      state.result = [];
    },
  },
  extraReducers: {
    [getPosts.pending]: handlePending,
    [getPosts.fulfilled]: (state, action) => {
      state.status = "ready";
      state.posts = action.payload;
      state.pages = Math.ceil(action.payload.length / LIST_LIMIT);
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "idle";
    },
    [getPostsSearch.pending]: handlePending,
    [getPostsSearch.fulfilled]: (state, action) => {
      state.status = "found";
      state.result = action.payload;
    },
    [getPostsSearch.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.result.posts = [];
    },
    [getPost.pending]: handlePending,
    [getPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = action.payload[0];
    },
    [getPost.rejected]: handleError,
    [createPost.pending]: handlePending,
    [createPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = action.payload;
      state.posts = [].concat(action.payload, state.posts);
    },
    [createPost.rejected]: handleError,
    [updatePost.pending]: handlePending,
    [updatePost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    [updatePost.rejected]: handleError,
    [deletePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = null;
      state.posts = state.posts.filter(
        (post) => post.id !== Number(action.payload)
      );
    },
  },
});

export const { resetPostStatus, resetPost, resetResult } = postReducer.actions;

export const selectPostStatus = (state) => state.post.status;
export const selectPosts = (state) => state.post.posts;
export const selectPostsResult = (state) => state.post.result.posts;
export const selectPostsQuery = (state) => state.post.result.query;
export const selectPost = (state) => state.post.post;
export const selectPostById = (state, id) =>
  state.post.posts.filter((post) => post.id === Number(id))[0];
export const selectPages = (state) => state.post.pages;
export const selectPostError = (state) => state.post.error;

export default postReducer.reducer;
