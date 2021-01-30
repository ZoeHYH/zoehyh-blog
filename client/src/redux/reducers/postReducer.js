import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  getCategories as getCategoriesAPI,
  getPostsSearch as getPostsSearchAPI,
  createPost as createAPI,
  updatePost as updateAPI,
  deletePost as deleteAPI,
} from "../../WebAPI";

const getPosts = async () => {
  const { ok, posts, count, message } = await getPostsAPI();
  if (!ok) throw new Error(message);
  return { posts, count };
};

const getCategories = async () => {
  const { ok, categories, message } = await getCategoriesAPI();
  if (!ok) throw new Error(message);
  return categories;
};

export const getReady = createAsyncThunk(
  "post/getReady",
  async (_, { rejectWithValue }) => {
    try {
      const { posts, count } = await getPosts();
      const categories = await getCategories();
      return { posts, count, categories };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getPostsSearch = createAsyncThunk(
  "post/getPostsSearch",
  async (query, { rejectWithValue }) => {
    try {
      const { ok, posts, message } = await getPostsSearchAPI(query);
      if (!ok) throw new Error(message);
      return { query, posts };
    } catch (error) {
      return rejectWithValue({ query, error: error.message });
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, { rejectWithValue }) => {
    try {
      const { ok, post, message } = await getPostAPI(id);
      if (!ok) throw new Error(message);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ image, title, body, CategoryId }, { rejectWithValue }) => {
    try {
      const { ok, post, message } = await createAPI(
        image,
        title,
        body,
        CategoryId
      );
      if (!ok) throw new Error(message);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, image, title, body, CategoryId }, { rejectWithValue }) => {
    try {
      const { ok, post, message } = await updateAPI(
        id,
        image,
        title,
        body,
        CategoryId
      );
      if (!ok) throw new Error(message);
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const { ok, message } = await deleteAPI(id);
      if (!ok) throw new Error(message);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    categories: [],
    result: { query: "", posts: [] },
    count: 0,
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
    [getReady.pending]: handlePending,
    [getReady.fulfilled]: (state, action) => {
      state.status = "ready";
      state.posts = action.payload.posts;
      state.count = action.payload.count;
      state.categories = action.payload.categories;
    },
    [getReady.rejected]: (state, action) => {
      state.status = "idle";
    },
    [getPostsSearch.pending]: handlePending,
    [getPostsSearch.fulfilled]: (state, action) => {
      state.status = "found";
      state.result = action.payload;
    },
    [getPostsSearch.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
      state.result = { query: action.payload.query, posts: [] };
    },
    [getPost.pending]: handlePending,
    [getPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = action.payload;
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
export const selectCount = (state) => state.post.count;
export const selectPostError = (state) => state.post.error;
export const selectPostsByCategoryId = (state, id) =>
  state.post.posts.filter((post) => post.CategoryId === Number(id));
export const selectCategories = (state) => state.post.categories;

export default postReducer.reducer;
