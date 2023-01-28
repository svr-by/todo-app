import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import NotFoundImg from '../assets/img/404.png';
import * as ROUTES from '../core/routes';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-4 flex flex-col justify-center items-center gap-4">
      <img className="w-96 object-contain" src={NotFoundImg} alt="error image" />
      <h1 className="text-2xl text-center font-bold uppercase">Page not found!</h1>
      <p className="text-xl text-center">Sorry, we can&lsquo;t find the page you requested.</p>
      <Button onClick={() => navigate(ROUTES.LANDING)}>Home</Button>
    </div>
  );
}
