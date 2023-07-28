import * as admin from "firebase-admin";
const firstTimeRun = admin.apps.length == 0;
if (firstTimeRun) admin.initializeApp();