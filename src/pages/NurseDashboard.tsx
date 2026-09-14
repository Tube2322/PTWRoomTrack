import { useMemo, useState } from 'react';
import { rooms } from '../mockData';
import type { Floor, Room } from '../types';
import FloorTabs from '../components/FloorTabs';
import RoomGrid from '../components/RoomGrid';

export default function NurseDashboard() {
  const [floor, setFloor] = useState<Floor>(6);
  const [selected, setSelected] = useState<Room | null>(null);
  const floorRooms = useMemo(() => rooms.filter((r) => r.floor === floor), [floor]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">แดชบอร์ดพยาบาล</h2>
          <p className="text-sm text-gray-500">เห็นเฉพาะห้องของชั้นตนเอง</p>
        </div>
        <FloorTabs value={floor} onChange={setFloor} />
      </div>

      <RoomGrid
        rooms={floorRooms}
        actionLabel="แจ้งทำความสะอาด"
        onAction={(room) => setSelected(room)}
      />

      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
            <h3 className="text-base font-semibold text-gray-900">ห้อง {selected.id}</h3>
            <p className="mt-1 text-sm text-gray-500">เลือกการดำเนินการ</p>
            <div className="mt-4 space-y-2">
              <button
                className="w-full rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
                onClick={() => setSelected(null)}
              >
                แจ้งทำความสะอาด
              </button>
              <button
                className="w-full rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
                onClick={() => setSelected(null)}
              >
                แจ้งซ่อม
              </button>
              <button
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setSelected(null)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
