import { NavLink } from 'react-router-dom';

export function NavListItem({ list }) {
  return (
    <li className="hover:bg-violet-200 hover:text-violet-800 rounded">
      <NavLink to={list.to} className="py-3 px-2 flex items-center gap-4 [&.active]:font-bold">
        {list.icon}
        <span className="capitalize">{list.title}</span>
      </NavLink>
    </li>
  );
}
