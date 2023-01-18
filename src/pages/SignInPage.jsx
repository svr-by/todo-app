import { useState, useContext } from 'react';
import { StateContext } from '../store';
import { Link, Navigate } from 'react-router-dom';
import { UserAuthForm } from '../components';
import * as ROUTES from '../constants/routes';

export function SignInPage() {
  const [errorMes, setErrorMes] = useState(null);

  const {
    state: { user },
    actions,
  } = useContext(StateContext);

  const handleSubmit = async (email, password) => {
    if (errorMes) setErrorMes(null);
    try {
      await actions.signIn(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMes('User not found!');
          break;
        case 'auth/wrong-password':
          setErrorMes('Wrong password!');
          break;
        default:
          setErrorMes(`Sorry, unexpected error: ${error.code}!`);
          console.log(error);
      }
    }
  };

  return user ? (
    <Navigate to={ROUTES.MAIN} replace={true} />
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign In" />
      <p className="block mb-4 text-sm font-medium text-gray-700">
        No account?{' '}
        <Link to={ROUTES.SIGN_UP} className="text-indigo-800 hover:text-indigo-600">
          Sign up!
        </Link>{' '}
        Or return to{' '}
        <Link to={ROUTES.LANDING} className="text-indigo-800 hover:text-indigo-600">
          landing page.
        </Link>
      </p>
      {errorMes && (
        <p className="block py-2 px-4 text-l font-medium text-white bg-red-600 rounded">
          {errorMes}
        </p>
      )}
    </div>
  );
}
