import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from 'assets/todo-list-animation.json';
import { GithubIcon, LinkedinIcon } from 'components/icons';
import { NavLink } from './components/NavLink';
import { BenefitList } from './components/BenefitList';
import { FooterLink } from './components/FooterLink';
import * as ROUTES from 'core/routes';

export function LandingPage() {
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto flex flex-col">
      <header className="py-6 px-4 flex">
        <div className="text-2xl font-bold mr-auto md:text-4xl">
          <Link to={ROUTES.MAIN}>
            Todo<span className="text-purple-700">.</span>app
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
          <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
        </nav>
      </header>
      <main className="grow py-6 px-4 flex justify-between items-center flex-col md:flex-row">
        <div className="mb-8 flex flex-col justify-start items-center md:items-start">
          <h1 className="max-w-2xl mb-8 py-4 font-bold text-2xl leading-normal text-center md:text-left md:text-4xl">
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
        <Lottie animationData={animationData} className="w-4/5 md:w-[600px]" />
      </main>
      <footer className="py-6 px-4 flex items-center">
        <p className="mr-auto text-xs md:text-base">©2023 Siarhei Rachkouski</p>
        <div>
          <FooterLink to="https://github.com/svr-by">
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
