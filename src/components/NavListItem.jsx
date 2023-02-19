import { NavLink } from 'react-router-dom';
import { DeleteIcon } from './icons';

export function NavListItem({ list, onDelete, onClick }) {
  const handleDelete = () => {
    onDelete(list.id);
  };

  return (
    <li className="group/item px-2 flex items-center hover:bg-violet-200 hover:text-violet-800 rounded">
      <NavLink
        to={list.to}
        end
        className="py-3 grow flex items-center gap-4 [&.active]:font-bold"
        onClick={onClick}
      >
        {list.icon}
        <span className="capitalize">{list.title}</span>
      </NavLink>
      {onDelete && (
        <DeleteIcon
          className="w-4 h-4 cursor-pointer invisible group-hover/item:visible hover:stroke-blue-600"
          onClick={handleDelete}
        />
      )}
    </li>
  );
}
