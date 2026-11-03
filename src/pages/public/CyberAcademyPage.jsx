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
import CyberCloudsBackground from '../../components/common/CyberCloudsBackground';
import CyberShaderBackground from '../../components/ui/CyberShaderBackground';
import CyberAcademyNavbar from '../../components/cyber/CyberAcademyNavbar';
import Footer from '../../components/common/Footer';
import CyberDivisionWatermark from '../../components/cyber/CyberDivisionWatermark';
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

  // Authoritative Full Stack Career Track & Curriculum Data
  const masterTrack = learningPaths[0] || {
    id: 'path_fullstack_career',
    division: 'cybersecurity',
    slug: 'full-stack-web-development-career-path',
    title: 'Full Stack Web Development & Application Defense Track',
    short_desc: 'Comprehensive full-stack engineering curriculum taking developers from web foundations through modern React, Node.js REST APIs, MongoDB, and OWASP defense.',
    difficulty: 'BEGINNER TO ADVANCED',
    estimated_weeks: 12,
    total_hours: 48,
    courses_count: 1,
    milestone_cert: 'Full Stack Web Developer Certificate',
    featured: true,
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React 18', 'Node.js & Express', 'MongoDB', 'OWASP Web Defense', 'Docker']
  };

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
                to="/student"
                className="px-6 py-3 rounded-full bg-black/60 border border-[#FF7A00]/35 text-slate-200 hover:text-white hover:border-[#FF7A00]/70 font-mono text-xs hover:bg-[#FF7A00]/10 transition-all flex items-center gap-2 shadow-lg shadow-black/40"
              >
                <Cpu className="w-4 h-4 text-[#FFA439]" />
                <span>Open Student Workstation</span>
              </Link>
            </motion.div>
          </section>

          {/* DEDICATED CYBER COURSES CATALOGUE */}
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
                  Hands-on course with cryptographic verification, real code assessments, and lab workstations.
                </p>
              </div>
              <span className="text-xs font-mono text-[#FFA439] hidden sm:block">
                [ OFFICIAL MASTER CURRICULUM ]
              </span>
            </motion.div>

            {/* Official Master Curriculum Card (Themed HUD Plate) */}
            <div className="max-w-2xl mx-auto">
              <CyberLearningCard 
                track={masterTrack} 
                idx={0} 
              />
            </div>
          </section>

          {/* KALI CYBERLAB CALLOUT BANNER */}
          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1A1208]/85 via-[#0E0C09]/90 to-[#070503]/95 backdrop-blur-2xl border border-[#FF7A00]/35 hover:border-[#FFA439]/70 relative overflow-hidden shadow-[0_0_35px_rgba(255,122,0,0.2)] transition-all"
          >
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/35 text-[10px] font-mono text-[#FFA439] uppercase font-bold">
                <Terminal className="w-3.5 h-3.5 text-[#FFA439]" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,122,0,0.35)]"
                >
                  <span>Launch Student Workstation &amp; CyberLab</span>
                  <ArrowRight className="w-4 h-4 text-black" />
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
