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

  const handleSelect = (e) => {
    if (e.target.tagName !== 'INPUT' && !e.target.closest('.icons')) {
      onSelect(todo);
    }
  };

  const checkDueDate = () => {
    const msPerDay = 86400000;
    const isExpired =
      Math.floor(Date.parse(todo.dueDate) / msPerDay) < Math.floor(Date.now() / msPerDay);
    return isExpired ? 'text-red-600' : '';
  };

  return (
    <li
      className="group/item p-2 flex items-center bg-white rounded cursor-pointer hover:bg-slate-100"
      onClick={handleSelect}
    >
      <input
        type="checkbox"
        className="peer w-5 h-5 mr-4"
        checked={todo.completed}
        onChange={handleUpdateStatus}
      />
      <span
        className={`${checkDueDate()} max-w-[400px] mr-auto grow peer-checked:line-through peer-checked:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap`}
      >
        {todo.title}
      </span>
      <div className="icons flex gap-4 items-center">
        {todo.dueDate && (
          <p
            className={`${checkDueDate()} invisible group-hover/item:visible text-xs whitespace-nowrap`}
          >
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
