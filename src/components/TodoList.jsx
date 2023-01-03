import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TodoForm, TodoListItem, Modal } from './index';
import { useApi } from '../hooks/useApi';

export function TodoList() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { listId } = useParams();

  useEffect(() => {
    api.getListTodos(listId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const {
    data: { lists, todos },
    isLoading,
    actions: api,
  } = useApi();

  const handleSubmit = async (title) => {
    api.createTodo({ title, listId });
  };

  const handleDelete = async (todoId) => {
    api.deleteTodo(todoId);
  };

  const handleUpdate = async (todoId, data) => {
    api.updateTodo(todoId, data);
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

  return isLoading ? (
    <div>Loading...</div>
  ) : !list ? (
    <h2>List not found!</h2>
  ) : (
    <>
      <h2 className="text-xl mb-6 uppercase">{`${list.title} list`}</h2>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onSelect={handleSelect}
          />
        ))}
        <TodoForm onSubmit={handleSubmit} />
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>{selectedTodo?.title}</h3>
        <p>{selectedTodo?.id}</p>
      </Modal>
    </>
  );
}
