import { useMemo, useState } from 'react';
import { roleLabel, users } from '../../mockData';
import type { Role } from '../../types';
import SearchInput from '../../components/admin/ui/SearchInput';
import EmptyState from '../../components/admin/ui/EmptyState';

const ROLES: (Role | 'all')[] = ['all', 'nurse', 'housekeeper', 'opd', 'maintenance', 'admin', 'executive'];

export default function Users() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<Role | 'all'>('all');

  const filtered = useMemo(
    () =>
      users.filter(
        (u) => (role === 'all' || u.role === role) && u.name.includes(search.trim()),
      ),
    [search, role],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">ผู้ใช้งาน</h2>
          <p className="text-sm text-gray-400">จัดการบัญชีผู้ใช้งานและสิทธิ์การเข้าถึงระบบ</p>
        </div>
        <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
          + เพิ่มผู้ใช้งาน
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder="ค้นหาชื่อผู้ใช้งาน" />
        </div>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-gray-100 bg-gray-50 p-1">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                role === r ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700'
              }`}
            >
              {r === 'all' ? 'ทุกบทบาท' : roleLabel[r]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="ไม่พบผู้ใช้งานที่ตรงกับเงื่อนไข" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50/60 text-left text-xs font-medium text-gray-400">
              <tr>
                <th className="px-4 py-2.5">ชื่อ</th>
                <th className="px-4 py-2.5">บทบาท</th>
                <th className="px-4 py-2.5">ชั้นที่รับผิดชอบ</th>
                <th className="px-4 py-2.5">เข้าสู่ระบบล่าสุด</th>
                <th className="px-4 py-2.5">สถานะ</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-emerald-50/30">
                  <td className="px-4 py-2.5 font-medium text-gray-900">{u.name}</td>
                  <td className="px-4 py-2.5 text-gray-500">{roleLabel[u.role]}</td>
                  <td className="px-4 py-2.5 text-gray-500">{u.floor === 'all' ? 'ทุกชั้น' : `ชั้น ${u.floor}`}</td>
                  <td className="px-4 py-2.5 text-gray-500">{u.lastLogin}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
                        u.active
                          ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                          : 'border-gray-300 bg-gray-100 text-gray-500'
                      }`}
                    >
                      {u.active ? 'ใช้งานอยู่' : 'ปิดใช้งาน'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition hover:border-emerald-300 hover:text-emerald-700">
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
