export function TodoListItem({ todo }) {
  return (
    <li className="p-2 bg-white rounded hover:bg-slate-100">
      <input type="checkbox" className="mr-4" />
      <span className="capitalize">{todo.title}</span>
    </li>
  );
}
