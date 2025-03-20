import ProductCard from "../components/ProductCard";
import { fetchProducts } from "./api";

const Page = async () => {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.image} />
      ))}
    </div>
  );
};

export default Page;
