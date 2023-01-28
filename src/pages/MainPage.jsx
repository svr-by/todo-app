import { useContext } from 'react';
import { StateContext } from '../store';
import { Outlet, Navigate } from 'react-router-dom';
import { NavListSection, TodoSection } from '../components/index';
import * as ROUTES from '../constants/routes';

export function MainPage() {
  const {
    state: { isLoading, user },
  } = useContext(StateContext);

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">Loading...</div>
  ) : !user ? (
    <Navigate to={ROUTES.SIGN_IN} replace={true} />
  ) : (
    <div className="min-h-screen flex gap-4">
      <NavListSection />
      <TodoSection>
        <Outlet />
      </TodoSection>
    </div>
  );
}
