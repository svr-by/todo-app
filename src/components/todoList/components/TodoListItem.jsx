import { useDispatch } from 'react-redux';
import { updateTodo } from '../../../redux/slices/todosSlice';
import { DeleteIcon, StarIcon } from '../../icons';
import { formatedDate } from '../../../core/utils';

export function TodoListItem({ todo, onSelect, onDelete }) {
  const dispatch = useDispatch();

  const handleUpdateStatus = () => {
    const completed = !todo.completed;
    dispatch(updateTodo({ todoId: todo.id, todoData: { completed } }));
  };

  const handleUpdateFavorite = () => {
    const favorite = !todo.favorite;
    dispatch(updateTodo({ todoId: todo.id, todoData: { favorite } }));
  };

  const checkDueDate = () => {
    const isExpired = Date.parse(todo.dueDate) < Date.now();
    return isExpired ? 'text-red-600' : '';
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
        className={`${checkDueDate()} grow cursor-pointer peer-checked:line-through peer-checked:text-gray-400`}
        onClick={() => onSelect(todo)}
      >
        {todo.title}
      </span>
      <div className="flex gap-4 items-center">
        {todo.dueDate && (
          <p className={`${checkDueDate()} invisible group-hover/item:visible text-xs`}>
            {formatedDate(todo.dueDate)}
          </p>
        )}
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
