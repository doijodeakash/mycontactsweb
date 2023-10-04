import { createAsyncThunk } from "@reduxjs/toolkit";
import { userDetailsApi, userLoginApi, userRegisterApi } from "./Auth.services";

export const UserLogin = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userLoginApi(data);

      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//
export const UserDetails = createAsyncThunk(
  "users/current",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userDetailsApi(data);

      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//
export const UserRegister = createAsyncThunk(
  "users/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userRegisterApi(data);
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//
