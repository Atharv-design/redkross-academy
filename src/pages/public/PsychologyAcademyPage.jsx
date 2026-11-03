import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  HeartHandshake, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  Users,
  CheckCircle2
} from 'lucide-react';
import UrgentHelpStrip from '../../components/psychology/UrgentHelpStrip';
import PsychologyAcademyNavbar from '../../components/psychology/PsychologyAcademyNavbar';
import PsychologyAcademyFooter from '../../components/psychology/PsychologyAcademyFooter';
import PsychologyBackgroundWatermark from '../../components/psychology/PsychologyBackgroundWatermark';
import AmbienceAudioPlayer from '../../components/psychology/AmbienceAudioPlayer';
import PsychologyThemedCard from '../../components/psychology/PsychologyThemedCard';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';

export default function PsychologyAcademyPage() {
  const [courses, setCourses] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPsychCurriculum = async () => {
      try {
        setLoading(true);
        const [courseRes, pathRes] = await Promise.all([
          apiClient.getCoursesByDivision('psychology'),
          apiClient.getLearningPathsByDivision('psychology')
        ]);
        setCourses(courseRes.courses || []);
        setLearningPaths(pathRes.learning_paths || []);
      } catch (err) {
        console.error('Error loading psychology curriculum:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPsychCurriculum();
    const unsub = socketClient.on('course:mutation', loadPsychCurriculum);
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  return (
    <div 
      data-academy-theme="psychology"
      className="min-h-screen relative bg-transparent text-[#F7F4EE] overflow-x-clip flex flex-col font-sans"
    >
      {/* 24/7 Crisis Help Strip */}
      <UrgentHelpStrip />

      {/* Psychology Ambient Watermark */}
      <PsychologyBackgroundWatermark />

      {/* Calming Solfeggio 528Hz Ambience Audio Player (Bottom Left Fixed) */}
      <div className="fixed bottom-6 left-6 z-50">
        <AmbienceAudioPlayer />
      </div>

      {/* Division Navigation Header */}
      <PsychologyAcademyNavbar />

      <main className="flex-1 relative z-10 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DIVISION HERO BANNER */}
          <section className="text-center max-w-4xl mx-auto pt-6 pb-14 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-xs font-mono text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>PSYCHOLOGY &amp; BEHAVIORAL SCIENCE DIVISION</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-teal-200">EVIDENCE-BASED CURRICULA</span>
            </div>

            {/* Headline */}
            <h1 className="font-royal text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Clinical Psychology &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-300 to-amber-200 drop-shadow-[0_0_25px_rgba(45,212,191,0.3)]">
                Mental Wellbeing Academy
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Rigorous, non-commercial education in Cognitive Behavioral Therapy, acute crisis de-escalation, affective neuroscience, and adolescent mental wellness.
            </p>

            {/* Fast Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a 
                href="#courses"
                className="px-6 py-3 rounded-full bg-teal-400 text-[#08121E] font-mono font-bold text-xs hover:bg-teal-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Explore Psychology Courses</span>
              </a>
              <Link 
                to="/student"
                className="px-6 py-3 rounded-full bg-[#081524]/80 border border-teal-500/30 text-teal-200 font-mono text-xs hover:bg-teal-950/40 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-teal-300" />
                <span>Student Learning Portal</span>
              </Link>
            </div>
          </section>

          {/* CAREER TRACKS SHOWCASE */}
          {learningPaths.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-teal-500/20">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-royal text-teal-100">
                    Clinical Learning Tracks
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                    Multi-week structured competencies aligned with evidence-based behavioral intervention frameworks.
                  </p>
                </div>
                <span className="text-xs font-mono text-teal-300 hidden sm:block">
                  [ {learningPaths.length} ACTIVE TRACKS ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {learningPaths.map((track, idx) => (
                  <div 
                    key={track.id}
                    className="p-7 rounded-3xl bg-[#081524]/85 backdrop-blur-xl border border-teal-500/20 hover:border-teal-400/40 transition-all flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-300 bg-teal-950/60 border border-teal-500/30">
                          {track.difficulty}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{track.estimated_weeks} Weeks</span>
                      </div>
                      <h3 className="text-xl font-bold font-royal text-white mb-2 leading-snug">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {track.short_desc}
                      </p>
                      {track.skills && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {track.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono text-teal-200 bg-teal-500/10 border border-teal-500/20">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="pt-3 border-t border-teal-500/15 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{track.total_hours} Hours</span>
                      <Link 
                        to="/courses"
                        className="text-teal-300 hover:text-white font-bold flex items-center gap-1"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DEDICATED PSYCHOLOGY COURSES */}
          <section id="courses" className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-teal-500/20">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal text-teal-100">
                  Psychology Course Catalogue
                </h2>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  Evidence-based courses with verified clinical competencies and tamper-proof graduation certificates.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-300 hidden sm:block">
                [ OPEN ACCESS &bull; ZERO COST ]
              </span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-400 font-mono text-sm animate-pulse">
                Loading Psychology Curriculum...
              </div>
            ) : courses.length === 0 ? (
              <div className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center font-mono text-sm text-slate-400">
                Courses are being configured for this cohort.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {courses.map((course, idx) => (
                  <PsychologyThemedCard
                    key={course.id}
                    course={course}
                    variant={idx + 1}
                    idx={idx}
                    ctaText="Explore Course"
                  />
                ))}
              </div>
            )}
          </section>

          {/* ETHICAL STANDARDS CALLOUT */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#06121D] via-[#081827] to-[#07131F] border border-teal-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(45,212,191,0.12)]">
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-400/40 text-[10px] font-mono text-teal-300 uppercase font-bold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Clinical &amp; Ethical Safeguards</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                RCI Ethical Alignment &amp; Stigma-Free Mental Health
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                All RedKross psychological modules operate under strict non-commercial, non-stigmatizing research protocols designed to make mental wellbeing, academic burnout prevention, and crisis response accessible to every citizen.
              </p>
              <div className="pt-2">
                <Link
                  to="/student"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400 text-[#08121E] font-mono font-bold text-xs hover:bg-teal-300 transition-all shadow-md"
                >
                  <span>Enter Student Learning Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <PsychologyAcademyFooter />
    </div>
  );
}
