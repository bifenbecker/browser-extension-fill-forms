import { useState, useEffect } from "react";

// Utils
import { getAuthHeaders, validateResponse } from "../utils/utils";

// Constants
import { ERROR_CODE_TOKEN_NOT_VALID } from "../utils/constants";

const useFetch = (props) => {
  const { url, options = {}, isDefaultAuth = true } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    const fetchResponse = () =>
      new Promise((resolve, reject) => {
        if (isDefaultAuth) {
          getAuthHeaders().then((authHeaders) => {
            fetch(url, {
              ...options,
              headers: {
                ...authHeaders,
              },
            })
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          });
        } else {
          fetch(url, options)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
      });

    fetchResponse()
      .then(async (response) => {
        const data = await validateResponse(response);
        setData({
          data,
        });
      })
      .catch((error) => {
        console.error("useFetch error request - ", error);
        const { code } = error;
        switch (code) {
          case ERROR_CODE_TOKEN_NOT_VALID:
            setError(new Error("Please login again"));
            break;

          default:
            setError(error);
            break;
        }
      })
      .finally(() => setLoading(false));
  }, [url, isDefaultAuth]);

  return [data, loading, error];
};

export default useFetch;
