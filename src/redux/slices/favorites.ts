import { Product } from "@/src/app/api/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [] as Product[];

const favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const product = action.payload;
      if (!state.find((item) => item.id === product.id)) {
      return [...state, product]
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favorites.actions;

export default favorites.reducer;
