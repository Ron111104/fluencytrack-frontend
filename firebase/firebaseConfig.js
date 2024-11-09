import { initializeApp ,getApps,getApp} from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage"; // Storage
import { getAnalytics } from "firebase/analytics"; // Analytics if you need it

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Firestore database
const storage = getStorage(app); // Cloud Storage
//const analytics = getAnalytics(app); // Only if using Analytics

export { auth, db, storage,app};