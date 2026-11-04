import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Award, ArrowRight, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

/**
 * Learning Paths Page (Phase 3: Strict Empty-State Requirement)
 * 
 * Strict Compliance:
 * - Primary Headline: "Courses will be out soon"
 * - Exact Supporting Copy: "We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases."
 * - Zero course cards, titles, counts, descriptions, or prices displayed publicly.
 * - Refined cybersecurity visual with subtle neon-green (#FF7A00) & mint (#FFA439) accents.
 */
export default function LearningPathsPage() {
  const ecosystem = getEcosystemLinks();
  return (
    <div className="min-h-[82vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl w-full text-center space-y-8 ultra-glass-card rounded-3xl p-8 sm:p-14 shimmer-lr animate-slide-left border border-[#FF7A00]/35 backdrop-blur-2xl bg-[#120E09]/60 shadow-[0_12px_45px_rgba(0,0,0,0.55)]">
        {/* Subtle Cyber Status Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ultra-glass-pill text-xs font-mono shadow-md backdrop-blur-md border border-[#FF7A00]/30 bg-[#09241a]/60">
          <span className="w-2 h-2 rounded-full bg-[#FFA439] animate-pulse" />
          <span className="text-[#E2D9CE]">CURRICULUM PREPARATION IN PROGRESS</span>
          <span className="text-[#FF7A00]/40">•</span>
          <span className="text-[#FF7A00] font-semibold">REDKROSS ACADEMY</span>
        </div>

        {/* Refined Cyber Visual Illustration (Geometric Security Node) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center my-4">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7A00]/15 via-[#FFA439]/15 to-transparent blur-2xl" />

          <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(255,122,0,0.25)]">
            {/* Concentric Coordinate Rings */}
            <circle cx="100" cy="100" r="88" fill="none" stroke="#FF7A00" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.25" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#FFA439" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="50" fill="#120E09" stroke="#FF7A00" strokeWidth="1.5" />

            {/* Orbital Cyber Nodes */}
            <circle cx="100" cy="12" r="4" fill="#FF7A00" />
            <circle cx="100" cy="188" r="4" fill="#FF7A00" />
            <circle cx="12" cy="100" r="4" fill="#FFA439" />
            <circle cx="188" cy="100" r="4" fill="#FFA439" />

            {/* Connecting Cross-hair gridlines */}
            <line x1="100" y1="20" x2="100" y2="50" stroke="#FF7A00" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="100" y1="150" x2="100" y2="180" stroke="#FF7A00" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="20" y1="100" x2="50" y2="100" stroke="#FFA439" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="150" y1="100" x2="180" y2="100" stroke="#FFA439" strokeWidth="1.2" strokeOpacity="0.6" />

            {/* Central Shield Icon Graphic */}
            <path
              d="M 100 70 L 122 80 V 98 C 122 114 100 126 100 126 C 100 126 78 114 78 98 V 80 Z"
              fill="#09261a"
              stroke="#FF7A00"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Center Lock / Keyhole */}
            <circle cx="100" cy="94" r="4" fill="#FFA439" />
            <line x1="100" y1="98" x2="100" y2="105" stroke="#FFA439" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Exact Primary Message & Supporting Copy (Phase 3.1 & 3.2) */}
        <div className="space-y-4 max-w-2xl mx-auto animate-slide-left stagger-1">
          <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight title-shading-neon">
            Courses will be out soon
          </h1>

          <p className="text-sm sm:text-base text-[#E2D9CE] leading-relaxed max-w-xl mx-auto">
            We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
          </p>
        </div>

        {/* Educational Framework Pillars (Informative without leaking course cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto text-left animate-slide-left stagger-2">
          <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#FF7A00]/25 bg-[#1A1208]/50 backdrop-blur-md">
            <div className="w-7 h-7 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
            </div>
            <div className="font-royal text-xs font-bold text-white">Hands-on Telemetry</div>
            <p className="text-[11px] text-[#E2D9CE] leading-relaxed">
              Real-world log correlation across SIEM and defensive monitoring stacks.
            </p>
          </div>

          <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#FFA439]/25 bg-[#1A1208]/50 backdrop-blur-md">
            <div className="w-7 h-7 rounded-lg bg-[#FFA439]/10 border border-[#FFA439]/30 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#FFA439]" />
            </div>
            <div className="font-royal text-xs font-bold text-white">Adversary Mapping</div>
            <p className="text-[11px] text-[#E2D9CE] leading-relaxed">
              Curricula aligned strictly with MITRE ATT&CK defensive methodologies.
            </p>
          </div>

          <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#FF7A00]/25 bg-[#1A1208]/50 backdrop-blur-md">
            <div className="w-7 h-7 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center">
              <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
            </div>
            <div className="font-royal text-xs font-bold text-white">Tamper-Proof Proofs</div>
            <p className="text-[11px] text-[#E2D9CE] leading-relaxed">
              Cryptographically verified credentials on the public registry.
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-left stagger-3">
          <Link
            to="/verify"
            className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn-secondary text-xs font-mono text-[#E2D9CE] hover:text-white transition-all flex items-center justify-center gap-2 border border-[#FF7A00]/30 bg-[#09241a]/60 hover:bg-[#0c3123]"
          >
            <Award className="w-4 h-4 text-[#FF7A00]" />
            <span>Verify Institutional Credentials</span>
          </Link>
          <a
            href={ecosystem.cybersecurity}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,122,0,0.25)] hover:shadow-[0_0_30px_rgba(255,122,0,0.4)]"
          >
            <span>Explore Cyber Intelligence</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
