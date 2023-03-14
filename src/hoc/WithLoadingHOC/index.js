import React from "react";

const WithLoadingHOC =
  (WrappedComponent, loading = false, errorMessage = null) =>
  (props) => {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      if (errorMessage) {
        return <div>{errorMessage}</div>;
      }
    }
    return <WrappedComponent {...props} />;
  };

export default WithLoadingHOC;
