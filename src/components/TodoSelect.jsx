export function TodoSelect({ options, value, label, onChange }) {
  const id = `todo_${label.split(' ').join('_')}`;

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value || ''}
        onChange={handleChange}
      >
        <option value="">Main</option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="capitalize">
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
