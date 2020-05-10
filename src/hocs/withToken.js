import React, { useState, useEffect } from "react";

const withToken = (Wrapped) => {
  return (props) => {
    const [token, setToken] = useState();

    useEffect(() => {
      setToken(Boolean(localStorage.getItem("mrToken")));
    }, [props, setToken]);

    return <Wrapped {...props} isToken={token} />;
  };
};

export default withToken;
