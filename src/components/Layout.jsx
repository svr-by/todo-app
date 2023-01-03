import { Outlet } from 'react-router-dom';
import { NavList } from './index';

export function Layout() {
  return (
    <div className="min-h-screen flex gap-4">
      <section className="p-5 w-1/4 min-w-[300px]">
        <NavList />
      </section>
      <section className="flex-auto w-auto bg-slate-200">
        <Outlet />
      </section>
    </div>
  );
}
