import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://l7941h189k.execute-api.us-east-1.amazonaws.com/Prod/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, Authorization",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("id_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Error desconocido";
    // Handle different error scenarios here
    return Promise.reject(error);
  }
);

export const doGet = (url) => {
  return instance.get(url);
};

export const doGetId = (url, id) => {
  return instance.get(`${url}${id}`);
};

export const doPost = (url, data) => {
  return instance.post(url, data);
};

export const doPut = (url, data) => {
  return instance.put(url, data);
};

export const doDelete = (url) => {
  return instance.delete(url);
};

export const doPatch = (url, data) => {
  return instance.patch(url, data);
};