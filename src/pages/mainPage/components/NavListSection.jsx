import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutFirebase } from 'api/api';
import { getLists, createList, deleteList } from 'redux/slices/listsSlice';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon, SignOutIcon, CrossIcon } from 'components/icons';
import { ListItemForm, ConfModal } from 'components';
import {
  setNavListOpen,
  setListModalOpen,
  requestListDeletion,
  rejectListDeletion,
} from 'redux/slices/layoutSlice';
import * as ROUTES from 'core/routes';
import { NavListItem } from './NavListItem';

export function NavListSection() {
  const dispatch = useDispatch();

  const {
    user: { user },
    lists: { lists },
    layout: { isNavListOpen, isListModalOpen, deletedListId },
  } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLists(user.uid));
  }, [user.uid, dispatch]);

  const requestDeletion = (listId) => {
    dispatch(requestListDeletion(listId));
  };

  const rejectDeletion = () => {
    dispatch(rejectListDeletion());
  };

  const handleSigout = () => {
    signOutFirebase();
  };

  const handleSubmit = (title) => {
    dispatch(createList({ title, userId: user.uid }));
  };

  const handleDelete = () => {
    dispatch(deleteList(deletedListId));
    dispatch(setListModalOpen(false));
    navigate(ROUTES.MAIN);
  };

  const handleCloseNavList = () => {
    dispatch(setNavListOpen(false));
  };

  const mainLists = [
    { title: 'main', icon: <HomeIcon className="w-4 h-4" />, to: ROUTES.MAIN },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: ROUTES.PLANNED },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" fill="none" />, to: ROUTES.FAVORITE },
  ];

  return (
    <section
      className={`absolute z-10 p-5 w-full h-full min-w-[300px] bg-white flex flex-col md:static md:w-1/4 ${
        isNavListOpen ? '' : 'hidden'
      } md:flex`}
    >
      <div className="absolute top-6 right-6 cursor-pointer md:hidden" onClick={handleCloseNavList}>
        <CrossIcon className="w-8 h-8" />
      </div>
      <h1 className="mb-4 text-3xl font-bold uppercase">To-do notes</h1>
      {user && (
        <div className="mb-4 flex gap-4 items-center text-slate-500">
          <span className="text-l">{user.email}</span>
          <SignOutIcon className="w-5 h-5 cursor-pointer hover:text-black" onClick={handleSigout} />
        </div>
      )}
      <div className="pr-3 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-violet-100">
        <ul>
          {mainLists.map((list) => (
            <NavListItem key={list.title} list={list} onClick={handleCloseNavList} />
          ))}
          <hr className="h-0.5 my-4 bg-slate-400" />
          {lists
            .map((list) => ({
              ...list,
              to: `${ROUTES.MAIN}/${list.id}`,
              icon: <ListIcon className="w-4 h-4" />,
            }))
            .map((list) => (
              <NavListItem
                key={list.id}
                list={list}
                onDelete={requestDeletion}
                onClick={handleCloseNavList}
              />
            ))}
          <ListItemForm onSubmit={handleSubmit} placeholder="New list" />
        </ul>
      </div>
      <ConfModal
        message={'Do you really want to delete the list?'}
        isOpen={isListModalOpen}
        handleConfirm={handleDelete}
        handleReject={rejectDeletion}
      />
    </section>
  );
}
