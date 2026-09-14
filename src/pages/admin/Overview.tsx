import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { alerts, repairTickets, rooms, statusDot, statusLabel } from '../../mockData';
import type { RoomStatus } from '../../types';
import { BedIcon, ChartIcon, CheckIcon, ClockIcon, PulseIcon, SettingsIcon, UsersIcon } from '../../components/admin/ui/icons';

const KPI_CARDS: { status: RoomStatus; label: string; Icon: typeof ClockIcon; bg: string; fg: string; deltaVsYesterday: number }[] = [
  { status: 'pending_clean', label: 'รอทำความสะอาด', Icon: ClockIcon, bg: 'bg-amber-50', fg: 'text-amber-600', deltaVsYesterday: 2 },
  { status: 'cleaning', label: 'กำลังดำเนินการ', Icon: PulseIcon, bg: 'bg-sky-50', fg: 'text-sky-600', deltaVsYesterday: -1 },
  { status: 'occupied', label: 'มีคนไข้', Icon: UsersIcon, bg: 'bg-indigo-50', fg: 'text-indigo-600', deltaVsYesterday: 3 },
  { status: 'ready', label: 'ห้องพร้อมรับ', Icon: CheckIcon, bg: 'bg-emerald-50', fg: 'text-emerald-600', deltaVsYesterday: -4 },
];

const WEEKLY_TREND = [34, 41, 38, 45, 40, 48, 52]; // จำนวนห้องที่แจ้งทำความสะอาด 7 วันล่าสุด (ตัวอย่าง)
const WEEK_LABELS = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];

const DONUT_ORDER: RoomStatus[] = ['ready', 'occupied', 'pending_clean', 'cleaning', 'repair'];
const DONUT_COLOR: Record<RoomStatus, string> = {
  ready: '#10b981',
  occupied: '#6366f1',
  pending_clean: '#fbbf24',
  cleaning: '#0ea5e9',
  repair: '#f97316',
  other: '#9ca3af',
};

function buildLinePath(values: number[], width: number, height: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 8) - 4;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export default function Overview() {
  const counts = useMemo(() => {
    const c: Record<RoomStatus, number> = { pending_clean: 0, cleaning: 0, ready: 0, occupied: 0, repair: 0, other: 0 };
    rooms.forEach((r) => c[r.status]++);
    return c;
  }, []);

  const donutSegments = useMemo(() => {
    let cumulative = 0;
    return DONUT_ORDER.map((s) => {
      const pct = (counts[s] / rooms.length) * 100;
      const start = cumulative;
      cumulative += pct;
      return { status: s, pct, start, end: cumulative };
    });
  }, [counts]);

  const donutGradient = `conic-gradient(${donutSegments
    .map((seg) => `${DONUT_COLOR[seg.status]} ${seg.start}% ${seg.end}%`)
    .join(', ')})`;

  const linePath = buildLinePath(WEEKLY_TREND, 280, 72);

  const feed = [
    ...alerts.map((a) => ({ id: a.id, text: a.message, time: a.time, level: a.level })),
    ...repairTickets.slice(0, 2).map((t) => ({
      id: t.id,
      text: `แจ้งซ่อมห้อง ${t.roomId} — ${t.issueType}`,
      time: t.reportedAt,
      level: 'info' as const,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">สวัสดีตอนเช้า, ธีปกร 👋</h2>
          <p className="text-sm text-stone-400">ภาพรวมสถานะห้องพักทั้ง 90 ห้อง แบบ Real-time</p>
        </div>
        <span className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-500">
          วันนี้ · 14 ก.ย. 2569
        </span>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-5 text-white">
        <p className="text-sm font-semibold">เป้าหมาย: ห้องพร้อมรับผู้ป่วยภายใน 20 นาที</p>
        <p className="mt-1 text-xs text-emerald-50/90">
          วันนี้ทำได้ตามเป้าหมาย 95% (86/90 ห้อง) — ดูรายละเอียดที่หน้ารายงาน
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          {KPI_CARDS.map(({ status, label, Icon, bg, fg, deltaVsYesterday }) => (
            <Link
              key={status}
              to={`/admin/rooms?status=${status}`}
              className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${fg}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    deltaVsYesterday >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}
                >
                  {deltaVsYesterday >= 0 ? '▲' : '▼'} {Math.abs(deltaVsYesterday)}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-stone-900">{counts[status]}</p>
              <p className="text-xs text-stone-400">{label}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-stone-100 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">เมนูด่วน</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/admin/rooms" className="flex flex-col items-center gap-1.5 rounded-xl bg-stone-50 py-3 text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-700">
              <BedIcon className="h-5 w-5" />
              <span className="text-xs font-medium">จัดการห้อง</span>
            </Link>
            <Link to="/admin/reports" className="flex flex-col items-center gap-1.5 rounded-xl bg-stone-50 py-3 text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-700">
              <ChartIcon className="h-5 w-5" />
              <span className="text-xs font-medium">รายงาน</span>
            </Link>
            <Link to="/admin/users" className="flex flex-col items-center gap-1.5 rounded-xl bg-stone-50 py-3 text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-700">
              <UsersIcon className="h-5 w-5" />
              <span className="text-xs font-medium">ผู้ใช้งาน</span>
            </Link>
            <Link to="/admin/settings" className="flex flex-col items-center gap-1.5 rounded-xl bg-stone-50 py-3 text-stone-600 transition hover:bg-emerald-50 hover:text-emerald-700">
              <SettingsIcon className="h-5 w-5" />
              <span className="text-xs font-medium">ตั้งค่า</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-100 bg-white p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-stone-700">แนวโน้มห้องที่แจ้งทำความสะอาด 7 วันล่าสุด</h3>
          <svg viewBox="0 0 280 72" className="w-full" preserveAspectRatio="none">
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-1 flex justify-between text-xs text-stone-400">
            {WEEK_LABELS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-100 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-stone-700">สัดส่วนสถานะห้อง</h3>
          <div className="flex items-center gap-4">
            <div
              className="relative h-28 w-28 shrink-0 rounded-full"
              style={{ background: donutGradient }}
            >
              <div className="absolute inset-2.5 flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-lg font-bold text-stone-900">{rooms.length}</span>
                <span className="text-[10px] text-stone-400">ห้องทั้งหมด</span>
              </div>
            </div>
            <div className="space-y-1.5">
              {donutSegments.map((seg) => (
                <div key={seg.status} className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span className={`h-2 w-2 rounded-full ${statusDot[seg.status]}`} />
                  {statusLabel[seg.status]}
                  <span className="font-medium text-stone-700">{counts[seg.status]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-100 bg-white lg:col-span-2">
          <div className="flex items-center justify-between px-5 pt-4">
            <h3 className="text-sm font-semibold text-stone-700">รายการล่าสุด</h3>
            <Link to="/admin/reports" className="text-xs font-medium text-emerald-600 hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          <table className="mt-3 min-w-full text-sm">
            <thead className="text-left text-xs font-medium text-stone-400">
              <tr>
                <th className="px-5 py-2">รายการ</th>
                <th className="px-5 py-2">เวลา</th>
                <th className="px-5 py-2">ระดับ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {feed.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/30">
                  <td className="px-5 py-2.5 text-stone-700">{item.text}</td>
                  <td className="px-5 py-2.5 text-stone-400">{item.time}</td>
                  <td className="px-5 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.level === 'critical'
                          ? 'bg-red-50 text-red-600'
                          : item.level === 'warning'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-sky-50 text-sky-600'
                      }`}
                    >
                      {item.level === 'critical' ? 'ด่วน' : item.level === 'warning' ? 'เฝ้าระวัง' : 'แจ้งเตือน'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-4" />
        </div>

        <div className="rounded-2xl border border-stone-100 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">กิจกรรมล่าสุด</h3>
          <ul className="space-y-4">
            {feed.map((item, i) => (
              <li key={item.id} className="relative pl-5">
                {i !== feed.length - 1 && (
                  <span className="absolute left-[3px] top-3 h-full w-px bg-stone-100" />
                )}
                <span
                  className={`absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full ${
                    item.level === 'critical' ? 'bg-red-500' : item.level === 'warning' ? 'bg-amber-500' : 'bg-sky-500'
                  }`}
                />
                <p className="text-xs text-stone-700">{item.text}</p>
                <p className="text-[11px] text-stone-400">{item.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
