import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signUpFirebase } from 'api/api';
import { Link, Navigate } from 'react-router-dom';
import { UserAuthForm } from 'components';
import * as ROUTES from 'core/routes';

export function SignUpPage() {
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (email, password) => {
    try {
      await signUpFirebase(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('User with this email already exists!');
          break;
        case 'auth/weak-password!':
          toast.error('Weak password!');
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
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">Create account</h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign Up" />
      <p className="block mb-4 text-center text-sm font-medium text-gray-700">
        Already have an account?{' '}
        <Link to={ROUTES.SIGN_IN} className="text-indigo-800 hover:text-indigo-600">
          Sign in!
        </Link>{' '}
        Or return to{' '}
        <Link to={ROUTES.LANDING} className="text-indigo-800 hover:text-indigo-600">
          landing page.
        </Link>
      </p>
    </div>
  );
}
