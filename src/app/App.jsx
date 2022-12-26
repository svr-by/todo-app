import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

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

  const collections = [{ title: 'home' }, { title: 'planed' }, { title: 'important' }];

  return (
    <div className="App">
      <section>
        <h1>To-do app</h1>
        <ul>
          {collections.map((list, i) => (
            <li key={i}>{list.title}</li>
          ))}
        </ul>
      </section>
      <section>
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
