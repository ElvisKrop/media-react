import React, { useState, useEffect } from "react";

const withToken = (Wrapped) => {
  return (props) => {
    const [token, setToken] = useState(false);
    useEffect(() => {
      if (localStorage.getItem("mrToken")) {
        setToken(true);
      }
    }, [setToken]);
    return <Wrapped {...props} isToken={token} />;
  };
};

export default withToken;
