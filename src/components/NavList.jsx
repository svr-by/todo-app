import { useContext, useEffect } from 'react';
import { StateContext } from '../store';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon, NavListItem } from './index';

export function NavList() {
  const { state, dispatch, actions } = useContext(StateContext);

  useEffect(() => {
    actions.getLists(dispatch);
  }, [actions, dispatch]);

  const mainLists = [
    { title: 'tasks', icon: <HomeIcon className="w-4 h-4" />, to: '/' },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: '/planned' },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" />, to: '/favorite' },
  ];

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold uppercase">To-do notes</h1>
      <ul>
        {mainLists.map((list) => (
          <NavListItem key={list.title} list={list} />
        ))}
        <hr className="h-0.5 my-4 bg-slate-400" />
        {state.lists
          .map((list) => ({ ...list, to: list.id, icon: <ListIcon className="w-4 h-4" /> }))
          .map((list) => (
            <NavListItem key={list.id} list={list} />
          ))}
      </ul>
    </>
  );
}
