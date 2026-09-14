import { useNavigate } from 'react-router-dom';

const ROLES = [
  { to: '/nurse', label: 'พยาบาล', desc: 'แจ้งทำความสะอาด / แจ้งซ่อม เฉพาะชั้นที่รับผิดชอบ' },
  { to: '/housekeeper', label: 'แม่บ้าน', desc: 'รับงาน / ทำความสะอาด / Routine Cleaning' },
  { to: '/opd', label: 'ทีม OPD', desc: 'รับงานช่วยเหลือเฉพาะชั้นที่ได้รับมอบหมาย' },
  { to: '/maintenance', label: 'งานซ่อมบำรุง', desc: 'รับงานซ่อม / ปิดงาน' },
  { to: '/admin', label: 'แอดมินหลัก', desc: 'จัดการระบบทั้งหมด 90 ห้อง' },
  { to: '/executive', label: 'ผู้บริหาร', desc: 'ภาพรวมและ KPI แบบ Read-only' },
];

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-8 flex flex-col items-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-bold text-white">
          P
        </span>
        <h1 className="text-center text-2xl font-semibold text-stone-900">PTW Room Ready</h1>
        <p className="mt-1 text-center text-sm text-stone-400">เลือกบทบาทเพื่อเข้าสู่ระบบ (demo)</p>
      </div>
      <div className="space-y-2.5">
        {ROLES.map((r) => (
          <button
            key={r.to}
            onClick={() => navigate(r.to)}
            className="w-full rounded-2xl border border-stone-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <p className="font-semibold text-stone-900">{r.label}</p>
            <p className="mt-0.5 text-xs text-stone-400">{r.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
