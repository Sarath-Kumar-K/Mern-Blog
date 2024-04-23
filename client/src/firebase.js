// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //As we are using vite process.env not works so imort.meta.env is used
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-blog-31132.firebaseapp.com",
  projectId: "mern-blog-31132",
  storageBucket: "mern-blog-31132.appspot.com",
  messagingSenderId: "972110906117",
  appId: "1:972110906117:web:4ea80e62f0261f28efad6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);