import { Link, Outlet } from 'react-router-dom';

export default function MinimalLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-base font-bold text-white">
              P
            </span>
            <div>
              <h1 className="text-base font-semibold text-stone-900">PTW Room Ready</h1>
              <p className="text-xs text-stone-400">สถานะห้องพักและงานทำความสะอาด Real-time</p>
            </div>
          </Link>
          <Link
            to="/admin"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 px-3.5 py-1.5 text-sm font-medium text-stone-500 transition hover:border-emerald-300 hover:text-emerald-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            กลับสู่ศูนย์ควบคุม
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
