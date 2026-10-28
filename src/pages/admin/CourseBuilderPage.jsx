import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Save, ChevronLeft, CheckCircle2, Layers, Award, Sparkles } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { useAuth } from '../../services/auth/authContext';

export default function CourseBuilderPage() {
  const { currentUser } = useAuth();
  const courses = mockEngine.getCourses();
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || null);
  const [courseTitle, setCourseTitle] = useState(selectedCourse?.title || '');
  const [versionBumpSuccess, setVersionBumpSuccess] = useState(null);

  const handlePublishVersion = () => {
    if (!selectedCourse) return;

    const db = mockEngine.getDb();
    const crs = db.courses.find((c) => c.id === selectedCourse.id);
    if (crs) {
      const parts = crs.version.split('.');
      const newMinor = parseInt(parts[1] || '0') + 1;
      const newVersion = `${parts[0]}.${newMinor}`;
      crs.version = newVersion;
      crs.title = courseTitle;

      db.audit_logs.push({
        id: `aud_${Date.now()}`,
        actor_id: currentUser?.email || 'admin@redkross.org.in',
        action: 'COURSE_VERSION_PUBLISHED',
        entity_type: 'courses',
        entity_id: crs.id,
        details: `Published updated snapshot version ${newVersion} for ${crs.title}`,
        created_at: new Date().toISOString(),
      });

      mockEngine.saveDb(db);
      setSelectedCourse({ ...crs });
      setVersionBumpSuccess(`Successfully published immutable snapshot v${newVersion}!`);
      setTimeout(() => setVersionBumpSuccess(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Operations Console</span>
          </Link>
          <div className="text-xs font-mono text-slate-400">
            Curriculum: <span className="text-white font-semibold">Immutable Versioning (PRD Section 4)</span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span>Curriculum & Course Version Builder</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Author and snapshot course versions. When a new version is published, existing students complete their enrolled version while new enrolments receive the updated curriculum.
          </p>
        </div>

        {versionBumpSuccess && (
          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{versionBumpSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Selector (Left Column) */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-4 space-y-2 shadow-lg">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
              Select Course to Edit ({courses.length})
            </div>

            <div className="space-y-1.5">
              {courses.map((crs) => (
                <button
                  key={crs.id}
                  onClick={() => {
                    setSelectedCourse(crs);
                    setCourseTitle(crs.title);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                    selectedCourse?.id === crs.id
                      ? 'bg-surface-100 border-amber-500 text-white font-semibold'
                      : 'bg-surface-card border-surface-border text-slate-300 hover:bg-surface-50'
                  }`}
                >
                  <span className="truncate pr-2">{crs.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-400 border border-surface-border flex-shrink-0">
                    v{crs.version}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Course Editor (Right 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCourse ? (
              <div className="bg-surface-card border border-surface-border rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                  <div>
                    <div className="text-xs font-mono text-amber-400 uppercase">Active Snapshot</div>
                    <div className="text-xl font-bold text-white">Version {selectedCourse.version}</div>
                  </div>

                  <button
                    onClick={handlePublishVersion}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Version Increment</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-slate-400 block">Course Title:</label>
                    <input
                      type="text"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="w-full p-2.5 bg-surface-100 border border-surface-border rounded-lg text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Category:</label>
                    <input
                      type="text"
                      disabled
                      value={selectedCourse.category}
                      className="w-full p-2.5 bg-surface-100/50 border border-surface-border rounded-lg text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Course Overview:</label>
                    <textarea
                      rows={3}
                      disabled
                      value={selectedCourse.overview}
                      className="w-full p-2.5 bg-surface-100/50 border border-surface-border rounded-lg text-slate-400 text-xs"
                    />
                  </div>

                  {/* Modules in version */}
                  <div className="space-y-2 pt-2">
                    <div className="text-slate-400 uppercase tracking-wider text-[11px]">
                      Modules in this Version ({selectedCourse.modules?.length || 0})
                    </div>
                    {(selectedCourse.modules || []).map((mod, i) => (
                      <div
                        key={mod.id}
                        className="p-3 rounded-lg bg-surface-100 border border-surface-border flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-white">{mod.title}</span>
                        <span className="text-slate-400">{mod.lessons.length} Lessons</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
