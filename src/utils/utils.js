import { ACCESS_TOKEN_NAME, CURRENT_PAGE_NAME } from "./constants";

export const isUserAuthenticated = () =>
  Boolean(localStorage.getItem(ACCESS_TOKEN_NAME));

export const getCurrentPage = () => localStorage.getItem(CURRENT_PAGE_NAME);
