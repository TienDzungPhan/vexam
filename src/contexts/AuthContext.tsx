import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import firebase from "@Config/firebase";
import { IUser } from "@Models/User";
import { getUserById } from "@Services/User";

interface IAuthContext {
  authenticated: boolean;
  user: firebase.User | null;
  userData: IUser | null;
  handleUserChange: (usr: firebase.User | null) => void;
}
export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const authenticated = useMemo(() => Boolean(user), [user]);
  const handleUserChange = (usr: firebase.User | null) => {
    setUser(usr);
  };
  const loadUserData = useCallback(async () => {
    try {
      const data = await getUserById(user?.uid || "");
      setUserData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [user]);
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);
  return (
    <AuthContext.Provider
      value={{ authenticated, user, userData, handleUserChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
