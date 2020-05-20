import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorList = ({ errors }) => {
  return Object.entries(errors).map((item, i) => {
    return <ErrorItem key={i} area={item[0]} messages={item[1]} />;
  });
};

const ErrorItem = ({ area, messages }) => {
  messages.map((mes) => {
    return toast.error(`In the ${area}: ${mes}`);
  });
  return <ToastContainer position="bottom-right" />;
};

export default ErrorList;
