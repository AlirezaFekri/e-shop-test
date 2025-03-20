"use client";

import { ChangeEvent, Suspense, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { useGetProducts } from "../api";
import { useSearchParams } from "next/navigation";
import { Product } from "./api/type";
import ProductSkeleton from "../components/ProductSkeleton";

const Page = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    price: [0, 1000],
    rating: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isPending, error } = useGetProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useMemo(() => {
    if (data?.products) {
      let filtered = data.products;

      if (filters.category !== "") {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      if (filters.price) {
        filtered = filtered.filter(
          (product) =>
            product.price >= filters.price[0] &&
            product.price <= filters.price[1]
        );
      }

      if (filters.rating > 0) {
        filtered = filtered.filter(
          (product) => product.rating >= filters.rating
        );
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [data, filters, searchQuery]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row space-x-4 mb-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="range"
          name="price"
          min="0"
          max="1000"
          value={filters.price[1]}
          onChange={(e) =>
            setFilters({ ...filters, price: [0, +e.target.value] })
          }
          className="w-full"
        />
        <span>Max Price: ${filters.price[1]}</span>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {error && <p className="text-red-500">{error.message}</p>}
      {filteredProducts.length === 0 && <p>nothing find with your filter</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isPending
          ? [...Array(32)].map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <Pagination
        currentPage={+(searchParams.get("page") || 1)}
        totalPages={data?.totalPages || 1}
      />
    </div>
  );
};

const PageWrapper = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default PageWrapper;
