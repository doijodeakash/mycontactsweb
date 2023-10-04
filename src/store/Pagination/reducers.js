import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  page: 1,
  limit: process.env.REACT_APP_PAGE_LIMIT || 5,
  // limit: 2,
  totalPage: 1,
  totalRecords: 1,
  loading: true,
};
const PaginationReducer = createSlice({
  name: "Pagination",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.page = 1;
      state.totalPage = 1;
      state.totalRecords = 1;
      state.loading = false;
    },
    paginationData: (state, action) => {
      const { payload } = action;
      console.log("pagination payload", payload);
      state.page = payload?.page || 1;
      state.totalPage = payload?.totalPage || 1;
      state.totalRecords = payload?.totalRecords || 1;
      state.loading = false;
    },
    nextPrevPage: (state, action) => {
      const { payload } = action;
      state.page = payload || 1;
    },
  },
});

//
export const { resetPage, nextPrevPage, paginationData } =
  PaginationReducer.actions;
export default PaginationReducer.reducer;
