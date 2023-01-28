import { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../../store';
import { Button, Toggle } from '../../index';
import { DeleteIcon, StarIcon, CrossIcon } from '../../icons';
import { TodoInput } from './TodoInput';
import { TodoSelect } from './TodoSelect';
import { formatedDate } from '../../../core/utils';

export function TodoDetails({ todo, lists, onClose, onDelete }) {
  const { dispatch, actions } = useContext(StateContext);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [listId, setListId] = useState();
  const [completed, setCompleted] = useState();

  useEffect(() => {
    setTitle(todo?.title || '');
    setDescription(todo?.description || '');
    setDueDate(todo?.dueDate || null);
    setListId(todo?.listId || '');
    setCompleted(todo?.completed || false);
  }, [todo]);

  const handleUpdateFavorite = () => {
    const favorite = !todo.favorite;
    actions.updateTodo(dispatch, todo.id, { favorite });
  };

  const handleSubmit = (e) => {
    actions.updateTodo(dispatch, todo.id, { title, description, dueDate, listId, completed });
    e.preventDefault();
  };

  return (
    <div className={`bg-white ease-in-out duration-500 ${todo ? 'w-1/4 min-w-[15rem]' : 'w-0'}`}>
      {todo && (
        <aside className="relative h-full p-4 flex flex-col">
          <button className="absolute top-2 right-2" onClick={onClose}>
            <CrossIcon className="w-4 h-4 hover:bg-slate-200 close-target" />
          </button>
          <div className="mb-4 flex gap-4 items-center">
            <h3 className="font-bold uppercase">Details</h3>
            <StarIcon
              className="w-4 h-4 cursor-pointer hover:stroke-violet-600"
              fill={todo.favorite ? 'currentColor' : 'none'}
              onClick={handleUpdateFavorite}
            />
            <DeleteIcon
              className="w-4 h-4 cursor-pointer hover:stroke-violet-600"
              onClick={() => onDelete(todo.id)}
            />
          </div>
          <form id="details_form" className="grow" onSubmit={handleSubmit} noValidate>
            <TodoInput label="Title" type="text" value={title} onChange={setTitle} />
            <TodoInput
              label="Description"
              type="textarea"
              value={description}
              onChange={setDescription}
              placeholder="Todo's description..."
            />
            <TodoInput label="Due date" type="date" value={dueDate} onChange={setDueDate} />
            <TodoSelect label="List" options={lists} value={listId} onChange={setListId} />
            <Toggle label="Completed" value={completed} onChange={setCompleted} />
          </form>
          {todo.created && (
            <p className="block mb-4 text-xs text-gray-500 uppercase dark:text-white">
              Created: {formatedDate(todo.created)}
            </p>
          )}
          <Button form="details_form" type="submit">
            Save
          </Button>
        </aside>
      )}
    </div>
  );
}
