import { Link, Outlet } from 'react-router-dom';

export default function MinimalLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
              P
            </span>
            <div>
              <h1 className="text-base font-semibold text-gray-900">PTW Room Ready</h1>
              <p className="text-xs text-gray-400">สถานะห้องพักและงานทำความสะอาด Real-time</p>
            </div>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
