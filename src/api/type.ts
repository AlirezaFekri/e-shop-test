import { Product } from "../app/api/type";

export interface ProductsResponse {
  page: number;
  products: Product[];
  total: number;
  totalPages: number;
}
