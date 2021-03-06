import React from "react";
import { ServiceConsumer } from "../context";

const withService = () => (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(service) => {
          return <Wrapped {...props} mrService={service} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default withService;
