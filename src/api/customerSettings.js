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
  return getAuthHeaders().then((authHeaders) => {
    const data = fetch(`${URL}`, {
      headers: authHeaders,
    })
      .then(async (response) => {
        return await validateResponse(response);
      })
      .catch((error) => {
        console.error("Get customer's settings error", error);
        throw new Error(error);
      });
    return data;
  });
}

export const getCustomerSettingsOptions = () => ({
  url: URL,
});

export async function updateCustomerSettings(newCustomerSettings) {
  const authHeaders = await getAuthHeaders();
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

export async function updateCustomerAddress(newAddress) {
  const authHeaders = await getAuthHeaders();
  const data = fetch(`${URL}address/`, {
    method: "PATCH",
    body: JSON.stringify(newAddress),
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

export async function updateCustomerPayments(newPayments) {
  const authHeaders = await getAuthHeaders();
  const data = fetch(`${URL}payment/`, {
    method: "PATCH",
    body: JSON.stringify(newPayments),
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
