import { getAuthToken } from "./utils";
const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = () => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc`
  ).then((response) => response.json());
};

export const getPostsPage = (page) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}`
  ).then((response) => response.json());
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((response) =>
    response.json()
  );
};

export const getUser = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

export const createPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  }).then((response) => response.json());
};

export const updatePost = (id, title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  }).then((response) => response.json());
};

export const deletePost = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
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

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ nickname, username, password }),
  }).then((response) => response.json());
};
