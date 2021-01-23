import { getAuthToken } from "./utils";
const baseUrl = "https://student-json-api.lidemy.me";
const cloudinaryBaseUrl = "https://api.cloudinary.com/v1_1/zoehyh/auto/upload";

export const getPosts = async () => {
  const response = await fetch(`${baseUrl}/posts?_sort=createdAt&_order=desc`);
  return response.json();
};

export const getPostsSearch = async (query) => {
  const response = await fetch(`${baseUrl}/posts?q=${query}`);
  return response.json();
};

export const getPostsPage = async (page) => {
  const response = await fetch(
    `${baseUrl}/posts?_sort=createdAt&_order=desc&_page=${page}`
  );
  return response.json();
};

export const getPost = async (id) => {
  const response = await fetch(`${baseUrl}/posts?id=${id}`);
  return response.json();
};

export const createPost = async (title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  });
  return await response.json();
};

export const updatePost = async (id, title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
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

export const getUser = async () => {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
export const login = (username, password) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
};

export const register = async (nickname, username, password) => {
  const response = await fetch(`${baseUrl}/register`, {
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
