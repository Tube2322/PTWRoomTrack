import { repairTickets } from '../mockData';

const statusLabel: Record<string, string> = {
  awaiting: 'รอรับงาน',
  in_progress: 'กำลังซ่อม',
  done: 'ซ่อมเสร็จ',
};
const statusStyle: Record<string, string> = {
  awaiting: 'bg-orange-100 text-orange-800 border-orange-300',
  in_progress: 'bg-sky-100 text-sky-800 border-sky-300',
  done: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

export default function MaintenanceDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">แดชบอร์ดงานซ่อมบำรุง</h2>
        <p className="text-sm text-gray-400">รายการแจ้งซ่อมทั้งหมด</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50/60 text-left text-xs font-medium text-gray-400">
            <tr>
              <th className="px-4 py-2.5">ห้อง</th>
              <th className="px-4 py-2.5">ประเภทปัญหา</th>
              <th className="px-4 py-2.5">รายละเอียด</th>
              <th className="px-4 py-2.5">ผู้แจ้ง</th>
              <th className="px-4 py-2.5">เวลาแจ้ง</th>
              <th className="px-4 py-2.5">สถานะ</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {repairTickets.map((t) => (
              <tr key={t.id} className="hover:bg-emerald-50/30">
                <td className="px-4 py-2.5 font-medium text-gray-900">{t.roomId}</td>
                <td className="px-4 py-2.5 text-gray-500">{t.issueType}</td>
                <td className="px-4 py-2.5 text-gray-500">{t.detail}</td>
                <td className="px-4 py-2.5 text-gray-500">{t.reportedBy}</td>
                <td className="px-4 py-2.5 text-gray-500">{t.reportedAt}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyle[t.status]}`}
                  >
                    {statusLabel[t.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  {t.status !== 'done' && (
                    <button className="rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-emerald-600">
                      {t.status === 'awaiting' ? 'รับงานซ่อม' : 'ซ่อมเสร็จ'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
