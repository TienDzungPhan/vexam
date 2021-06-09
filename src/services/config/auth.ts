import { useEffect, useState } from "react";
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

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

export const logOut = async (): Promise<void> => {
  await auth.signOut();
};

export const useAuthSubscription = (): {
  user: firebase.User | null;
  error: firebase.auth.Error | null;
} => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (usr) => setUser(usr),
      (err) => setError(err)
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return { user, error };
};

export default auth;
