import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ServiceProvider } from "./context";
import MediaReactService from "./services";

ReactDOM.render(
  <ServiceProvider value={new MediaReactService()}>
    <App />
  </ServiceProvider>,
  document.getElementById("root")
);
