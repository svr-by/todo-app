import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../store';
import { TodoList } from './index';

export function PlannedList() {
  const {
    state: { user },
    dispatch,
    actions,
  } = useContext(StateContext);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setLoading(true);
      await actions.getPlannedTodos(dispatch);
      setLoading(false);
    })();
  }, [actions, dispatch]);

  const handleSubmit = (title) => {
    actions.createTodo(dispatch, {
      listId: '',
      userId: user.uid,
      title,
      dueDate: new Date(),
    });
  };

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">Planned list</h2>
      <TodoList isLoading={isLoading} onSubmit={handleSubmit} />
    </>
  );
}
