import { IComment } from "@Models/Comment";
import firebase from "./config/firebase";
import db, {
  getMultipleDocuments,
  getSingleDocument,
  Timestamp,
  useDocumentSubscription,
  useQuerySubscription,
} from "./config/firestore";

type TCommentData = Pick<
  IComment,
  "question" | "author" | "content" | "parent"
>;

const commentsDB = db.collection("comments");

export const getCommentById = async (id: string): Promise<IComment> => {
  const data = await getSingleDocument("comments", id);
  return data as IComment;
};

export const getComments = async (
  ref: firebase.firestore.Query<firebase.firestore.DocumentData> = commentsDB
): Promise<IComment[]> => {
  const data = await getMultipleDocuments(ref);
  return data as IComment[];
};

export const useCommentSubscription = (
  ref: firebase.firestore.DocumentReference
): [IComment | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useDocumentSubscription(ref);
  const commentSnapshot = latestData as IComment | null;
  return [commentSnapshot, error];
};

export const useCommentQuerySubscription = (
  ref: firebase.firestore.Query
): [IComment[], firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useQuerySubscription(ref);
  const querySnapshot = latestData as unknown as IComment[];
  return [querySnapshot, error];
};

export const createNewComment = async (
  data: TCommentData
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  const newCommentRef = await commentsDB.add({
    ...data,
    likesCount: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
  return newCommentRef;
};

export const updateComment = async (
  id: string,
  data: Pick<TCommentData, "content">
): Promise<void> => {
  await commentsDB.doc(id).update({
    ...data,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  await commentsDB.doc(id).delete();
};

export default commentsDB;
