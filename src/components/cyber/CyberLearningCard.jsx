import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Bookmark, 
  Clock, 
  Layers, 
  RotateCw, 
  Target, 
  Monitor, 
  Users, 
  BarChart3, 
  BookOpen, 
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import CyberProjectCircuitFrame from './CyberProjectCircuitFrame';

export default function CyberLearningCard({ 
  track,
  course,
  idx = 0 
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const item = course || track;
  if (!item) return null;

  const courseSlug = item.slug || item.id || 'introduction-to-cybersecurity';

  // Short certification label for the 3-tile metadata bar
  const shortCert = useMemo(() => {
    if (!item.milestone_cert) return 'Certified Associate';
    const match = item.milestone_cert.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return `${match[1]} Certified`;
    }
    return item.milestone_cert.length > 20 
      ? `${item.milestone_cert.slice(0, 18)}...` 
      : item.milestone_cert;
  }, [item.milestone_cert]);

  // Curated key topics with illuminated styling
  const keyTopics = useMemo(() => {
    if (item.id === 'crs_cyber_intro_01' || item.slug === 'introduction-to-cybersecurity') {
      return [
        'CIA Triad',
        'Kill Chain',
        'Threat Modeling',
        'CVSS v3.1',
        'Applied Crypto',
        'SOC Defense'
      ];
    }
    if (item.id === 'crs_cyber_net_02' || item.slug === 'computer-networking-for-cybersecurity') {
      return [
        'Networking Basics',
        'IP Addressing',
        'TCP/IP',
        'Subnetting',
        'Network Security',
        'Defense'
      ];
    }
    if (item.id === 'crs_cyber_admin_03' || item.slug === 'linux-and-windows-system-administration') {
      return [
        'Linux Internals',
        'Bash Automation',
        'Windows NT',
        'PowerShell 7',
        'Active Directory',
        'CIS Hardening'
      ];
    }
    if (item.id === 'crs_cyber_python_04' || item.slug === 'python-for-cybersecurity') {
      return [
        'Python 3 Stdlib',
        'ReDoS & CSV Safety',
        'Path Confinement',
        'Loopback TLS & struct',
        'SHA-256 & HMAC',
        'FIM & rkloga 2.0'
      ];
    }
    if (Array.isArray(item.skills) && item.skills.length > 0) {
      return item.skills.slice(0, 6).map((s) => s.length > 18 ? `${s.slice(0, 16)}...` : s);
    }
    return ['Security Foundations', 'Systems Defense', 'Architecture', 'Threat Analysis', 'Protocols', 'Hardening'];
  }, [item.id, item.slug, item.skills]);

  // Back face: Content mappings matching reference design
  const { learningGoal, whatYoullLearnText, whoItsForText, prereqText } = useMemo(() => {
    if (item.id === 'crs_cyber_intro_01' || item.slug === 'introduction-to-cybersecurity') {
      return {
        learningGoal: 'Build foundational defensive security mental models to identify threats, balance CIA trade-offs, and protect enterprise infrastructure.',
        whatYoullLearnText: 'CIA Triad, threat actor kill chains, STRIDE risk scoring, applied AES/TLS cryptography, and SOC incident triage.',
        whoItsForText: 'Students, beginners, IT staff, and aspiring cybersecurity defenders seeking an institutional foundation.',
        prereqText: 'No prior programming, networking, or cybersecurity knowledge required. Built from absolute scratch.'
      };
    }
    if (item.id === 'crs_cyber_net_02' || item.slug === 'computer-networking-for-cybersecurity') {
      return {
        learningGoal: 'Build a strong networking foundation to analyze, secure and defend networks.',
        whatYoullLearnText: 'Network models, addressing, protocol behavior, secure design and attack defense techniques.',
        whoItsForText: 'Students, aspiring cybersecurity professionals and IT enthusiasts.',
        prereqText: 'Basic command line familiarity; foundational IT literacy recommended.'
      };
    }
    if (item.id === 'crs_cyber_admin_03' || item.slug === 'linux-and-windows-system-administration') {
      return {
        learningGoal: 'Master industrial Linux and Windows systems administration, OS kernel internals, and consensus hardening baselines.',
        whatYoullLearnText: 'CPU privilege rings, POSIX ACLs, defensive Bash scripts, Windows registry forensics, PowerShell pipelines, and Active Directory.',
        whoItsForText: 'Systems administrators, SOC analysts, and security engineers managing enterprise operating environments.',
        prereqText: 'Course 01 & 02 recommended; basic understanding of networking and operating systems.'
      };
    }
    if (item.id === 'crs_cyber_python_04' || item.slug === 'python-for-cybersecurity') {
      return {
        learningGoal: 'Master defensive Python 3 security engineering from first principles to a tested, CI-verified rkloga 2.0 CLI log analysis utility.',
        whatYoullLearnText: 'Hash-pinned venvs, ReDoS/CSV safety, path/subprocess confinement, loopback TCP/TLS, streaming SHA-256/HMAC, FIM baselines, and unittest suites.',
        whoItsForText: 'Beginners starting in security automation, SOC analysts, and defenders building deterministic triage tooling.',
        prereqText: 'Zero prior programming experience required; Course 01–03 helpful for log and network literacy.'
      };
    }
    return {
      learningGoal: item.short_desc || item.overview || 'Master foundational security and defense architecture.',
      whatYoullLearnText: Array.isArray(item.what_you_will_learn) ? item.what_you_will_learn.slice(0, 2).join(' ') : 'Practical defense protocols, threat analysis, and security controls.',
      whoItsForText: Array.isArray(item.intended_audience) && item.intended_audience[0]
        ? (item.intended_audience[0].length > 220 ? `${item.intended_audience[0].slice(0, 217)}...` : item.intended_audience[0])
        : 'Students, security practitioners, and infrastructure engineers.',
      prereqText: Array.isArray(item.prerequisites) ? item.prerequisites[0] : 'Standard computer with internet connectivity and modern browser.'
    };
  }, [item]);

  const modules = useMemo(() => {
    return Array.isArray(item.modules) ? item.modules : [];
  }, [item.modules]);

  const learningOutcomes = useMemo(() => {
    if (Array.isArray(item.learning_objectives) && item.learning_objectives.length > 0) {
      return item.learning_objectives.slice(0, 4);
    }
    if (Array.isArray(item.what_you_will_learn) && item.what_you_will_learn.length > 0) {
      return item.what_you_will_learn.slice(0, 4);
    }
    return [
      'Master defense-in-depth architecture and failure containment',
      'Deploy stateful security policies and cryptographically verified controls',
      'Conduct hands-on terminal forensic triage and packet dissection',
      'Earn verifiable SHA-256 cryptographic milestone certification'
    ];
  }, [item.learning_objectives, item.what_you_will_learn]);

  // Handle card click for 3D flip (ignores clicks on buttons, links, or tab switches)
  const handleCardClick = (e) => {
    if (e.target.closest('button, a, input, select, textarea, [role="tab"]')) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '120px 0px' }}
      transition={{ 
        duration: 0.35, 
        delay: (idx % 3) * 0.05, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="w-full select-none"
    >
      {/* 3D PERSPECTIVE WRAPPER (Compact, balanced height with zero bottom void) */}
      <div 
        className="relative w-full h-[485px] sm:h-[495px] cursor-pointer group"
        style={{ perspective: '1200px' }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* FLIPPER CONTAINER */}
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* ========================================================================= */}
          {/* FRONT FACE: COURSE OVERVIEW                                              */}
          {/* ========================================================================= */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              zIndex: isFlipped ? 0 : 20,
              pointerEvents: isFlipped ? 'none' : 'auto'
            }}
          >
            {/* Front HUD Frame */}
            <CyberProjectCircuitFrame isHovered={isHovered} theme="amber" />

            {/* Content Container - Tight, Balanced Vertical Spacing */}
            <div className="relative z-10 px-6 sm:px-7 py-5 sm:py-6 flex flex-col justify-between h-full gap-2.5 flex-1">
              <div className="space-y-2.5 flex-1 flex flex-col">
                {/* 1. Header Row: Difficulty Pill, Duration & Controls (Flip + Bookmark) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 uppercase">
                      {item.difficulty || 'BEGINNER'}
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {item.estimated_weeks ? `${item.estimated_weeks} Weeks` : '10 Weeks'}
                    </span>
                  </div>

                  {/* Header Actions: Flip Toggle & Bookmark Button */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/30 hover:border-[#FFA439] hover:bg-[#FF7A00]/15 text-slate-400 hover:text-[#FFA439] transition-all duration-300 cursor-pointer shadow-sm"
                      title="Flip to Details"
                      aria-label="Flip card to details"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBookmarked((prev) => !prev);
                      }}
                      className={`p-1.5 rounded-lg bg-black/60 border transition-all duration-300 cursor-pointer ${
                        isBookmarked 
                          ? 'border-[#FF7A00] bg-[#FF7A00]/25 text-[#FFA439] shadow-[0_0_12px_rgba(255,122,0,0.4)]' 
                          : 'border-[#FF7A00]/30 text-slate-400 hover:text-[#FFA439] hover:border-[#FF7A00]/60'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark Course'}
                      aria-label="Bookmark course"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#FFA439] text-[#FFA439]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 2. Course Title */}
                <h3 className="text-lg sm:text-xl font-bold font-royal text-white leading-snug group-hover:text-[#FFA439] transition-colors min-h-[2.75rem] flex items-center">
                  {(item.title || 'Introduction to Cybersecurity').replace(/^Course\s*\d+:\s*/i, '')}
                </h3>

                {/* 3. Description (3-Line Clean Clamped Flow) */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3 min-h-[3.75rem]">
                  {item.short_desc || item.overview}
                </p>

                {/* 4. Three-Item Metadata Row (Illuminated Amber-Tinted Glass) */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  <div className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/15 via-black/50 to-black/30 border border-[#FF7A00]/30 hover:border-[#FF7A00]/60 transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,122,0,0.06)]">
                    <Layers className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
                    <span className="text-[11px] font-mono text-slate-200 font-semibold truncate">
                      {item.estimated_weeks || 10} Wks
                    </span>
                  </div>

                  <div className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/15 via-black/50 to-black/30 border border-[#FF7A00]/30 hover:border-[#FF7A00]/60 transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,122,0,0.06)]">
                    <Clock className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
                    <span className="text-[11px] font-mono text-slate-200 font-semibold truncate">
                      6–8h / wk
                    </span>
                  </div>

                  <div 
                    className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/15 via-black/50 to-black/30 border border-[#FF7A00]/30 hover:border-[#FF7A00]/60 transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,122,0,0.06)]"
                    title={item.milestone_cert || 'Certified Associate'}
                  >
                    <Award className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
                    <span className="text-[11px] font-mono text-slate-200 font-semibold truncate">
                      {shortCert}
                    </span>
                  </div>
                </div>

                {/* 5. Key Topics / Objectives (Illuminated Cyber Telemetry - No Black Boxes) */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                    <span>KEY TOPICS &amp; OBJECTIVES</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 min-h-[54px] content-start">
                    {keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gradient-to-r from-[#FF7A00]/15 via-[#FFA439]/10 to-transparent border border-[#FF7A00]/45 text-[#FFA439] shadow-[0_0_8px_rgba(255,122,0,0.12)] hover:border-[#FFA439] hover:text-white hover:shadow-[0_0_12px_rgba(255,122,0,0.3)] transition-all duration-300"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FFA439]" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Action Button Pinned Tightly at Bottom */}
              <div className="pt-2 border-t border-white/10 mt-auto">
                <Link
                  to={`/academy/cybersecurity/courses/${courseSlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all cursor-pointer group/btn"
                >
                  <span>Explore the Course</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BACK FACE: FULL COURSE DETAILS (TABS + ULTRA-THIN AMBER SCROLLBAR)        */}
          {/* ========================================================================= */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: isFlipped ? 20 : 0,
              pointerEvents: isFlipped ? 'auto' : 'none'
            }}
          >
            {/* Back HUD Frame */}
            <CyberProjectCircuitFrame isHovered={isHovered} theme="amber" />

            {/* Back Content Container */}
            <div className="relative z-10 px-6 sm:px-7 py-5 sm:py-6 flex flex-col justify-between h-full gap-2.5 flex-1">
              <div className="space-y-2.5 flex-1 flex flex-col min-h-0">
                {/* 1. Header Row: Difficulty & Flip Back Control */}
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border border-[#FF7A00]/40 text-[#FFA439] bg-[#FF7A00]/15 uppercase">
                      {item.difficulty || 'BEGINNER'}
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {item.estimated_weeks ? `${item.estimated_weeks} Weeks` : '10 Weeks'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="p-1.5 rounded-lg bg-black/60 border border-[#FF7A00]/30 hover:border-[#FFA439] hover:bg-[#FF7A00]/15 text-[#FFA439] transition-all duration-300 cursor-pointer shadow-sm"
                      title="Flip to Overview"
                      aria-label="Flip back to overview"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBookmarked((prev) => !prev);
                      }}
                      className={`p-1.5 rounded-lg bg-black/60 border transition-all duration-300 cursor-pointer ${
                        isBookmarked 
                          ? 'border-[#FF7A00] bg-[#FF7A00]/25 text-[#FFA439] shadow-[0_0_12px_rgba(255,122,0,0.4)]' 
                          : 'border-[#FF7A00]/30 text-slate-400 hover:text-[#FFA439] hover:border-[#FF7A00]/60'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark Course'}
                      aria-label="Bookmark course"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#FFA439] text-[#FFA439]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 2. Interactive Tab Bar (Overview, Curriculum, Outcomes, Requirements) */}
                <div 
                  role="tablist"
                  className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/60 border border-[#FF7A00]/30 shrink-0"
                >
                  {[
                    { key: 'overview', label: 'Overview' },
                    { key: 'curriculum', label: 'Curriculum' },
                    { key: 'outcomes', label: 'Outcomes' },
                    { key: 'requirements', label: 'Requirements' }
                  ].map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab(tab.key);
                        }}
                        className={`py-1 px-0.5 text-[10px] font-mono font-bold rounded-lg transition-all cursor-pointer truncate ${
                          isActive
                            ? 'bg-[#FF7A00] text-black shadow-[0_0_10px_rgba(255,122,0,0.45)]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* 3. Tab Body Container with Ultra-Thin Theme Scrollbar */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-0 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#FF7A00]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {/* TAB 1: OVERVIEW (Illuminated Amber-Tinted Glass Blocks) */}
                  {activeTab === 'overview' && (
                    <div className="space-y-2">
                      {/* Learning Goal */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all flex items-start gap-2.5 shadow-[0_0_12px_rgba(255,122,0,0.06)]">
                        <div className="p-1.5 rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/35 text-[#FFA439] shrink-0 mt-0.5">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider">
                            Learning Goal
                          </div>
                          <p className="text-xs text-slate-200 font-sans mt-0.5 leading-relaxed">
                            {learningGoal}
                          </p>
                        </div>
                      </div>

                      {/* What You'll Learn */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all flex items-start gap-2.5 shadow-[0_0_12px_rgba(255,122,0,0.06)]">
                        <div className="p-1.5 rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/35 text-[#FFA439] shrink-0 mt-0.5">
                          <Monitor className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider">
                            What You'll Learn
                          </div>
                          <p className="text-xs text-slate-200 font-sans mt-0.5 leading-relaxed">
                            {whatYoullLearnText}
                          </p>
                        </div>
                      </div>

                      {/* Who It's For */}
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/25 hover:border-[#FF7A00]/50 transition-all flex items-start gap-2.5 shadow-[0_0_12px_rgba(255,122,0,0.06)]">
                        <div className="p-1.5 rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/35 text-[#FFA439] shrink-0 mt-0.5">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider">
                            Who It's For
                          </div>
                          <p className="text-xs text-slate-200 font-sans mt-0.5 leading-relaxed">
                            {whoItsForText}
                          </p>
                        </div>
                      </div>

                      {/* Bottom 2 Boxes: Level & Format */}
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/50 to-transparent border border-[#FF7A00]/25 flex items-center gap-2">
                          <BarChart3 className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
                          <div>
                            <span className="text-[9px] font-mono text-[#FFA439] uppercase font-bold block">
                              Level
                            </span>
                            <span className="text-xs font-mono text-white font-semibold">
                              {item.difficulty || 'Beginner'}
                            </span>
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/50 to-transparent border border-[#FF7A00]/25 flex items-center gap-2">
                          <ImageIcon className="w-3.5 h-3.5 text-[#FFA439] shrink-0" />
                          <div>
                            <span className="text-[9px] font-mono text-[#FFA439] uppercase font-bold block">
                              Format
                            </span>
                            <span className="text-[11px] font-sans text-white font-medium line-clamp-1" title="High-Quality Technical Diagrams • Hands-on Labs • Proctored CBT Assessments">
                              Diagrams • Labs • Exams
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CURRICULUM */}
                  {activeTab === 'curriculum' && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                        SYLLABUS &amp; MODULES ({modules.length} MODULES)
                      </div>
                      <div className="space-y-1.5">
                        {modules.map((mod, mIdx) => (
                          <div 
                            key={mod.id || mIdx} 
                            className="p-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/20 flex items-center justify-between gap-2 hover:border-[#FFA439]/50 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-4 h-4 rounded-md bg-[#FF7A00]/25 text-[#FFA439] text-[9px] font-mono font-bold flex items-center justify-center shrink-0">
                                {mIdx + 1}
                              </span>
                              <span className="text-xs font-sans text-slate-200 font-medium truncate">
                                {mod.title?.replace(/^Module\s*\d+:\s*/i, '') || `Module ${mIdx + 1}`}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#FFA439]/80 shrink-0">
                              {mod.lessons?.length || 6} Lessons
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: OUTCOMES */}
                  {activeTab === 'outcomes' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/15 via-black/40 to-transparent border border-[#FF7A00]/30 space-y-1">
                        <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                          Official Credential
                        </div>
                        <div className="text-xs font-royal text-white font-bold">
                          {item.milestone_cert || 'Certified Cybersecurity Associate'}
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                          Anchored on the public ledger with permanent SHA-256 digital signature proofs verifiable worldwide.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                          Key Competencies Mastered
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                          {learningOutcomes.map((out, oIdx) => (
                            <li key={oIdx} className="p-2 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/20 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA439] shrink-0 mt-0.5" />
                              <span className="leading-snug text-slate-200">{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: REQUIREMENTS */}
                  {activeTab === 'requirements' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/25 space-y-0.5">
                        <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                          Prerequisites
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed">
                          {prereqText}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00]/10 via-black/40 to-transparent border border-[#FF7A00]/25 space-y-0.5">
                        <div className="text-[10px] font-mono text-[#FFA439] uppercase font-bold tracking-wider">
                          Lab Infrastructure
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed">
                          Standard desktop or laptop with any modern web browser. Kali CyberLab V3 sandboxes and in-browser terminal engines are provided with zero installation required.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Action Button Pinned Tightly at Bottom */}
              <div className="pt-2 border-t border-white/10 mt-auto shrink-0">
                <Link
                  to={`/academy/cybersecurity/courses/${courseSlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all cursor-pointer group/btn"
                >
                  <span>Explore the Course</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
