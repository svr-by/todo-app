import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListTodos, getMainTodos, createTodo } from '../redux/slices/todosSlice';
import { TodoList, TodoListTitle } from './index';

export function MainList() {
  const dispatch = useDispatch();

  const {
    user: { user },
    lists: { lists },
  } = useSelector((state) => state);

  const { listId } = useParams();

  useEffect(() => {
    if (listId) {
      dispatch(getListTodos({ listId, userId: user.uid }));
    } else {
      dispatch(getMainTodos(user.uid));
    }
  }, [listId, user.uid, dispatch]);

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
      <TodoListTitle title={`${listId ? list?.title : 'Main'} list`} />
      <TodoList onSubmit={handleSubmit} />
    </>
  );
}
