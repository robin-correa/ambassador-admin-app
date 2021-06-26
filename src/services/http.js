import axios from "axios";
import auth from "./auth";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

const requestHandler = (request) => {
  if (auth.getAccessToken()) {
    request.headers.Authorization = `Bearer ${auth.getAccessToken()}`;
  }

  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

http.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default http;
