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
    <div className="inline-flex rounded-md border border-gray-200 bg-white p-0.5">
      {FLOORS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded px-3 py-1 text-sm font-medium ${
            value === f ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          ชั้น {f}
        </button>
      ))}
    </div>
  );
}
