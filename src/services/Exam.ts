import { db } from "./config/firebase";

const examsDB = db.collection("exams");

export default examsDB;
