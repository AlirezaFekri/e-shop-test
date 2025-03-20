import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "30");

  const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];

  const allProducts = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: (Math.random() * 5000 + 50).toFixed(2),
    rating: (Math.random() * 5).toFixed(1),
    image: `https://picsum.photos/200/300?random=${i + 1}`,
  }));

  const startIndex = (page - 1) * limit;
  const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);

  return Response.json({
    products: paginatedProducts,
    total: allProducts.length,
    page,
    totalPages: Math.ceil(allProducts.length / limit),
  });
}
