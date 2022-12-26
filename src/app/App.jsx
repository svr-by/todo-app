import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import './App.css';

function App() {
  const [todos, setTodods] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "todos"))
      .then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        const dbTodos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        console.log('dbTodos', dbTodos);
        setTodods(dbTodos);
      })
      .catch(err => console.log(err));

    //   db.collection("todos")
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log('snapshot', querySnapshot);
    //     const dbTodos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data}));
    //     console.log('dbTodos', dbTodos);
    //     setTodods(dbTodos);
    // });
  }, []);

  return (
    <div className="App">
      <h1>To-do app</h1>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
