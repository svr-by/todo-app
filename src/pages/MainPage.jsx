import { useContext } from 'react';
import { StateContext } from '../store';
import { Outlet, Navigate } from 'react-router-dom';
import { NavList } from '../components/index';

export function MainPage() {
  const {
    state: { isLoading, user },
  } = useContext(StateContext);

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">Loading...</div>
  ) : !user ? (
    <Navigate to="/signin" replace={true} />
  ) : (
    <div className="min-h-screen flex gap-4">
      <section className="p-5 w-1/4 min-w-[300px]">
        <NavList />
      </section>
      <section className="w-auto min-w-[300px] flex-auto bg-slate-200">
        <Outlet />
      </section>
    </div>
  );
}
