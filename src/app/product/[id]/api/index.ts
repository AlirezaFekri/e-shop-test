import { Product } from "@/src/app/api/type";
import { apiFetch } from "@/src/utils/fetchUtils";
import { PRODUCT_BY_ID } from "./constant";

export const getProduct = async (id: number) => {
  try {
    const response = await apiFetch(PRODUCT_BY_ID(id), {
      method: "GET",
      next: { revalidate: 5000 },
    });
    const responseData = await response.json();

    const data: Product = responseData;

    return data;
  } catch (error) {
    throw new Error("failed to get product!");
  }
};
