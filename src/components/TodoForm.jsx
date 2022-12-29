import { useState } from 'react';

export function TodoForm() {
  const [title, setTitle] = useState('');

  const onChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onSubmmit = (e) => {
    e.preventDefault();
    console.log(title);
    setTitle('');
  };

  return (
    <form onSubmit={onSubmmit}>
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
