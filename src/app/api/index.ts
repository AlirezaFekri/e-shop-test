import { PRODUCTS } from "@/src/api/constant";
import { apiFetch } from "@/src/utils/fetchUtils";
import { Product } from "./type";

export const fetchProducts = async () => {
  try {
    const response = await apiFetch(PRODUCTS(), {
      method: "GET",
      next: { revalidate: 5000 },
    });
    const responseData = await response.json();

    const data: Product[] = responseData.products;

    return data;
  } catch (error) {
    throw new Error("failed to get products!");
  }
};
