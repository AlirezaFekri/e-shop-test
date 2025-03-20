export interface BaseError {
  message: string;
  status: number;
  statusCode: number;
  errors?: string[];
  code?: string;
  config?: string;
}

export interface AxiosBaseResponse {
  message: string;
  status: string;
  statusCode: number;
  data?:
    | { [key: string]: string | number }[]
    | { [key: string]: string | number };
  paginator?: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  offset?: number;
}

export interface Links {
  first: string;
  last: string;
  prev: null | string;
  next: string | null;
}

export interface Meta {
  currentPage: number;
  from: number;
  lastPage: number;
  links: {
    url: null | string;
    label: string;
    active: boolean;
  }[];
  path: string;
  perPage: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  status: string;
  statusCode: number;
  data: T[];
  links: Links;
  meta: Meta;
}

export interface BaseResponse<T> {
  status: string;
  statusCode: number;
  data: T;
}

export interface BaseMedia {
  id: string;
  url: string;
  thumbnailUrl: string;
}
