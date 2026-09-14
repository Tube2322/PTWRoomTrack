import type { Floor } from '../types';

const FLOORS: Floor[] = [6, 7, 8];

export default function FloorTabs({
  value,
  onChange,
}: {
  value: Floor;
  onChange: (f: Floor) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-stone-100 bg-stone-50 p-1">
      {FLOORS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded-full px-3.5 py-1 text-sm font-medium transition ${
            value === f ? 'bg-emerald-500 text-white shadow-sm' : 'text-stone-500 hover:text-emerald-700'
          }`}
        >
          ชั้น {f}
        </button>
      ))}
    </div>
  );
}
