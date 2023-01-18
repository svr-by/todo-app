import { useContext, useEffect } from 'react';
import { StateContext } from '../store';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon, SignOutIcon, NavListItem } from './index';
import * as ROUTES from '../constants/routes';

export function ListSection() {
  const {
    state: { lists, user },
    dispatch,
    actions,
  } = useContext(StateContext);

  useEffect(() => {
    actions.getLists(dispatch);
  }, [actions, dispatch]);

  const mainLists = [
    { title: 'main', icon: <HomeIcon className="w-4 h-4" />, to: ROUTES.MAIN },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: ROUTES.PLANNED },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" fill="none" />, to: ROUTES.FAVORITE },
  ];

  const handleSigout = () => {
    actions.signOut();
  };

  return (
    <section className="p-5 w-1/4 min-w-[300px]">
      <h1 className="mb-4 text-3xl font-bold uppercase">To-do notes</h1>
      {user && (
        <div className="mb-4 flex gap-4 items-center text-slate-500">
          <span className="text-l">{user.email}</span>
          <SignOutIcon className="w-5 h-5 cursor-pointer hover:text-black" onClick={handleSigout} />
        </div>
      )}
      <ul>
        {mainLists.map((list) => (
          <NavListItem key={list.title} list={list} />
        ))}
        <hr className="h-0.5 my-4 bg-slate-400" />
        {lists
          .map((list) => ({
            ...list,
            to: `${ROUTES.MAIN}/${list.id}`,
            icon: <ListIcon className="w-4 h-4" />,
          }))
          .map((list) => (
            <NavListItem key={list.id} list={list} />
          ))}
      </ul>
    </section>
  );
}
