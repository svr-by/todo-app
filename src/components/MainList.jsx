import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../store';
import { useParams } from 'react-router-dom';
import { TodoList } from './index';

export function MainList() {
  const {
    state: { lists, user },
    dispatch,
    actions,
  } = useContext(StateContext);

  const { listId } = useParams();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setLoading(true);
      if (listId) {
        await actions.getListTodos(dispatch, listId);
      } else {
        await actions.getMainTodos(dispatch);
      }
      setLoading(false);
    })();
  }, [listId, actions, dispatch]);

  const handleSubmit = (title) => {
    actions.createTodo(dispatch, {
      listId: listId || '',
      userId: user.uid,
      title,
    });
  };

  const list = lists.find((list) => list.id === listId);

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">{`${
        listId ? list?.title : 'Main'
      } list`}</h2>
      <TodoList isLoading={isLoading} onSubmit={handleSubmit} />
    </>
  );
}
