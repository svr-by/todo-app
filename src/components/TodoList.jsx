import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { createTodo, deleteTodo, getTodosByLisId } from '../api/api';
import { TodoForm, TodoListItem } from './index';
import DBContext from '../context/db';

export function TodoList() {
  const [todos, setTodods] = useState([]);
  const { listId } = useParams();

  const { lists } = useContext(DBContext);
  const list = lists.find((list) => list.id === listId);

  useEffect(() => {
    async function getData() {
      const data = await getTodosByLisId('todos', listId);
      setTodods(data);
    }
    getData();
  }, [listId]);

  const handleSubmit = async (title) => {
    const data = { title, listId };
    const doc = await createTodo(data);
    setTodods([...todos, doc]);
  };

  const handleDelete = async (todoId) => {
    console.log('delete', todoId);
    await deleteTodo(todoId);
    setTodods(todos.filter((todo) => todo.id !== todoId));
  };

  if (!list) return <h2>List not found!</h2>;

  return (
    <>
      <h2 className="text-xl mb-6 uppercase">{`${list.title} list`}</h2>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
        <TodoForm onSubmit={handleSubmit} />
      </ul>
    </>
  );
}
