import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../store';
import { useParams } from 'react-router-dom';
import { TodoForm, TodoListItem, Modal } from './index';

export function TodoList() {
  const {
    state: { lists, todos },
    dispatch,
    actions,
  } = useContext(StateContext);

  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { listId } = useParams();

  useEffect(() => {
    (async function () {
      setLoading(true);
      await actions.getListTodos(dispatch, listId);
      setLoading(false);
    })();
  }, [listId, actions, dispatch]);

  const handleSubmit = (title) => {
    actions.createTodo(dispatch, { title, listId });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
  };

  const handleSelect = (todo) => {
    setModalOpen(true);
    setSelectedTodo(todo);
  };

  const list = lists.find((list) => list.id === listId);

  return (
    <>
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">{`${list?.title} list`}</h2>
      <div className="p-5">
        {isLoading ? (
          <div>Loading...</div>
        ) : !list ? (
          <h2>List not found!</h2>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
            ))}
            <TodoForm onSubmit={handleSubmit} />
          </ul>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>{selectedTodo?.title}</h3>
        <p>{selectedTodo?.id}</p>
      </Modal>
    </>
  );
}
