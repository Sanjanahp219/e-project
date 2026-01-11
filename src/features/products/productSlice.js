import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productService";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await fetchProducts();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle"
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      });
  }
});

export default productSlice.reducer;
