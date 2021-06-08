import { useEffect, useState } from "react";
import firebase from "./firebase";

const db = firebase.firestore();

export const { Timestamp } = firebase.firestore;

export const getSingleDocument = async (
  collection: string,
  id: string
): Promise<unknown> => {
  const doc = await db.collection(collection).doc(id).get();
  const data = { id: doc.id, ...doc.data() };
  return data;
};

export const getMultipleDocuments = async (
  ref: firebase.firestore.Query<firebase.firestore.DocumentData>
): Promise<unknown[]> => {
  const snapshot = await ref.get();
  const data: unknown[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data;
};

export const useDocumentSubscription = (
  ref: firebase.firestore.DocumentReference
): [
  Record<string, unknown> | null,
  firebase.firestore.FirestoreError | null
] => {
  const [latestData, setLatestData] =
    useState<Record<string, unknown> | null>(null);
  const [error, setError] =
    useState<firebase.firestore.FirestoreError | null>(null);
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      (doc) => {
        setLatestData({ doc: doc.id, ...doc.data() });
      },
      (err) => setError(err)
    );
    return () => {
      unsubscribe();
    };
    // Adding ref to the deps array will make the hooks keep on re-rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [latestData, error];
};

export const useQuerySubscription = (
  ref: firebase.firestore.Query
): [
  Record<string, unknown>[] | null,
  firebase.firestore.FirestoreError | null
] => {
  const [latestData, setLatestData] =
    useState<Record<string, unknown>[] | null>(null);
  const [error, setError] =
    useState<firebase.firestore.FirestoreError | null>(null);
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const data: Record<string, unknown>[] = [];
        snapshot.forEach((doc) => data.push({ doc: doc.id, ...doc.data() }));
        setLatestData(data);
      },
      (err) => setError(err)
    );
    return () => {
      unsubscribe();
    };
    // Adding ref to the deps array will make the hooks keep on re-rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [latestData, error];
};

export default db;
