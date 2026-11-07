/**
 * AdminCoursesPage
 * Re-exports the modularized Course Studio implementation from ./courses/index.jsx
 * Architecture:
 * - CourseHeader: Search & Action Header
 * - CourseSidebarList: Course Directory Sidebar
 * - CourseWizardStepper: 4-Step Builder Progress Navigation
 * - steps/CourseInfoStep: Step 1 (Title, description, objectives)
 * - steps/CourseMediaStep: Step 2 (Poster upload/URL)
 * - steps/CourseCurriculumStep: Step 3 (Modules, lessons, and labs)
 * - steps/CourseExamStep: Step 4 (20-question module quiz generator)
 * - modals/: ModuleModal, LessonModal, QuestionModal, SuccessModal
 */

export { default } from './courses/index';
