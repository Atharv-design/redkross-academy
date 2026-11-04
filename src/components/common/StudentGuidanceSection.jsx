import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  BookOpen, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Brain,
  Layers,
  Cpu,
  Lock,
  ExternalLink
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    badge: 'DUAL DISCIPLINE SELECTION',
    title: 'Choose Your Academy Track',
    focus: 'Defensive Cyber or Clinical Psychology',
    description: 'Select your specialized discipline. Enter an autonomous environment engineered either for tactical application defense or evidence-based clinical psychology.',
    features: [
      'Defensive Cyber: Full-Stack Security & Kali Lab',
      'Clinical Psychology: CBT & Evidence Practice'
    ],
    icon: Compass,
    iconGlow: 'rgba(255, 122, 0, 0.4)'
  },
  {
    step: '02',
    badge: 'CURRICULUM TELEMETRY',
    title: 'Explore Syllabus & Requirements',
    focus: 'Curriculum preview, prerequisites, lab toolchains',
    description: 'Inspect module-by-module competency frameworks, prerequisite technical or ethical standards, and live laboratory sandbox tooling before committing.',
    features: [
      '12-Module Structured Competencies',
      'Prerequisite Toolchains & Ethical Code'
    ],
    icon: BookOpen,
    iconGlow: 'rgba(255, 164, 57, 0.4)'
  },
  {
    step: '03',
    badge: 'DETERMINISTIC CADET ID',
    title: 'Enroll with Unified RK ID',
    focus: 'Instant enrolment, deterministic credential allocation',
    description: 'Seamlessly enroll in your chosen course with a deterministic cadet identifier (RK-XXXXX). All progress and token ledgers bind securely to your institutional identity.',
    features: [
      'Instant Institutional Identifier (RK-XXXXX)',
      'Isolated Academic Ledger & Zero Data Leakage'
    ],
    icon: UserCheck,
    iconGlow: 'rgba(255, 122, 0, 0.4)'
  },
  {
    step: '04',
    badge: 'CRYPTOGRAPHIC PROOF',
    title: 'Enter Domain Classroom & Certify',
    focus: 'Sequential lessons, practical labs, 50-MCQ proctored certification',
    description: 'Complete sequential video & reading modules, practice in the Kali CyberLab or Clinical Journal workspace, and clear the 50-MCQ proctored exam with anti-cheat lockdown.',
    features: [
      'Domain-Specific Tooling & Sandboxes',
      '50-MCQ Proctored Exam & SHA-256 Proof'
    ],
    icon: Award,
    iconGlow: 'rgba(255, 164, 57, 0.4)'
  }
];

export default function StudentGuidanceSection() {
  const handleScrollToAcademies = (e) => {
    e.preventDefault();
    const el = document.getElementById('academies');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '#academies');
    }
  };

  return (
    <section 
      id="guidance" 
      aria-label="Student Guidance: The Educational Journey"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10"
    >
      {/* Decorative Top Accent Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
      >
        <span className="text-[11px] font-mono tracking-widest text-[#FFA439] uppercase font-bold px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 shadow-[0_0_12px_rgba(255,122,0,0.2)]">
          PROGRESSIVE LEARNING ARCHITECTURE
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-royal text-white mt-4 tracking-tight leading-tight">
          Student Guidance: The Educational Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-300/90 mt-3 max-w-2xl mx-auto leading-relaxed">
          A deterministic 4-step progression from initial discipline selection to tamper-proof, cryptographically verifiable graduation.
        </p>
      </motion.div>

      {/* Progressive Step Cards Container */}
      <div className="relative">
        {/* Horizontal Connecting Guide Line (Desktop Only) */}
        <div 
          className="hidden lg:block absolute top-12 left-8 right-8 h-[2px] bg-gradient-to-r from-[#FF7A00]/10 via-[#FFA439]/40 to-[#FF7A00]/10 pointer-events-none z-0" 
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 relative z-10">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="ultra-glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group select-none transition-all duration-300"
              >
                {/* Step Header: Step Pill + Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    {/* Glowing Amber Step Pill */}
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#FFA439] bg-[#FF7A00]/15 border border-[#FF7A00]/40 shadow-[0_0_12px_rgba(255,122,0,0.35)]">
                      {item.step}
                    </span>

                    {/* Step Telemetry Badge */}
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase truncate">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div 
                      className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF7A00]/20 to-[#FFA439]/10 border border-[#FF7A00]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,122,0,0.25)] group-hover:border-[#FFA439]/70 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-[#FFA439]" />
                    </div>
                    <h3 className="text-lg font-bold font-royal text-white leading-snug group-hover:text-[#FFA439] transition-colors duration-200">
                      {item.title}
                    </h3>
                  </div>

                  {/* Core Focus Sub-label */}
                  <div className="text-xs font-mono text-[#FFA439]/90 mb-3 bg-black/40 px-2.5 py-1 rounded border border-[#FF7A00]/20 inline-block max-w-full truncate">
                    {item.focus}
                  </div>

                  {/* Narrative Body Description */}
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Step Features List */}
                <div className="pt-4 border-t border-[#FF7A00]/15">
                  <ul className="space-y-2">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA439] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {index === 0 && (
                    <button
                      onClick={handleScrollToAcademies}
                      className="mt-4 w-full py-2 px-3 rounded-lg bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 border border-[#FF7A00]/30 text-xs font-mono text-[#FFA439] flex items-center justify-center gap-1.5 transition-all group-hover:border-[#FF7A00]/60 cursor-pointer"
                    >
                      <span>Explore Tracks</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
