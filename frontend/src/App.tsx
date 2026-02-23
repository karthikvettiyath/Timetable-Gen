import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import type { RootState } from './store';

import FacultyPage from './pages/FacultyPage';
import Dashboard from './pages/Dashboard';
import RoomPage from './pages/RoomPage';
import SubjectPage from './pages/SubjectPage';
import ClassGroupPage from './pages/ClassGroupPage';
import TimeSlotPage from './pages/TimeSlotPage';
import TimetablePage from './pages/TimetablePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles?: string[] }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={isAuthenticated ? <Navigate to="/" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/faculties" element={
          <ProtectedRoute roles={['admin']}>
            <FacultyPage />
          </ProtectedRoute>
        } />
        <Route path="/rooms" element={
          <ProtectedRoute roles={['admin']}>
            <RoomPage />
          </ProtectedRoute>
        } />
        <Route path="/subjects" element={
          <ProtectedRoute roles={['admin']}>
            <SubjectPage />
          </ProtectedRoute>
        } />
        <Route path="/class-groups" element={
          <ProtectedRoute roles={['admin']}>
            <ClassGroupPage />
          </ProtectedRoute>
        } />
        <Route path="/time-slots" element={
          <ProtectedRoute roles={['admin']}>
            <TimeSlotPage />
          </ProtectedRoute>
        } />
        <Route path="/timetable" element={
          <ProtectedRoute>
            <TimetablePage />
          </ProtectedRoute>
        } />

        {/* Default redirect to landing if not authenticated */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/landing"} />} />
      </Routes>
    </Router>
  );
}

export default App;
