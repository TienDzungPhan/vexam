import firebase from "@Config/firebase";

export interface IComment {
  id: string;
  question: { id: string };
  parent: { id: string } | null;
  author: {
    id: string;
    name: string;
  };
  likesCount: number;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}
