import { collection, query, where, getDocs, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function getAllData(collectionTitle) {
  const querySnapshot = await getDocs(collection(db, collectionTitle));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getTodosByLisId(collectionTitle, listId) {
  const q = query(collection(db, collectionTitle), where('listId', '==', listId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createTodo(data) {
  const docRef = await addDoc(collection(db, 'todos'), {
    ...data,
    completed: false,
  });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}
