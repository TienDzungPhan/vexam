import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "@Modules/NavBar";
import HomePage from "@Pages/HomePage";
import ProfilePage from "@Pages/ProfilePage";
import QuestionModifyPage from "@Pages/QuestionModifyPage";
import QuestionPage from "@Pages/QuestionPage";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import AppDialog from "@Core/AppDialog";
import PrivateRoute from "@Routes/PrivateRoute";
import { AuthContext } from "@Contexts/AuthContext";
import { useAuthSubscription } from "@Config/auth";
import useStyles from "./App.styles";

const App: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const styles = useStyles({ isDesktop });
  const { user } = useAuthSubscription();
  const { handleUserChange } = useContext(AuthContext);
  useEffect(() => {
    handleUserChange(user);
  }, [handleUserChange, user]);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <NavBar />
        <main className={styles.content}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
            <PrivateRoute
              exact
              path="/questions/create"
              component={QuestionModifyPage}
            />
            <Route exact path="/questions/:id" component={QuestionPage} />
            <Route
              exact
              path="/questions/:id/update"
              component={QuestionModifyPage}
            />
          </Switch>
        </main>
      </div>
      <AppDialog />
    </BrowserRouter>
  );
};

export default App;
