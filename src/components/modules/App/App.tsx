import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "@Modules/NavBar";
import HomePage from "@Pages/HomePage";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import useStyles from "./App.styles";

const App: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const styles = useStyles({ isDesktop });
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <NavBar />
        <main className={styles.content}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
