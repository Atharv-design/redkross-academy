import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CyberBackgroundWatermark from './components/common/CyberBackgroundWatermark';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

import HomePage from './pages/public/HomePage';
import LearningPathsPage from './pages/public/LearningPathsPage';
import CourseCatalogPage from './pages/public/CourseCatalogPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import VerifyCredentialPage from './pages/public/VerifyCredentialPage';
import LoginPage from './pages/public/LoginPage';

import StudentDashboard from './pages/student/StudentDashboard';
import LessonPlayerPage from './pages/student/LessonPlayerPage';
import QuizAssessmentPage from './pages/student/QuizAssessmentPage';
import TokenWalletPage from './pages/student/TokenWalletPage';
import FinalCertificationPage from './pages/student/FinalCertificationPage';

import SuperAdminDashboard from './pages/admin/SuperAdminDashboard.jsx';
import StudentCRMPage from './pages/admin/StudentCRMPage';
import ExamIncidentQueuePage from './pages/admin/ExamIncidentQueuePage';
import CourseBuilderPage from './pages/admin/CourseBuilderPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#071018] text-[#F1F5F9] overflow-x-hidden">
      {/* Centered Ambient RedKross Cyber Background Watermark */}
      <CyberBackgroundWatermark />

      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="paths" element={<LearningPathsPage />} />
          <Route path="courses" element={<CourseCatalogPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="verify" element={<VerifyCredentialPage />} />
          <Route path="verify/:id" element={<VerifyCredentialPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Student Portal Routes (Phase 2 Mandatory Authentication) */}
          <Route
            path="student"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="student/tokens"
            element={
              <ProtectedRoute>
                <TokenWalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="student/final-exam/:enrolmentId"
            element={
              <ProtectedRoute>
                <FinalCertificationPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Operations Routes (Phase 4 & 5 RBAC: Super Admin Only) */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <SuperAdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="admin/crm"
            element={
              <AdminRoute>
                <StudentCRMPage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/incidents"
            element={
              <AdminRoute>
                <ExamIncidentQueuePage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/builder"
            element={
              <AdminRoute>
                <CourseBuilderPage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/courses"
            element={
              <AdminRoute>
                <CourseBuilderPage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/audit"
            element={
              <AdminRoute>
                <AuditLogsPage />
              </AdminRoute>
            }
          />
        </Route>

        {/* Full-Screen Focus Modes (Phase 2 Mandatory Authentication) */}
        <Route
          path="student/learn/:enrolmentId"
          element={
            <ProtectedRoute>
              <LessonPlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/quiz/:enrolmentId/:quizId"
          element={
            <ProtectedRoute>
              <QuizAssessmentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
