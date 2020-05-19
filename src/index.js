import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { ServiceProvider } from "./context";
import MediaReactService from "./services";
import { createStore } from "redux";
import { reducer } from "./redux-store";
import { Provider } from "react-redux";

const userStore = createStore(reducer);

ReactDOM.render(
  <Provider store={userStore}>
    <ServiceProvider value={new MediaReactService()}>
      <App />
    </ServiceProvider>
  </Provider>,
  document.getElementById("root")
);
