const applyInterceptors = async (
  input: RequestInfo | URL,
  init: RequestInit,
  interceptors: {
    request?: (
      input: RequestInfo | URL,
      init: RequestInit
    ) => Promise<[RequestInfo | URL, RequestInit]>;
    response?: (response: Response) => Promise<Response>;
  }
): Promise<Response> => {
  let requestInput = input;
  let requestInit = init;

  if (interceptors.request) {
    [requestInput, requestInit] = await interceptors.request(
      requestInput,
      requestInit
    );
  }

  try {
    const response = await fetch(requestInput, requestInit);

    if (interceptors.response) {
      return await interceptors.response(response);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const requestInterceptor = async (
  input: RequestInfo | URL,
  init: RequestInit
): Promise<[RequestInfo | URL, RequestInit]> => {
  const headers = new Headers(init.headers);
  const body = init.body ? JSON.parse(init.body as string) : undefined;

  if (body && headers.get("Content-Type") === "application/json") {
    init.body = JSON.stringify(body);
  }

  if (input instanceof URL) {
    const params = Object.fromEntries(input.searchParams.entries());
    input.search = new URLSearchParams(params).toString();
  }

  init.headers = Object.fromEntries(headers.entries());

  return [input, init];
};

const responseInterceptor = async (response: Response) => {
  if (!response.ok) throw response;

  const contentType = response.headers.get("Content-Type");
  let responseData = null;

  if (contentType && contentType.includes("application/json")) {
    responseData = await response.json();
  }

  if (responseData && typeof responseData === "object") {
    return new Response(JSON.stringify(responseData), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return response;
};

export const fetchWrapper = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  return applyInterceptors(url, options, {
    request: requestInterceptor,
    response: responseInterceptor,
  });
};

const createFetchInstance = (
  baseURL: string,
  defaultOptions: RequestInit = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  }
) => {
  return async (endpoint: string, options: RequestInit = {}) => {
    const fixedBaseURL = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
    const fixedEndPoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    const url = fixedBaseURL + fixedEndPoint;
    const mergedOptions = { ...defaultOptions, ...options };
    return fetchWrapper(url, mergedOptions);
  };
};

export const apiFetch = createFetchInstance(process.env.BASE_API_URL!);
