import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, BookOpen, Award, CheckCircle, Clock, Shield, Sparkles } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';

export default function LearningPathsPage() {
  const [paths, setPaths] = useState(mockEngine.getLearningPaths());
  const [courses, setCourses] = useState(mockEngine.getCourses());

  useEffect(() => {
    apiClient.getLearningPaths().then((p) => {
      if (p && p.length > 0) setPaths(p);
    });
    apiClient.getCourses().then((c) => {
      if (c && c.length > 0) setCourses(c);
    });
  }, []);

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#35E6B5] text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>PROGRESSIVE CAREER PATHWAYS</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold title-shading-neon tracking-tight mb-4">
            Defensive Security Specialization Tracks
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Our learning paths are carefully structured by senior incident handlers to take candidates from foundational systems knowledge to autonomous defensive operations.
          </p>
        </div>

        {/* Pathways Stack */}
        <div className="space-y-12">
          {paths.map((path, idx) => {
            const pathCourses = (path.course_ids || [])
              .map((id) => courses.find((c) => c.id === id))
              .filter(Boolean);

            return (
              <div
                key={path.id}
                className="glass-card rounded-2xl p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#263440]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-[#1B2530] text-slate-300 border border-[#263440] font-medium">
                        Track {idx + 1} of {paths.length}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {path.difficulty}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-[#94A3B8] flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{path.estimated_weeks} Weeks ({path.total_hours} Hours)</span>
                      </span>
                    </div>

                    <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      {path.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-3xl leading-relaxed">
                      {path.short_desc}
                    </p>
                  </div>

                  <div className="flex-shrink-0 p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1 text-right sm:text-left lg:text-right">
                    <div className="text-[10px] text-[#94A3B8] font-mono uppercase">Milestone Credential</div>
                    <div className="font-royal text-sm font-bold text-[#65F58A] flex items-center gap-1.5 lg:justify-end">
                      <Award className="w-4 h-4 text-[#65F58A]" />
                      <span>{path.milestone_cert}</span>
                    </div>
                  </div>
                </div>

                {/* Courses included in this pathway using the 10 distinct card designs */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold mb-4">
                    Sequential Curriculum Modules ({pathCourses.length} Courses)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pathCourses.map((c, cIdx) => (
                      <CourseCardVariant
                        key={c.id || cIdx}
                        course={c}
                        variantIndex={idx * 3 + cIdx}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
