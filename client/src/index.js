import React from "react";
import ReactDOM from "react-dom";
import Blog from "./components/Blog";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { ResetStyle, GlobalStyle } from "./components/GlobalStyles";

const theme = {
  color: {
    primary: "#0f4660",
    primaryLight: "#44718d",
    primaryDark: "#001f36",
    onPrimary: "#0f46600d",
    white: "#ffffff",
    grey: {
      900: "#323232",
      700: "#565656",
      500: "#7b7b7b",
      300: "#cccccc",
      100: "#f4f4f4",
    },
    black: "#212121",
    error: "#e10000",
  },
  opacity: {
    strong: "de",
    medium: "99",
    diabled: "61",
  },
  media: {
    sm: "@media (max-width: 381px)",
    md: "@media (max-width: 600px)",
  },
  wrapper: {
    sm: 420,
    md: 736,
    lg: 1152,
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ResetStyle />
      <GlobalStyle />
      <Blog />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
