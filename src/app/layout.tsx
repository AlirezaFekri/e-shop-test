import { PropsWithChildren } from "react";
import QueryClientWrapper from "@/src/wrapper/QueryClient";
import "./globals.css";
import ReduxWrapper from "../wrapper/Redux";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </ReduxWrapper>
      </body>
    </html>
  );
};
export default RootLayout;
