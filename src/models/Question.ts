import firebase from "@Config/firebase";
import { IExam } from "./Exam";
import { IUser } from "./User";

export type TOption = {
  id: string;
  content: string;
  isCorrect: boolean;
  selectCount: number;
};

export interface IQuestion {
  id: string;
  exam: Pick<IExam, "id" | "name">;
  category: string;
  author: Pick<IUser, "id" | "name">;
  visibility: "public" | "private";
  description?: string;
  title: string;
  options: TOption[];
  explanation: string;
  answerCount: number;
  contextId?: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
