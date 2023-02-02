import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import * as ROUTES from '../core/routes';

function FooterLink({ to, children }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noreferrer"
      className="inline-block ml-4 hover:text-purple-700"
    >
      {children}
    </a>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 border border-purple-700 rounded-2xl text-purple-700 hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out"
    >
      {children}
    </Link>
  );
}

export function LandingPage() {
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto flex flex-col">
      <header className="py-6 px-4 flex">
        <div className="text-4xl font-bold mr-auto">
          <Link to={ROUTES.MAIN}>Todo.app</Link>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
          <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
        </nav>
      </header>
      <main className="grow flex flex-col justify-center items-center">
        <h1 className="mx-auto max-w-6xl mb-8 p-4 font-bold text-6xl text-center">
          Organize your life and manage your team{'’'}s work with Todo.app
        </h1>
        <Link
          to={ROUTES.MAIN}
          className="px-6 py-3 bg-purple-700 rounded-2xl text-white uppercase hover:bg-purple-800"
        >
          Get started
        </Link>
      </main>
      <footer className="py-6 px-4 flex">
        <p className="mr-auto">© 2023 Siarhei Rachkouski</p>
        <div>
          <FooterLink to="https://github.com/svr-by/todo-app">
            <GithubIcon />
          </FooterLink>
          <FooterLink to="https://www.linkedin.com/in/siarhei-rachkouski/">
            <LinkedinIcon />
          </FooterLink>
        </div>
      </footer>
    </div>
  );
}
