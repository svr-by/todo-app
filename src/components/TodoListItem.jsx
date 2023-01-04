import { useContext } from 'react';
import { StateContext } from '../store';
import { DeleteIcon } from './index';

export function TodoListItem({ todo, onSelect }) {
  const { dispatch, actions } = useContext(StateContext);

  const handleUpdate = (e) => {
    const statusValue = e.target.checked;
    actions.updateTodo(dispatch, todo.id, { completed: statusValue });
  };

  const handleDelete = () => {
    actions.deleteTodo(dispatch, todo.id);
  };

  return (
    <li className="group/item p-2 flex items-center bg-white rounded hover:bg-slate-100">
      <input
        type="checkbox"
        className="peer mr-4"
        checked={todo.completed}
        onChange={handleUpdate}
      />
      <span
        className="grow capitalize cursor-pointer peer-checked:line-through peer-checked:text-gray-400"
        onClick={() => onSelect(todo)}
      >
        {todo.title}
      </span>
      <DeleteIcon
        className="w-4 h-4 cursor-pointer invisible group-hover/item:visible hover:stroke-violet-600"
        onClick={handleDelete}
      />
    </li>
  );
}
