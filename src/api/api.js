import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getAllData(collectionTitle) {
  const q = query(collection(db, collectionTitle));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getDataByLisId(collectionTitle, listId) {
  const q = query(collection(db, collectionTitle), where('listId', '==', listId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
