/**
 * LessonPlayerPage
 * Re-exports the modularized Lesson Player workspace implementation from ./lesson-player/index.jsx
 * Architecture:
 * - LessonTopNavigation: Sticky header, course & unit breadcrumbs, progress percentage, division tool toggles
 * - LessonOutlineSidebar: Left sticky course outline with module accordions, locks, completed indicators
 * - LessonTacticalInspector: Right Recon Hub (Target HUD, Flags with token bounties, Payloads arsenal, Notes)
 * - LessonContentPanel: Interactive main content (BlockNote/Markdown, diagrams, PDF laboratory submission, CBT Exam suite)
 * - LessonBottomNavigation: Sequential previous, next, and complete unit actions
 * - modals/: CertificateRequestModal, DiagramLightboxModal, PreFlightExamModal, ModuleUnlockCelebrationModal
 */

export { default } from './lesson-player/index';
