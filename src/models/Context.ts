import firebase from "@Config/firebase";
import { IExam } from "./Exam";

export interface IContext {
  id: string;
  exam: Pick<IExam, "id" | "name">;
  category: string;
  type:
    | "text"
    | "image"
    | "audio"
    | "text/image"
    | "text/audio"
    | "image/audio"
    | "all";
  content: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
