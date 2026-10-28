import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/public/HomePage';
import LearningPathsPage from './pages/public/LearningPathsPage';
import CourseCatalogPage from './pages/public/CourseCatalogPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import VerifyCredentialPage from './pages/public/VerifyCredentialPage';
import StudentDashboard from './pages/student/StudentDashboard';
import LessonPlayerPage from './pages/student/LessonPlayerPage';
import QuizAssessmentPage from './pages/student/QuizAssessmentPage';
import TokenWalletPage from './pages/student/TokenWalletPage';
import FinalCertificationPage from './pages/student/FinalCertificationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentCRMPage from './pages/admin/StudentCRMPage';
import ExamIncidentQueuePage from './pages/admin/ExamIncidentQueuePage';
import CourseBuilderPage from './pages/admin/CourseBuilderPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
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

          {/* Student Portal Routes */}
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/tokens" element={<TokenWalletPage />} />
          <Route path="student/final-exam/:enrolmentId" element={<FinalCertificationPage />} />

          {/* Admin Operations Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/crm" element={<StudentCRMPage />} />
          <Route path="admin/incidents" element={<ExamIncidentQueuePage />} />
          <Route path="admin/builder" element={<CourseBuilderPage />} />
          <Route path="admin/audit" element={<AuditLogsPage />} />
        </Route>

        {/* Full-Screen Focus Modes (No Navbar/Footer Clutter) */}
        <Route path="student/learn/:enrolmentId" element={<LessonPlayerPage />} />
        <Route path="student/quiz/:enrolmentId/:quizId" element={<QuizAssessmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
