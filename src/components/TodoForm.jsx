import { useState } from 'react';
import { PlusIcon } from '../components/index';

export function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');

  const onChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-1 p-2 flex items-center bg-slate-100">
      <PlusIcon className="w-4 h-4 mr-4" />
      <input
        type="text"
        value={title}
        onChange={onChange}
        className="w-full border-0 outline-0 bg-inherit"
        placeholder="Add a new todo"
      />
    </form>
  );
}
