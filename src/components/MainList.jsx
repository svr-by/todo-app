import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListTodos, getMainTodos, createTodo } from '../redux/slices/todosSlice';
import { TodoList } from './index';

export function MainList() {
  const dispatch = useDispatch();

  const {
    user: { user },
    lists: { lists },
  } = useSelector((state) => state);

  const { listId } = useParams();

  useEffect(() => {
    if (listId) {
      dispatch(getListTodos(listId));
    } else {
      dispatch(getMainTodos());
    }
  }, [listId, dispatch]);

  const handleSubmit = (title) => {
    dispatch(
      createTodo({
        listId: listId || '',
        userId: user.uid,
        title,
      })
    );
  };

  const list = lists.find((list) => list.id === listId);

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">{`${
        listId ? list?.title : 'Main'
      } list`}</h2>
      <TodoList onSubmit={handleSubmit} />
    </>
  );
}
