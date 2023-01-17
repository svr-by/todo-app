import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../store';
import { useParams } from 'react-router-dom';
import { TodoForm, TodoListItem, Modal, TodoDetails } from './index';

export function TodoList() {
  const {
    state: { lists, todos, user },
    dispatch,
    actions,
  } = useContext(StateContext);

  const [isLoading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const { listId } = useParams();

  useEffect(() => {
    (async function () {
      setSelectedTodoId(null);
      setLoading(true);
      if (listId === 'favorite') {
        await actions.getFavoriteTodos(dispatch);
      } else {
        await actions.getListTodos(dispatch, listId);
      }
      setLoading(false);
    })();
  }, [listId, actions, dispatch]);

  const handleSubmit = (title) => {
    actions.createTodo(dispatch, {
      listId,
      userId: user.uid,
      title,
      description: '',
      duedate: null,
      steps: [],
    });
  };

  const handleClose = () => {
    setSelectedTodoId(null);
  };

  const handleSelect = (todo) => {
    todo.id === selectedTodoId ? setSelectedTodoId(null) : setSelectedTodoId(todo.id);
  };

  const selectTodo = (todoId) => {
    return todos.find((todo) => todo.id === todoId);
  };

  const list = lists.find((list) => list.id === listId);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h2 className="p-5 bg-violet-700 text-white text-xl uppercase">{`${list?.title} list`}</h2>
      <div className="flex grow">
        {isLoading ? (
          <h2 className="p-5 text-l">Loading...</h2>
        ) : (
          <ul className="p-5 grow flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} onSelect={handleSelect} />
            ))}
            <TodoForm onSubmit={handleSubmit} />
          </ul>
        )}
        <TodoDetails todo={selectTodo(selectedTodoId)} onClose={handleClose} />
      </div>
    </div>
  );
}
