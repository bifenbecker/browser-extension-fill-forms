import React from "react";

// Components
import Loader from "../../components/Loader";

// Hooks
import useFetch from "../../hooks/useFetch";

const WithFetchLoadingHOC = (WrappedComponent, requestData) => {
  function HOC(props) {
    const [data, loading, error] = useFetch(requestData);
    return (
      <>
        {loading && <Loader />}
        {error && { error }}
        {!loading && !error && Object.keys(data).length !== 0 && (
          <WrappedComponent {...props} data={data} />
        )}
      </>
    );
  }

  return HOC;
};

export default WithFetchLoadingHOC;
