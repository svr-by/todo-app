import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatedDate } from '../core/utils';
import { getPlannedTodos, createTodo } from '../redux/slices/todosSlice';
import { TodoList } from './index';

export function PlannedList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPlannedTodos(user.uid));
  }, [user.uid, dispatch]);

  const handleSubmit = (title) => {
    dispatch(
      createTodo({
        listId: '',
        userId: user.uid,
        title,
        dueDate: formatedDate(Date.now()),
      })
    );
  };

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">Planned list</h2>
      <TodoList onSubmit={handleSubmit} />
    </>
  );
}
