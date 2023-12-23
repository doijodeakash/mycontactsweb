/* eslint-disable no-unused-vars */
// import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { AuthFail } from "src/store/Auth/reducer";
// import store from '../store/store';

// const dispatch =
//
const API_URL = process.env.API_URL
  ? `${process.env.API_URL}`
  : "http://localhost:5000/api/";
console.log("process.env.API_URL", process.env.API_URL);
const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(async (config) => {
  const store = await import("../store/index").then(
    async (res) => await res?.default
  );

  // loadingShow()
  store.dispatch(showLoading());
  // const res = createAction(showLoading())
  // res.d
  // console.log('🚀 ~ file: api_helper.js:17 ~ axiosApi.interceptors.request.use ~ res:', res)
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

axiosApi.interceptors.response.use(
  async (response) => {
    const store = await import("src/store/index").then(
      async (res) => await res?.default
    );
    store.dispatch(hideLoading());
    return response;
  },
  async (error) => {
    const store = await import("src/store/index").then(
      async (res) => await res?.default
    );
    if (error.response?.status === 403) {
      store.dispatch(AuthFail());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authUser");
    }
    store.dispatch(hideLoading());
    return Promise.reject(error);
  }
);

export async function get(url, params, config = {}) {
  return await axiosApi
    .get(url, { params, ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  console.log("login---Data->", data, config);
  return axiosApi.post(url, data, { ...config }).then((response) => {
    console.log("response-data", response);
    return response.data;
  });
}

export async function put(url, data, config = {}) {
  console.log("Url %s -data %o -config %o---->", url, data, config);

  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data);
}
export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, data, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}

// export const loadingShow = createAsyncThunk('loading/show', async (data, { dispatch }) => {
//     console.log('🚀 ~ file: api_helper.js:49 ~ loadingShow ~ dispatch:', dispatch)
//     dispatch(showLoading())
// })
