import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCj8jz1baaa0fbf9F9_DlmEKeEPBlBzJA",
  authDomain: "find-character.firebaseapp.com",
  projectId: "find-character",
  storageBucket: "find-character.appspot.com",
  messagingSenderId: "200909736639",
  appId: "1:200909736639:web:aaa5deeb6fb84b8a2ed40a"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);