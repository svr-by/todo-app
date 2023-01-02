import { HomeIcon, PlanedIcon, StarIcon, ListIcon, NavListItem } from './index';
import { useApi } from '../hooks/useApi';

export function NavList() {
  const mainLists = [
    { title: 'tasks', icon: <HomeIcon className="w-4 h-4" />, to: '/' },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: '/planned' },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" />, to: '/favorite' },
  ];

  const {
    data: { lists },
  } = useApi();

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold uppercase">To-do notes</h1>
      <ul>
        {mainLists.map((list) => (
          <NavListItem key={list.title} list={list} />
        ))}
        <hr className="h-0.5 my-4 bg-slate-400" />
        {lists
          .map((list) => ({ ...list, to: list.id, icon: <ListIcon className="w-4 h-4" /> }))
          .map((list) => (
            <NavListItem key={list.id} list={list} />
          ))}
      </ul>
    </>
  );
}
