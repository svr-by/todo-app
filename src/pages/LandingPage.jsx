import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/todo-list-animation.json';
import { GithubIcon, LinkedinIcon, DoneCircleIcon } from '../components/icons';
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

function BenefitList({ list }) {
  return (
    <ul className="mb-8">
      {list.map((item, index) => (
        <li key={index} className="flex gap-4 mb-4">
          <DoneCircleIcon fill="#2a8a9d" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LandingPage() {
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto flex flex-col">
      <header className="py-6 px-4 flex">
        <div className="text-4xl font-bold mr-auto">
          <Link to={ROUTES.MAIN}>
            Todo<span className="text-purple-700">.</span>app
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
          <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
        </nav>
      </header>
      <main className="grow py-6 px-4 flex justify-between items-center">
        <div className="mb-8 flex flex-col justify-start items-start">
          <h1 className="max-w-2xl mb-8 py-4 font-bold text-4xl leading-normal">
            Organize your work and life
          </h1>
          <BenefitList
            list={[
              'Add your tasks. Get organized',
              'Achieve more every day',
              'Reach that mental clarity you’ve been longing for',
            ]}
          />
          <Link
            to={ROUTES.MAIN}
            className="block px-6 py-3 bg-purple-700 rounded-2xl text-white uppercase hover:bg-purple-800"
          >
            Get started
          </Link>
        </div>
        <Lottie animationData={animationData} style={{ width: 600 }} />
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
