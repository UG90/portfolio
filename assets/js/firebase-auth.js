// Firebase Authentication & Cloud State Module for Atharva Agrawal Portfolio
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updatePassword,
    setPersistence,
    browserLocalPersistence
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Atharva's live Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyA5CpYwQ8EtoT8eeodMsMPT4qFut-anbM8",
  authDomain: "atharva-portfolio-website.firebaseapp.com",
  projectId: "atharva-portfolio-website",
  storageBucket: "atharva-portfolio-website.firebasestorage.app",
  messagingSenderId: "554422119098",
  appId: "1:554422119098:web:2582ec7a3accb137f53083"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistence so admin stays logged in securely across refreshes
setPersistence(auth, browserLocalPersistence).catch(console.error);

export { 
    app, 
    auth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updatePassword,
    firebaseConfig 
};
