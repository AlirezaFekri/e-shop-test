import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { AxiosBaseResponse, BaseError } from "@/src/types/request";

export const changeCaseRequestInterceptor = {
  config: (config: InternalAxiosRequestConfig) => {
    return config;
  },
  error: (error: AxiosError) => Promise.reject(error),
};

export const changeCaseResponseInterceptor = {
  response: (response: AxiosResponse) => {
    if (response.exclude?.includes("changeCaseResponseInterceptor")) {
      return response;
    }

    return response.data as AxiosResponse<AxiosBaseResponse>;
  },
  error: (error: AxiosError) => {
    const customError = error?.response?.data
      ? (error.response.data as BaseError)
      : null;

    if (customError) {
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  },
};

export const ALL_INTERCEPTORS = {
  request: { changeCaseRequestInterceptor },
  response: { changeCaseResponseInterceptor },
};
