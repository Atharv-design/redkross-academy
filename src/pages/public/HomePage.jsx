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

      {/* 2. DUAL-DIVISION GATEWAY SHOWCASE (Exact Website Card Designs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            SELECT LEARNING DISCIPLINE // AUTHENTIC DIVISION INTERFACES
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-royal text-white mt-2">
            Enter Your Chosen Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* PILLAR 1: EXACT CYBERSECURITY WEBSITE CIRCUIT FRAME CARD DESIGN */}
          <div 
            className="relative group transition-all duration-300 w-full h-full flex flex-col justify-between select-none"
            onMouseEnter={() => setIsHoveredCyber(true)}
            onMouseLeave={() => setIsHoveredCyber(false)}
          >
            {/* 1. DITTO SCI-FI CYBER HUD CIRCUIT FRAME (Exact SVG from Cyber Website) */}
            <CyberCircuitFrame isHovered={isHoveredCyber} />

            {/* 2. CARD CONTENT CONTAINER (Safe Inset Zone) */}
            <div className="relative z-10 px-8 sm:px-10 pt-8 pb-7 flex flex-col justify-between h-full min-h-[460px]">
              <div>
                {/* Header Row: Track Badge (Left) & Compact Cyber Icon (Right) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold border border-cyan-500/40 text-[#65F58A] bg-cyan-950/70 group-hover:border-[#65F58A] group-hover:bg-emerald-950/80 group-hover:shadow-[0_0_12px_rgba(101,245,138,0.3)] transition-all duration-300 uppercase">
                    DIVISION 01 &bull; DEFENSIVE CYBER
                  </span>

                  {/* Inset Cyber Icon Badge */}
                  <div className="relative p-2 rounded-xl bg-cyan-950/50 border border-cyan-500/40 group-hover:border-[#65F58A] group-hover:bg-[#65F58A]/15 group-hover:shadow-[0_0_15px_rgba(101,245,138,0.4)] transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-[#65F58A] group-hover:text-[#35E6B5] transition-all duration-300 relative z-10 drop-shadow-[0_0_8px_rgba(101,245,138,0.85)]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-3 group-hover:text-[#65F58A] transition-colors leading-tight">
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
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 text-emerald-200/90 border border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Action & Trace Divider */}
              <div className="mt-4">
                <div className="relative w-full h-[1px] mb-4 overflow-hidden" aria-hidden="true">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-emerald-500/30 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-[#65F58A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#65F58A]" />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 group-hover:text-emerald-300 transition-colors tracking-wider">
                    OPERATOR TRACK 01
                  </span>
                  <Link
                    to="/academy/cybersecurity"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#65F58A] hover:bg-[#35E6B5] text-[#030906] font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(101,245,138,0.3)] hover:shadow-[0_0_25px_rgba(101,245,138,0.5)]"
                  >
                    <span>Enter Cyber Academy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 2: EXACT PSYCHOLOGY WEBSITE THEMED FULLSPAN CARD DESIGN */}
          <div 
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-[#081524]/90 backdrop-blur-2xl border border-teal-500/25 hover:border-teal-400/50 transition-all duration-500 shadow-xl shadow-black/50 hover:shadow-teal-950/40 group select-none min-h-[460px]"
            onMouseEnter={() => setIsHoveredPsych(true)}
            onMouseLeave={() => setIsHoveredPsych(false)}
          >
            {/* Specular top border light beam */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent pointer-events-none z-10" />

            {/* Signature Ethereal Artwork Spanning the Full Vertical Height of the Card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 select-none">
              <img
                src="/assets/cards/card-individual-counselling-fullspan.png"
                alt=""
                className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-45 transition-opacity duration-700 filter saturate-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06121E] via-[#081524]/80 to-transparent" />
            </div>

            {/* Content Top Zone */}
            <div className="relative z-10">
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold text-teal-300 bg-teal-950/70 border border-teal-400/40 backdrop-blur-md shadow-sm shadow-teal-950/30">
                  DIVISION 02 &bull; PSYCHOLOGY &amp; CARE
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium text-slate-300 bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
                  RCI-Aligned Ethics
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black font-royal text-white mb-3 group-hover:text-teal-200 transition-colors leading-tight">
                Psychology &amp; Mental Wellbeing Academy
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/95 leading-relaxed font-light mb-6">
                Engineered in the warm, serene organic aesthetic of the RedKross Psychology flagship. Master evidence-based Cognitive Behavioral Therapy, acute crisis de-escalation, and student burnout mitigation.
              </p>

              {/* Metadata Highlights */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#06101B]/85 border border-teal-500/20 text-slate-200 text-xs shadow-sm">
                  <Brain className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>CBT Protocols, Affective Neuroscience &amp; Crisis Response</span>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#06101B]/85 border border-teal-500/20 text-slate-200 text-xs shadow-sm">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-200/90">Institutional Certificate of Clinical Competency</span>
                </div>
              </div>
            </div>

            {/* Signature Full-Width Glowing Pill CTA Button */}
            <div className="relative z-10 pt-2">
              <Link
                to="/academy/psychology"
                className="w-full h-12 rounded-full bg-gradient-to-r from-teal-500/20 via-teal-500/25 to-teal-500/30 border border-teal-500/40 hover:border-teal-400 hover:from-teal-500/30 hover:to-teal-500/45 flex items-center justify-between px-6 transition-all duration-300 group/btn shadow-lg shadow-teal-950/40"
              >
                <span className="font-royal text-xs sm:text-sm font-bold tracking-wider uppercase text-teal-200 group-hover/btn:text-white transition-colors">
                  Enter Psychology Academy
                </span>
                <div className="w-8 h-8 rounded-full bg-teal-400 text-[#08121E] flex items-center justify-center font-bold shadow-md shadow-teal-400/40 group-hover/btn:translate-x-1 group-hover/btn:bg-teal-300 transition-all shrink-0">
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
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#65F58A] mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1">Central Student Hub</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              One unified login and dashboard tracking all course completions, token rewards, and assignments across both divisions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-royal font-bold text-white text-base mb-1">Cryptographic Credentials</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tamper-proof digital certificates secured with cryptographic SHA-256 signatures verifiable on our public verification portal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-teal-300 mb-3">
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
