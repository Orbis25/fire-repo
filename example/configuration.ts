import { initializeApp } from "firebase/app";

//configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const collection = "/test";

//initialize
export const firebaseConfiguration = initializeApp(firebaseConfig);
