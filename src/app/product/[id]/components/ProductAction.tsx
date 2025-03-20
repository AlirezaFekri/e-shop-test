"use client";

import Link from "next/link";
import { useState } from "react";

const ProductAction = () => {
  const [count, setCount] = useState(0);
  const handleAddCount = () => {
    setCount((perv) => perv + 1);
  };
  const handleDecreaseCount = () => {
    setCount((perv) => perv - 1);
  };
  return (
    <div className="flex space-x-4">
      {count === 0 ? (
        <button
          onClick={handleAddCount}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={handleAddCount}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            +
          </button>
          <p>{count}</p>
          <button
            onClick={handleDecreaseCount}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            -
          </button>
        </div>
      )}
      <Link
        href="/"
        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
      >
        Back to Cart
      </Link>
    </div>
  );
};
export default ProductAction;
