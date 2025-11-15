import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASPCzUdWZ3LZ27iBy-fijgyasXsqK7yEE",
  authDomain: "portfolio-c4ddc.firebaseapp.com",
  projectId: "portfolio-c4ddc",
  storageBucket: "portfolio-c4ddc.firebasestorage.app",
  messagingSenderId: "35329776530",
  appId: "1:35329776530:web:d26028edf1c3c4f232ff4b",
    measurementId: "G-FTC76RS5Z0",

};

// VITE_API_BASE_URL=http://localhost:5000/api
// VITE_API_URL=http://localhost:5000/api



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
