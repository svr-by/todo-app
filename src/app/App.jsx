import { useEffect, useState } from 'react';
import { getDataFromCollection } from '../api/api';
import { TodoSection, NavSection } from '../components';
import DBContext from '../context/db';

function App() {
  const [todos, setTodods] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getDataFromCollection('todos').then(setTodods);
    getDataFromCollection('lists').then(setLists);
  }, []);

  return (
    <DBContext.Provider value={{ todos, lists }}>
      <div className="min-h-screen flex gap-4">
        <NavSection />
        <TodoSection />
      </div>
    </DBContext.Provider>
  );
}

export default App;
