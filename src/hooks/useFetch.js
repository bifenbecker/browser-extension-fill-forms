import { useState, useEffect } from "react";

// Utils
import { getAuthHeaders, validateResponse } from "../utils/utils";

const useFetch = (props) => {
  const { url, options = {}, isDefaultAuth = true } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRestore = () => {
    setError(null);
    setLoading(false);
    setData({});
  };

  useEffect(() => {
    handleRestore();
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
              .catch(() => reject());
          });
        } else {
          fetch(url, options)
            .then((response) => resolve(response))
            .catch(() => reject());
        }
      });

    fetchResponse()
      .then(async (response) => {
        const data = await validateResponse(response);
        setData({
          data,
        });
      })
      .catch((error) => setError("Bad request"))
      .finally(() => setLoading(false));
  }, [url, isDefaultAuth]);

  return [data, loading, error];
};

export default useFetch;
