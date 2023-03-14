import React from "react";

// Pages
import LoginPage from "../../pages/AuthPage/LoginPage";

// Constants
import { NEED_TO_LOGIN } from "../../utils/constants";

// Utils
import { isUserAuthenticated } from "../../utils/utils";

const WithAuthHOC = (WrappedComponent) => (props) => {
  console.log(isUserAuthenticated(), localStorage.getItem("access_token"));
  return isUserAuthenticated() ? (
    <WrappedComponent {...props} />
  ) : (
    <LoginPage {...props} messageToUser={NEED_TO_LOGIN} />
  );
};

export default WithAuthHOC;
