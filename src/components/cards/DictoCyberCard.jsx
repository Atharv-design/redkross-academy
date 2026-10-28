import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  User,
  Users,
  Monitor,
  FileText,
  Shield,
  BarChart2,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Box,
  GitBranch,
  Award,
  Sparkles
} from 'lucide-react';

/**
 * DICTO CYBER CARD (10 DISTINCT SIGNATURE DESIGNS)
 * Directly using the authentic high-resolution 3D card templates from media_1793208498223_404b5d6b.jpg
 * 
 * Geometries & Layouts strictly matching the reference photo:
 * - Card 1: Horizontal Mint/Cyan (3D Mortarboard & Code Screens)
 * - Card 2: Portrait Amber (3D Wireframe Globe & Bottom Amber Pill)
 * - Card 3: Compact Square Mint (3D Bastion Glass Shield & Padlock)
 * - Card 4: Tall Vertical Crimson Red Alert (3D Red Alert Terminal)
 * - Card 5: Landscape Emerald (3D Cyber Grimoire & Neural Brain + Bottom-Left Arrow)
 * - Card 6: Panoramic Ultra-Wide Banner (3D Mountain Summit & Golden Flag Path)
 * - Card 7: Horizontal Neon Green (3D Radar HUD + Glowing Progress Bar)
 * - Card 8: Horizontal Amber (3D Isometric Cyber Vault Cube on Steps)
 * - Card 9: Landscape Cyber Teal (3D Hooded Operator Command Room)
 * - Card 10: Horizontal Golden Amber (3D Star Medal Trophy & Milestone Sockets)
 */

export const CARD_TEMPLATES = {
  1: {
    src: '/assets/cards/card-01-clean.png',
    theme: 'neon',
    defaultTag: 'SOC Operations',
    defaultTitle: 'SOC Fundamentals & Incident Response',
    defaultDesc: 'Comprehensive institutional training for 24/7 security operations centres: alert triage, SIEM correlation, and rapid defensive containment.',
    defaultMeta1: '8 Weeks Cohort',
    defaultMeta2: '14 Hours Lab',
    defaultMeta3: 'Browser SIEM',
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[54%] sm:max-w-[50%]'
  },
  2: {
    src: '/assets/cards/card-02-clean.png',
    theme: 'amber',
    defaultTag: 'Defensive Architecture',
    defaultTitle: 'Cybersecurity Fundamentals & Architecture',
    defaultDesc: 'Master defense-in-depth principles, enterprise zero-trust perimeters, cryptography, and multi-cloud perimeter security controls.',
    defaultMeta1: '1,420 Enrolled Defenders',
    defaultMeta2: '100% Browser SIEM Lab',
    defaultMeta3: 'MITRE ATT&CK Aligned',
    arrowPos: 'bottom-pill',
    maxTextWidth: 'max-w-[65%]'
  },
  3: {
    src: '/assets/cards/card-03-clean.png',
    theme: 'neon',
    defaultTag: 'Linux Security',
    defaultTitle: 'Linux Fundamentals for Security Operations',
    defaultDesc: 'Command-line mastery for blue team defenders: auditd telemetry, syslog ingestion, systemd hardening, and bash automation.',
    defaultBadges: ['Auditd Tracing', 'Systemd Hardening', 'Log Ingestion'],
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[56%]'
  },
  4: {
    src: '/assets/cards/card-04-clean.png',
    theme: 'crimson',
    defaultTag: 'Critical Safeguard',
    defaultTitle: '3-Strike Exam Focus Tracking Sentinel',
    defaultDesc: 'Active surveillance during evaluated assessments: client tab switches and window blur events trigger automated token penalties and cooldown lockouts.',
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[90%]'
  },
  5: {
    src: '/assets/cards/card-05-clean.png',
    theme: 'neon',
    defaultTag: 'Application Defense',
    defaultTitle: 'Web Application Defense & API Security',
    defaultDesc: 'Hardening modern web applications against OWASP Top 10 vulnerabilities, configuring WAF firewalls, and auditing OAuth 2.0 endpoints.',
    defaultBadges: ['OWASP Top 10', 'WAF Filtering'],
    arrowPos: 'bottom-left', // Notice: Card 5 has the circular arrow at bottom-left!
    maxTextWidth: 'max-w-[56%]'
  },
  6: {
    src: '/assets/cards/card-06-clean.png',
    theme: 'amber',
    defaultTag: 'Career Ascent Track',
    defaultTitle: 'Tier-1 to Tier-2 SOC Analyst Career Track',
    defaultDesc: 'Structured 12-week comprehensive pathway taking defenders from basic log analysis to advanced threat hunting and volatile memory forensics under NIST SP 800-61.',
    defaultMeta1: '1,420 Enrolled Defenders',
    defaultMeta2: '12 Weeks • 48 Hours',
    defaultMeta3: 'CRSS Milestone Credential',
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[55%] sm:max-w-[52%]'
  },
  7: {
    src: '/assets/cards/card-07-clean.png',
    theme: 'neon',
    defaultTag: 'Active Evaluation',
    defaultTitle: 'Enterprise Incident Response Playbooks',
    defaultDesc: 'Formulate and execute rapid containment playbooks for ransomware outbreaks, business email compromise, and lateral movement.',
    arrowPos: 'progress-bar',
    maxTextWidth: 'max-w-[56%]'
  },
  8: {
    src: '/assets/cards/card-08-clean.png',
    theme: 'amber',
    defaultTag: 'Cryptographic Ledger',
    defaultTitle: 'Cryptographic Proof & Public Resolver',
    defaultDesc: 'Every issued certification is backed by an immutable SHA-256 digital signature and verifiable QR code registered on the public ledger.',
    defaultMeta1: 'SHA-256 Digest',
    defaultMeta2: 'Merkle Tree Root',
    defaultMeta3: 'Tamper-Proof',
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[55%]'
  },
  9: {
    src: '/assets/cards/card-09-clean.png',
    theme: 'neon',
    defaultTag: 'Forensic Investigation',
    defaultTitle: 'Digital Forensics & Incident Evidence Analysis',
    defaultDesc: 'Disk forensics, memory volatility analysis, chain of custody preservation, and forensic timeline reconstruction for enterprise intrusions.',
    defaultBadges: ['Volatility 3', 'Timeline Analysis'],
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[56%]'
  },
  10: {
    src: '/assets/cards/card-10-clean.png',
    theme: 'amber',
    defaultTag: 'Premier Certification',
    defaultTitle: 'Certified RedKross SOC Specialist (CRSS)',
    defaultDesc: 'Industry-recognized qualification validating end-to-end incident handling, packet analysis, adversary correlation, and executive reporting.',
    arrowPos: 'bottom-right',
    maxTextWidth: 'max-w-[55%]'
  }
};

export default function DictoCyberCard({
  variant = 1,
  tag,
  pathwayTag,
  title,
  description,
  tags = [],
  meta = [],
  meta1,
  meta2,
  meta3,
  actionHref = '/courses',
  actionText = 'Explore Support Options',
  onClick,
  progress = null,
  sockets = 4,
  className = ''
}) {
  const parseVariant = (val) => {
    if (val === 'random') {
      return Math.floor(Math.random() * 10) + 1;
    }
    if (typeof val === 'string') {
      const match = val.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        return ((num - 1) % 10) + 1;
      }
    }
    const n = Number(val) || 1;
    return ((n - 1) % 10) + 1;
  };

  const v = parseVariant(variant);
  const tpl = CARD_TEMPLATES[v] || CARD_TEMPLATES[1];

  const cardTag = tag || tpl.defaultTag;
  const cardTitle = title || tpl.defaultTitle;
  const cardDesc = description || tpl.defaultDesc;

  // Resolve metadata items
  const m1 = meta1 || meta[0] || tpl.defaultMeta1 || 'Cohort 2026';
  const m2 = meta2 || meta[1] || tpl.defaultMeta2 || '14 Hours Lab';
  const m3 = meta3 || meta[2] || tpl.defaultMeta3 || 'Verified Credential';

  const badgeList = (tags && tags.length > 0) ? tags : (tpl.defaultBadges || ['Incident Triage', 'Log Correlation']);

  // Theme styling for pill badges
  const getPillTheme = () => {
    if (tpl.theme === 'amber') {
      return 'border-[#35E6B5]/40 text-[#00FFA3] bg-[#35E6B5]/10';
    }
    if (tpl.theme === 'crimson') {
      return 'border-[#EF4444]/40 text-[#F87171] bg-[#EF4444]/15';
    }
    return 'border-[#35E6B5]/40 text-[#65F58A] bg-[#65F58A]/10';
  };

  const getArrowBtnTheme = () => {
    if (tpl.theme === 'amber') {
      return 'border-[#35E6B5]/60 text-[#00FFA3] hover:bg-[#00FFA3] hover:text-black shadow-[0_0_15px_rgba(53,230,181,0.35)]';
    }
    if (tpl.theme === 'crimson') {
      return 'border-[#EF4444]/60 text-[#F87171] hover:bg-[#EF4444] hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.35)]';
    }
    return 'border-[#35E6B5]/60 text-[#35E6B5] hover:bg-[#65F58A] hover:text-black shadow-[0_0_15px_rgba(53,230,181,0.35)]';
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group transition-all duration-300 shadow-xl hover:-translate-y-1 select-none flex flex-col justify-between p-5 sm:p-7 min-h-[240px] sm:min-h-[260px] ${className}`}
    >
      {/* 1. Authentic 3D Card Background Image (Exact from reference) */}
      <img
        src={tpl.src}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
      />

      {/* 2. Top Header Layer: Tag Pill directly over the Tag Placeholder */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-md ${getPillTheme()}`}
        >
          {cardTag}
        </span>
        {pathwayTag && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2.5 py-0.5 rounded-full border border-slate-700/50">
            {pathwayTag}
          </span>
        )}
      </div>

      {/* 3. Middle Content Layer: Title & Description strictly on left side */}
      <div className={`relative z-10 my-auto py-2 ${tpl.maxTextWidth}`}>
        <h3 className="font-royal text-base sm:text-lg md:text-xl font-bold text-white leading-snug drop-shadow-md group-hover:text-[#65F58A] transition-colors mb-1.5">
          {cardTitle}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-300/90 leading-relaxed font-sans line-clamp-2 drop-shadow-sm">
          {cardDesc}
        </p>

        {/* Optional Badge Tags for Card 3, 5, 9 */}
        {(v === 3 || v === 5 || v === 9) && badgeList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {badgeList.slice(0, 3).map((b, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-[#101923]/80 border border-[#263440] text-[9px] font-mono text-slate-300 truncate"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4. Bottom Footer Layer: Metadata & Action Button (Strictly matching each layout) */}
      <div className="relative z-10 pt-2">
        {/* CARD 2 SPECIAL: Full-Width Bottom Amber Pill Button */}
        {v === 2 ? (
          <Link
            to={actionHref}
            onClick={onClick}
            className="w-full h-10 rounded-full bg-[#35E6B5]/20 hover:bg-[#35E6B5] text-[#00FFA3] hover:text-black border border-[#35E6B5]/50 font-royal font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-between px-4 group/btn shadow-[0_0_20px_rgba(0,255,163,0.25)]"
          >
            <span>{actionText || 'Inspect Track Syllabus'}</span>
            <div className="w-6 h-6 rounded-full bg-[#101923] text-[#00FFA3] group-hover/btn:bg-black group-hover/btn:text-[#00FFA3] flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </Link>
        ) : v === 7 ? (
          /* CARD 7 SPECIAL: Glowing Full-Width Progress Bar */
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-300">Curriculum Readiness</span>
              <span className="text-[#65F58A] font-bold tabular-nums">{progress || 78}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0A141D] border border-[#263440] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#35E6B5] to-[#65F58A] rounded-full shadow-[0_0_10px_#65F58A] transition-all duration-500"
                style={{ width: `${progress || 78}%` }}
              />
            </div>
          </div>
        ) : v === 5 ? (
          /* CARD 5 SPECIAL: Bottom-Left Arrow Button (Matches reference image!) */
          <div className="flex items-center justify-between gap-3">
            <Link
              to={actionHref}
              onClick={onClick}
              className={`w-8 h-8 rounded-full border bg-[#0A141D]/90 flex items-center justify-center transition-all ${getArrowBtnTheme()}`}
              aria-label={cardTitle}
            >
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>
            <div className="text-[10px] font-mono text-slate-400 truncate max-w-[60%]">
              {m1}
            </div>
          </div>
        ) : (
          /* STANDARD FOOTER: Metadata on Left + Circular Arrow Button on Right */
          <div className="flex items-center justify-between gap-3">
            {/* Metadata Indicators on Left */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] font-mono text-slate-300">
              {v === 1 && (
                <>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#35E6B5]" />
                    <span>{m1}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#65F58A]" />
                    <span>{m2}</span>
                  </span>
                </>
              )}

              {v === 6 && (
                <>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#35E6B5]" />
                    <span>{m1}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00FFA3]" />
                    <span>{m2}</span>
                  </span>
                  <span className="hidden md:flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#35E6B5]" />
                    <span>{m3}</span>
                  </span>
                </>
              )}

              {v === 8 && (
                <>
                  <span className="flex items-center gap-1">
                    <Box className="w-3 h-3 text-[#35E6B5]" />
                    <span>{m1}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-[#00FFA3]" />
                    <span>{m2}</span>
                  </span>
                </>
              )}

              {v === 10 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏆</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: sockets }).map((_, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full bg-[#1B2530] border border-[#35E6B5]/50 flex items-center justify-center text-[8px] text-[#00FFA3] font-mono"
                      >
                        ●
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {v !== 1 && v !== 6 && v !== 8 && v !== 10 && (
                <span className="truncate max-w-[180px] sm:max-w-[240px] text-slate-400">
                  {m1}
                </span>
              )}
            </div>

            {/* Circular Arrow Button (Matches reference image!) */}
            <Link
              to={actionHref}
              onClick={onClick}
              className={`w-8 h-8 rounded-full border bg-[#0A141D]/90 flex items-center justify-center transition-all shrink-0 ${getArrowBtnTheme()}`}
              aria-label={cardTitle}
            >
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
