import { IUser } from "@Models/User";
// import firebase from "./config/firebase";
import db, { getSingleDocument, Timestamp } from "./config/firestore";

interface IUserData {
  name: string;
  email: string;
}

const usersDB = db.collection("users");

export const getUserById = async (id: string): Promise<IUser | null> => {
  if (id === "") return null;
  const user = await getSingleDocument("users", id);
  return user as IUser;
};

export const addNewUserData = async (
  uid: string,
  data: IUserData
): Promise<void> => {
  await usersDB.doc(uid).set({
    ...data,
    questionsCount: 0,
    followersCount: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export default usersDB;
