# Super Admin Dashboard Design

This interface acts as the "Operations Command Center", prioritizing data visibility and control for the Administrator.

## Key Design Principles
- **Visual Consistency:** Maintains the same high-contrast dark theme, glassmorphism, and neon green accent palette as the Student Interface, ensuring a professional, cohesive platform feel.
- **Data Density:** More compact layouts for tables (Audit Logs, Incident Queue) to allow rapid monitoring of operational telemetry.

## New Feature: Curriculum Video Upload
A dedicated interface for video asset management within the Course Builder.

### UI Component: Video Upload & Management
- **Upload Zone:** A drag-and-drop zone (`dashed-border`) that accepts video files.
- **Metadata Form:** Fields for "Video Title", "Duration", "Associated Lesson", and "Visibility Status".
- **Asset Library:** A list view of uploaded videos showing their thumbnail, name, file size, and the specific lesson they are attached to, with actions to "Re-attach", "Delete", or "Replace".
- **Status Indicator:** Shows upload progress (using a bar or percentage).

## Super Admin Dashboard Structure
- **Global KPI Bar:** Top-level metrics (Students, Enrolments, Incidents).
- **Control Center:** A section for critical toggles (e.g., Catalog Visibility, Security Lockout thresholds).
- **Curriculum Studio (Video Focus):**
    - List of courses.
    - When a course/lesson is selected, a context-aware panel shows "Asset Management" where the video upload tool resides.
- **Incident Escalation Queue:** A prioritized list of flagged proctoring infractions, with action buttons to "Uphold" or "Reset Cooldown".
- **Audit Logs:** Immutable, searchable table of all actions.
