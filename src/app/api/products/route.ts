import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "30");

  const filePath = path.join(process.cwd(), "data", "product.json");

  const fileContents = fs.readFileSync(filePath, "utf8");
  const allProducts = JSON.parse(fileContents);

  const startIndex = (page - 1) * limit;
  const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);

  return Response.json({
    products: paginatedProducts,
    total: allProducts.length,
    page,
    totalPages: Math.ceil(allProducts.length / limit),
  });
}
