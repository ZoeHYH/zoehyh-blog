import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  createPost as createAPI,
  updatePost as updateAPI,
  deletePost as deleteAPI,
} from "../../WebAPI";
import { LIST_LIMIT } from "../../constants/variable";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    post: null,
    pages: 1,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
  },
});

export const { setIsLoading, setPost, setPages } = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getPostAPI(id).then((data) => {
    dispatch(setPost(data));
    dispatch(setIsLoading(false));
  });
};

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoading(true));
  getPostsAPI().then((data) => {
    dispatch(setPages(Math.ceil(data.length / LIST_LIMIT)));
    dispatch(setPost(data));
    dispatch(setIsLoading(false));
  });
};

export const createPost = (title, body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return createAPI(title, body);
};

export const updatePost = (id, title, body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return updateAPI(id, title, body);
};

export const deletePost = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return deleteAPI(id);
};

export const selectPostIsLoading = (state) => state.posts.isLoading;
export const selectPosts = (state) => state.posts.post;
export const selectPost = (state) => state.posts.post;
export const selectPages = (state) => state.posts.pages;

export default postReducer.reducer;
