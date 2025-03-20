import { PRODUCTS } from "@/src/api/constant";
import { apiFetch } from "@/src/utils/fetchUtils";
import { ProductsResponse } from "@/src/api/type";

export const fetchProducts = async (page: number) => {
  try {
    const response = await apiFetch(PRODUCTS(page), {
      method: "GET",
      next: { revalidate: 5000 },
    });
    const responseData = await response.json();

    const data: ProductsResponse = responseData;

    return data;
  } catch {
    throw new Error("failed to get products!");
  }
};
