import type { AlertItem, AppUser, Floor, RepairTicket, Role, Room, RoomStatus } from './types';

const FLOORS: Floor[] = [6, 7, 8];

function seededStatus(roomNum: number): RoomStatus {
  const pattern: RoomStatus[] = [
    'ready',
    'ready',
    'occupied',
    'occupied',
    'pending_clean',
    'ready',
    'occupied',
    'cleaning',
    'ready',
    'repair',
  ];
  return pattern[roomNum % pattern.length];
}

export const rooms: Room[] = FLOORS.flatMap((floor) =>
  Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const id = `${floor}${String(num).padStart(2, '0')}`;
    const status = seededStatus(num);
    const base: Room = { id, floor, status, targetMin: 20 };
    if (status === 'pending_clean') {
      base.requestedAt = '10:15';
    }
    if (status === 'cleaning') {
      base.assignedTo = 'แม่บ้าน A';
      base.startedAt = '10:17';
      base.elapsedMin = 8;
    }
    return base;
  }),
);

export const repairTickets: RepairTicket[] = [
  {
    id: 'R-001',
    roomId: '805',
    floor: 8,
    issueType: 'ไฟฟ้า',
    detail: 'หลอดไฟกระพริบ',
    reportedBy: 'พยาบาล สมศรี',
    reportedAt: '09:40',
    status: 'awaiting',
  },
  {
    id: 'R-002',
    roomId: '612',
    floor: 6,
    issueType: 'ประปา',
    detail: 'ก๊อกน้ำรั่ว',
    reportedBy: 'พยาบาล มานะ',
    reportedAt: '08:55',
    status: 'in_progress',
  },
];

export const alerts: AlertItem[] = [
  { id: 'a1', message: 'ชั้น 6 รอทำ 4 ห้อง', level: 'warning', time: '10:20' },
  {
    id: 'a2',
    message: 'ห้อง 607 ใช้เวลา 15 นาที เหลือ 5 นาที',
    level: 'warning',
    time: '10:32',
  },
  { id: 'a3', message: 'ห้อง 805 รอซ่อม', level: 'critical', time: '09:40' },
];

export const roleLabel: Record<Role, string> = {
  nurse: 'พยาบาล',
  housekeeper: 'แม่บ้าน',
  opd: 'ทีม OPD',
  maintenance: 'งานซ่อมบำรุง',
  admin: 'แอดมินหลัก',
  executive: 'ผู้บริหาร',
};

export const users: AppUser[] = [
  { id: 'u1', name: 'สมศรี ใจดี', role: 'nurse', floor: 6, active: true, lastLogin: '10:12 วันนี้' },
  { id: 'u2', name: 'มานะ พากเพียร', role: 'nurse', floor: 7, active: true, lastLogin: '09:48 วันนี้' },
  { id: 'u3', name: 'สายฝน คงทน', role: 'nurse', floor: 8, active: false, lastLogin: '2 วันก่อน' },
  { id: 'u4', name: 'แม่บ้าน A', role: 'housekeeper', floor: 6, active: true, lastLogin: '10:17 วันนี้' },
  { id: 'u5', name: 'แม่บ้าน B', role: 'housekeeper', floor: 7, active: true, lastLogin: '10:05 วันนี้' },
  { id: 'u6', name: 'แม่บ้าน C', role: 'housekeeper', floor: 8, active: true, lastLogin: '09:50 วันนี้' },
  { id: 'u7', name: 'ทีม OPD 1', role: 'opd', floor: 'all', active: true, lastLogin: '08:30 วันนี้' },
  { id: 'u8', name: 'ช่างสมชาย', role: 'maintenance', floor: 'all', active: true, lastLogin: '08:55 วันนี้' },
  { id: 'u9', name: 'ผู้อำนวยการโรงพยาบาล', role: 'executive', floor: 'all', active: true, lastLogin: 'เมื่อวาน' },
  { id: 'u10', name: 'แอดมิน ธีปกร', role: 'admin', floor: 'all', active: true, lastLogin: 'ออนไลน์' },
];

export const statusLabel: Record<RoomStatus, string> = {
  pending_clean: 'รอทำความสะอาด',
  cleaning: 'กำลังดำเนินการ',
  ready: 'ห้องพร้อมรับ',
  occupied: 'มีคนไข้',
  repair: 'รอซ่อม',
  other: 'อื่น ๆ',
};

export const statusColor: Record<RoomStatus, string> = {
  pending_clean: 'bg-amber-100 text-amber-800 border-amber-300',
  cleaning: 'bg-sky-100 text-sky-800 border-sky-300',
  ready: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  occupied: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  repair: 'bg-orange-100 text-orange-800 border-orange-300',
  other: 'bg-stone-100 text-stone-700 border-stone-300',
};

export const statusDot: Record<RoomStatus, string> = {
  pending_clean: 'bg-amber-400',
  cleaning: 'bg-sky-500',
  ready: 'bg-emerald-500',
  occupied: 'bg-indigo-500',
  repair: 'bg-orange-500',
  other: 'bg-stone-400',
};

export const statusAccentBorder: Record<RoomStatus, string> = {
  pending_clean: 'border-l-amber-400',
  cleaning: 'border-l-sky-500',
  ready: 'border-l-emerald-500',
  occupied: 'border-l-indigo-500',
  repair: 'border-l-orange-500',
  other: 'border-l-stone-400',
};
