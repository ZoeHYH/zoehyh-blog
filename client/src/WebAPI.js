import { getAuthToken } from "./utils";
const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`);
  return response.json();
};

export const getPostsPage = async (page) => {
  const response = await fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}`
  );
  return response.json();
};

export const getPost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts?id=${id}`);
  return response.json();
};

export const getUser = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

export const createPost = async (title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/posts`, {
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
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
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
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
};

export const register = async (nickname, username, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nickname, username, password }),
  });
  return await response.json();
};

const imgurBaseUrl = "https://api.imgur.com/3/";
const clientId = "546c25a59c58ad7";
const clientSecret = "ba35516f8ce9c5630f8f90826cb93c55ffb73264";
let accessToken = "8b5037b7e7f302ba49f32536f8812ad4c956192c";
let refreshToken = "3594a6f5215a81e80f23d172b050b22a1ab214fa";
const albumHash = "HUmeBkQ5fFxBudD";

const generateToken = async () => {
  let formdata = new FormData();
  formdata.append("refresh_token", refreshToken);
  formdata.append("clientId", clientId);
  formdata.append("clientSecret", clientSecret);
  formdata.append("grant_type", "refresh_token");
  const response = await fetch("https://api.imgur.com/oauth2/token", {
    method: "POST",
    body: formdata,
  });
  const data = await response.json();
  accessToken = data.access_token;
  refreshToken = data.refresh_token;
};

export const uploadImage = async (image) => {
  const headers = new Headers();
  headers.append("Authorization", `Client-ID ${clientId}`);
  const formdata = new FormData();
  formdata.append("image", image);
  formdata.append("album", albumHash);
  const response = await fetch(`${imgurBaseUrl}image`, {
    method: "POST",
    headers: headers,
    body: formdata,
  });
  return await response.json();
};

export const deleteImage = async (imageHash) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(`${imgurBaseUrl}image/${imageHash}`, {
    method: "DELETE",
    headers: headers,
  });
  return await response.json();
};
