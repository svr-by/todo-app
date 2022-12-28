import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllData } from '../api/api';
import { TodoList, Layout } from '../components';
import DBContext from '../context/db';

function App() {
  const [todos, setTodods] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getAllData('todos').then(setTodods);
    getAllData('lists').then(setLists);
  }, []);

  return (
    <DBContext.Provider value={{ todos, lists }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div />} />
          <Route path="/:listId" element={<TodoList />} />
        </Route>
      </Routes>
    </DBContext.Provider>
  );
}

export default App;
