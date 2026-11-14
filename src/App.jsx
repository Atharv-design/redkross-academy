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
const QuizRedirect = lazy(() => import('./pages/student/AssessmentRedirect').then((m) => ({ default: m.QuizRedirect })));
const TokenWalletPage = lazy(() => import('./pages/student/TokenWalletPage'));
const FinalExamRedirect = lazy(() => import('./pages/student/AssessmentRedirect').then((m) => ({ default: m.FinalExamRedirect })));
const CourseHomePage = lazy(() => import('./pages/student/CourseHomePage'));

// Admin console (server-backed; see src/pages/admin/console)
const ConsoleLayout = lazy(() => import('./pages/admin/console/ConsoleLayout'));
const OverviewPage = lazy(() => import('./pages/admin/console/OverviewPage'));
const StudentsPage = lazy(() => import('./pages/admin/console/StudentsPage'));
const StudentDetailPage = lazy(() => import('./pages/admin/console/StudentDetailPage'));
const BatchesPage = lazy(() => import('./pages/admin/console/BatchesPage'));
const BatchDetailPage = lazy(() => import('./pages/admin/console/BatchDetailPage'));
const CodesPage = lazy(() => import('./pages/admin/console/CodesPage'));
const ProctoringPage = lazy(() => import('./pages/admin/console/ProctoringPage'));
const consolePage = (name) => lazy(() => import('./pages/admin/console/ManagePages').then((m) => ({ default: m[name] })));
const AdminCoursesPage = consolePage('CoursesPage');
const NameRequestsPage = consolePage('NameRequestsPage');
const CertificatesPage = consolePage('CertificatesPage');
const TicketsPage = consolePage('TicketsPage');
const AuditPage = consolePage('AuditPage');
const AdminsPage = consolePage('AdminsPage');

// Student profile and batch registration links
const ProfilePage = lazy(() => import('./pages/student/ProfilePage'));
const JoinPage = lazy(() => import('./pages/student/JoinPage'));

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
              path="student/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="join" element={<JoinPage />} />
            <Route path="join/:code" element={<JoinPage />} />
            <Route
              path="student/final-exam/:enrolmentId"
              element={
                <ProtectedRoute>
                  <FinalExamRedirect />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin console: one place to run the academy (server-authorised) */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <ConsoleLayout />
              </AdminRoute>
            }
          >
            <Route index element={<OverviewPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="students/:id" element={<StudentDetailPage />} />
            <Route path="batches" element={<BatchesPage />} />
            <Route path="batches/:id" element={<BatchDetailPage />} />
            <Route path="codes" element={<CodesPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="proctoring" element={<ProctoringPage />} />
            <Route path="name-requests" element={<NameRequestsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
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
                <QuizRedirect />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
