export default function Profile() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">โปรไฟล์</h2>
        <p className="text-sm text-gray-400">ข้อมูลบัญชีผู้ดูแลระบบ</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">
          ธ
        </span>
        <div>
          <p className="text-base font-semibold text-gray-900">แอดมิน ธีปกร</p>
          <p className="text-sm text-gray-400">แอดมินหลัก · ดูแลทุกชั้น</p>
        </div>
      </div>

      <section className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5">
        <label className="block text-sm text-gray-600">
          ชื่อ-นามสกุล
          <input
            defaultValue="แอดมิน ธีปกร"
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="block text-sm text-gray-600">
          อีเมล
          <input
            defaultValue="admin@ptwroomready.local"
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="block text-sm text-gray-600">
          บทบาท
          <input
            disabled
            defaultValue="แอดมินหลัก"
            className="mt-1 w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400 outline-none"
          />
        </label>
      </section>

      <div className="flex justify-end">
        <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
}
