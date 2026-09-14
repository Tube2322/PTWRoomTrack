import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { alerts } from '../../mockData';
import {
  BedIcon,
  BellIcon,
  ChartIcon,
  CloseIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  SettingsIcon,
  UsersIcon,
} from './ui/icons';

const MAIN_NAV = [
  { to: '/admin', label: 'หน้าหลัก', end: true, Icon: HomeIcon },
  { to: '/admin/rooms', label: 'จัดการห้อง', Icon: BedIcon },
  { to: '/admin/reports', label: 'รายงาน', Icon: ChartIcon },
  { to: '/admin/users', label: 'ผู้ใช้งาน', Icon: UsersIcon },
  { to: '/admin/settings', label: 'ตั้งค่า', Icon: SettingsIcon },
];

const ROLE_VIEWS = [
  { to: '/nurse', label: 'พยาบาล' },
  { to: '/housekeeper', label: 'แม่บ้าน' },
  { to: '/opd', label: 'ทีม OPD' },
  { to: '/maintenance', label: 'งานซ่อมบำรุง' },
  { to: '/executive', label: 'ผู้บริหาร' },
];

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
    isActive ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] -translate-x-full flex-col bg-[#0b1324] text-slate-300 transition-transform duration-200 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
              P
            </span>
            <div>
              <h1 className="text-sm font-semibold text-white">PTW Room Ready</h1>
              <p className="text-xs text-slate-400">ศูนย์ควบคุมแอดมิน</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white md:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto px-3 pb-3">
          {MAIN_NAV.map(({ to, label, end, Icon }) => (
            <NavLink key={to} to={to} end={end} className={navItemClass}>
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            สลับมุมมองบทบาท
          </p>
          <div className="flex flex-col gap-0.5">
            {ROLE_VIEWS.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-xl px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 px-3 py-3">
          <Link
            to="/admin/profile"
            className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-white/5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
              ธ
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">แอดมิน ธีปกร</p>
              <p className="text-xs text-slate-400">แอดมินหลัก</p>
            </div>
          </Link>
          <Link
            to="/"
            className="mt-1 flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <LogoutIcon className="h-4 w-4" />
            ออกจากระบบ
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white/90 px-4 py-3.5 backdrop-blur sm:gap-4 sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="relative w-full min-w-0 max-w-[160px] sm:max-w-md">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              placeholder="ค้นหาห้อง, ผู้ใช้งาน..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-600 outline-none transition placeholder:text-gray-300 focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-50 hover:text-emerald-600">
              <BellIcon className="h-5 w-5" />
              {alerts.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            <Link to="/admin/profile" className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition hover:bg-gray-50 sm:pr-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                ธ
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium text-gray-800">ธีปกร</span>
                <span className="block text-xs text-gray-400">แอดมินหลัก</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
