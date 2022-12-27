import { useContext } from 'react';
import DBContext from '../context/db';

export function TodoSection() {
  const { todos } = useContext(DBContext);

  return (
    <section className="p-5 flex-auto w-3/4">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}
