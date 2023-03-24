import React, { useState } from "react";

// Components
import Loader from "../../components/Loader";

const WithLoadingHOC = (WrappedComponent, data) => {
  function HOC(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    return (
      <>
        {isLoading && <Loader />}
        <WrappedComponent
          {...props}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
        />
      </>
    );
  }

  return HOC;
};

export default WithLoadingHOC;
