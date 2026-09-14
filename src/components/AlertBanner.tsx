import type { AlertItem } from '../types';

const levelStyle: Record<AlertItem['level'], string> = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  critical: 'bg-red-50 text-red-800 border-red-200',
};

export default function AlertBanner({ items }: { items: AlertItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((a) => (
        <div
          key={a.id}
          className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${levelStyle[a.level]}`}
        >
          <span>{a.message}</span>
          <span className="text-xs opacity-70">{a.time}</span>
        </div>
      ))}
    </div>
  );
}
