import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { db, auth } from './config';

export function signUpFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutFirebase() {
  return signOut(auth);
}

export function onAuthFirebase(handlerAuth) {
  return onAuthStateChanged(auth, handlerAuth);
}

export async function getCollectionDocs(collectionTitle) {
  const querySnapshot = await getDocs(collection(db, collectionTitle));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getEqualToDocs(collectionTitle, field, fieldValue) {
  const q = query(collection(db, collectionTitle), where(field, '==', fieldValue));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getNotEqualDocs(collectionTitle, field, fieldValue) {
  const q = query(collection(db, collectionTitle), where(field, '!=', fieldValue));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createDoc(collectionTitle, data) {
  const docRef = await addDoc(collection(db, collectionTitle), data);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function createDocById(collectionTitle, docId, data) {
  const docRef = doc(db, collectionTitle, docId);
  const docSnap = await setDoc(docRef, data);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function updateDocById(collectionTitle, docId, data) {
  const docRef = doc(db, collectionTitle, docId);
  updateDoc(docRef, data);
}

export async function deleteDocById(collectionTitle, docId) {
  const docRef = doc(db, collectionTitle, docId);
  deleteDoc(docRef);
}
