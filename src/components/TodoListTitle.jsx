import { ListIcon } from './icons';

export function TodoListTitle({ title }) {
  return (
    <div className="p-5 flex items-center bg-violet-700">
      <h2 className="grow text-white text-xl uppercase">{title}</h2>
      <ListIcon className="w-6 h-6 text-white md:hidden" />
    </div>
  );
}
