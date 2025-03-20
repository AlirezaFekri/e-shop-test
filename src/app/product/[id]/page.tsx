import FavoriteButton from "@/src/components/FavoriteButton";
import { getProduct } from "./api";
import ProductAction from "./components/ProductAction";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: number;
  }>;
}
const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
          <Image
            width={0}
            height={0}
            sizes="100VW"
            className="w-full h-auto rounded-lg shadow-lg"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-2/3 lg:w-2/3 px-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{product.category}</p>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            ${product.price}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-500">⭐</span>
            <span className="text-gray-600">{product.rating}</span>
          </div>

          <p className="text-gray-700 mt-4 text-base">{product.description}</p>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Key Features
            </h3>
          </div>

          <div className="flex mt-6 flex-col lg:flex-row justify-center items-center gap-8">
            <ProductAction />
            <FavoriteButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
