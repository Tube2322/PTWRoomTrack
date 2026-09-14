export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-200 py-12 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-300">—</span>
      <p className="text-sm text-stone-400">{message}</p>
    </div>
  );
}
