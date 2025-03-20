import { Product } from "@/src/app/api/products/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [] as Product[];

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      return { ...state, action };
    },
  },
});

export const { addProducts } = products.actions;

export default products.reducer;
