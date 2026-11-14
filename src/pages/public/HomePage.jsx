import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield,
  ShieldCheck, 
  Brain, 
  Terminal, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  BookOpen, 
  Layers, 
  Users, 
  Sparkles, 
  Cpu, 
  HeartHandshake, 
  Clock,
  Monitor
} from 'lucide-react';
import CyberCircuitFrame from '../../components/cyber/CyberCircuitFrame';
import StudentGuidanceSection from '../../components/common/StudentGuidanceSection';

export default function HomePage() {
  const [isHoveredCyber, setIsHoveredCyber] = useState(false);
  const [isHoveredPsych, setIsHoveredPsych] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const scrollToAcademies = () => {
      const el = document.getElementById('academies');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.hash === '#academies' || window.location.hash === '#academies') {
      setTimeout(scrollToAcademies, 80);
      setTimeout(scrollToAcademies, 300);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen relative z-10 select-none pb-20">
      
      {/* 1. HERO SECTION WITH AMBER + BLACK BLENDING */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Status Pill with Amber + Black Blending */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 border border-[#FF7A00]/30 backdrop-blur-md text-xs font-mono mb-6 shadow-lg shadow-black/60"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_#FF7A00]" />
            <span className="text-slate-300">REDKROSS ACADEMY FOUNDATION</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-[#FFA439] font-semibold">DUAL-DISCIPLINE PORTAL ACTIVE</span>
          </motion.div>

          {/* Main Headline with Amber Gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto text-white"
          >
            One Institutional Foundation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA439] via-50% to-[#FF8C00] drop-shadow-[0_0_35px_rgba(255,122,0,0.4)]">
              Two Dedicated Academies.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Choose your specialized learning track below to enter dedicated, domain-themed academies equipped with practical laboratories, clinical frameworks, and cryptographic credentials.
          </motion.p>

          {/* Foundation Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6"
          >
            <Link
              to="/student"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,122,0,0.45)] hover:brightness-110"
            >
              <Users className="w-4 h-4 text-black" />
              <span>Student Dashboard</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              to="/verify"
              className="px-6 py-3.5 rounded-full bg-black/60 border border-[#FF7A00]/30 text-slate-200 hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2 hover:border-[#FF7A00]/70 shadow-lg shadow-black/40"
            >
              <Award className="w-4 h-4 text-[#FFA439]" />
              <span>Verify Credential</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STUDENT GUIDANCE: THE EDUCATIONAL JOURNEY (4-Step Progressive Timeline) */}
      <StudentGuidanceSection />

      {/* 2. DUAL-DIVISION GATEWAY SHOWCASE (Symmetrical Split Layout with Staggered Scroll) */}
      <section id="academies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative scroll-mt-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px 0px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-[11px] font-mono tracking-widest text-[#FFA439] uppercase">
            SELECT LEARNING DISCIPLINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal text-white mt-1">
            Enter Your Chosen Academy
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch relative">
          
          {/* PILLAR 1: CYBERSECURITY ACADEMY CARD (Glides in from Left on Scroll) */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl p-7 sm:p-9 flex flex-col justify-between bg-gradient-to-b from-[#1A130C]/90 via-[#0D1219]/90 to-[#070A0F]/95 backdrop-blur-2xl border border-[#FF7A00]/35 hover:border-[#FFA439]/80 transition-all duration-500 shadow-2xl shadow-black/80 hover:shadow-[0_0_45px_rgba(255,122,0,0.25)] group select-none min-h-[480px]"
            onMouseEnter={() => setIsHoveredCyber(true)}
            onMouseLeave={() => setIsHoveredCyber(false)}
          >
            {/* Top Specular Light Beam */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFA439]/80 to-transparent pointer-events-none z-10" />

            {/* Glowing Amber Corner Brackets */}
            <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFA439]/70 rounded-tl-sm pointer-events-none z-10" />
            <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFA439]/70 rounded-tr-sm pointer-events-none z-10" />
            <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFA439]/70 rounded-bl-sm pointer-events-none z-10" />
            <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFA439]/70 rounded-br-sm pointer-events-none z-10" />

            {/* Luminous Background Grid & Ambient Aura */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_85%_15%,rgba(255,122,0,0.22),transparent_55%)]" />
              <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,rgba(255,122,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,122,0,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10">
              {/* Header Icon Row */}
              <div className="flex items-center justify-end mb-4">
                <div className="p-2.5 rounded-xl bg-black/60 border border-[#FF7A00]/40 text-[#FFA439] group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.35)] transition-all flex items-center justify-center">
                  <Terminal className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,122,0,0.7)]" />
                </div>
              </div>

              {/* Title & Scope */}
              <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-1.5 group-hover:text-[#FFA439] transition-colors leading-tight">
                Cybersecurity &amp; Defense Academy
              </h3>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFA439]/80 mb-3 flex items-center gap-2">
                <span>Application Security</span>
                <span className="text-[#FF7A00]">&bull;</span>
                <span>Kali CyberLab</span>
                <span className="text-[#FF7A00]">&bull;</span>
                <span>Cryptographic Proofs</span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                Engineered directly in the dark tactical aesthetic of RedKross. Master application security, digital forensics, and practice live simulated exploits inside the virtual Kali Linux CyberLab.
              </p>

              {/* 3 Symmetrical Competencies */}
              <div className="space-y-2.5 mb-2">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <Shield className="w-4 h-4 text-[#FFA439] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Full-Stack Application Defense</div>
                    <div className="text-[11px] text-slate-300">OWASP Top 10 mitigation &amp; secure API hardening</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <Terminal className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Interactive Kali CyberLab</div>
                    <div className="text-[11px] text-slate-300">143+ real Linux tools &amp; active terminal sandbox</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <Award className="w-4 h-4 text-[#FFA439] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Cryptographic Credentials</div>
                    <div className="text-[11px] text-slate-300">SHA-256 tamper-proof verification on public registry</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer Action & Trace Divider */}
            <div className="relative z-10 pt-4">
              <div className="relative w-full h-[1px] mb-4 overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#FFA439] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#FFA439]" />
              </div>

              <div className="flex items-center justify-end text-xs font-mono">
                <Link
                  to="/academy/cybersecurity"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E05300] hover:from-[#FFA439] hover:to-[#FF7A00] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] group/btn"
                >
                  <span>Enter Cyber Academy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* PILLAR 2: PSYCHOLOGY ACADEMY CARD (Glides in from Right on Scroll) */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl p-7 sm:p-9 flex flex-col justify-between bg-gradient-to-b from-[#1A130C]/90 via-[#0D1219]/90 to-[#070A0F]/95 backdrop-blur-2xl border border-[#FF7A00]/35 hover:border-[#FFA439]/80 transition-all duration-500 shadow-2xl shadow-black/80 hover:shadow-[0_0_45px_rgba(255,122,0,0.25)] group select-none min-h-[480px]"
            onMouseEnter={() => setIsHoveredPsych(true)}
            onMouseLeave={() => setIsHoveredPsych(false)}
          >
            {/* Top Specular Light Beam */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFA439]/80 to-transparent pointer-events-none z-10" />

            {/* Glowing Amber Corner Brackets */}
            <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFA439]/70 rounded-tl-sm pointer-events-none z-10" />
            <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFA439]/70 rounded-tr-sm pointer-events-none z-10" />
            <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFA439]/70 rounded-bl-sm pointer-events-none z-10" />
            <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFA439]/70 rounded-br-sm pointer-events-none z-10" />

            {/* Luminous Background Aurora & Radial Bloom */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
              <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 bg-[radial-gradient(circle_at_85%_15%,rgba(255,164,57,0.22),transparent_55%)]" />
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_80%,rgba(255,122,0,0.25),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10">
              {/* Header Icon Row */}
              <div className="flex items-center justify-end mb-4">
                <div className="p-2.5 rounded-xl bg-black/60 border border-[#FF7A00]/40 text-[#FFA439] group-hover:border-[#FFA439] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.35)] transition-all flex items-center justify-center">
                  <Brain className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,122,0,0.7)]" />
                </div>
              </div>

              {/* Title & Scope */}
              <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-1.5 group-hover:text-[#FFA439] transition-colors leading-tight">
                Psychology &amp; Wellbeing Academy
              </h3>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFA439]/80 mb-3 flex items-center gap-2">
                <span>Cognitive Behavioral Therapy</span>
                <span className="text-[#FF7A00]">&bull;</span>
                <span>Neuroscience</span>
                <span className="text-[#FF7A00]">&bull;</span>
                <span>Crisis Care</span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                Engineered in the serene clinical aesthetic of RedKross. Master evidence-based Cognitive Behavioral Therapy, neuropsychology, crisis de-escalation, and student burnout mitigation.
              </p>

              {/* 3 Symmetrical Competencies */}
              <div className="space-y-2.5 mb-2">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <Brain className="w-4 h-4 text-[#FFA439] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Clinical CBT Protocols</div>
                    <div className="text-[11px] text-slate-300">Evidence-based cognitive therapy &amp; affective neuroscience</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <HeartHandshake className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Crisis De-Escalation Care</div>
                    <div className="text-[11px] text-slate-300">Immediate psychological first aid &amp; trauma interventions</div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-[#FF7A00]/25 group-hover:border-[#FF7A00]/45 transition-colors"
                >
                  <Award className="w-4 h-4 text-[#FFA439] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Clinical Competency Proofs</div>
                    <div className="text-[11px] text-slate-300">Institutional certifications &amp; case management credentials</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer Action & Trace Divider */}
            <div className="relative z-10 pt-4">
              <div className="relative w-full h-[1px] mb-4 overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#FFA439] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#FFA439]" />
              </div>

              <div className="flex items-center justify-end text-xs font-mono">
                <Link
                  to="/academy/psychology"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E05300] hover:from-[#FFA439] hover:to-[#FF7A00] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] group/btn"
                >
                  <span>Enter Psychology Academy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. FOUNDATION FEATURES SUMMARY (Scroll Triggered One-by-One Entrance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#18120B]/80 via-[#0C1017]/80 to-[#06090E]/90 border border-[#FF7A00]/25 backdrop-blur-xl hover:border-[#FFA439]/60 transition-all duration-300 shadow-xl shadow-black/60 hover:shadow-[0_0_25px_rgba(255,122,0,0.2)] group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA439] mb-3.5 shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,122,0,0.6)]" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1.5 group-hover:text-[#FFA439] transition-colors">Central Student Hub</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              One unified login and dashboard tracking all course completions, token rewards, and assignments across both divisions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#18120B]/80 via-[#0C1017]/80 to-[#06090E]/90 border border-[#FF7A00]/25 backdrop-blur-xl hover:border-[#FFA439]/60 transition-all duration-300 shadow-xl shadow-black/60 hover:shadow-[0_0_25px_rgba(255,122,0,0.2)] group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA439] mb-3.5 shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,122,0,0.6)]" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1.5 group-hover:text-[#FFA439] transition-colors">Cryptographic Credentials</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Tamper-proof digital certificates secured with cryptographic SHA-256 signatures verifiable on our public verification portal.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px 0px' }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#18120B]/80 via-[#0C1017]/80 to-[#06090E]/90 border border-[#FF7A00]/25 backdrop-blur-xl hover:border-[#FFA439]/60 transition-all duration-300 shadow-xl shadow-black/60 hover:shadow-[0_0_25px_rgba(255,122,0,0.2)] group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA439] mb-3.5 shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,122,0,0.6)]" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1.5 group-hover:text-[#FFA439] transition-colors">Zero-Cost Institutional Access</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Fully non-profit, Section 8 registered curriculum designed to empower emerging practitioners and students without tuition friction.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
