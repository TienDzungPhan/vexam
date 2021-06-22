import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@Modules/App";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@App/store";
import DialogProvider from "@Contexts/DialogContext";
import AuthProvider from "@Contexts/AuthContext";
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
      <ReduxProvider store={store}>
        <AuthProvider>
          <DialogProvider>
            <App />
          </DialogProvider>
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
