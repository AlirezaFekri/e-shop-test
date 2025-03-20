import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { Product } from "../../type";

interface GetProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: GetProps) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "data", "product.json");

    if (!fs.existsSync(filePath)) {
      return new Response("product.json file not found.", { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const allProducts: Product[] = JSON.parse(fileContents);

    const product = allProducts.find((product) => product.id === parseInt(id));

    if (!product) {
      return new Response("Product not found.", { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
