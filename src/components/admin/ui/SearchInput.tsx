interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'ค้นหา...' }: Props) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-300 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
}
