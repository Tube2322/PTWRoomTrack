import { useState } from 'react';
import Switch from '../../components/admin/ui/Switch';

export default function Settings() {
  const [targetMin, setTargetMin] = useState(20);
  const [opdThreshold, setOpdThreshold] = useState(3);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyLine, setNotifyLine] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ตั้งค่าระบบ</h2>
        <p className="text-sm text-gray-400">กำหนดเกณฑ์เวลาและการแจ้งเตือนของระบบ</p>
      </div>

      <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">เป้าหมายเวลาทำห้อง</h3>
        <label className="block text-sm text-gray-600">
          เวลาเป้าหมาย (นาที)
          <input
            type="number"
            value={targetMin}
            onChange={(e) => setTargetMin(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="block text-sm text-gray-600">
          เรียกทีม OPD เมื่อห้องรอทำมากกว่า (ห้อง)
          <input
            type="number"
            value={opdThreshold}
            onChange={(e) => setOpdThreshold(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </section>

      <section className="space-y-1 rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-2 text-sm font-semibold text-gray-900">ช่องทางแจ้งเตือน</h3>
        <Switch checked={notifyPush} onChange={setNotifyPush} label="Push Notification ในระบบ" />
        <Switch checked={notifyLine} onChange={setNotifyLine} label="LINE / Teams" />
        <Switch checked={notifyEmail} onChange={setNotifyEmail} label="อีเมล" />
      </section>

      <div className="flex justify-end">
        <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
}
