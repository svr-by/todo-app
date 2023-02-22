import { Link } from 'react-router-dom';

export function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="p-2 border border-purple-700 rounded-2xl text-purple-700 text-xs hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out md:px-4 md:text-base"
    >
      {children}
    </Link>
  );
}
