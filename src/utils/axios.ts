import axios from "axios";

import { ALL_INTERCEPTORS } from "./axiosInterceptors";

declare module "axios" {
  export interface AxiosRequestConfig {
    exclude?: (keyof typeof ALL_INTERCEPTORS.request)[];
  }

  export interface AxiosResponse {
    exclude?: (keyof typeof ALL_INTERCEPTORS.response)[];
  }
}

const generateAxiosInstance = ({
  baseURL,
  withCredentials = true,
}: {
  baseURL: string;
  withCredentials?: boolean;
}) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials,
    exclude: [],
  });

  const requestInterceptors = Object.keys(ALL_INTERCEPTORS.request).map(
    (key) => {
      const interceptor =
        ALL_INTERCEPTORS.request[key as keyof typeof ALL_INTERCEPTORS.request];
      return instance.interceptors.request.use(
        interceptor.config,
        interceptor.error
      );
    }
  );
  const responseInterceptors: {
    [key in keyof typeof ALL_INTERCEPTORS.response]: number;
  } = {
    changeCaseResponseInterceptor: 0,
  };
  Object.keys(ALL_INTERCEPTORS.response).map((key) => {
    const interceptor =
      ALL_INTERCEPTORS.response[key as keyof typeof ALL_INTERCEPTORS.response];
    responseInterceptors[key as keyof typeof ALL_INTERCEPTORS.response] =
      instance.interceptors.response.use(
        interceptor.response,
        interceptor.error
      );
  });

  return { instance, requestInterceptors, responseInterceptors };
};

const api = generateAxiosInstance({
  baseURL: process.env.BASE_API_URL ?? "",
});

export const apiAxios = api.instance;
