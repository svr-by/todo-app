import { useEffect, useState } from 'react';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon } from '../components/icons';
import { getDataFromCollection } from '../api/api';

function App() {
  const [todos, setTodods] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getDataFromCollection('todos').then(setTodods);
    getDataFromCollection('lists').then(setLists);
  }, []);

  const mainLists = [
    { title: 'tasks', icon: <HomeIcon className="w-4 h-4" /> },
    { title: 'planed', icon: <PlanedIcon className="w-4 h-4" /> },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex gap-4">
      <section className="p-5 flex-auto w-1/4 bg-slate-200">
        <h1 className="mb-4 text-2xl uppercase">To-do app</h1>
        <ul>
          {mainLists.map((list, i) => (
            <li
              key={i}
              className="py-3 px-1 flex items-center gap-4 cursor-pointer hover:bg-slate-400 hover:text-white"
            >
              {list.icon}
              <span className="capitalize">{list.title}</span>
            </li>
          ))}
          <hr className="h-0.5 my-4 bg-slate-400" />
          {lists.map((list) => (
            <li
              key={list.id}
              className="py-3 px-1 flex items-center gap-4 cursor-pointer hover:bg-slate-400 hover:text-white"
            >
              <ListIcon className="w-4 h-4" />
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
