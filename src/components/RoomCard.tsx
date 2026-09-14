import type { Room } from '../types';
import { statusDot, statusLabel } from '../mockData';

interface Props {
  room: Room;
  onAction?: (room: Room) => void;
  actionLabel?: string;
}

export default function RoomCard({ room, onAction, actionLabel }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">{room.id}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${statusDot[room.status]}`} />
      </div>
      <p className="mt-1 text-xs text-gray-500">{statusLabel[room.status]}</p>
      {room.status === 'cleaning' && room.elapsedMin !== undefined && (
        <p className="mt-1 text-xs text-sky-700">
          ใช้เวลาแล้ว {room.elapsedMin} นาที / เป้าหมาย {room.targetMin} นาที
        </p>
      )}
      {room.status === 'pending_clean' && room.requestedAt && (
        <p className="mt-1 text-xs text-amber-700">แจ้งเวลา {room.requestedAt}</p>
      )}
      {onAction && actionLabel && (
        <button
          onClick={() => onAction(room)}
          className="mt-2 w-full rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white hover:bg-gray-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
