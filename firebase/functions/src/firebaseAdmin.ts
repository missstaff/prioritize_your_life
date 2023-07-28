import * as admin from "firebase-admin";
const serviceAccount = require("../../services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://organizer-9cce6-rtdb.firebaseio.com",
});


export const auth = admin.auth();
export const database = admin.database();
export const firestore = admin.firestore();
export const storage = admin.storage();
export const messaging = admin.messaging();
