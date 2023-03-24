import React from "react";

// Pages
import LoginPage from "../../pages/AuthPage/LoginPage";

// Constants
import { NEED_TO_LOGIN } from "../../utils/constants";

// Hooks
import useAuth from "../../hooks/useAuth";

const WithAuthHOC = (WrappedComponent) => (props) => {
  const [isAuth] = useAuth();
  return isAuth ? (
    <WrappedComponent {...props} />
  ) : (
    <LoginPage {...props} messageToUser={NEED_TO_LOGIN} />
  );
};

export default WithAuthHOC;
