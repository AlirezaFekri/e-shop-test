import { configureStore } from "@reduxjs/toolkit";
import favorites from "./slices/favorites";
import products from "./slices/products";

export const store = configureStore({
  reducer: {
    favorites,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
