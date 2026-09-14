import { Route, Routes } from 'react-router-dom';
import CenterLayout from './components/Layout';
import MinimalLayout from './components/MinimalLayout';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/Login';
import NurseDashboard from './pages/NurseDashboard';
import HousekeeperDashboard from './pages/HousekeeperDashboard';
import OpdDashboard from './pages/OpdDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import AdminOverview from './pages/admin/Overview';
import AdminRoomsManage from './pages/admin/RoomsManage';
import AdminReports from './pages/admin/Reports';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* พยาบาล/แม่บ้าน/OPD/ซ่อมบำรุง: เห็นเฉพาะหน้าของตัวเอง ไม่มีตัวสลับบทบาท */}
      <Route element={<MinimalLayout />}>
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/housekeeper" element={<HousekeeperDashboard />} />
        <Route path="/opd" element={<OpdDashboard />} />
        <Route path="/maintenance" element={<MaintenanceDashboard />} />
      </Route>

      {/* ผู้บริหาร: ศูนย์ควบคุม สลับไปดูมุมมองบทบาทอื่นได้ */}
      <Route element={<CenterLayout />}>
        <Route path="/executive" element={<ExecutiveDashboard />} />
      </Route>

      {/* แอดมินหลัก: ศูนย์ควบคุมแบบ sidebar หลายหน้าย่อย */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="rooms" element={<AdminRoomsManage />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
}
