import { useContext, useState } from 'react';
import { StateContext } from '../store';
import { ListItemForm, TodoListItem, TodoDetails, Spinner, Modal, Button } from './index';

export function TodoList({ isLoading, onSubmit }) {
  const {
    state: { lists, todos },
    dispatch,
    actions,
  } = useContext(StateContext);

  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [deletedTodoId, setDeletedTodoId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenDetails = (todo) => {
    todo.id === selectedTodoId ? setSelectedTodoId(null) : setSelectedTodoId(todo.id);
  };

  const handleCloseDetails = () => {
    setSelectedTodoId(null);
  };

  const handleOpenModal = (todoId) => {
    setModalOpen(true);
    setDeletedTodoId(todoId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDeletedTodoId(null);
  };

  const handleDelete = () => {
    actions.deleteTodo(dispatch, deletedTodoId);
    setModalOpen(false);
  };

  const createTodoList = (list) => {
    return list.map((todo) => (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onSelect={handleOpenDetails}
        onDelete={handleOpenModal}
      />
    ));
  };

  const selectedTodo = selectedTodoId && todos.find((todo) => todo.id === selectedTodoId);

  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  const completedTodos = todos.filter((todo) => todo.completed);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex grow">
      <div className="grow">
        <ul className="p-5 grow flex flex-col gap-1">
          {createTodoList(uncompletedTodos)}
          <ListItemForm onSubmit={onSubmit} placeholder="New todo" />
        </ul>
        {completedTodos.length ? (
          <>
            <h3 className="py-1 px-5 text-l">Completed tasks</h3>
            <ul className="py-2 px-5 grow flex flex-col gap-1 text-inherit">
              {createTodoList(completedTodos)}
            </ul>
          </>
        ) : null}
      </div>
      <TodoDetails
        todo={selectedTodo}
        lists={lists}
        onDelete={handleOpenModal}
        onClose={handleCloseDetails}
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="mb-6 text-xl">Do you really want to delete the todo?</h2>
          <div className="flex justify-center gap-4">
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
