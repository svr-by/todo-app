export function TodoSection({ children }) {
  return (
    <section className="w-auto min-w-[300px] flex-auto bg-slate-200">
      <div className="flex flex-col h-full overflow-hidden">{children}</div>
    </section>
  );
}
