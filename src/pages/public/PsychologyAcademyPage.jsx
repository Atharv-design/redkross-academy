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
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import UrgentHelpStrip from '../../components/psychology/UrgentHelpStrip';
import PsychologyAcademyNavbar from '../../components/psychology/PsychologyAcademyNavbar';
import Footer from '../../components/common/Footer';
import PsychologyBackgroundWatermark from '../../components/psychology/PsychologyBackgroundWatermark';
import AmbienceAudioPlayer from '../../components/psychology/AmbienceAudioPlayer';
import PsychologyThemedCard from '../../components/psychology/PsychologyThemedCard';
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CyberShaderBackground from '../../components/ui/CyberShaderBackground';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';
import { useAuth } from '../../services/auth/authContext';

function AvailabilityBadge({ access, courseId }) {
  const s = access?.settings?.[courseId];
  if (!s) return null;
  const unlocked = access.is_admin || (access.unlocked_course_ids || []).includes(courseId);
  let text = null;
  let cls = '';
  if (s.visibility === 'COMING_SOON' && !unlocked) {
    text = 'Coming soon';
    cls = 'bg-sky-500/90 text-white';
  } else if (unlocked && (s.price_inr > 0 || s.visibility === 'HIDDEN')) {
    text = 'Unlocked for you';
    cls = 'bg-emerald-500/90 text-black';
  } else if (s.price_inr > 0) {
    text = `₹${Number(s.price_inr).toLocaleString('en-IN')}`;
    cls = 'bg-amber-400/95 text-black';
  }
  if (!text) return null;
  return <span className={`absolute -top-3 left-6 z-30 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${cls}`}>{text}</span>;
}

/** Hidden courses are listed only for students who have them unlocked. */
function visibleIn(access, courseId) {
  const s = access?.settings?.[courseId];
  if (!s || s.visibility !== 'HIDDEN') return true;
  return Boolean(access.is_admin || (access.unlocked_course_ids || []).includes(courseId));
}

export default function PsychologyAcademyPage() {
  const { currentUser } = useAuth();
  const [access, setAccess] = useState(null);
  useEffect(() => {
    apiClient.getCatalogAccess({ fresh: true }).then(setAccess);
  }, [currentUser?.id]);
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
      className="min-h-screen relative bg-transparent text-slate-100 overflow-x-clip flex flex-col font-sans select-none"
    >
      {/* 1. 3D Vanta Volumetric Clouds (Amber + Black Blending) */}
      <CyberCloudsBackground />

      {/* 2. WebGL Ray-Marching Fractal Particles (Amber + Black Blending) */}
      <CyberShaderBackground />

      {/* 3. 24/7 Crisis Help Strip */}
      <UrgentHelpStrip />

      {/* 4. Psychology Ambient Watermark */}
      <PsychologyBackgroundWatermark />

      {/* 5. Calming Solfeggio 528Hz Ambience Audio Player (Bottom Left Fixed) */}
      <div className="fixed bottom-6 left-6 z-50">
        <AmbienceAudioPlayer />
      </div>

      {/* 6. Division Navigation Header */}
      <PsychologyAcademyNavbar />

      <main className="flex-1 relative z-10 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DIVISION HERO BANNER */}
          <section className="text-center max-w-4xl mx-auto pt-6 pb-14 space-y-6">
            {/* Status Telemetry Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#FF7A00]/35 text-xs font-mono text-[#FFA439] shadow-[0_0_20px_rgba(255,122,0,0.25)] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_#FF7A00]" />
              <span>PSYCHOLOGY &amp; BEHAVIORAL SCIENCE DIVISION</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300">EVIDENCE-BASED CLINICAL CURRICULA</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-royal text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
            >
              Clinical Psychology &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA439] to-[#FF8C00] drop-shadow-[0_0_30px_rgba(255,122,0,0.45)]">
                Mental Wellbeing Academy
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Rigorous, non-commercial education in Cognitive Behavioral Therapy, acute crisis de-escalation, affective neuroscience, and adolescent mental wellness.
            </motion.p>

            {/* Fast Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <a 
                href="#courses"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-black" />
                <span>Explore Psychology Courses</span>
              </a>
              <Link 
                to="/academy/psychology/student"
                className="px-6 py-3 rounded-full bg-black/60 border border-[#FF7A00]/35 text-slate-200 hover:text-white hover:border-[#FF7A00]/70 font-mono text-xs hover:bg-[#FF7A00]/10 transition-all flex items-center gap-2 shadow-lg shadow-black/40"
              >
                <Users className="w-4 h-4 text-[#FFA439]" />
                <span>Open Student Dashboard</span>
              </Link>
            </motion.div>
          </section>

          {/* ================= 1. DIVISION BLUEPRINT / WHAT HAPPENS IN THIS BRANCH ================= */}
          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            {/* Division Blueprint Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider mb-3">
                <Brain className="w-3.5 h-3.5 text-[#FFA439]" />
                <span>DIVISION BLUEPRINT // CLINICAL PSYCHOLOGY &amp; BEHAVIORAL HEALTH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                What Happens in this Branch
              </h2>
              <p className="text-xs sm:text-sm font-sans text-slate-300 mt-1 max-w-3xl leading-relaxed">
                This branch is the dedicated scientific and clinical proving ground for evidence-based behavioral intervention, affective neuroscience, and empathetic crisis response. Here, students and practitioners bridge empirical psychology with practical human casework—mastering structured formulations, distress tolerance methodologies, and trauma-informed de-escalation.
              </p>
            </div>

            {/* 3 Pillars Grid: What Happens Here, How You Learn, What Possibilities Exist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Evidence-Based Formulations */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/25 hover:border-[#FFA439]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40 hover:shadow-[0_0_25px_rgba(255,122,0,0.15)]">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <Brain className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Empirical Science &amp; Cognitive Formulations
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    This division grounds practitioners in the empirical science of cognitive, behavioral, and neurobiological change. Learn how psychological distress manifests across autonomic systems, and construct structured cognitive conceptualizations and ethical therapeutic boundaries.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Evidence-Based Formulations</span>
                </div>
              </div>

              {/* Pillar 2: Supervised Clinical Casework & Simulations */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/25 hover:border-[#FFA439]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40 hover:shadow-[0_0_25px_rgba(255,122,0,0.15)]">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <HeartHandshake className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Simulated Casework &amp; Guided Reflection
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Clinical competence is cultivated through interactive, de-identified patient case analyses, automatic thought records, behavioral activation matrices, and acute crisis triaging simulations with proctored ethical evaluations.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Supervised Practice Telemetry</span>
                </div>
              </div>

              {/* Pillar 3: Clinical Credentialing & Impact */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/25 hover:border-[#FFA439]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40 hover:shadow-[0_0_25px_rgba(255,122,0,0.15)]">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <Award className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Institutional Authority &amp; Crisis Response
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Graduates emerge prepared to lead mental health advocacy, student wellbeing programs, and community crisis response initiatives. Every milestone credential is cryptographically anchored with tamper-proof institutional verification.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Verifiable Clinical Proof</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CAREER TRACKS SHOWCASE (Transparent Liquid Glass Cards) */}
          {learningPaths.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#FF7A00]/25">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                    Clinical Learning Tracks
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                    Multi-week structured competencies aligned with evidence-based behavioral intervention frameworks.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
                  [ {learningPaths.length} ACTIVE TRACKS ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {learningPaths.map((track, idx) => (
                  <div 
                    key={track.id}
                    className="p-7 rounded-3xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/25 hover:border-[#FFA439]/60 transition-all flex flex-col justify-between shadow-xl shadow-black/50 hover:shadow-[0_0_30px_rgba(255,122,0,0.2)] group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider text-[#FFA439] bg-[#FF7A00]/15 border border-[#FF7A00]/35">
                          {track.difficulty}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{track.estimated_weeks} Weeks</span>
                      </div>
                      <h3 className="text-xl font-bold font-royal text-white mb-2 leading-snug group-hover:text-[#FFA439] transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {track.short_desc}
                      </p>
                      {track.skills && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {track.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#FFA439]/90 bg-[#FF7A00]/10 border border-[#FF7A00]/25">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{track.total_hours} Hours</span>
                      <Link 
                        to="/courses"
                        className="text-[#FFA439] hover:text-white font-bold flex items-center gap-1 group/link"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DEDICATED PSYCHOLOGY COURSES */}
          <section id="courses" className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#FF7A00]/25">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                  Psychology Course Catalogue
                </h2>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  Evidence-based courses with verified clinical competencies and tamper-proof graduation certificates.
                </p>
              </div>
              <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
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
                {courses.filter((course) => visibleIn(access, course.id)).map((course, idx) => (
                  <div key={course.id} className="relative">
                    <AvailabilityBadge access={access} courseId={course.id} />
                    <PsychologyThemedCard course={course} variant={idx + 1} idx={idx} ctaText="Explore Course" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ================= TRANSPARENT STUDENT DASHBOARD LAUNCHER ================= */}
          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-3xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/30 hover:border-[#FFA439]/60 relative overflow-hidden shadow-[0_0_40px_rgba(255,122,0,0.15)] transition-all"
          >
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left: Enrollment Telemetry & Information */}
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                  <Brain className="w-3.5 h-3.5 text-[#FFA439]" />
                  <span>IN-BRANCH STUDENT DASHBOARD // CLINICAL PORTAL</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-royal text-white leading-tight">
                  Psychology Student Dashboard &amp; Reflection Hub
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Access your personal clinical practicum telemetry, active course units, cognitive reflection journals, and verifiable digital healthcare credentials. Strictly isolated to guarantee complete privacy and zero cross-academy data leakage.
                </p>

                {/* Live Telemetry Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">PRACTITIONER ID</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5 truncate">
                      {currentUser?.cadet_id || 'RK-CLIN-ACTIVE'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">ETHICAL CODE</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-[#FFA439] mt-0.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                      <span>RCI &amp; APA ALIGNED</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">CLINICAL TUITION</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">
                      100% Zero-Cost Free
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Direct Launch Actions */}
              <div className="flex flex-col gap-3 shrink-0 lg:w-72">
                <Link
                  to="/academy/psychology/student"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_25px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2.5 text-center group"
                >
                  <span>Launch Student Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      {/* Authoritative RedKross Footer with Animated Amber Doodle Crew */}
      <Footer />
    </div>
  );
}
