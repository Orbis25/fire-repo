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

export const collection = "/peoples";

//initialize
export const firebaseConfiguration = initializeApp(firebaseConfig);
