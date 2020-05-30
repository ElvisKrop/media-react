import React, { useEffect } from "react";
import { useUpgradeState } from "../hooks";

const withToken = (Wrapped) => {
  return (props) => {
    const [token, setToken] = useUpgradeState(false, true);

    useEffect(() => {
      setToken(Boolean(localStorage.getItem("mrToken")));
    }, [props, setToken]);

    return <Wrapped {...props} isToken={token} />;
  };
};

export default withToken;
