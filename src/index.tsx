import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@Modules/App";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import reportWebVitals from "./reportWebVitals";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: "Grandstander, cursive",
    },
  })
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
