import { db } from "./config/firebase";

const questionsDB = db.collection("questions");

export default questionsDB;
