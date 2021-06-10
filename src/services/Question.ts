import { IQuestion } from "@Models/Question";
import firebase from "./config/firebase";
import db, {
  getMultipleDocuments,
  getSingleDocument,
  useDocumentSubscription,
  useQuerySubscription,
} from "./config/firestore";

const questionsDB = db.collection("questions");

export const getQuestion = async (id: string): Promise<IQuestion> => {
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
): [IQuestion[] | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useQuerySubscription(ref);
  const querySnapshot = latestData as IQuestion[] | null;
  return [querySnapshot, error];
};

export default questionsDB;
