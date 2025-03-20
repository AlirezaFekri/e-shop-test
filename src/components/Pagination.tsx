"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  url?: string;
  paramName?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  url = "/",
  paramName = "page",
}: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`${url}?${paramName}=${page}`);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage == 1}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 cursor-pointer disabled:cursor-default"
      >
        Previous
      </button>

      <div className="max-w-[calc(100%-240px)] flex gap-3 overflow-x-auto">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage == index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage == totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 cursor-pointer disabled:cursor-default"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
