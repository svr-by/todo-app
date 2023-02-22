import { useState } from 'react';
import { EmailIcon, PasswordIcon } from 'components/icons';

export function UserAuthForm({ onSubmit, submitBtn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    onSubmit(email, password);
  };

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    if (inputName === 'email') {
      setEmail(inputValue);
    } else if (inputName === 'password') {
      setPassword(inputValue);
    }
  };

  return (
    <div className="mb-4 p-6 w-4/5 bg-white shadow-3xl md:w-[32rem]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <label
            htmlFor="input-group-email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <EmailIcon />
            </div>
            <input
              type="email"
              id="input-group-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="input-group-pwd"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <PasswordIcon />
            </div>
            <input
              type="password"
              id="input-group-pwd"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 bg-indigo-600 text-sm font-medium text-white rounded hover:bg-indigo-700"
        >
          {submitBtn}
        </button>
      </form>
    </div>
  );
}
