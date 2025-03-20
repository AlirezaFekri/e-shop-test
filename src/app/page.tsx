import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "./api";

interface PageProps {
  searchParams: Promise<{
    page?: number;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const data = await fetchProducts(+(page || 1));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductCard product={product} key={product.image} />
        ))}
      </div>
      <Pagination currentPage={+(page || 1)} totalPages={data.totalPages} />
    </>
  );
};

export default Page;
