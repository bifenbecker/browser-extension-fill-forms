// Constants
import {
  SERVER_HOST,
  SERVER_PORT,
  API_URL_VERSION,
  REGISTER_API_ENDPOINT,
  LOGIN_API_ENDPOINT,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "../utils/constants";

const URL = `${SERVER_HOST}:${SERVER_PORT}/${API_URL_VERSION}`;

const getRequestOptionsToPOSTRequest = (body, additionalOptions = {}) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
  ...additionalOptions,
});

const validateResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson && (await response.json());

  // check for error response
  if (!response.ok) {
    // get error message from body or default to response status
    const error = data || response.status;
    return Promise.reject(error);
  }
  return data;
};

const setAuthTokens = (tokens) => {
  localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh);
};

export function registerNewUser(email, password) {
  const body = {
    email,
    password,
  };
  const data = fetch(
    `${URL}/${REGISTER_API_ENDPOINT}`,
    getRequestOptionsToPOSTRequest(body)
  )
    .then(async (response) => {
      return await validateResponse(response);
    })
    .catch((error) => {
      console.error("Register request error", error);
      throw new Error((error.password || error.email)[0]);
    });
  return data;
}

export function loginUser(email, password) {
  const body = {
    email,
    password,
  };
  const data = fetch(
    `${URL}/${LOGIN_API_ENDPOINT}`,
    getRequestOptionsToPOSTRequest(body)
  )
    .then(async (response) => {
      const data = await validateResponse(response);
      setAuthTokens(data);
      return data;
    })
    .catch((error) => {
      console.error("Login request error", error);
      throw new Error(error.detail);
    });
  return data;
}
