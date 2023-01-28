import { useContext } from 'react';
import { StateContext } from '../../../store';
import { DeleteIcon, StarIcon } from '../../icons';

export function TodoListItem({ todo, onSelect, onDelete }) {
  const { dispatch, actions } = useContext(StateContext);

  const handleUpdateStatus = () => {
    const completed = !todo.completed;
    actions.updateTodo(dispatch, todo.id, { completed });
  };

  const handleUpdateFavorite = () => {
    const favorite = !todo.favorite;
    actions.updateTodo(dispatch, todo.id, { favorite });
  };

  return (
    <li className="group/item p-2 flex items-center bg-white rounded hover:bg-slate-100">
      <input
        type="checkbox"
        className="peer mr-4"
        checked={todo.completed}
        onChange={handleUpdateStatus}
      />
      <span
        className="grow cursor-pointer peer-checked:line-through peer-checked:text-gray-400"
        onClick={() => onSelect(todo)}
      >
        {todo.title}
      </span>
      <div className="flex gap-4">
        <DeleteIcon
          className="w-4 h-4 cursor-pointer invisible group-hover/item:visible hover:stroke-violet-600"
          onClick={() => onDelete(todo.id)}
        />
        <StarIcon
          className={`w-4 h-4 cursor-pointer ${
            todo.favorite ? 'visible' : 'invisible'
          } group-hover/item:visible hover:stroke-violet-600`}
          fill={todo.favorite ? 'currentColor' : 'none'}
          onClick={handleUpdateFavorite}
        />
      </div>
    </li>
  );
}
