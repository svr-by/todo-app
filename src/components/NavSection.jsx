import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon } from './index';
import DBContext from '../context/db';

export function NavSection() {
  const mainLists = [
    { title: 'tasks', icon: <HomeIcon className="w-4 h-4" />, to: '/' },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: '/planned' },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" />, to: '/favorite' },
  ];

  const { lists } = useContext(DBContext);

  return (
    <section className="p-5 flex-auto w-1/4 bg-slate-200">
      <h1 className="mb-4 text-2xl uppercase">To-do app</h1>
      <ul>
        {mainLists.map((list, i) => (
          <li key={i} className="hover:bg-slate-400 hover:text-white">
            <NavLink to={list.to} className="py-3 px-1 flex items-center gap-4">
              {list.icon}
              <span className="capitalize">{list.title}</span>
            </NavLink>
          </li>
        ))}
        <hr className="h-0.5 my-4 bg-slate-400" />
        {lists.map((list) => (
          <li key={list.id} className="hover:bg-slate-400 hover:text-white">
            <NavLink to={list.id} className="py-3 px-1 flex items-center gap-4">
              <ListIcon className="w-4 h-4" />
              <span className="capitalize">{list.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
