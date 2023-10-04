import { createSlice } from "@reduxjs/toolkit";
import {
  ContactList,
  ContactOne,
  CreateContact,
  DeleteContact,
  PostList,
  UpdateContact,
} from "./thunk";
import _ from "lodash";

export const form = {
  name: "",
  email: "",
  phone: "",
};
export const posts = {
  userId: "",
  id: "",
  title: "",
  body: "",
};
export const initialState = {
  name: "",
  email: "",
  phone: "",
  posts: [],
};
const VendorCategory = createSlice({
  name: "Contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Listing All Contac
    builder
      .addCase(ContactList.pending, (state) => {
        state.loading = true;
      })
      .addCase(ContactList.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.ContactList = data;
      })
      .addCase(ContactList.rejected, (state) => {
        state.loading = false;
      })

      .addCase(CreateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateContact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateContact.pending, (state) => {
        state.loading = false;
      })
      .addCase(UpdateContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateContact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ContactOne.pending, (state) => {
        state.loading = false;
      })
      .addCase(ContactOne.fulfilled, (state, action) => {
        const { payload } = action;
        const data = _.pick(payload?.data, Object.keys(form));
        state.form = data;
        state.loading = false;
      })
      .addCase(ContactOne.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PostList.pending, (state) => {
        state.posts = [];
      })
      .addCase(PostList.fulfilled, (state, action) => {
        const { payload } = action;
        // console.log("actionPost", action);
        const data = payload?.data;
        console.log("actionPost", data);

        state.loading = false;
        state.posts = data;
      })
      .addCase(PostList.rejected, (state) => {
        state.loading = false;
        state.posts = [];
      });
    // .addCase(DeleteContact.pending, (state) => {
    //   state.loading = false;
    // });
    // .addCase(DeleteContact.fulfilled, (state, action) => {
    //   const { payload } = action;
    //   const data = _.pick(payload?.data, Object.keys(form));
    //   state.form = data;
    //   state.loading = false;
    // })
    // .addCase(DeleteContact.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});
export default VendorCategory.reducer;
