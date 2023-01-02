import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TodoForm, TodoListItem } from './index';
import { useApi } from '../hooks/useApi';

export function TodoList() {
  const { listId } = useParams();

  const {
    data: { lists, todos },
    actions: api,
  } = useApi();

  const list = lists.find((list) => list.id === listId);

  useEffect(() => {
    api.getListTodos(listId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const handleSubmit = async (title) => {
    api.createTodo({ title, listId });
  };

  const handleDelete = async (todoId) => {
    api.deleteTodo(todoId);
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
