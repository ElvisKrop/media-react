import React from "react";

const ErrorList = ({ errors }) => {
  return (
    <ul>
      {Object.entries(errors).map((item, i) => {
        return <ErrorItem key={i} area={item[0]} messages={item[1]} />;
      })}
    </ul>
  );
};

const ErrorItem = ({ area, messages }) => {
  return (
    <>
      {messages.map((mes, i) => (
        <li className="text-danger" key={i}>{`In ${area}: ${mes}`}</li>
      ))}
    </>
  );
};

export default ErrorList;
