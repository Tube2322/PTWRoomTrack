import { Route, Routes } from 'react-router-dom';
import CenterLayout from './components/Layout';
import MinimalLayout from './components/MinimalLayout';
import Login from './pages/Login';
import NurseDashboard from './pages/NurseDashboard';
import HousekeeperDashboard from './pages/HousekeeperDashboard';
import OpdDashboard from './pages/OpdDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';

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

      {/* แอดมินหลัก/ผู้บริหาร: ศูนย์ควบคุม สลับไปดูมุมมองบทบาทอื่นได้ */}
      <Route element={<CenterLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
      </Route>
    </Routes>
  );
}
