import type { RoomStatus } from '../types';
import { statusColor, statusLabel } from '../mockData';

export default function StatusBadge({ status }: { status: RoomStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
