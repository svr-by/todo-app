import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutFirebase } from '../firebase/api';
import { getLists, createList, deleteList } from '../redux/slices/listsSlice';
import { HomeIcon, PlanedIcon, StarIcon, ListIcon, SignOutIcon } from './icons';
import { NavListItem, ListItemForm, ConfModal } from './index';
import * as ROUTES from '../core/routes';

export function NavListSection() {
  const dispatch = useDispatch();

  const {
    user: { user },
    lists: { lists },
  } = useSelector((state) => state);

  const [isModalOpen, setModalOpen] = useState(false);
  const [deletedListId, setDeletedListId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const handleOpenModal = (listId) => {
    setModalOpen(true);
    setDeletedListId(listId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDeletedListId(null);
  };

  const handleSigout = () => {
    signOutFirebase();
  };

  const handleSubmit = (title) => {
    dispatch(createList({ title }));
  };

  const handleDelete = () => {
    dispatch(deleteList(deletedListId));
    setModalOpen(false);
    navigate(ROUTES.MAIN);
  };

  const mainLists = [
    { title: 'main', icon: <HomeIcon className="w-4 h-4" />, to: ROUTES.MAIN },
    { title: 'planned', icon: <PlanedIcon className="w-4 h-4" />, to: ROUTES.PLANNED },
    { title: 'favorite', icon: <StarIcon className="w-4 h-4" fill="none" />, to: ROUTES.FAVORITE },
  ];

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
            <NavListItem key={list.id} list={list} onDelete={handleOpenModal} />
          ))}
        <ListItemForm onSubmit={handleSubmit} placeholder="New list" />
      </ul>
      <ConfModal
        message={'Do you really want to delete the list?'}
        isOpen={isModalOpen}
        handleConfirm={handleDelete}
        handleReject={handleCloseModal}
      />
    </section>
  );
}
