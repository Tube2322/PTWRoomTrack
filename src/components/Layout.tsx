import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/admin', label: 'ศูนย์ควบคุม' },
  { to: '/nurse', label: 'พยาบาล' },
  { to: '/housekeeper', label: 'แม่บ้าน' },
  { to: '/opd', label: 'ทีม OPD' },
  { to: '/maintenance', label: 'งานซ่อมบำรุง' },
  { to: '/executive', label: 'ผู้บริหาร' },
];

export default function CenterLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
              P
            </span>
            <div>
              <h1 className="text-base font-semibold text-gray-900">PTW Room Ready</h1>
              <p className="text-xs text-gray-400">สถานะห้องพักและงานทำความสะอาด Real-time</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
