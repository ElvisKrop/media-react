import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MediaReactService from "./services/index";
import { ServiceProvider } from "./context";

ReactDOM.render(
  <ServiceProvider value={new MediaReactService()}>
    <App />
  </ServiceProvider>,
  document.getElementById("root")
);
