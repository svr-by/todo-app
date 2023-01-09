import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../store';
import { useParams } from 'react-router-dom';
import { TodoForm, TodoListItem, Modal, TodoDetails } from './index';

export function TodoList() {
  const {
    state: { lists, todos },
    dispatch,
    actions,
  } = useContext(StateContext);

  const [isLoading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { listId } = useParams();

  useEffect(() => {
    (async function () {
      setSelectedTodo(null);
      setLoading(true);
      await actions.getListTodos(dispatch, listId);
      setLoading(false);
    })();
  }, [listId, actions, dispatch]);

  const handleSubmit = (title) => {
    actions.createTodo(dispatch, { title, listId });
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleSelect = (todo) => {
    todo.id === selectedTodo?.id ? setSelectedTodo(null) : setSelectedTodo(todo);
  };

  const list = lists.find((list) => list.id === listId);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">{`${list?.title} list`}</h2>
      <div className="flex grow">
        {isLoading ? (
          <h2 className="p-5 text-l">Loading...</h2>
        ) : !list ? (
          <h2 className="p-5 text-l">List not found!</h2>
        ) : (
          <ul className="p-5 grow flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
            ))}
            <TodoForm onSubmit={handleSubmit} />
          </ul>
        )}
        <TodoDetails todo={selectedTodo} onClose={handleClose} />
      </div>
    </div>
  );
}
