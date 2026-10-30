import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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

// Admin Workstation Pages (Strict Functional Specification)
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminQuizzesPage from './pages/admin/AdminQuizzesPage';
import AdminAssignmentsPage from './pages/admin/AdminAssignmentsPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminEnrollmentsPage from './pages/admin/AdminEnrollmentsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';

function PublicLayout() {
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
        {/* Public Website & Standard Student Portal Routes (Responsive) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="paths" element={<LearningPathsPage />} />
          <Route path="courses" element={<CourseCatalogPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="verify" element={<VerifyCredentialPage />} />
          <Route path="verify/:id" element={<VerifyCredentialPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Student Portal Routes */}
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
        </Route>

        {/* Dedicated Desktop-Only Admin Workstation (min-w-[1280px], fixed 260px sidebar & 64px header) */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="quizzes" element={<AdminQuizzesPage />} />
          <Route path="assignments" element={<AdminAssignmentsPage />} />
          <Route path="certificates" element={<AdminCertificatesPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="enrollments" element={<AdminEnrollmentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />

          {/* Legacy Aliases & Redirects */}
          <Route path="crm" element={<Navigate to="/admin/students" replace />} />
          <Route path="incidents" element={<Navigate to="/admin/audit-logs" replace />} />
          <Route path="builder" element={<Navigate to="/admin/courses" replace />} />
          <Route path="audit" element={<Navigate to="/admin/audit-logs" replace />} />
        </Route>

        {/* Full-Screen Focus Modes */}
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
