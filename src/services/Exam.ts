import { IExam } from "@Models/Exam";
import firebase from "./config/firebase";
import db, {
  getMultipleDocuments,
  getSingleDocument,
  useDocumentSubscription,
  useQuerySubscription,
} from "./config/firestore";

const examsDB = db.collection("exams");

export const getExamById = async (id: string): Promise<IExam> => {
  const data = await getSingleDocument("exams", id);
  return data as IExam;
};

export const getExams = async (
  ref: firebase.firestore.Query<firebase.firestore.DocumentData> = examsDB
): Promise<IExam[]> => {
  const data = await getMultipleDocuments(ref);
  return data as IExam[];
};

export const useExamSubscription = (
  ref: firebase.firestore.DocumentReference
): [IExam | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useDocumentSubscription(ref);
  const examSnapshot = latestData as IExam | null;
  return [examSnapshot, error];
};

export const useExamQuerySubscription = (
  ref: firebase.firestore.Query
): [IExam[] | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useQuerySubscription(ref);
  const querySnapshot = latestData as IExam[] | null;
  return [querySnapshot, error];
};

export default examsDB;
