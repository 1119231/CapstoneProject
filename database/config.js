

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where, deleteDoc, addDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAcP7_Ow2M-Wlt8Thn8EHLGPvTL6br_18g",
  authDomain: "capstone-project-fdba4.firebaseapp.com",
  projectId: "capstone-project-fdba4",
  storageBucket: "capstone-project-fdba4.appspot.com",
  messagingSenderId: "635776767654",
  appId: "1:635776767654:web:d9ad1eca813556db468667",
  measurementId: "G-EWN71W0J81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export { app, db, storage, collection, getDocs, doc, updateDoc, query, where, deleteDoc, addDoc, ref, getDownloadURL };
