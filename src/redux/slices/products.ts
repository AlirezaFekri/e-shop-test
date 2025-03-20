import { Product } from "@/src/app/api/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [] as Product[];

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: { payload: Product[] }) => {
      const product = action.payload;
      return { ...state, product };
    },
  },
});

export const { addProducts } = products.actions;

export default products.reducer;
