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
        <p className="text-sm text-gray-500">รายการแจ้งซ่อมทั้งหมด</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
            <tr>
              <th className="px-4 py-2">ห้อง</th>
              <th className="px-4 py-2">ประเภทปัญหา</th>
              <th className="px-4 py-2">รายละเอียด</th>
              <th className="px-4 py-2">ผู้แจ้ง</th>
              <th className="px-4 py-2">เวลาแจ้ง</th>
              <th className="px-4 py-2">สถานะ</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {repairTickets.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-2 font-medium text-gray-900">{t.roomId}</td>
                <td className="px-4 py-2 text-gray-600">{t.issueType}</td>
                <td className="px-4 py-2 text-gray-600">{t.detail}</td>
                <td className="px-4 py-2 text-gray-600">{t.reportedBy}</td>
                <td className="px-4 py-2 text-gray-600">{t.reportedAt}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyle[t.status]}`}
                  >
                    {statusLabel[t.status]}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {t.status !== 'done' && (
                    <button className="rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-gray-700">
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
