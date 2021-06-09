import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "@Modules/NavBar";
import HomePage from "@Pages/HomePage";
import ProfilePage from "@Pages/ProfilePage";
import CreateQuestionPage from "@Pages/CreateQuestionPage";
import QuestionPage from "@Pages/QuestionPage";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import AppDialog from "@Core/AppDialog";
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
            <Route exact path="/profile/:id">
              <ProfilePage />
            </Route>
            <Route exact path="/questions/create">
              <CreateQuestionPage />
            </Route>
            <Route exact path="/questions/:id">
              <QuestionPage />
            </Route>
          </Switch>
        </main>
      </div>
      <AppDialog />
    </BrowserRouter>
  );
};

export default App;
