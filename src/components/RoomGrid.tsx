import type { Room } from '../types';
import RoomCard from './RoomCard';

interface Props {
  rooms: Room[];
  onAction?: (room: Room) => void;
  actionLabel?: string;
}

export default function RoomGrid({ rooms, onAction, actionLabel }: Props) {
  if (rooms.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">ไม่มีห้องในสถานะนี้</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onAction={onAction} actionLabel={actionLabel} />
      ))}
    </div>
  );
}
