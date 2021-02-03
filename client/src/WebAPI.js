import { LIST_LIMIT } from "./constants/variable";
import { getAuthToken } from "./utils";
const baseUrl = "https://blog.zoehyh.tw/api";
const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/zoehyh/auto/upload";

export const getPosts = async () => {
  const response = await fetch(`${baseUrl}/posts`);
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${baseUrl}/categories`);
  return response.json();
};

export const getPostsSearch = async (query) => {
  const response = await fetch(`${baseUrl}/posts?query=${query}`);
  return response.json();
};

export const getPostsPage = async (page) => {
  const response = await fetch(
    `${baseUrl}/posts?_limit${LIST_LIMIT}&_page=${page}`
  );
  return response.json();
};

export const getPost = async (id) => {
  const response = await fetch(`${baseUrl}/posts/${id}`);
  return response.json();
};

export const createPost = async (image, title, body, CategoryId) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, title, body, CategoryId }),
  });
  return await response.json();
};

export const updatePost = async (id, image, title, body, CategoryId) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, title, body, CategoryId }),
  });
  return await response.json();
};

export const deletePost = async (id) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const verify = async () => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/users/verify`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const login = (username, password) => {
  return fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
};

export const register = async (nickname, username, password) => {
  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nickname, username, password }),
  });
  return await response.json();
};

export const uploadImage = async (image, id) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "zoehyh_blog");
  if (id) formData.append("public_id", id);
  const response = await fetch(`${cloudinaryBaseUrl}`, {
    method: "POST",
    body: formData,
  });
  return await response.json();
};
