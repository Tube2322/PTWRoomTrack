import { useMemo } from 'react';
import { rooms } from '../mockData';
import type { Floor } from '../types';
import RoomGrid from '../components/RoomGrid';

const FLOORS: Floor[] = [6, 7, 8];

export default function OpdDashboard() {
  const pendingByFloor = useMemo(
    () =>
      FLOORS.map((floor) => ({
        floor,
        pending: rooms.filter((r) => r.floor === floor && r.status === 'pending_clean'),
      })),
    [],
  );
  const assignedFloors = pendingByFloor.filter((f) => f.pending.length > 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">แดชบอร์ดทีม OPD</h2>
        <p className="text-sm text-stone-400">รับงานเฉพาะชั้นที่ได้รับมอบหมาย (รอทำ &gt; 3 ห้อง)</p>
      </div>

      {assignedFloors.length === 0 && (
        <p className="rounded-2xl border border-stone-100 bg-white p-4 text-sm text-stone-400">
          ยังไม่มีชั้นที่ต้องการความช่วยเหลือ
        </p>
      )}

      {assignedFloors.map(({ floor, pending }) => (
        <section key={floor}>
          <h3 className="mb-2 text-sm font-semibold text-orange-700">
            ชั้น {floor} — รอทำ {pending.length} ห้อง (ได้รับมอบหมาย)
          </h3>
          <RoomGrid rooms={pending} actionLabel="รับงาน" />
        </section>
      ))}
    </div>
  );
}
