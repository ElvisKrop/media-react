import React from "react";
import PropTypes from "prop-types";

const ErrorList = ({ errors }) => {
  return (
    <ul>
      {Object.entries(errors).map((item, i) => {
        return <ErrorItem key={i} area={item[0]} messages={item[1]} />;
      })}
    </ul>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.object
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

ErrorItem.propTypes = {
  area: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string)
};

export default ErrorList;
