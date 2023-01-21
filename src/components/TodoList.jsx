import { useContext, useState } from 'react';
import { StateContext } from '../store';
import { TodoForm, TodoListItem, TodoDetails } from './index';

export function TodoList({ isLoading, onSubmit }) {
  const {
    state: { todos },
  } = useContext(StateContext);

  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const handleClose = () => {
    setSelectedTodoId(null);
  };

  const handleSelect = (todo) => {
    todo.id === selectedTodoId ? setSelectedTodoId(null) : setSelectedTodoId(todo.id);
  };

  const findTodo = (todoId) => {
    return todos.find((todo) => todo.id === todoId);
  };

  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  const completedTodos = todos.filter((todo) => todo.completed);

  return isLoading ? (
    <h2 className="p-5 text-l">Loading...</h2>
  ) : (
    <div className="flex grow">
      <div className="grow">
        <ul className="p-5 grow flex flex-col gap-1">
          {uncompletedTodos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
          ))}
          <TodoForm onSubmit={onSubmit} />
        </ul>
        {completedTodos.length ? (
          <>
            <h3 className="py-1 px-5 text-l">Completed tasks</h3>
            <ul className="py-2 px-5 grow flex flex-col gap-1">
              {completedTodos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <TodoDetails todo={findTodo(selectedTodoId)} onClose={handleClose} />
    </div>
  );
}
