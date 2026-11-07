import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CyberBackgroundWatermark from './components/common/CyberBackgroundWatermark';
import CyberCloudsBackground from './components/common/CyberCloudsBackground';
import CyberShaderBackground from './components/ui/CyberShaderBackground';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Lightweight Branded Loading Suspense Fallback
function CyberLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#D97706]/20 animate-ping" />
        <div className="w-12 h-12 rounded-full border-2 border-t-[#D97706] border-r-transparent border-b-[#FF7A00] border-l-transparent animate-spin" />
      </div>
      <div className="text-xs font-mono tracking-widest text-[#D97706] uppercase animate-pulse">
        Initializing Secure Stream...
      </div>
    </div>
  );
}

// ---------------- Route-Level Code Splitting (React.lazy) ---------------- //
// Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const CyberAcademyPage = lazy(() => import('./pages/public/CyberAcademyPage'));
const CyberCourseDetailPage = lazy(() => import('./pages/public/CyberCourseDetailPage'));
const PsychologyAcademyPage = lazy(() => import('./pages/public/PsychologyAcademyPage'));
const PsychologyCourseDetailPage = lazy(() => import('./pages/public/PsychologyCourseDetailPage'));
const LearningPathsPage = lazy(() => import('./pages/public/LearningPathsPage'));
const CourseCatalogPage = lazy(() => import('./pages/public/CourseCatalogPage'));
const CourseDetailPage = lazy(() => import('./pages/public/CourseDetailPage'));
const VerifyCredentialPage = lazy(() => import('./pages/public/VerifyCredentialPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));

// Student Pages
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const CyberStudentDashboard = lazy(() => import('./pages/student/CyberStudentDashboard'));
const PsychologyStudentDashboard = lazy(() => import('./pages/student/PsychologyStudentDashboard'));
const LessonPlayerPage = lazy(() => import('./pages/student/LessonPlayerPage'));
const QuizAssessmentPage = lazy(() => import('./pages/student/QuizAssessmentPage'));
const TokenWalletPage = lazy(() => import('./pages/student/TokenWalletPage'));
const FinalCertificationPage = lazy(() => import('./pages/student/FinalCertificationPage'));
const CourseHomePage = lazy(() => import('./pages/student/CourseHomePage'));

// Admin Pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminCoursesPage = lazy(() => import('./pages/admin/AdminCoursesPage'));
const AdminQuizzesPage = lazy(() => import('./pages/admin/AdminQuizzesPage'));
const AdminAssignmentsPage = lazy(() => import('./pages/admin/AdminAssignmentsPage'));
const AdminCertificatesPage = lazy(() => import('./pages/admin/AdminCertificatesPage'));
const AdminStudentsPage = lazy(() => import('./pages/admin/AdminStudentsPage'));
const AdminEnrollmentsPage = lazy(() => import('./pages/admin/AdminEnrollmentsPage'));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'));
const AdminAuditLogsPage = lazy(() => import('./pages/admin/AdminAuditLogsPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage'));

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-[#F1F5F9] overflow-x-clip">
      {/* 3D Vanta Volumetric Clouds (Amber + Black Blending) */}
      <CyberCloudsBackground />

      {/* WebGL Ray-Marching Fractal Particles (Amber + Black Blending) */}
      <CyberShaderBackground />

      {/* Centered Ambient RedKross Background Watermark (Amber + Black) */}
      <CyberBackgroundWatermark />

      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28 relative z-10">
        <Suspense fallback={<CyberLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CyberLoadingFallback />}>
        <Routes>
          {/* Dedicated Themed Academy Division Portals (Autonomous Themes & Layouts) */}
          <Route path="academy/cybersecurity" element={<CyberAcademyPage />} />
          <Route path="academy/cybersecurity/courses/:slug" element={<CyberCourseDetailPage />} />
          <Route
            path="academy/cybersecurity/student"
            element={
              <ProtectedRoute>
                <CyberStudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="academy/psychology" element={<PsychologyAcademyPage />} />
          <Route path="academy/psychology/courses/:slug" element={<PsychologyCourseDetailPage />} />
          <Route
            path="academy/psychology/student"
            element={
              <ProtectedRoute>
                <PsychologyStudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="cyber" element={<Navigate to="/academy/cybersecurity" replace />} />
          <Route path="cyber/courses/:slug" element={<Navigate to="/academy/cybersecurity/courses/:slug" replace />} />
          <Route path="cyber/student" element={<Navigate to="/academy/cybersecurity/student" replace />} />
          <Route path="psychology" element={<Navigate to="/academy/psychology" replace />} />
          <Route path="psychology/courses/:slug" element={<Navigate to="/academy/psychology/courses/:slug" replace />} />
          <Route path="psychology/student" element={<Navigate to="/academy/psychology/student" replace />} />

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
              path="student/course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseHomePage />
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

          {/* Dedicated Desktop-Only Admin Dashboard (min-w-[1280px], fixed 260px sidebar & 64px header) */}
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
      </Suspense>
    </BrowserRouter>
  );
}
