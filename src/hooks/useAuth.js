import { useState, useEffect } from "react";

// Utils
import { isUserAuthenticated } from "../utils/utils";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const isUserAuth = await isUserAuthenticated();
      setIsAuth(isUserAuth);
    })();
  }, []);

  return [isAuth];
};

export default useAuth;
