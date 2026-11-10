import React, { useState, useEffect, useMemo } from 'react';
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
  Sparkles,
  Shield,
  UserCheck
} from 'lucide-react';
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CyberShaderBackground from '../../components/ui/CyberShaderBackground';
import CyberAcademyNavbar from '../../components/cyber/CyberAcademyNavbar';
import Footer from '../../components/common/Footer';
import CyberDivisionWatermark from '../../components/cyber/CyberDivisionWatermark';
import CyberLearningCard from '../../components/cyber/CyberLearningCard';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';
import { useAuth } from '../../services/auth/authContext';
import { CYBER_COURSES } from '../../services/db/cyberCourses';

export default function CyberAcademyPage() {
  const { currentUser } = useAuth();
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

  const cyberCoursesList = useMemo(() => {
    const list = CYBER_COURSES.map((cc) => ({
      ...cc,
      difficulty: (cc.difficulty || 'BEGINNER').toUpperCase(),
      estimated_weeks: cc.estimated_weeks || 10,
      short_desc: cc.short_desc || cc.overview
    }));

    if (courses && courses.length > 0) {
      courses.forEach((apiC) => {
        const idx = list.findIndex((item) => item.id === apiC.id || item.slug === apiC.slug);
        if (idx >= 0) {
          list[idx] = {
            ...list[idx],
            ...apiC,
            difficulty: (apiC.difficulty || list[idx].difficulty || 'BEGINNER').toUpperCase(),
            estimated_weeks: apiC.estimated_weeks || list[idx].estimated_weeks || 10,
            short_desc: apiC.short_desc || apiC.overview || list[idx].short_desc
          };
        } else {
          list.push({
            ...apiC,
            difficulty: (apiC.difficulty || 'BEGINNER').toUpperCase(),
            estimated_weeks: apiC.estimated_weeks || 10,
            short_desc: apiC.short_desc || apiC.overview
          });
        }
      });
    }

    return list;
  }, [courses]);

  const masterCourse = cyberCoursesList[0];
  const masterTrack = masterCourse;

  return (
    <div 
      data-academy-theme="cybersecurity"
      className="min-h-screen relative bg-transparent text-slate-100 overflow-x-clip flex flex-col font-sans select-none"
    >
      {/* 1. 3D Vanta Volumetric Clouds (Amber + Black Blending) */}
      <CyberCloudsBackground />

      {/* 2. WebGL Ray-Marching Fractal Particles (Amber + Black Blending) */}
      <CyberShaderBackground />

      {/* 3. Deep Ambient Reticle, Radar Rings & Traveling Amber Lightning Discharge */}
      <CyberDivisionWatermark />

      {/* 4. Transparent Liquid-Glass Cyber Academy Navigation */}
      <CyberAcademyNavbar />

      <main className="flex-1 relative z-10 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DIVISION HERO BANNER */}
          <section className="text-center max-w-4xl mx-auto pt-4 pb-14 space-y-6">
            {/* Status Telemetry Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#FF7A00]/35 text-xs font-mono text-[#FFA439] shadow-[0_0_20px_rgba(255,122,0,0.25)] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_#FF7A00]" />
              <span>DEFENSIVE CYBER DIVISION // COHORT 2026</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300">LIVE KALI CYBERLAB INTEGRATED</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-royal text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
            >
              Defensive Cyber Operations &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA439] to-[#FF8C00] drop-shadow-[0_0_30px_rgba(255,122,0,0.45)]">
                Application Defense Academy
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Master full-stack engineering, OWASP Top 10 web application defenses, and secure microservices through structured hands-on curricula and tamper-proof cryptographic credentials.
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
                <Terminal className="w-4 h-4 text-black" />
                <span>Explore Cyber Course</span>
              </a>
              <Link 
                to="/academy/cybersecurity/student"
                className="px-6 py-3 rounded-full bg-black/60 border border-[#FF7A00]/35 text-slate-200 hover:text-white hover:border-[#FF7A00]/70 font-mono text-xs hover:bg-[#FF7A00]/10 transition-all flex items-center gap-2 shadow-lg shadow-black/40"
              >
                <Cpu className="w-4 h-4 text-[#FFA439]" />
                <span>Open Student Dashboard</span>
              </Link>
            </motion.div>
          </section>

          {/* ================= 1. BRANCH OVERVIEW & MISSION ARCHITECTURE (BEFORE CURRICULUM) ================= */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 space-y-8"
          >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#FF7A00]/25">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFA439]" />
                  <span>DIVISION BLUEPRINT // DEFENSIVE OPERATIONS &amp; MANAGEMENT</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-royal text-white tracking-tight">
                  What Happens in this Branch
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
                An institutional defense wing dedicated to applied engineering, threat resilience, and verifiable operational mastery.
              </p>
            </div>

            {/* 3 Pillars Grid: What Happens Here, How You Learn, What Possibilities Exist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: What Happens Here */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <Layers className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Defensive Engineering &amp; Operations
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    This division focuses entirely on the architecture of resilience. Practitioners learn how complex systems fail, how unauthorized vectors manifest, and how to construct unbreakable server infrastructures, application firewalls, and cryptographic trust boundaries.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Proactive Threat Mitigation</span>
                </div>
              </div>

              {/* Pillar 2: How You Learn */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <Terminal className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Hands-On Telemetry &amp; Live Sandboxes
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    No passive lectures or multiple-guess shortcuts. Learning here occurs inside isolated terminal sandboxes, real packet analysis pipelines, and proctored computer-based test engines with active anti-cheat telemetry and rigorous milestone checks.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Zero-Fabrication Rigor</span>
                </div>
              </div>

              {/* Pillar 3: What You Can Achieve */}
              <div className="p-6 sm:p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,122,0,0.25)]">
                    <Award className="w-5 h-5 text-[#FFA439]" />
                  </div>
                  <h3 className="font-royal text-lg font-bold text-white group-hover:text-[#FFA439] transition-colors">
                    Cryptographic Authority &amp; Leadership
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Graduates emerge equipped to conduct defensive code audits, lead secure DevOps deployments, and spearhead enterprise incident response. Every milestone credential is permanently anchored with SHA-256 digital signature proofs verifiable anywhere in the world.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 text-[11px] font-mono text-[#FFA439]/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>Verifiable Global Proof</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= 2. DEDICATED CYBER COURSES CATALOGUE ================= */}
          <section id="courses" className="mb-20">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between mb-8 pb-3 border-b border-[#FF7A00]/25"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal text-white">
                  Cybersecurity Course Curriculum
                </h2>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  Master institutional cyber defense through hands-on curricula, real code assessments, and cryptographic credentials.
                </p>
              </div>
              <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
                [ {cyberCoursesList.length} MASTER CURRICULA ]
              </span>
            </motion.div>

            {/* Responsive Multi-Course Grid: Course 01, Course 02 & Course 03 side-by-side with uniform heights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
              {cyberCoursesList.map((courseItem, idx) => (
                <CyberLearningCard 
                  key={courseItem.id || courseItem.slug || idx} 
                  course={courseItem} 
                  idx={idx} 
                />
              ))}
            </div>
          </section>

          {/* ================= 3. TRANSPARENT STUDENT DASHBOARD LAUNCHER ================= */}
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
                  <Terminal className="w-3.5 h-3.5 text-[#FFA439]" />
                  <span>IN-BRANCH STUDENT DASHBOARD // DEFENSIVE OPERATIONS</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold font-royal text-white leading-tight">
                  Cyber Student Dashboard &amp; Telemetry
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Access your personal enrollment telemetry, active course units, terminal exercises, and verifiable defensive credentials. Isolated within this division to ensure zero distraction and zero cross-academy data leakage.
                </p>

                {/* Live Telemetry Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">CADET CLEARANCE</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5 truncate">
                      {currentUser?.cadet_id || 'RK-CADET-ACTIVE'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">CURRICULUM ACCESS</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-[#FFA439] mt-0.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                      <span>UNRESTRICTED</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-[#FF7A00]/20 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-mono text-[#FFA439] uppercase">ACADEMIC TUITION</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">
                      100% Zero-Cost Free
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Direct Launch Actions */}
              <div className="flex flex-col gap-3 shrink-0 lg:w-72">
                <Link
                  to="/academy/cybersecurity/student"
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

      {/* 5. Authoritative RedKross Website Footer with Ambient Amber Doodle Crew */}
      <Footer />
    </div>
  );
}
