import { Platform } from "react-native";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/storage";
import {
  API_KEY,
  APP_NAME,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  ANDROID_APP_ID,
  IOS_APP_ID
} from "@env";


export function getFireApp() {

  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: "",
  };

  // Conditionally set the appId based on the platform
  if (Platform.OS === "ios") {
    firebaseConfig.appId = ANDROID_APP_ID;
  } else if (Platform.OS === "android") {
    firebaseConfig.appId = IOS_APP_ID;
  }

  if (!firebase.apps.find(app => app.name === APP_NAME)) {
    return firebase.initializeApp(firebaseConfig, APP_NAME);
  }
  return firebase.app(APP_NAME);
};
