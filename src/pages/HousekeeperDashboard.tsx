import { useMemo, useState } from 'react';
import { rooms } from '../mockData';
import type { Floor } from '../types';
import FloorTabs from '../components/FloorTabs';
import RoomGrid from '../components/RoomGrid';

export default function HousekeeperDashboard() {
  const [floor, setFloor] = useState<Floor>(6);
  const floorRooms = useMemo(() => rooms.filter((r) => r.floor === floor), [floor]);
  const pending = floorRooms.filter((r) => r.status === 'pending_clean');
  const inProgress = floorRooms.filter((r) => r.status === 'cleaning');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">แดชบอร์ดแม่บ้าน</h2>
          <p className="text-sm text-stone-400">แสดงงานเฉพาะชั้นที่รับผิดชอบ</p>
        </div>
        <FloorTabs value={floor} onChange={setFloor} />
      </div>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-amber-700">
          งานรอทำ ({pending.length})
        </h3>
        <RoomGrid rooms={pending} actionLabel="รับเรื่อง" />
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-sky-700">
          กำลังดำเนินการ ({inProgress.length})
        </h3>
        <RoomGrid rooms={inProgress} actionLabel="ดำเนินการแล้วเสร็จ" />
      </section>

      <section className="rounded-2xl border border-stone-100 bg-emerald-50/40 p-4">
        <h3 className="text-sm font-semibold text-stone-900">Routine Cleaning</h3>
        <p className="text-xs text-stone-400">บันทึกทำความสะอาดห้องมีผู้ป่วย รอบเช้า / รอบบ่าย</p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-600">
            ทำความสะอาดรอบเช้าแล้ว
          </button>
          <button className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50">
            ทำความสะอาดรอบบ่ายแล้ว
          </button>
        </div>
      </section>
    </div>
  );
}
