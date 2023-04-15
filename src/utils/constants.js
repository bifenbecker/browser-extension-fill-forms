// Page names
export const LOGIN_PAGE_NAME = "login_page";
export const REGISTER_PAGE_NAME = "register_page";
export const FILL_FORM_PAGE_NAME = "fill_form_page";
export const PROFILE_PAGE_NAME = "profile_page";
export const EDIT_CUSTOMER_SETTINGS_NAME = "edit_customer_settings_page";

// Backend vars
export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = process.env.SERVER_PORT;
export const API_URL_VERSION = `api/${process.env.API_URL_VERSION}`;
export const API_AUTH = process.env.API_AUTH;
export const API_CUSTOMER_SETTINGS = "customer/settings";
// ENDPOINTS
export const REGISTER_API_ENDPOINT = "users/";
export const LOGIN_API_ENDPOINT = "jwt/create/";

// Text Common
export const NEED_TO_LOGIN = "You need to login";
export const PROFILE_ICON_TOOLTIP_LOGIN = "Login";
export const HOME_PAGE_ICON_TOOLTIP_LOGOUT = "Logout";
export const PROFILE_ICON_TOOLTIP_PROFILE = "Profile";
export const REGISTER_ICON_TOOLTIP_REGISTER = "Register";
export const PROFILE_NAVIGATION_SETTINGS = "Settings";
export const PROFILE_NAVIGATION_ADDRESSES = "Addresses";
export const PROFILE_NAVIGATION_PAYMENTS = "Payments";

// Resent vars

// SIZE of popup
export const WIDTH_MAIN_POPUP = 350;
export const HEIGHT_MAIN_POPUP = 300;

// access token name
export const ACCESS_TOKEN_NAME = "access_token";
// refresh token name
export const REFRESH_TOKEN_NAME = "refresh_token";
// current page name
export const CURRENT_PAGE_NAME = "current_page";

// Vars for requests
export const AUTH_HEADER_NAME = "Authorization";
export const AUTH_TOKEN_TYPE = "JWT";

// REQUEST ERROR CODE
export const ERROR_CODE_TOKEN_NOT_VALID = "token_not_valid";
