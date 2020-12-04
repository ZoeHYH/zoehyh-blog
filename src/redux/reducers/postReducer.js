import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  createPost as createAPI,
  updatePost as updateAPI,
  deletePost as deleteAPI,
} from "../../WebAPI";
import { LIST_LIMIT } from "../../constants/varaible";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    post: null,
    pages: 1,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
  },
});

export const { setIsLoadingPost, setPost, setPages } = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return getPostAPI(id).then((data) => {
    dispatch(setPost(data));
    dispatch(setIsLoadingPost(false));
  });
};

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostsAPI().then((data) => {
    dispatch(setPages(Math.ceil(data.length / LIST_LIMIT)));
    dispatch(setPost(data));
    dispatch(setIsLoadingPost(false));
  });
};

export const createPost = (title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return createAPI(title, body);
};

export const updatePost = (id, title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return updateAPI(id, title, body);
};

export const deletePost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return deleteAPI(id);
};

export const selectIsLoadingPost = (state) => state.posts.isLoadingPost;
export const selectPosts = (state) => state.posts.post;
export const selectPost = (state) => state.posts.post;
export const selectPages = (state) => state.posts.pages;

export default postReducer.reducer;
