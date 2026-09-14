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
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="text-center text-2xl font-bold text-gray-900">PTW Room Ready</h1>
      <p className="mt-1 text-center text-sm text-gray-500">เลือกบทบาทเพื่อเข้าสู่ระบบ (demo)</p>
      <div className="mt-6 space-y-2">
        {ROLES.map((r) => (
          <button
            key={r.to}
            onClick={() => navigate(r.to)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-gray-900"
          >
            <p className="font-semibold text-gray-900">{r.label}</p>
            <p className="text-xs text-gray-500">{r.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
