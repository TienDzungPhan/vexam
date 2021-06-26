import { IContext } from "@Models/Context";
import firebase from "./config/firebase";
import db, {
  getMultipleDocuments,
  getSingleDocument,
  Timestamp,
  useDocumentSubscription,
  useQuerySubscription,
} from "./config/firestore";

export type TContextData = Pick<
  IContext,
  "exam" | "category" | "type" | "content"
>;

const contextsDB = db.collection("contexts");

export const getContextById = async (id: string): Promise<IContext> => {
  const data = await getSingleDocument("contexts", id);
  return data as IContext;
};

export const getContexts = async (
  ref: firebase.firestore.Query<firebase.firestore.DocumentData> = contextsDB
): Promise<IContext[]> => {
  const data = await getMultipleDocuments(ref);
  return data as IContext[];
};

export const useContextSubscription = (
  ref: firebase.firestore.DocumentReference
): [IContext | null, firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useDocumentSubscription(ref);
  const questionSnapshot = latestData as IContext | null;
  return [questionSnapshot, error];
};

export const useContextQuerySubscription = (
  ref: firebase.firestore.Query
): [IContext[], firebase.firestore.FirestoreError | null] => {
  const [latestData, error] = useQuerySubscription(ref);
  const querySnapshot = latestData as unknown as IContext[];
  return [querySnapshot, error];
};

export const createNewContext = async (
  data: TContextData
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  const newContextRef = await contextsDB.add({
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
  return newContextRef;
};

export const updateContext = async (
  id: string,
  data: Omit<TContextData, "exam" | "category">
): Promise<void> => {
  await contextsDB.doc(id).update({
    ...data,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const deleteContext = async (id: string): Promise<void> => {
  await contextsDB.doc(id).delete();
};

export default contextsDB;
