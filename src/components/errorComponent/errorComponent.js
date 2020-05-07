import React from "react";
import "./errorComponent.css";

const Magnify = () => {
  return (
    <div className="loadingio-spinner-magnify-owxj8i7tkie">
      <div className="ldio-6diit2rstn3">
        <div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ErrorComponent({ error }) {
  return (
    <div className="text-center">
      <Magnify />
      <h2>Fail: {error}</h2>
    </div>
  );
}
