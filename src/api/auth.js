// Constants
import {
  SERVER_HOST,
  SERVER_PORT,
  API_URL_VERSION,
  API_AUTH,
  REGISTER_API_ENDPOINT,
  LOGIN_API_ENDPOINT,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "../utils/constants";

// Utils
import { validateResponse } from "../utils/utils";

const URL = `${SERVER_HOST}:${SERVER_PORT}/${API_URL_VERSION}/${API_AUTH}`;

const getRequestOptionsToPOSTRequest = (body, additionalOptions = {}) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
  ...additionalOptions,
});

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
