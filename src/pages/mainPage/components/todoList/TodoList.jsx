import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from 'redux/slices/todosSlice';
import {
  setTodoModalOpen,
  setSelectedTodoId,
  requestTodoDeletion,
  rejectTodoDeletion,
} from 'redux/slices/layoutSlice';
import { Spinner, ConfModal, ListItemForm } from 'components';
import { TodoListItem } from './components/TodoListItem';
import { TodoDetails } from './components/TodoDetails';

export function TodoList({ onSubmit }) {
  const dispatch = useDispatch();

  const {
    todos: { todos, isLoading },
    layout: { isTodoModalOpen, selectedTodoId, deletedTodoId },
  } = useSelector((state) => state);

  const openDetails = (todo) => {
    todo.id === selectedTodoId
      ? dispatch(setSelectedTodoId(null))
      : dispatch(setSelectedTodoId(todo.id));
  };

  const closeDetails = () => {
    dispatch(setSelectedTodoId(null));
  };

  const requestDeletion = (todoId) => {
    dispatch(requestTodoDeletion(todoId));
  };

  const rejectDeletion = () => {
    dispatch(rejectTodoDeletion());
  };

  const handleDelete = () => {
    dispatch(deleteTodo(deletedTodoId));
    dispatch(setTodoModalOpen(false));
  };

  const createTodoList = (todoList, sortField = 'created') => {
    const sortedTodoList = todoList.sort((a, b) => a[sortField] - b[sortField]);
    return sortedTodoList.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} onSelect={openDetails} onDelete={requestDeletion} />
    ));
  };

  const selectedTodo = selectedTodoId && todos.find((todo) => todo.id === selectedTodoId);

  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  const completedTodos = todos.filter((todo) => todo.completed);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex grow overflow-y-auto scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-violet-100">
      <div className={`grow ease-in-out duration-500 ${selectedTodo ? 'w-0 sm:w-auto' : 'w-full'}`}>
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
      <TodoDetails todo={selectedTodo} onDelete={requestDeletion} onClose={closeDetails} />
      <ConfModal
        message={'Do you really want to delete the todo?'}
        isOpen={isTodoModalOpen}
        handleConfirm={handleDelete}
        handleReject={rejectDeletion}
      />
    </div>
  );
}
