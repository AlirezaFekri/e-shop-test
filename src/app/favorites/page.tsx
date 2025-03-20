"use client";

import ProductCard from "@/src/components/ProductCard";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";

const Page = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <div className="container mx-auto p-4">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-8">
          You haven't added any favorites yet.
        </p>
      )}
    </div>
  );
};

export default Page;
