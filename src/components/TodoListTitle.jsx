import { useDispatch } from 'react-redux';
import { setNavListOpen } from '../redux/slices/layoutSlice';
import { ListIcon } from './icons';

export function TodoListTitle({ title }) {
  const dispatch = useDispatch();

  const handleOpenNavList = () => {
    dispatch(setNavListOpen(true));
  };

  return (
    <div className="p-5 flex items-center bg-violet-700">
      <h2 className="grow text-white text-xl uppercase">{title}</h2>
      <div className="cursor-pointer md:hidden" onClick={handleOpenNavList}>
        <ListIcon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}
