import React from "react";

// Components
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

// Hooks
import useFetch from "../../hooks/useFetch";

const WithFetchLoadingHOC = (WrappedComponent, requestData) => {
  function HOC(props) {
    const [data, loading, error] = useFetch(requestData);

    const defineState = () => {
      if (loading) {
        return <Loader />;
      } else {
        if (error) {
          return <ErrorMessage error={error} />;
        } else {
          if (data) {
            return <WrappedComponent {...props} data={data} />;
          }
        }
      }
      return <ErrorMessage error={new Error("Unknown error")} />;
    };

    return defineState();
  }

  return HOC;
};

export default WithFetchLoadingHOC;
