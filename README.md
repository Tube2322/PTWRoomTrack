# PTW Room Ready

ระบบบริหารจัดการสถานะห้องพักและงานทำความสะอาดแบบ Real-time สำหรับ 3 ชั้น (ชั้น 6, 7, 8) รวม 90 ห้อง เชื่อมโยงการทำงานระหว่างพยาบาล แม่บ้าน ทีมช่วยเหลือ OPD งานซ่อมบำรุง แอดมินหลัก และผู้บริหาร เป้าหมายคือควบคุมเวลาทำห้องให้พร้อมรับผู้ป่วยภายใน 20 นาที

Live: https://ptw-room-track.vercel.app

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Firebase (Firestore + Auth) — backend/data
- Vercel — hosting, auto-deploy จาก `main`

## บทบาทผู้ใช้งาน

| บทบาท | สิทธิ์ |
| --- | --- |
| พยาบาล | แจ้งทำความสะอาด / แจ้งซ่อม เฉพาะชั้นที่รับผิดชอบ |
| แม่บ้าน | รับงาน / ทำความสะอาด / Routine Cleaning เฉพาะชั้นของตน |
| ทีม OPD | รับงานช่วยเหลือเฉพาะชั้นที่ได้รับมอบหมาย (เมื่อห้องรอทำ > 3 ห้อง) |
| งานซ่อมบำรุง | รับงานซ่อม / ปิดงาน |
| แอดมินหลัก | จัดการระบบทั้งหมด 90 ห้อง, ผู้ใช้งาน, รายงาน, Audit Log |
| ผู้บริหาร | ดูภาพรวมและ KPI แบบ Read-only |

## สถานะห้อง

🟡 รอทำความสะอาด · 🔵 กำลังดำเนินการ / มีคนไข้ · 🟢 ห้องพร้อมรับ · 🔧 รอซ่อม

## Getting started

```bash
npm install
cp .env.example .env   # ใส่ค่า Firebase web config ของตัวเอง
npm run dev
```

## Scripts

```bash
npm run dev      # dev server
npm run build    # typecheck + build production
npm run lint      # oxlint
```

## Firebase

โปรเจกต์ใช้ Cloud Firestore เก็บข้อมูลห้อง/งาน/ประวัติ และ Firebase Auth สำหรับล็อกอินตามบทบาท

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules
```

ไฟล์ตั้งค่า: [`firebase.json`](firebase.json), [`firestore.rules`](firestore.rules), [`.firebaserc`](.firebaserc)

## โครงสร้างโปรเจกต์

```
src/
  components/   UI ที่ใช้ร่วมกัน (RoomCard, RoomGrid, StatusBadge, Layout, ...)
  pages/        แดชบอร์ดแยกตามบทบาท
  lib/firebase.ts  Firebase SDK init
  mockData.ts   ข้อมูลจำลอง 90 ห้อง (รอต่อ Firestore จริง)
  types.ts      ชนิดข้อมูลหลัก (Room, RoomStatus, Role, ...)
```

## สถานะปัจจุบัน

- [x] UI/UX โครงพื้นฐานครบ 6 บทบาท (mock data)
- [x] Hosting (Vercel) + Backend project (Firebase) พร้อมใช้งาน
- [ ] เชื่อม Firestore จริงแทน mock data
- [ ] Firebase Authentication + role-based access
- [ ] Push notification แจ้งเตือนตามชั้น/บทบาท
