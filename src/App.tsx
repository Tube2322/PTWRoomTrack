import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
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
      <Route element={<Layout />}>
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/housekeeper" element={<HousekeeperDashboard />} />
        <Route path="/opd" element={<OpdDashboard />} />
        <Route path="/maintenance" element={<MaintenanceDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
      </Route>
    </Routes>
  );
}
