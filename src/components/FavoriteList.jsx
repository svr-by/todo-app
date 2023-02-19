import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteTodos, createTodo } from '../redux/slices/todosSlice';
import { TodoList, TodoListTitle } from './index';

export function FavoriteList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFavoriteTodos(user.uid));
  }, [user.uid, dispatch]);

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
      <TodoListTitle title="Favorite list" />
      <TodoList onSubmit={handleSubmit} />
    </>
  );
}
