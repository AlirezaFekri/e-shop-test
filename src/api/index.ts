import { useQuery } from "@tanstack/react-query";
import { apiAxios } from "../utils/axios";
import { PRODUCTS } from "./constant";
import { ProductsResponse } from "./type";

const getProducts = async (page = 1, limit = 30, signal?: AbortSignal) => {
  const response: ProductsResponse = await apiAxios.get(PRODUCTS(page, limit), {
    signal,
  });

  return response;
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: [PRODUCTS(1, 30)],
    queryFn: ({ signal }) => getProducts(1, 30, signal),
  });
};
