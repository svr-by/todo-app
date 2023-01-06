import { Link } from 'react-router-dom';
import { UserAuthForm } from '../components';

export function SignUpPage() {
  const handleSubmit = (email, password) => {
    console.log(email, password);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900">Create account</h2>
      <UserAuthForm onSubmit={handleSubmit} submitBtn="Sign Up" />
      <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
        Already have an account?{' '}
        <Link to="/signin" className="text-indigo-800 hover:text-indigo-600">
          Sign in!
        </Link>{' '}
        Or return to{' '}
        <Link to="/" className="text-indigo-800 hover:text-indigo-600">
          main page.
        </Link>
      </p>
    </div>
  );
}
