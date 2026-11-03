import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Lock, 
  Zap, 
  Activity,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import CyberAcademyNavbar from '../../components/cyber/CyberAcademyNavbar';
import CyberAcademyFooter from '../../components/cyber/CyberAcademyFooter';
import CyberBackgroundWatermark from '../../components/common/CyberBackgroundWatermark';
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CircuitTraceCard from '../../components/cyber/CircuitTraceCard';
import CyberLearningCard from '../../components/cyber/CyberLearningCard';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';

export default function CyberAcademyPage() {
  const [courses, setCourses] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCyberCurriculum = async () => {
      try {
        setLoading(true);
        const [courseRes, pathRes] = await Promise.all([
          apiClient.getCoursesByDivision('cybersecurity'),
          apiClient.getLearningPathsByDivision('cybersecurity')
        ]);
        setCourses(courseRes.courses || []);
        setLearningPaths(pathRes.learning_paths || []);
      } catch (err) {
        console.error('Error loading cyber curriculum:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCyberCurriculum();
    const unsub = socketClient.on('course:mutation', loadCyberCurriculum);
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  return (
    <div 
      data-academy-theme="cybersecurity"
      className="min-h-screen relative bg-transparent text-[#F1F5F9] overflow-x-clip flex flex-col font-sans"
    >
      {/* Volumetric Cyber Clouds & Background Watermark */}
      <CyberCloudsBackground />
      <CyberBackgroundWatermark />

      {/* Cyber Academy Navigation */}
      <CyberAcademyNavbar />

      <main className="flex-1 relative z-10 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DIVISION HERO BANNER */}
          <section className="text-center max-w-4xl mx-auto pt-6 pb-14 space-y-6">
            {/* Status Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-mono text-[#65F58A] shadow-[0_0_15px_rgba(101,245,138,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-ping" />
              <span>DEFENSIVE CYBER DIVISION // COHORT 2026</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300">LIVE KALI CYBERLAB INTEGRATED</span>
            </div>

            {/* Headline */}
            <h1 className="font-royal text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Defensive Cyber Operations &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#65F58A] via-[#35E6B5] to-[#00FFA3] drop-shadow-[0_0_25px_rgba(101,245,138,0.4)]">
                Application Defense Academy
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Master full-stack engineering, OWASP Top 10 web application defenses, and secure microservices through structured hands-on curricula and tamper-proof cryptographic credentials.
            </p>

            {/* Fast Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a 
                href="#courses"
                className="px-6 py-3 rounded-full bg-[#65F58A] text-[#030906] font-mono font-bold text-xs hover:bg-[#35E6B5] hover:shadow-[0_0_20px_rgba(101,245,138,0.5)] transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                <span>Explore Cyber Course</span>
              </a>
              <Link 
                to="/student"
                className="px-6 py-3 rounded-full bg-black/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs hover:bg-emerald-950/40 transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-[#65F58A]" />
                <span>Open Student Workstation</span>
              </Link>
            </div>
          </section>

          {/* CAREER TRACKS SHOWCASE */}
          {learningPaths.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#65F58A]/20">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                    Specialized Career Tracks
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                    Structured multi-week technical pipelines engineered for software defense and architecture.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#65F58A] hidden sm:block">
                  [ {learningPaths.length} ACTIVE TRACK ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {learningPaths.map((track, idx) => (
                  <CyberLearningCard key={track.id} track={track} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* DEDICATED CYBER COURSES CATALOGUE */}
          <section id="courses" className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#65F58A]/20">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                  Cybersecurity Course Curriculum
                </h2>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  Hands-on course with cryptographic verification, real code assessments, and lab workstations.
                </p>
              </div>
              <span className="text-xs font-mono text-[#65F58A] hidden sm:block">
                [ OFFICIAL MASTER CURRICULUM ]
              </span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-400 font-mono text-sm animate-pulse">
                Initializing Cybersecurity Telemetry...
              </div>
            ) : courses.length === 0 ? (
              <div className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center font-mono text-sm text-slate-400">
                Courses are being configured for the active cohort.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {courses.map((course, idx) => (
                  <CircuitTraceCard 
                    key={course.id} 
                    course={course} 
                    idx={idx} 
                    actionLabel="View Full Syllabus & Labs" 
                  />
                ))}
              </div>
            )}
          </section>

          {/* KALI CYBERLAB CALLOUT BANNER */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#030e07] via-[#05180e] to-[#030906] border border-[#65F58A]/30 relative overflow-hidden shadow-[0_0_30px_rgba(101,245,138,0.15)]">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#65F58A]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[10px] font-mono text-[#65F58A] uppercase font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Integrated Virtual CyberLab V3</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                Authentic Kali Linux Desktop &amp; 143+ Terminal Commands
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Practice real Nmap network sweeps, Wireshark packet analysis, Hydra brute-force simulation, and OWASP Juice Shop web attacks directly inside your student workstation.
              </p>
              <div className="pt-2">
                <Link
                  to="/student"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#65F58A] text-[#030906] font-mono font-bold text-xs hover:bg-[#35E6B5] transition-all shadow-md"
                >
                  <span>Launch Student Workstation &amp; CyberLab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <CyberAcademyFooter />
    </div>
  );
}
