import React, { useContext } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute: React.FC<any> = ({ component: Component, ...others }) => {
  const { authenticated } = useContext(AuthContext);
  // eslint-disable-next-line no-console
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
      render={(props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
