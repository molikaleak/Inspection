import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import Dashboard from './pages/Dashboard';
import DashboardPrint from './pages/DashboardPrint';
import Insights from './pages/Insights';
import Report from './pages/Report';
import ReportPreview from './pages/ReportPreview';
import ReportsPrintAll from './pages/ReportsPrintAll';
import Archive from './pages/Archive';
import Config from './pages/Config';
import Appointments from './pages/Appointments';
import Tracker from './pages/Tracker';
import { ThemeProvider } from './contexts/ThemeContext';
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isPreview = location.pathname.includes('/preview') || location.pathname.includes('/print');

  return (
    <div className="flex flex-col lg:flex-row bg-surface min-h-screen">
      {!isPreview && (
        <>
          <Sidebar />
          <MobileHeader />
        </>
      )}
      <div className="flex-1 flex flex-col min-h-screen">
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Tracker />} />
        <Route path="/dashboard/print" element={<DashboardPrint />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/report/:id" element={<Report />} />
        <Route path="/report/:id/preview" element={<ReportPreview />} />
        <Route path="/reports/print-all" element={<ReportsPrintAll />} />
        {/* <Route path="/config" element={<Config />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

