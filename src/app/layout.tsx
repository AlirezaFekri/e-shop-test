import { PropsWithChildren } from "react";
import QueryClientWrapper from "@/src/wrapper/QueryClient";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
