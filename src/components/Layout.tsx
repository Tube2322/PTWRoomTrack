import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/nurse', label: 'พยาบาล' },
  { to: '/housekeeper', label: 'แม่บ้าน' },
  { to: '/opd', label: 'ทีม OPD' },
  { to: '/maintenance', label: 'งานซ่อมบำรุง' },
  { to: '/admin', label: 'แอดมินหลัก' },
  { to: '/executive', label: 'ผู้บริหาร' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">PTW Room Ready</h1>
            <p className="text-xs text-gray-500">
              ระบบบริหารสถานะห้องพักและงานทำความสะอาด แบบ Real-time
            </p>
          </div>
          <nav className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
