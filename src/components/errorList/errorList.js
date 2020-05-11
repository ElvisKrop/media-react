import React from "react";

const ErrorItem = ({ area, messages }) => {
  return (
    <div className="alert alert-danger d-flex m-auto col-lg-6 col-sm-10 col-11">
      <strong>In the {area}: </strong>
      <ul>
        {messages.map((mes, i) => (
          <li key={i}>{mes}</li>
        ))}
      </ul>
    </div>
  );
};

const ErrorList = ({ errors }) => {
  return (
    <div className="container mt-4">
      {Object.entries(errors).map((item, i) => (
        <ErrorItem key={i} area={item[0]} messages={item[1]} />
      ))}
    </div>
  );
};

export default ErrorList;
