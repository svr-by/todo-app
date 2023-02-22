export function FooterLink({ to, children }) {
  return (
    <a
      href={to}
      target="_blank"
      rel="noreferrer"
      className="inline-block ml-4 hover:text-purple-700"
    >
      {children}
    </a>
  );
}
