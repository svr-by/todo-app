import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { HomeIcon, PlanedIcon, StarIcon } from '../components/icons';

function App() {
  const [todos, setTodods] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'todos'))
      .then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        const dbTodos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('dbTodos', dbTodos);
        setTodods(dbTodos);
      })
      .catch((err) => console.log(err));
  }, []);

  const collections = [
    { title: 'tasks', icon: <HomeIcon className="w-4 h-4" /> },
    { title: 'planed', icon: <PlanedIcon className="w-4 h-4" /> },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex gap-4">
      <section className="p-5 flex-auto w-1/4 bg-slate-200">
        <h1 className="mb-4 text-2xl uppercase">To-do app</h1>
        <ul>
          {collections.map((list, i) => (
            <li key={i} className="mb-2 flex items-center gap-4">
              <span>{list.icon}</span>
              <span className="capitalize">{list.title}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="p-5 flex-auto w-3/4">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
