import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../../redux/slices/todosSlice';
import { Spinner, ConfModal, Button, ListItemForm } from '../index';
import { TodoListItem } from './components/TodoListItem';
import { TodoDetails } from './components/TodoDetails';

export function TodoList({ onSubmit }) {
  const dispatch = useDispatch();

  const { todos, isLoading } = useSelector((state) => state.todos);

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
    dispatch(deleteTodo(deletedTodoId));
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
      <TodoDetails todo={selectedTodo} onDelete={handleOpenModal} onClose={handleCloseDetails} />
      <ConfModal
        message={'Do you really want to delete the todo?'}
        isOpen={isModalOpen}
        handleConfirm={handleDelete}
        handleReject={handleCloseModal}
      />
    </div>
  );
}
