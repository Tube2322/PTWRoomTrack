import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { alerts, rooms, statusAccentBorder, statusLabel } from '../mockData';
import type { Floor, RoomStatus } from '../types';
import RoomGrid from '../components/RoomGrid';
import AlertBanner from '../components/AlertBanner';

const FLOORS: Floor[] = [6, 7, 8];
const STATUSES: (RoomStatus | 'all')[] = [
  'all',
  'pending_clean',
  'cleaning',
  'occupied',
  'ready',
  'repair',
];

const ROLE_VIEWS = [
  { to: '/nurse', label: 'พยาบาล', desc: 'แจ้งทำความสะอาด / แจ้งซ่อม' },
  { to: '/housekeeper', label: 'แม่บ้าน', desc: 'รับงาน / Routine Cleaning' },
  { to: '/opd', label: 'ทีม OPD', desc: 'งานช่วยเหลือเฉพาะชั้น' },
  { to: '/maintenance', label: 'งานซ่อมบำรุง', desc: 'รับงานซ่อม / ปิดงาน' },
  { to: '/executive', label: 'ผู้บริหาร', desc: 'ภาพรวม KPI Read-only' },
];

const QUICK_ACTIONS = ['จัดการผู้ใช้งาน', 'ส่งออกรายงาน', 'Audit Log'];

export default function AdminDashboard() {
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

  const byFloor = useMemo(
    () =>
      FLOORS.map((floor) => ({
        floor,
        rooms: rooms.filter((r) => r.floor === floor && (status === 'all' || r.status === status)),
      })),
    [status],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">ศูนย์ควบคุม แอดมินหลัก</h2>
          <p className="text-sm text-gray-400">ภาพรวมทั้ง 90 ห้อง / จัดการผู้ใช้งานและข้อมูลห้อง</p>
        </div>
        <div className="flex gap-2">
          {QUICK_ACTIONS.map((label) => (
            <button
              key={label}
              className="rounded-full border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-gray-500">สลับไปดูมุมมองบทบาทอื่น</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ROLE_VIEWS.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="rounded-2xl border border-gray-100 bg-white p-3.5 transition hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-gray-900">{r.label}</p>
              <p className="mt-0.5 text-xs text-gray-400">{r.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(Object.keys(counts) as RoomStatus[])
            .filter((s) => s !== 'other')
            .map((s) => (
              <button
                key={s}
                onClick={() => setStatus(status === s ? 'all' : s)}
                className={`rounded-2xl border-l-4 bg-white p-4 text-left shadow-sm transition hover:shadow-md ${statusAccentBorder[s]} ${
                  status === s ? 'ring-2 ring-emerald-300' : 'border-y border-r border-gray-100'
                }`}
              >
                <p className="text-2xl font-bold text-gray-900">{counts[s]}</p>
                <p className="text-xs text-gray-400">{statusLabel[s]}</p>
              </button>
            ))}
        </div>
      </section>

      <AlertBanner items={alerts} />

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-500">ห้องทั้งหมด 90 ห้อง แยกตามชั้น</h3>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-gray-100 bg-gray-50 p-1">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  status === s ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700'
                }`}
              >
                {s === 'all' ? 'ทุกสถานะ' : statusLabel[s]}
              </button>
            ))}
          </div>
        </div>

        {byFloor.map(({ floor, rooms: floorRooms }) => (
          <div key={floor}>
            <div className="mb-2 flex items-baseline gap-2">
              <h4 className="text-sm font-semibold text-gray-900">ชั้น {floor}</h4>
              <span className="text-xs text-gray-400">{floorRooms.length} ห้อง</span>
            </div>
            <RoomGrid rooms={floorRooms} />
          </div>
        ))}
      </section>
    </div>
  );
}
