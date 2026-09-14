import { useMemo } from 'react';
import { rooms } from '../../mockData';
import type { Floor } from '../../types';

const FLOORS: Floor[] = [6, 7, 8];

const KPI_CARDS = [
  { label: 'จำนวนห้องที่แจ้งทั้งหมด', value: '52' },
  { label: 'ทำเสร็จภายใน 20 นาที', value: '46' },
  { label: 'เปอร์เซ็นต์ผ่านเป้าหมาย', value: '95%' },
  { label: 'Average Cleaning Time', value: '17 นาที' },
  { label: 'Average Waiting Time', value: '6 นาที' },
  { label: 'จำนวนครั้งที่เรียกทีม OPD', value: '2' },
];

const FLOOR_PASS_RATE: Record<Floor, number> = { 6: 93, 7: 97, 8: 96 };

export default function Reports() {
  const repairCount = useMemo(() => rooms.filter((r) => r.status === 'repair').length, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">รายงาน</h2>
        <p className="text-sm text-stone-400">สรุป KPI และผลการทำห้องรายชั้น (ข้อมูลตัวอย่าง)</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-stone-100 bg-white p-4">
            <p className="text-2xl font-bold text-stone-900">{k.value}</p>
            <p className="text-xs text-stone-400">{k.label}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-stone-100 bg-white p-4">
          <p className="text-2xl font-bold text-stone-900">{repairCount}</p>
          <p className="text-xs text-stone-400">จำนวนห้องรอซ่อม</p>
        </div>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-stone-500">เปอร์เซ็นต์ผ่านเป้าหมาย 20 นาที แยกตามชั้น</h3>
        <div className="space-y-4 rounded-2xl border border-stone-100 bg-white p-5">
          {FLOORS.map((f) => (
            <div key={f}>
              <div className="mb-1.5 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-stone-700">ชั้น {f}</span>
                <span>{FLOOR_PASS_RATE[f]}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${FLOOR_PASS_RATE[f]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700">
          ส่งออกรายงาน (CSV)
        </button>
      </div>
    </div>
  );
}
