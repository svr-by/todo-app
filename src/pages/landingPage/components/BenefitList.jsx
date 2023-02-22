import { DoneCircleIcon } from 'components/icons';

export function BenefitList({ list }) {
  return (
    <ul className="mb-8">
      {list.map((item, index) => (
        <li
          key={index}
          className="flex gap-4 mb-4 justify-center text-center md:justify-start md:text-left"
        >
          <DoneCircleIcon fill="#2a8a9d" className="flex gap-4 mb-4 hidden md:block" />
          {item}
        </li>
      ))}
    </ul>
  );
}
