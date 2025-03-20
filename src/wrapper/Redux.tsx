"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PropsWithChildren } from "react";

const ReduxWrapper = ({ children }: PropsWithChildren) => {
  return <Provider store={store}> {children}</Provider>;
};
export default ReduxWrapper;
