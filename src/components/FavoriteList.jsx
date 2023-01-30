import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteTodos, createTodo } from '../redux/slices/todosSlice';
import { TodoList } from './index';

export function FavoriteList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFavoriteTodos());
  }, [dispatch]);

  const handleSubmit = (title) => {
    dispatch(
      createTodo({
        listId: '',
        userId: user.uid,
        title,
        favorite: true,
      })
    );
  };

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">Favorite list</h2>
      <TodoList onSubmit={handleSubmit} />
    </>
  );
}
