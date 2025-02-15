import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkv-igCVym7NVKhWCVUpb8Uo_1JfIKkQk",
  authDomain: "portpolio-4a0fe.firebaseapp.com",
  projectId: "portpolio-4a0fe",
  storageBucket: "portpolio-4a0fe.firebasestorage.app",
  messagingSenderId: "817741557055",
  appId: "1:817741557055:web:14820471d211742d4f778a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { app, auth,storage ,db };
