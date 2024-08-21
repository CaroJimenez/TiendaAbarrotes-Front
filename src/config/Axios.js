import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://l7941h189k.execute-api.us-east-1.amazonaws.com/Prod", // URL de la API
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE, OPTIONS'
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
    let message = error.response.data.message;

    if (error.response.status === 401) {
      Swal.fire({
        title: "Error",
        text: "El usuario no está auntenficado",
        icon: "error",
      });
    } else if (error.response.status === 400) {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    } else if (error.response.status === 403) {
      Swal.fire({
        title: "Error",
        text: "No tienes permiso para acceder a esta funcion",
        icon: "error",
      });
    } else if (error.response.status === 404) {
      Swal.fire({
        title: "Error",
        text: "Recursos no encontrados",
        icon: "error",
      });
    } else if (error.response.status === 500) {
      Swal.fire({
        title: "Error",
        text: "Error interno del servidor",
        icon: "error",
      });
    } else if (error.response.status === 503) {
      Swal.fire({
        title: "Error",
        text: "Servicio no disponible",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Error desconocido",
        icon: "error",
      });
    }
    return Promise.reject(error);
  }
);

export const doGet = (url) => {
  return instance.get(url);
};

export const doGetId = (url, id) => {
  return instance.get(`${url}${id}`);
}
  
export const doPost = (url, data) => {
  return instance.post(url, data);
};

export const doPut = (url, data) => {
  return instance.put(url, data);
};

export const doDelete = (url) => {
  return instance.delete(url);
};

export const doPatch = (url) => {
  return instance.patch(url);
};