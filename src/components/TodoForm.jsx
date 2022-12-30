import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={onChange}
        className="w-full p-2 border-0 outline-0 bg-slate-100"
        placeholder="Add new todos"
      />
    </form>
  );
}
