import { CrossIcon } from './icons/CrossIcon';

export function TodoDetails({ todo, onClose }) {
  const getDueDate = (dueDate) => {
    return dueDate ? new Date(dueDate.seconds * 1000).toDateString() : 'no';
  };

  return (
    <div className={`bg-white ease-in-out duration-500 ${todo ? 'w-60 ' : 'w-0'}`}>
      {todo && (
        <div className="relative p-4 ">
          <h3 className="mb-4 font-bold uppercase">Details</h3>
          <button className="absolute top-2 right-2" onClick={onClose}>
            <CrossIcon className="w-4 h-4 hover:bg-slate-200 close-target" />
          </button>
          <p className="font-bold">Title:</p>
          <p>{todo?.title}</p>
          <p className="font-bold">Status:</p>
          <p>{todo?.completed ? 'completed' : 'uncompleted'}</p>
          <p className="font-bold">Favorite:</p>
          <p>{todo?.favorite ? 'yes' : 'no'}</p>
          <p className="font-bold">Due date:</p>
          <p>{getDueDate(todo?.dueDate)}</p>
        </div>
      )}
    </div>
  );
}
