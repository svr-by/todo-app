import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getDataByLisId } from '../api/api';
import { TodoListItem } from './index';
import DBContext from '../context/db';

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

  const { lists } = useContext(DBContext);
  const list = lists.find((list) => list.id === listId);

  if (!list) return <h2>List not found!</h2>;

  return (
    <>
      <h2 className="text-xl mb-6 uppercase">{`${list.title} list`}</h2>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
