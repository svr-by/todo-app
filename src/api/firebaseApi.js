import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export async function getCollectionData(collectionTitle) {
  const querySnapshot = await getDocs(collection(db, collectionTitle));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getFilteredData(collectionTitle, field, fieldValue) {
  const q = query(collection(db, collectionTitle), where(field, '==', fieldValue));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createDoc(collectionTitle, data) {
  const docRef = await addDoc(collection(db, collectionTitle), data);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function deleteDocById(collectionTitle, docId) {
  await deleteDoc(doc(db, collectionTitle, docId));
}
