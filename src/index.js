import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Blog from "./components/Blog";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Blog />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
