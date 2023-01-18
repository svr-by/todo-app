import { useContext, useState } from 'react';
import { StateContext } from '../store';
import { TodoForm, TodoListItem, TodoDetails } from './index';

export function TodoList({ onSubmit }) {
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

  return (
    <div className="flex grow">
      <ul className="p-5 grow flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
        ))}
        <TodoForm onSubmit={onSubmit} />
      </ul>
      <TodoDetails todo={findTodo(selectedTodoId)} onClose={handleClose} />
    </div>
  );
}
