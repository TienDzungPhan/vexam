import { useEffect, useMemo, useState } from "react";
import firebase from "./firebase";

const auth = firebase.auth();

export const { currentUser } = auth;

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  return userCredential;
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};

export const useAuthSubscription = (): {
  authenticated: boolean;
  user: firebase.User | undefined;
  error: firebase.auth.Error | undefined;
} => {
  const [user, setUser] = useState<firebase.User>();
  const [error, setError] = useState<firebase.auth.Error>();
  const authenticated = useMemo(() => Boolean(user), [user]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (usr) => setUser(usr || undefined),
      (err) => setError(err)
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return { authenticated, user, error };
};

export default auth;
