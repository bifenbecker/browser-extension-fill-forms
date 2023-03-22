// Constants
import {
  SERVER_HOST,
  SERVER_PORT,
  API_URL_VERSION,
  API_CUSTOMER_SETTINGS,
} from "../utils/constants";

// Utils
import { getAuthHeaders, validateResponse } from "../utils/utils";

const URL = `${SERVER_HOST}:${SERVER_PORT}/${API_URL_VERSION}/${API_CUSTOMER_SETTINGS}/`;

export function getCustomerSettings() {
  const headers = getAuthHeaders();
  const data = fetch(`${URL}`, {
    headers,
  })
    .then(async (response) => {
      return await validateResponse(response);
    })
    .catch((error) => {
      console.error("Get customer's settings error", error);
      throw new Error(error);
    });
  return data;
}

export function updateCustomerSettings(newCustomerSettings) {
  const authHeaders = getAuthHeaders();
  const data = fetch(`${URL}`, {
    method: "PATCH",
    body: JSON.stringify(newCustomerSettings),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...authHeaders,
    },
  })
    .then(async (response) => {
      console.log(response);
      return await validateResponse(response);
    })
    .catch((error) => {
      console.error("Update customer's settings error", error);
      throw new Error(error);
    });
  return data;
}
