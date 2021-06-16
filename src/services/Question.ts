import { IQuestion } from "@Models/Question";
import firebase from "./config/firebase";
import db, {
  getMultipleDocuments,
  getSingleDocument,
  Timestamp,
  useDocumentSubscription,
  useQuerySubscription,
} from "./config/firestore";

type TQuestionData = Pick<
  IQuestion,
  | "author"
  | "exam"
  | "category"
  | "description"
  | "title"
  | "options"
  | "explanation"
  | "visibility"
  | "contextId"
>;

const questionsDB = db.collection("questions");

export const getQuestionById = async (id: string): Promise<IQuestion> => {
  const data = await getSingleDocument("questions", id);
  return data as IQuestion;
};

export const getQuestions = async (
  ref: firebase.firestore.Query<firebase.firestore.DocumentData> = questionsDB
): Promise<IQuestion[]> => {
  const data = await getMultipleDocuments(ref);
  return data as IQuestion[];
};

export const useQuestionSubscription = (
  ref: firebase.firestore.DocumentReference
): [IQuestion | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useDocumentSubscription(ref);
  const questionSnapshot = latestData as IQuestion | null;
  return [questionSnapshot, error];
};

export const useQuestionQuerySubscription = (
  ref: firebase.firestore.Query
): [IQuestion[], firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useQuerySubscription(ref);
  const querySnapshot = latestData as unknown as IQuestion[];
  return [querySnapshot, error];
};

export const createNewQuestion = async (
  data: TQuestionData
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  const newQuestionRef = await questionsDB.add({
    ...data,
    answerCount: 0,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
  return newQuestionRef;
};

export const updateQuestion = async (
  id: string,
  data: Omit<TQuestionData, "author">
): Promise<void> => {
  await questionsDB.doc(id).update({
    ...data,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await questionsDB.doc(id).delete();
};

export default questionsDB;
