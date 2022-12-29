import { Outlet } from 'react-router-dom';
import { NavList } from './index';

export function Layout() {
  return (
    <div className="min-h-screen flex gap-4">
      <section className="p-5 flex-auto w-1/4">
        <NavList />
      </section>
      <section className="p-5 flex-auto w-3/4 bg-slate-200">
        <Outlet />
      </section>
    </div>
  );
}
