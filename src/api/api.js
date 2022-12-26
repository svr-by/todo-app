import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export function getDataFromCollection(collectionTitle) {
  return getDocs(collection(db, collectionTitle))
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    })
    .catch((err) => console.log(err));
}
