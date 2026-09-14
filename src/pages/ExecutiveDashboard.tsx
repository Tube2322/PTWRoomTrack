import { useMemo } from 'react';
import { rooms } from '../mockData';
import type { Floor, RoomStatus } from '../types';

const FLOORS: Floor[] = [6, 7, 8];

const KPI_LABELS = [
  'จำนวนห้องที่แจ้งทั้งหมด',
  'จำนวนห้องที่ทำเสร็จภายใน 20 นาที',
  'เปอร์เซ็นต์ผ่านเป้าหมาย',
  'Average Cleaning Time',
  'Average Waiting Time',
  'จำนวนครั้งที่เรียกทีม OPD',
];

export default function ExecutiveDashboard() {
  const byFloor = useMemo(
    () =>
      FLOORS.map((floor) => {
        const floorRooms = rooms.filter((r) => r.floor === floor);
        const count: Record<RoomStatus, number> = {
          pending_clean: 0,
          cleaning: 0,
          ready: 0,
          occupied: 0,
          repair: 0,
          other: 0,
        };
        floorRooms.forEach((r) => count[r.status]++);
        return { floor, count, total: floorRooms.length };
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">แดชบอร์ดผู้บริหาร</h2>
          <p className="text-sm text-gray-400">ภาพรวม 90 ห้อง และ KPI</p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Read-only
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {byFloor.map(({ floor, count, total }) => (
          <div key={floor} className="rounded-2xl border border-gray-100 bg-white p-4">
            <p className="text-sm font-semibold text-gray-900">ชั้น {floor}</p>
            <p className="mt-1 text-xs text-gray-400">{total} ห้อง</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex justify-between text-emerald-700">
                <span>พร้อมรับ</span>
                <span>{count.ready}</span>
              </div>
              <div className="flex justify-between text-indigo-700">
                <span>มีคนไข้</span>
                <span>{count.occupied}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>รอทำ</span>
                <span>{count.pending_clean}</span>
              </div>
              <div className="flex justify-between text-sky-700">
                <span>กำลังทำ</span>
                <span>{count.cleaning}</span>
              </div>
              <div className="flex justify-between text-orange-700">
                <span>รอซ่อม</span>
                <span>{count.repair}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-900">KPI สรุป</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {KPI_LABELS.map((label) => (
            <div key={label} className="rounded-xl bg-emerald-50/50 p-3">
              <p className="text-xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
