import { useQuery } from "@tanstack/react-query";
import { apiAxios } from "../utils/axios";
import { PRODUCTS } from "./constant";
import { ProductsResponse } from "./type";
import { useSearchParams } from "next/navigation";

const getProducts = async (
  page: number,
  limit: number,
  signal?: AbortSignal
) => {
  const response: ProductsResponse = await apiAxios.get(PRODUCTS(page), {
    signal,
  });

  return response;
};

export const useGetProducts = () => {
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");
  const page = parseInt(pageParams || "1");
  return useQuery({
    queryKey: [PRODUCTS(page, 32)],
    queryFn: ({ signal }) => getProducts(page, 32, signal),
  });
};
