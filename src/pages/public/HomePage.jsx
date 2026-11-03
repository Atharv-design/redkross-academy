import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
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

export default function HomePage() {
  const [isHoveredCyber, setIsHoveredCyber] = useState(false);
  const [isHoveredPsych, setIsHoveredPsych] = useState(false);

  return (
    <div className="min-h-screen relative z-10 select-none pb-20">
      
      {/* 1. HERO SECTION WITH AMBER + BLACK BLENDING */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Status Pill with Amber + Black Blending */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 border border-[#FF7A00]/30 backdrop-blur-md text-xs font-mono mb-6 shadow-lg shadow-black/60">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_#FF7A00]" />
            <span className="text-slate-300">REDKROSS ACADEMY FOUNDATION</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-[#FFA439] font-semibold">DUAL-DISCIPLINE PORTAL ACTIVE</span>
          </div>

          {/* Main Headline with Amber Gradient */}
          <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto text-white">
            One Institutional Foundation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA439] via-50% to-[#FF8C00] drop-shadow-[0_0_35px_rgba(255,122,0,0.4)]">
              Two Dedicated Academies.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Choose your specialized learning track below to enter dedicated, domain-themed academies equipped with practical laboratories, clinical frameworks, and cryptographic credentials.
          </p>

          {/* Foundation Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6">
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
          </div>
        </div>
      </section>

      {/* 2. DUAL-DIVISION GATEWAY SHOWCASE (Unified Amber + Black Blending) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-mono tracking-widest text-[#FFA439] uppercase">
            SELECT LEARNING DISCIPLINE // AUTHENTIC DIVISION INTERFACES
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal text-white mt-2">
            Enter Your Chosen Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* PILLAR 1: CYBERSECURITY CIRCUIT FRAME CARD (Amber + Black Theme) */}
          <div 
            className="relative group transition-all duration-300 w-full h-full flex flex-col justify-between select-none"
            onMouseEnter={() => setIsHoveredCyber(true)}
            onMouseLeave={() => setIsHoveredCyber(false)}
          >
            {/* 1. SCI-FI CYBER HUD CIRCUIT FRAME (Amber Palette) */}
            <CyberCircuitFrame isHovered={isHoveredCyber} theme="amber" />

            {/* 2. CARD CONTENT CONTAINER (Safe Inset Zone) */}
            <div className="relative z-10 px-8 sm:px-10 pt-8 pb-7 flex flex-col justify-between h-full min-h-[460px]">
              <div>
                {/* Header Row: Track Badge (Left) & Compact Cyber Icon (Right) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-black/80 group-hover:border-[#FF7A00] group-hover:shadow-[0_0_12px_rgba(255,122,0,0.3)] transition-all duration-300 uppercase">
                    DIVISION 01 &bull; DEFENSIVE CYBER
                  </span>

                  {/* Inset Cyber Icon Badge */}
                  <div className="relative p-2 rounded-xl bg-black/80 border border-[#FF7A00]/40 group-hover:border-[#FF7A00] group-hover:bg-[#FF7A00]/15 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-[#FFA439] group-hover:text-[#FF7A00] transition-all duration-300 relative z-10 drop-shadow-[0_0_8px_rgba(255,122,0,0.85)]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-3 group-hover:text-[#FFA439] transition-colors leading-tight">
                  Cybersecurity &amp; Application Defense Academy
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  Engineered directly in the dark tactical aesthetic of the RedKross Cybersecurity flagship. Master full-stack application defense, OWASP mitigation, and practice real exploits inside the virtual Kali CyberLab.
                </p>

                {/* Telemetry Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Full Stack Engineering', 'OWASP Top 10 Defense', '143+ Kali Tools', 'Cryptographic Proofs'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/80 text-[#FFA439] border border-[#FF7A00]/30 group-hover:border-[#FF7A00]/60 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Action & Trace Divider */}
              <div className="mt-4">
                <div className="relative w-full h-[1px] mb-4 overflow-hidden" aria-hidden="true">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-[#FF7A00]/30 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#FF7A00]" />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 group-hover:text-[#FFA439] transition-colors tracking-wider">
                    OPERATOR TRACK 01
                  </span>
                  <Link
                    to="/academy/cybersecurity"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A00] hover:bg-[#FFA439] text-black font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)] hover:shadow-[0_0_25px_rgba(255,122,0,0.55)]"
                  >
                    <span>Enter Cyber Academy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 2: PSYCHOLOGY THEMED FULLSPAN CARD (Amber + Black Blending) */}
          <div 
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#120D08]/95 via-[#0A0704]/90 to-black/95 backdrop-blur-2xl border border-[#FF7A00]/30 hover:border-[#FFA439]/60 transition-all duration-500 shadow-xl shadow-black/60 hover:shadow-[0_0_30px_rgba(255,122,0,0.2)] group select-none min-h-[460px]"
            onMouseEnter={() => setIsHoveredPsych(true)}
            onMouseLeave={() => setIsHoveredPsych(false)}
          >
            {/* Specular top border light beam */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFA439]/50 to-transparent pointer-events-none z-10" />

            {/* Signature Ethereal Artwork Tinted in Warm Amber / Sepia */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
              <img
                src="/assets/cards/card-individual-counselling-fullspan.png"
                alt=""
                className="w-full h-full object-cover object-center opacity-25 group-hover:opacity-40 transition-opacity duration-700 filter sepia(85%) hue-rotate(345deg) saturate(260%)"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0E0904]/85 to-transparent" />
            </div>

            {/* Content Top Zone */}
            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold text-[#FFA439] bg-black/80 border border-[#FF7A00]/40 backdrop-blur-md shadow-sm">
                  DIVISION 02 &bull; PSYCHOLOGY &amp; CARE
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium text-slate-300 bg-black/60 border border-[#FF7A00]/30 backdrop-blur-md">
                  RCI-Aligned Ethics
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-3 group-hover:text-[#FFA439] transition-colors leading-tight">
                Psychology &amp; Mental Wellbeing Academy
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/95 leading-relaxed font-light mb-6">
                Engineered in the warm, serene organic aesthetic of the RedKross Psychology flagship. Master evidence-based Cognitive Behavioral Therapy, acute crisis de-escalation, and student burnout mitigation.
              </p>

              {/* Metadata Highlights */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/75 border border-[#FF7A00]/25 text-slate-200 text-xs shadow-sm">
                  <Brain className="w-4 h-4 text-[#FFA439] shrink-0" />
                  <span>CBT Protocols, Affective Neuroscience &amp; Crisis Response</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/75 border border-[#FF7A00]/25 text-slate-200 text-xs shadow-sm">
                  <Award className="w-4 h-4 text-[#FF7A00] shrink-0" />
                  <span className="text-[#FFA439]">Institutional Certificate of Clinical Competency</span>
                </div>
              </div>
            </div>

            {/* Signature Full-Width Glowing Pill CTA Button */}
            <div className="relative z-10 pt-2">
              <Link
                to="/academy/psychology"
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#FF7A00]/20 via-[#FF7A00]/25 to-[#FF7A00]/30 border border-[#FF7A00]/40 hover:border-[#FFA439] hover:from-[#FF7A00]/30 hover:to-[#FF7A00]/45 flex items-center justify-between px-6 transition-all duration-300 group/btn shadow-lg shadow-[#FF7A00]/15"
              >
                <span className="font-royal text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FFA439] group-hover/btn:text-white transition-colors">
                  Enter Psychology Academy
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FF7A00] text-black flex items-center justify-center font-bold shadow-md shadow-[#FF7A00]/40 group-hover/btn:translate-x-1 group-hover/btn:bg-[#FFA439] transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOUNDATION FEATURES SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-black/60 border border-[#FF7A00]/20 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1">Central Student Hub</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              One unified login and dashboard tracking all course completions, token rewards, and assignments across both divisions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 border border-[#FF7A00]/20 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1">Cryptographic Credentials</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tamper-proof digital certificates secured with cryptographic SHA-256 signatures verifiable on our public verification portal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/60 border border-[#FF7A00]/20 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1">Zero-Cost Institutional Access</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fully non-profit, Section 8 registered curriculum designed to empower emerging practitioners and students without tuition friction.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
