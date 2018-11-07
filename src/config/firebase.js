import * as firebase from "firebase";
import { FirebaseConfig } from "../config/keys";

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export const todoStore = db.collection('todos');

export const todosRef = databaseRef.child('todos');
