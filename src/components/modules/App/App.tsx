import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "@Modules/NavBar";
import HomePage from "@Pages/HomePage";
import useStyles from "./App.styles";

const App: React.FC = () => {
  const styles = useStyles();
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
