const ProductSkeleton = () => {
  return (
    <div className="animate-pulse w-full bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-8 bg-gray-400 rounded w-full"></div>
    </div>
  );
};
export default ProductSkeleton;
