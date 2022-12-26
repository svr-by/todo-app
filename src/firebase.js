import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVIesZAecn5L-4mnmhBxCV251tcXZ8lFU',
  authDomain: 'react-to-do-app-207e9.firebaseapp.com',
  projectId: 'react-to-do-app-207e9',
  storageBucket: 'react-to-do-app-207e9.appspot.com',
  messagingSenderId: '777811654217',
  appId: '1:777811654217:web:21f3ecfb8b29cf0e97f198',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
