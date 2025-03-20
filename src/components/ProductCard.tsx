"use client";
import Image from "next/image";
import { Product } from "../app/api/type";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="border cursor-pointer border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mb-2">{product.category}</p>

        <p className="text-2xl font-bold text-blue-600 mb-2">
          ${product.price}
        </p>

        <p className="text-sm text-yellow-500 mb-4">
          Rating: {product.rating} ⭐
        </p>

        <FavoriteButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
