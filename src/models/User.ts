import firebase from "@Config/firebase";
import { IExam } from "./Exam";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  about?: string;
  studyingExams?: Pick<IExam, "id" | "name">[];
  questionsCount: number;
  followersCount: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
