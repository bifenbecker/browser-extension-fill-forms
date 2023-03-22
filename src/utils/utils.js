import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  CURRENT_PAGE_NAME,
  AUTH_HEADER_NAME,
  AUTH_TOKEN_TYPE,
} from "./constants";

export const isUserAuthenticated = () =>
  Boolean(localStorage.getItem(ACCESS_TOKEN_NAME));

export const getCurrentPage = () => localStorage.getItem(CURRENT_PAGE_NAME);

export const getAuthTokens = () => ({
  [ACCESS_TOKEN_NAME]: localStorage.getItem(ACCESS_TOKEN_NAME),
  [REFRESH_TOKEN_NAME]: localStorage.getItem(REFRESH_TOKEN_NAME),
});

export const getAuthHeaders = () => ({
  [AUTH_HEADER_NAME]: `${AUTH_TOKEN_TYPE} ${
    getAuthTokens()[ACCESS_TOKEN_NAME]
  }`,
});

export const validateResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson && (await response.json());

  // check for error response
  if (!response.ok) {
    // get error message from body or default to response status
    if (response.status === 401) {
      localStorage.clear();
    }
    const error = data || response.status;
    return Promise.reject(error);
  }
  return data;
};
