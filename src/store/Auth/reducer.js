import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserRegister, UserDetails } from "./thunk";

export const loginForm = {
  email: "",
  password: "",
  // role: "easyfied_admin",
  // login_as: "easyfied",
};
export const initialState = {
  token: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loginForm,
  user: {},
  loading: true,
  isAuth: false,
};

const loginSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    AuthFail: (state) => {
      state.loading = false;
      localStorage.clear();
      state.token = null;
      state.user = {};
      state.loading = false;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        const { accessToken, data } = action.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        state.token = accessToken;
        state.user = data.user;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(UserLogin.rejected, (state) => {
        state.token = null;
        state.user = {};
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(UserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserDetails.fulfilled, (state, action) => {
        const { data } = action.payload;
        console.log("data", data);
        state.user = data;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(UserDetails.rejected, (state) => {
        localStorage.clear();
        state.token = null;
        state.user = {};
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(UserRegister.pending, (state) => {
        state.loading = false;
      })
      .addCase(UserRegister.fulfilled, (state) => {
        localStorage.clear();
        state.user = {};
        state.token = null;
        state.token = null;
        state.loading = false;
        state.isAuth = false;
      });
  },
});

export const { AuthFail } = loginSlice.actions;
export default loginSlice.reducer;
