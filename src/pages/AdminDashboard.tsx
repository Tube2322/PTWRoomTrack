import { useMemo, useState } from 'react';
import { alerts, rooms, statusLabel } from '../mockData';
import type { Floor, RoomStatus } from '../types';
import RoomGrid from '../components/RoomGrid';
import AlertBanner from '../components/AlertBanner';

const FLOORS: (Floor | 'all')[] = ['all', 6, 7, 8];
const STATUSES: (RoomStatus | 'all')[] = [
  'all',
  'pending_clean',
  'cleaning',
  'occupied',
  'ready',
  'repair',
];

export default function AdminDashboard() {
  const [floor, setFloor] = useState<Floor | 'all'>('all');
  const [status, setStatus] = useState<RoomStatus | 'all'>('all');

  const counts = useMemo(() => {
    const c: Record<RoomStatus, number> = {
      pending_clean: 0,
      cleaning: 0,
      ready: 0,
      occupied: 0,
      repair: 0,
      other: 0,
    };
    rooms.forEach((r) => c[r.status]++);
    return c;
  }, []);

  const filtered = rooms.filter(
    (r) => (floor === 'all' || r.floor === floor) && (status === 'all' || r.status === status),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">แดชบอร์ดแอดมินหลัก</h2>
        <p className="text-sm text-gray-500">ภาพรวมทั้ง 90 ห้อง / จัดการผู้ใช้งานและข้อมูลห้อง</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {(Object.keys(counts) as RoomStatus[])
          .filter((s) => s !== 'other')
          .map((s) => (
            <div key={s} className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-2xl font-bold text-gray-900">{counts[s]}</p>
              <p className="text-xs text-gray-500">{statusLabel[s]}</p>
            </div>
          ))}
      </div>

      <AlertBanner items={alerts} />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={floor}
          onChange={(e) => setFloor(e.target.value === 'all' ? 'all' : (Number(e.target.value) as Floor))}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        >
          {FLOORS.map((f) => (
            <option key={f} value={f}>
              {f === 'all' ? 'ทุกชั้น' : `ชั้น ${f}`}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as RoomStatus | 'all')}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'ทุกสถานะ' : statusLabel[s]}
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-2">
          <button className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            จัดการผู้ใช้งาน
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            ส่งออกรายงาน
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Audit Log
          </button>
        </div>
      </div>

      <RoomGrid rooms={filtered} />
    </div>
  );
}
