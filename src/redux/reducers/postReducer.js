import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  createPost as createAPI,
  updatePost as updateAPI,
  deletePost as deleteAPI,
} from "../../WebAPI";
import { LIST_LIMIT } from "../../constants/variable";

// export const postReducer = createSlice({
//   name: "posts",
//   initialState: {
//     isLoading: false,
//     post: null,
//     pages: 1,
//   },
//   reducers: {
//     setIsLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setPost: (state, action) => {
//       state.post = action.payload;
//     },
//     setPages: (state, action) => {
//       state.pages = action.payload;
//     },
//   },
// });

// export const { setIsLoading, setPost, setPages } = postReducer.actions;

// export const getPost = (id) => (dispatch) => {
//   dispatch(setIsLoading(true));
//   return getPostAPI(id).then((data) => {
//     dispatch(setPost(data));
//     dispatch(setIsLoading(false));
//   });
// };

// export const getPosts = () => (dispatch) => {
//   dispatch(setIsLoading(true));
//   getPostsAPI().then((data) => {
//     dispatch(setPages(Math.ceil(data.length / LIST_LIMIT)));
//     dispatch(setPost(data));
//     dispatch(setIsLoading(false));
//   });
// };

// export const createPost = (title, body) => (dispatch) => {
//   dispatch(setIsLoading(true));
//   return createAPI(title, body);
// };

// export const updatePost = (id, title, body) => (dispatch) => {
//   dispatch(setIsLoading(true));
//   return updateAPI(id, title, body);
// };

// export const deletePost = (id) => (dispatch) => {
//   dispatch(setIsLoading(true));
//   return deleteAPI(id);
// };

// export const selectPostIsLoading = (state) => state.posts.isLoading;
// export const selectPosts = (state) => state.posts.post;
// export const selectPost = (state) => state.posts.post;
// export const selectPages = (state) => state.posts.pages;

// export default postReducer.reducer;

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async () => await getPostsAPI()
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id) => await getPostAPI(id)
);

export const createPost = createAsyncThunk(
  "posts/createPost",
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
  "posts/updatePost",
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

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await deleteAPI(id);
  return id;
});

const handlePending = (state, action) => {
  state.status = "loading";
  state.post = null;
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
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "ready";
      state.posts = action.payload;
      state.pages = Math.ceil(action.payload.length / LIST_LIMIT);
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "idle";
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

export const { resetPostStatus, resetPost } = postReducer.actions;

export const selectPostStatus = (state) => state.post.status;
export const selectPosts = (state) => state.post.posts;
export const selectPost = (state) => state.post.post;
export const selectPostById = (state, id) =>
  state.post.posts.filter((post) => post.id === Number(id))[0];
export const selectPages = (state) => state.post.pages;
export const selectPostError = (state) => state.post.error;

export default postReducer.reducer;
