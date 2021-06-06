import firebase from "@Services/config/firebase";

export type TOption = {
  id: string;
  content: string;
  isCorrect: boolean;
  // selectCount: number;
};

export interface IQuestion {
  id: string;
  exam: string;
  category: string;
  author: string;
  visibility: string;
  description: string;
  title: string;
  options: TOption[];
  explanation: string;
  // answerCount: number;
  // contextId: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
