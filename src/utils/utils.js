/* eslint-disable no-undef */
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  CURRENT_PAGE_NAME,
  AUTH_HEADER_NAME,
  AUTH_TOKEN_TYPE,
} from "./constants";

export const isUserAuthenticated = () => {
  const isUserAuthenticated = getFromStorage(ACCESS_TOKEN_NAME)
    .then((token) => Boolean(token))
    .catch(() => false);
  return isUserAuthenticated;
};

export const logoutUser = () => {
  return new Promise((resolve, reject) =>
    chrome.storage.sync
      .get([ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME])
      .then((tokens) => {
        const keys = Object.keys(tokens);
        chrome.storage.sync
          .remove(keys)
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error))
  );
};

export const getFromStorage = (key) =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });

export const setToStorage = (data) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync
      .set(data)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  );

export const getCurrentPage = () =>
  getFromStorage(CURRENT_PAGE_NAME).then((result) => result);

export const getAuthTokens = () =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get(
      [ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME],
      (tokens) => {
        if (tokens?.[ACCESS_TOKEN_NAME] && tokens?.[REFRESH_TOKEN_NAME]) {
          resolve(tokens);
        }
        reject();
      }
    );
  });

export const setAuthTokens = (tokens) => {
  setToStorage({
    [ACCESS_TOKEN_NAME]: tokens.access,
    [REFRESH_TOKEN_NAME]: tokens.refresh,
  });
};

export const getAuthHeaders = () =>
  new Promise((resolve, reject) => {
    getAuthTokens()
      .then((tokens) => {
        resolve({
          [AUTH_HEADER_NAME]: `${AUTH_TOKEN_TYPE} ${tokens[ACCESS_TOKEN_NAME]}`,
        });
      })
      .catch((error) => reject(error));
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
