import { Link } from 'react-router-dom';
import { UserAuthForm } from '../components';

export function SignInPage() {
  const handleSubmit = (email, password) => {
    console.log(email, password);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign In" />
      <p className="block mb-2 text-sm font-medium text-gray-700">
        No account?{' '}
        <Link to="/signup" className="text-indigo-800 hover:text-indigo-600">
          Sign up!
        </Link>{' '}
        Or return to{' '}
        <Link to="/" className="text-indigo-800 hover:text-indigo-600">
          main page.
        </Link>
      </p>
    </div>
  );
}
