interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-full px-3 py-1.5 text-sm text-stone-500 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        ก่อนหน้า
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-8 w-8 rounded-full text-sm font-medium transition ${
            p === page ? 'bg-emerald-500 text-white' : 'text-stone-500 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-full px-3 py-1.5 text-sm text-stone-500 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        ถัดไป
      </button>
    </div>
  );
}
