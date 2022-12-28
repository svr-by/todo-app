import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataByLisId } from '../api/api';

export function TodoList() {
  const [todos, setTodods] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await getDataByLisId('todos', listId);
      setTodods(data);
    }
    getData();
  }, [listId]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
