import React from "react";
import { ServiceConsumer } from "../context";

const withService = () => (Wrapped) => {
  return (props) => {
    //TODO rename service to mrService
    return (
      <ServiceConsumer>
        {(service) => {
          return <Wrapped {...props} service={service} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default withService;
