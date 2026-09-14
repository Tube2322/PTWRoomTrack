import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { rooms, statusLabel } from '../../mockData';
import type { Floor, RoomStatus } from '../../types';
import StatusBadge from '../../components/StatusBadge';
import SearchInput from '../../components/admin/ui/SearchInput';
import Pagination from '../../components/admin/ui/Pagination';
import EmptyState from '../../components/admin/ui/EmptyState';

const FLOORS: (Floor | 'all')[] = ['all', 6, 7, 8];
const STATUSES: (RoomStatus | 'all')[] = [
  'all',
  'pending_clean',
  'cleaning',
  'occupied',
  'ready',
  'repair',
];
const PAGE_SIZE = 10;

export default function RoomsManage() {
  const [params, setParams] = useSearchParams();
  const status = (params.get('status') as RoomStatus | 'all') || 'all';
  const [floor, setFloor] = useState<Floor | 'all'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const setStatus = (s: RoomStatus | 'all') => {
    setPage(1);
    if (s === 'all') {
      params.delete('status');
    } else {
      params.set('status', s);
    }
    setParams(params, { replace: true });
  };

  const filtered = useMemo(
    () =>
      rooms.filter(
        (r) =>
          (floor === 'all' || r.floor === floor) &&
          (status === 'all' || r.status === status) &&
          r.id.includes(search.trim()),
      ),
    [floor, status, search],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRooms = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">จัดการห้อง</h2>
        <p className="text-sm text-stone-400">ห้องทั้งหมด {rooms.length} ห้อง — ค้นหา กรอง และแก้ไขข้อมูลห้อง</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="ค้นหาเลขห้อง เช่น 607" />
        </div>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-stone-100 bg-stone-50 p-1">
          {FLOORS.map((f) => (
            <button
              key={f}
              onClick={() => { setFloor(f); setPage(1); }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                floor === f ? 'bg-emerald-500 text-white shadow-sm' : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              {f === 'all' ? 'ทุกชั้น' : `ชั้น ${f}`}
            </button>
          ))}
        </div>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-stone-100 bg-stone-50 p-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                status === s ? 'bg-emerald-500 text-white shadow-sm' : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              {s === 'all' ? 'ทุกสถานะ' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="ไม่พบห้องที่ตรงกับเงื่อนไข" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-stone-100 bg-white">
          <table className="min-w-[640px] w-full divide-y divide-stone-100 text-sm">
            <thead className="bg-stone-50/60 text-left text-xs font-medium text-stone-400">
              <tr>
                <th className="px-4 py-2.5">ห้อง</th>
                <th className="px-4 py-2.5">ชั้น</th>
                <th className="px-4 py-2.5">สถานะ</th>
                <th className="px-4 py-2.5">ผู้รับผิดชอบ</th>
                <th className="px-4 py-2.5">เวลา</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {pageRooms.map((r) => (
                <tr key={r.id} className="hover:bg-emerald-50/30">
                  <td className="px-4 py-2.5 font-medium text-stone-900">{r.id}</td>
                  <td className="px-4 py-2.5 text-stone-500">ชั้น {r.floor}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-2.5 text-stone-500">{r.assignedTo ?? '—'}</td>
                  <td className="px-4 py-2.5 text-stone-500">
                    {r.startedAt ?? r.requestedAt ?? '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <button className="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700">
                      รายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
