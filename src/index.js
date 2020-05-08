import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ServiceProvider } from "./context";
import MediaReactService from "./services";
<<<<<<< HEAD

ReactDOM.render(
  <ServiceProvider value={new MediaReactService()}>
    <App />
  </ServiceProvider>,
=======
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
>>>>>>> master
  document.getElementById("root")
);
