import firebase from "@Config/firebase";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  exam?: string;
  questionsCount: number;
  followersCount: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
