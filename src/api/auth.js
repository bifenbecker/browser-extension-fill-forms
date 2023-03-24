// Constants
import {
  SERVER_HOST,
  SERVER_PORT,
  API_URL_VERSION,
  API_AUTH,
  REGISTER_API_ENDPOINT,
  LOGIN_API_ENDPOINT,
} from "../utils/constants";

// Utils
import { validateResponse, setAuthTokens } from "../utils/utils";

const URL = `${SERVER_HOST}:${SERVER_PORT}/${API_URL_VERSION}/${API_AUTH}`;

const getRequestOptionsToPOSTRequest = (body, additionalOptions = {}) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
  ...additionalOptions,
});

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
