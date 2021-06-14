import { IUser } from "@Models/User";
// import firebase from "./config/firebase";
import db, { getSingleDocument, Timestamp } from "./config/firestore";

type TUserData = Pick<IUser, "name" | "email" | "about" | "studyingExams">;

const usersDB = db.collection("users");

export const getUserById = async (id: string): Promise<IUser | null> => {
  if (id === "") return null;
  const user = await getSingleDocument("users", id);
  return user as IUser;
};

export const addNewUserData = async (
  uid: string,
  data: Pick<TUserData, "name" | "email">
): Promise<void> => {
  await usersDB.doc(uid).set({
    ...data,
    questionsCount: 0,
    followersCount: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const updateUserData = async (
  id: string,
  data: Omit<TUserData, "email">
): Promise<void> => {
  await usersDB.doc(id).update({
    ...data,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export default usersDB;
