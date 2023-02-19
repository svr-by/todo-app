import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signInFirebase } from '../firebase/api';
import { Link, Navigate } from 'react-router-dom';
import { UserAuthForm } from '../components';
import * as ROUTES from '../core/routes';

export function SignInPage() {
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (email, password) => {
    try {
      await signInFirebase(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('User not found!');
          break;
        case 'auth/wrong-password':
          toast.error('Wrong password!');
          break;
        default:
          toast.error('Sorry, unexpected error!');
      }
    }
  };

  return user ? (
    <Navigate to={ROUTES.MAIN} replace={true} />
  ) : (
    <div className="w-screen h-screen p-2 flex flex-col justify-center items-center">
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign In" />
      <p className="block mb-4 text-center text-sm font-medium text-gray-700">
        No account?{' '}
        <Link to={ROUTES.SIGN_UP} className="text-indigo-800 hover:text-indigo-600">
          Sign up!
        </Link>{' '}
        Or return to{' '}
        <Link to={ROUTES.LANDING} className="text-indigo-800 hover:text-indigo-600">
          landing page.
        </Link>
      </p>
    </div>
  );
}
