import React, { createContext, useMemo, useState } from "react";
import firebase from "@Config/firebase";

interface IAuthContext {
  authenticated: boolean;
  user: firebase.User | null;
  handleUserChange: (usr: firebase.User | null) => void;
}
export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const authenticated = useMemo(() => Boolean(user), [user]);
  const handleUserChange = (usr: firebase.User | null) => {
    setUser(usr);
  };
  return (
    <AuthContext.Provider value={{ authenticated, user, handleUserChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
