import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Terminal, ArrowRight, CheckCircle2, Lock, Zap, BookOpen, Layers, Users, Sparkles } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function HomePage() {
  const learningPaths = mockEngine.getLearningPaths();
  const featuredCourse = mockEngine.getCourseBySlug('soc-fundamentals-incident-response');

  return (
    <div className="min-h-screen bg-[#090D16]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-surface-border bg-grid-cyber">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-redkross-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-surface-100 border border-surface-border text-xs text-slate-300 font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACADEMY COHORT 2026 NOW ACTIVE</span>
              <span className="text-slate-500">•</span>
              <span className="text-redkross-400 font-semibold">PRD v1.0 CERTIFICATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Institutional Training for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-redkross-500 via-rose-400 to-amber-400">
                Defensive Cyber Operators
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Master 24/7 SOC log analysis, MITRE ATT&CK correlation, and incident triage through structured curriculum and tamper-proof verification.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-lg hover:cyber-glow-red flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Course Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/paths"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Layers className="w-4 h-4 text-cyber-cyan" />
                <span>View Learning Paths</span>
              </Link>
              <Link
                to="/verify"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-surface-card hover:bg-surface-100 border border-surface-border text-slate-300 hover:text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Award className="w-4 h-4 text-cyber-emerald" />
                <span>Verify a Credential</span>
              </Link>
            </div>

            {/* Live Platform Telemetry */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-surface-border/60 pt-8">
              <div className="p-3 bg-surface-card/60 rounded-lg border border-surface-border/80">
                <div className="text-2xl font-bold text-white font-mono tabular-nums">1,420+</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Active Learners</div>
              </div>
              <div className="p-3 bg-surface-card/60 rounded-lg border border-surface-border/80">
                <div className="text-2xl font-bold text-cyber-cyan font-mono tabular-nums">10</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Specialized Courses</div>
              </div>
              <div className="p-3 bg-surface-card/60 rounded-lg border border-surface-border/80">
                <div className="text-2xl font-bold text-cyber-emerald font-mono tabular-nums">98.4%</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Verified Audit Rate</div>
              </div>
              <div className="p-3 bg-surface-card/60 rounded-lg border border-surface-border/80">
                <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">50+</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Token Milestones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course Banner */}
      {featuredCourse && (
        <section className="py-16 bg-[#0B101D] border-b border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-surface-card border border-surface-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-redkross-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 max-w-2xl relative z-10">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-redkross-400 font-semibold px-2.5 py-1 rounded bg-redkross-600/10 border border-redkross-600/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FLAGSHIP PROFESSIONAL PROGRAMME</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredCourse.title}
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {featuredCourse.overview}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded bg-surface-100 text-slate-300 text-xs font-mono border border-surface-border">
                    Difficulty: {featuredCourse.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-100 text-slate-300 text-xs font-mono border border-surface-border">
                    Duration: {featuredCourse.estimated_duration}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                    Free to Enrol & Study
                  </span>
                </div>
              </div>

              <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
                <Link
                  to={`/courses/${featuredCourse.slug}`}
                  className="w-full text-center px-6 py-3 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-md hover:cyber-glow-red"
                >
                  View Course & Syllabus
                </Link>
                <Link
                  to="/student"
                  className="w-full text-center px-6 py-3 rounded-lg bg-surface-100 hover:bg-surface-200 border border-surface-border text-slate-200 font-semibold text-sm transition-colors"
                >
                  Open in Student Portal
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Structured Learning Paths */}
      <section className="py-20 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Defensive Career Pathways
            </h2>
            <p className="text-slate-400 text-sm">
              Structured step-by-step curricula taking you from foundational networking and operating system telemetry to advanced incident response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="bg-surface-card border border-surface-border hover:border-slate-700 rounded-xl p-6 transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-surface-100 text-slate-300 border border-surface-border">
                      {path.difficulty}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {path.estimated_weeks} Weeks • {path.total_hours}h
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {path.short_desc}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Skills Validated</div>
                    <div className="flex flex-wrap gap-1.5">
                      {path.skills.map((skill, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-surface-100 text-slate-300 font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Milestone Credential</div>
                    <div className="text-xs font-semibold text-emerald-400">{path.milestone_cert}</div>
                  </div>
                  <Link
                    to="/paths"
                    className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRD Academic Integrity & Safeguards */}
      <section className="py-20 bg-[#060910] border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-redkross-600/10 border border-redkross-600/30 text-redkross-400 text-xs font-mono mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>STRICT ACADEMIC FIDELITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Protected Credential Integrity
            </h2>
            <p className="text-slate-400 text-sm">
              Our certifications are trusted by enterprise blue teams because every evaluation strictly enforces proctoring standards specified in our Developer Handover PRD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-redkross-600/10 border border-redkross-600/30 flex items-center justify-center text-redkross-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3-Strike Exam Focus Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                During evaluated assessments, client tab switches and window blur events are actively tracked. Strike 1 warns the student; Strike 2 deducts 50 RedKross Tokens; Strike 3 immediately aborts the exam and locks the evaluation window.
              </p>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">24-Hour Cooldown Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assessments allow up to 3 attempts per evaluation window. If a student fails 3 consecutive attempts, an atomic 24-hour lockout is enforced server-side, preventing mindless answer brute-forcing and mandating remedial study.
              </p>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center text-cyber-emerald">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Public Cryptographic Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every issued certificate is registered with a unique alphanumeric verification ID, a 256-bit digital cryptographic signature, and a QR code instantly resolvable on our public verification portal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
