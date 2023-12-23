import { createSlice } from "@reduxjs/toolkit";
import { ProductList } from "./thunk";
// import _ from "lodash";

export const product = {
  id: "",
  title: "",
  description: "",
  price: "",
  discountPercentage: "",
  rating: "",
  stock: "",
  brand: "",
  category: "number",
  thumbnail: "",
  images: [],
};
export const initialState = {
  loading: false,
  products: [],
};
const VendorCategory = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Listing All Contac
    builder
      .addCase(ProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProductList.fulfilled, (state, action) => {
        const { data } = action.payload;
        console.log("reducers-->", data);
        state.products = data.products;
        state.loading = false;
      })
      .addCase(ProductList.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default VendorCategory.reducer;
