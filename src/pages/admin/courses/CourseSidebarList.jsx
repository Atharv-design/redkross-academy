import React from 'react';
import { BookOpen, Trash2, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';
import { COURSE_CARD_STYLES, getCardStyleByIndex } from '../../../utils/courseCardStyles';

export default function CourseSidebarList({
  courses,
  selectedCourse,
  onSelectCourse,
  onDeleteCourse,
  isCreatingNew
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-mono font-bold text-[#A3907C] uppercase tracking-wider">
          ACADEMIC DIRECTORY ({courses.length})
        </span>
      </div>

      <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
        {courses.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#0E0C09] border border-white/5 text-center text-xs font-mono text-slate-500">
            No courses found.
          </div>
        ) : (
          courses.map((course, idx) => {
            const isSelected = !isCreatingNew && selectedCourse?.id === course.id;
            const cardStyle = getCardStyleByIndex(idx);
            const totalModules = course.modules?.length || 0;
            const totalLessons = (course.modules || []).reduce(
              (acc, m) => acc + (m.lessons?.length || 0),
              0
            );

            return (
              <div
                key={course.id || idx}
                onClick={() => onSelectCourse(course)}
                className={`p-4 rounded-2xl transition-all cursor-pointer border text-left relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#1A1208] border-[#FF7A00] shadow-[0_0_25px_rgba(255,122,0,0.25)]'
                    : 'bg-[#0E0C09] border-white/5 hover:border-[#FF7A00]/40 hover:bg-[#120E09]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 truncate flex-1">
                    <span className="text-[10px] font-mono font-bold text-[#FF7A00] uppercase block truncate">
                      {course.category || 'DEFENSIVE CYBER'}
                    </span>
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-[#FFA439] transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCourse(course.id);
                    }}
                    className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5 text-[11px] font-mono text-[#A3907C]">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#FF7A00]" />
                    <span>{totalModules} Modules • {totalLessons} Lessons</span>
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    course.status === 'PUBLISHED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {course.status || 'PUBLISHED'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
