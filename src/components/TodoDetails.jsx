import { CrossIcon } from './icons/CrossIcon';

export function TodoDetails({ todo, onClose }) {
  return (
    <div className={`bg-white ease-in-out duration-500 ${todo ? 'w-60 ' : 'w-0'}`}>
      {todo && (
        <div className="relative p-4 ">
          <h3 className="mb-4 font-bold uppercase">Details</h3>
          <button className="absolute top-2 right-2" onClick={onClose}>
            <CrossIcon className="w-4 h-4 hover:bg-slate-200 close-target" />
          </button>
          <h4 className="font-bold">Title:</h4>
          <h4>{todo?.title}</h4>
          <h4 className="font-bold">Status:</h4>
          <h4>{todo?.completed ? 'completed' : 'uncompleted'}</h4>
        </div>
      )}
    </div>
  );
}
