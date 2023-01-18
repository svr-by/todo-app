import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export function NotFoundPage() {
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl">Not found page</h1>
      <Link to={ROUTES.MAIN}>Back to main page</Link>
    </div>
  );
}
