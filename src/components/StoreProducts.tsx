"use client";

import { useDispatch } from "react-redux";
import { addProducts } from "../redux/slices/products";
import { useGetProducts } from "../api";

const StoreProducts = () => {
  const dispatch = useDispatch();
  const { data, isPending } = useGetProducts();

  if (!isPending && !!data) {
    dispatch(addProducts(data.products));
  }
  return null;
};

export default StoreProducts;
