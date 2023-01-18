import { useState, useContext } from 'react';
import { StateContext } from '../store';
import { Link, Navigate } from 'react-router-dom';
import { UserAuthForm } from '../components';
import * as ROUTES from '../constants/routes';

export function SignUpPage() {
  const [errorMes, setErrorMes] = useState(null);

  const {
    state: { user },
    actions,
  } = useContext(StateContext);

  const handleSubmit = async (email, password) => {
    if (errorMes) setErrorMes(null);
    try {
      await actions.signUp(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMes('User with this email already exists!');
          break;
        case 'auth/weak-password!':
          setErrorMes('Weak password!');
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
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">Create account</h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign Up" />
      <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
        Already have an account?{' '}
        <Link to={ROUTES.SIGN_IN} className="text-indigo-800 hover:text-indigo-600">
          Sign in!
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
