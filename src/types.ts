export type Floor = 6 | 7 | 8;

export type RoomStatus =
  | 'pending_clean' // 🟡 แจ้งทำความสะอาดห้อง / รอทำ
  | 'cleaning' // 🔵 กำลังดำเนินการ
  | 'ready' // 🟢 ห้องพร้อมรับ
  | 'occupied' // 🔵 มีคนไข้
  | 'repair' // 🔧 ห้องรอซ่อม
  | 'other'; // ⚪ อื่น ๆ

export type Role =
  | 'nurse'
  | 'housekeeper'
  | 'admin'
  | 'executive'
  | 'opd'
  | 'maintenance';

export interface Room {
  id: string; // e.g. "607"
  floor: Floor;
  status: RoomStatus;
  assignedTo?: string;
  requestedAt?: string; // HH:mm
  startedAt?: string; // HH:mm
  elapsedMin?: number;
  targetMin: 20;
  overdueReason?: string;
}

export interface RepairTicket {
  id: string;
  roomId: string;
  floor: Floor;
  issueType: string;
  detail: string;
  reportedBy: string;
  reportedAt: string;
  status: 'awaiting' | 'in_progress' | 'done';
}

export interface AlertItem {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  time: string;
}

export interface AppUser {
  id: string;
  name: string;
  role: Role;
  floor: Floor | 'all';
  active: boolean;
  lastLogin: string;
}
