import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, BookOpen, Award, CheckCircle, Clock, Shield } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function LearningPathsPage() {
  const paths = mockEngine.getLearningPaths();
  const allCourses = mockEngine.getCourses();

  return (
    <div className="min-h-screen bg-[#090D16] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>PROGRESSIVE CAREER PATHWAYS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Defensive Security Specialization Tracks
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our learning paths are carefully structured by senior incident handlers to take candidates from foundational systems knowledge to autonomous defensive operations.
          </p>
        </div>

        {/* Pathways Stack */}
        <div className="space-y-12">
          {paths.map((path, idx) => {
            const pathCourses = (path.course_ids || [])
              .map((id) => allCourses.find((c) => c.id === id))
              .filter(Boolean);

            return (
              <div
                key={path.id}
                className="bg-surface-card border border-surface-border rounded-xl p-8 shadow-xl relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-border mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-surface-100 text-slate-300 border border-surface-border font-medium">
                        Track {idx + 1} of {paths.length}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {path.difficulty}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{path.estimated_weeks} Weeks ({path.total_hours} Hours)</span>
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">{path.title}</h2>
                    <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">{path.short_desc}</p>
                  </div>

                  <div className="bg-surface-50 border border-surface-border rounded-lg p-4 min-w-[260px] text-left">
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">Target Credential</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{path.milestone_cert}</span>
                    </div>
                  </div>
                </div>

                {/* Courses in Pathway Sequence */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-redkross-500" />
                    <span>Curriculum Sequence ({pathCourses.length} Courses)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pathCourses.map((crs, stepIdx) => (
                      <Link
                        key={crs.id}
                        to={`/courses/${crs.slug}`}
                        className="p-4 rounded-lg bg-surface-100/60 hover:bg-surface-100 border border-surface-border hover:border-slate-600 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                            <span>Step 0{stepIdx + 1}</span>
                            <span className="text-emerald-400 font-semibold">{crs.price === 0 ? 'Free' : `₹${crs.price}`}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-redkross-400 transition-colors mb-1">
                            {crs.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                            {crs.overview}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-surface-border/50 text-[10px] text-slate-400 font-mono">
                          <span>{crs.estimated_duration}</span>
                          <span className="flex items-center space-x-1 text-slate-300 group-hover:translate-x-1 transition-transform">
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
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
