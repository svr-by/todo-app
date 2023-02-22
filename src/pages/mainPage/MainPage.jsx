import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { Spinner } from 'components';
import { NavListSection } from './components/NavListSection';
import { TodoSection } from './components/TodoSection';
import * as ROUTES from 'core/routes';

export function MainPage() {
  const { isLoading, user } = useSelector((state) => state.user);

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : !user ? (
    <Navigate to={ROUTES.SIGN_IN} replace={true} />
  ) : (
    <div className="h-screen overflow-hidden flex gap-4">
      <NavListSection />
      <TodoSection>
        <Outlet />
      </TodoSection>
    </div>
  );
}
