# Student Interface Design (Based on Provided Design)

This interface is designed to provide an immersive, focused learning environment consistent with the "Edunex Labs" style.

## Key Design Principles
- **Dark Mode Aesthetic:** High-contrast dark background (`#071018`) with crisp, readable text and neon green (`#65F58A`) accents for actionable items and progress indicators.
- **Glassmorphism:** Use of semi-transparent, blur-heavy cards (`glass-card`) for modular grouping of content (video player, curriculum, metrics).
- **Layout:**
    - **Navigation Sidebar (Left):** Slim, icon-based navigation (Home, My Courses, Achievements, etc.).
    - **Main Content Area (Center):** Dominant video player, progress bar, lesson metadata, and "Next Lesson" CTA.
    - **Curriculum Sidebar (Right):** Collapsible chapter/lesson list with visual status indicators (Checkmark for complete, Arrow for active, Padlock for locked).
    - **Dashboard Summary (Bottom):** Cards for "Continue Learning", "Active Courses", and "Leaderboard".

## Component Structure
1.  **Video Player Component:** Responsive HTML5/YouTube embed with custom overlay for progress (`70%`).
2.  **Curriculum Tree Component:** Recursive mapping of chapters and lessons with `Lucide` icons to indicate status (`CheckCircle`, `PlayCircle`, `Lock`).
3.  **Progress Ring Component:** SVG-based ring chart showing the `Overall Progress` percentage.
4.  **Performance Chart Component:** Simple bar chart/graph (`Lessons Completed` / `Module Performance`).
