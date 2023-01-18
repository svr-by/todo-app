import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export function LandingPage() {
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl">Landing page</h1>
      <Link to={ROUTES.MAIN}>Main page</Link>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </div>
  );
}
