import { DeleteIcon } from './index';

export function TodoListItem({ todo, onDelete }) {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="p-2 flex items-center bg-white rounded hover:bg-slate-100">
      <input type="checkbox" className="mr-4" />
      <span className="grow capitalize">{todo.title}</span>
      <DeleteIcon className="w-4 h-4 cursor-pointer" onClick={handleDelete} />
    </li>
  );
}
