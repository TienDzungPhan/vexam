import db from "./config/firestore";

const questionsDB = db.collection("questions");

export default questionsDB;
