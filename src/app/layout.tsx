import { PropsWithChildren } from "react";
import QueryClientWrapper from "@/src/wrapper/QueryClient";
import "./globals.css";
import ReduxWrapper from "../wrapper/Redux";
import StoreProducts from "../components/StoreProducts";
import Link from "next/link";
import Header from "../components/Header";

const RootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <QueryClientWrapper>
            <StoreProducts />
            <Header />
            <main className="max-w-7xl mx-auto px-3 py-4">{children}</main>
          </QueryClientWrapper>
        </ReduxWrapper>
      </body>
    </html>
  );
};
export default RootLayout;
