import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Terminal, ArrowRight, CheckCircle2, Lock, Zap, BookOpen, Layers, Users, Sparkles, Coins, Flame, Clock } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import DictoCyberCard from '../../components/cards/DictoCyberCard';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [catalogEnabled, setCatalogEnabled] = useState(false);
  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    apiClient.getCourses().then((data) => {
      setCourses(data.courses || []);
      setCatalogEnabled(Boolean(data.public_catalog_enabled));
    });
    apiClient.getLearningPaths().then((data) => {
      setLearningPaths(data.learning_paths || []);
    });
  }, []);

  const featuredCourse = courses.find((c) => c.slug === 'soc-fundamentals-incident-response') || courses[0];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-20 sm:pb-28 overflow-hidden border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101923]/90 border border-[#263440] text-xs font-mono shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
              <span className="text-slate-300">ACADEMY COHORT 2026 ACTIVE</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#65F58A] font-semibold">PRD v1.0 DEFENSIVE CERTIFICATIONS</span>
            </div>

            {/* Main Headline with Royal Cinzel font & neon shading */}
            <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
              Institutional Training for <br />
              <span className="title-shading-neon">
                Defensive Cyber Operators
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              Master 24/7 SOC telemetry analysis, MITRE ATT&CK correlation, and incident triage through structured hands-on curricula and tamper-proof cryptographic credentials.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-button-primary font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Course Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/paths"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-button-secondary font-royal font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#35E6B5]" />
                <span>Career Learning Paths</span>
              </Link>
              <Link
                to="/verify"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#101923]/70 hover:bg-[#1B2530] border border-[#263440] text-[#94A3B8] hover:text-white font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#65F58A]" />
                <span>Verify Credential</span>
              </Link>
            </div>

            {/* Live Platform Telemetry Bar */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-[#263440]/60">
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1,420+</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Active Operators</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#65F58A] font-mono tabular-nums">10</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Specialized Courses</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#35E6B5] font-mono tabular-nums">98.4%</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Audit Verification</div>
              </div>
              <div className="p-4 glass-card rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#F59E0B] font-mono tabular-nums">500 T</div>
                <div className="text-[11px] text-[#94A3B8] font-mono mt-1">Token Bounties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase / Embargo Banner */}
      <section className="py-20 border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {catalogEnabled && courses.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-semibold px-2.5 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CURRICULUM SHOWCASE</span>
                  </div>
                  <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Defensive Operator Courseware
                  </h2>
                  <p className="text-[#94A3B8] text-xs sm:text-sm mt-1 max-w-xl">
                    Explore our distinct specialized modules crafted for blue team defenders, forensics analysts, and incident responders.
                  </p>
                </div>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#65F58A] hover:underline"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Cards Grid Rendering all 10 Distinct Visual Card Variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {courses.map((course, idx) => (
                  <CourseCardVariant
                    key={course.id}
                    course={course}
                    variantId={course.card_variant || `variant-${String(idx + 1).padStart(2, '0')}`}
                    className={course.card_variant === 'variant-06' ? 'lg:col-span-2' : ''}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101923] border border-[#263440] text-xs font-mono">
                <Lock className="w-3.5 h-3.5 text-[#35E6B5]" />
                <span className="text-[#94A3B8]">CURRICULUM PREPARATION ACTIVE</span>
              </div>
              <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-white tracking-tight title-shading-neon">
                Courses will be out soon
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Link
                  to="/paths"
                  className="px-6 py-2.5 rounded-full bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors"
                >
                  Check Learning Paths
                </Link>
                <Link
                  to="/verify"
                  className="px-6 py-2.5 rounded-full glass-button-primary font-royal font-bold text-xs"
                >
                  Verify Credentials
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Career Learning Tracks */}
      <section className="py-20 border-b border-[#263440]/80 bg-[#060C13]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Defensive Career Pathways
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">
              Structured step-by-step curricula taking you from foundational networking and operating system telemetry to advanced incident response.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Track 1: Ultra-Wide Mountain Summit Banner (Card 6) */}
            <div className="lg:col-span-3">
              <DictoCyberCard
                variant={6}
                tag="CAREER ASCENT TRACK"
                pathwayTag="Flagship Track 01"
                title="Tier-1 to Tier-2 SOC Analyst Career Track"
                description="Comprehensive 12-week training for 24/7 security operations centres: alert triage, SIEM correlation, network forensics, and rapid defensive containment under NIST SP 800-61."
                tags={['SIEM / Splunk / Elastic', 'MITRE ATT&CK', 'Packet Inspection', 'Incident Handling']}
                meta1="1,420 Enrolled Defenders in 2026 Cohort"
                meta2="12 Weeks • 48 Hours Comprehensive Curriculum • CRSS Credential"
                actionHref="/paths"
                actionText="Explore Track Syllabus & Labs"
              />
            </div>

            {/* Track 2: Holographic Wireframe Globe (Card 2) */}
            <div className="lg:col-span-2">
              <DictoCyberCard
                variant={2}
                tag="FORENSIC INVESTIGATION"
                pathwayTag="Specialist Track 02"
                title="Threat Hunting & Digital Forensics Specialist"
                description="Proactive adversary detection, memory volatility forensics, network packet reassembly, and threat intelligence synthesis across multi-cloud enterprise environments."
                tags={['Memory Volatility 3', 'YARA & Sigma Rules', 'Adversary Emulation', 'PCAP Forensics']}
                meta1="820 Active Forensic Analysts"
                meta2="14 Weeks • 56 Hours Hands-On Labs • CTDH Credential"
                actionHref="/paths"
                actionText="View Specialist Track"
              />
            </div>

            {/* Track 3: 3D Isometric Cyber Vault Cube (Card 8) */}
            <div className="lg:col-span-1">
              <DictoCyberCard
                variant={8}
                tag="CLOUD & INFRASTRUCTURE"
                pathwayTag="Architect Track 03"
                title="Defensive Infrastructure Architect"
                description="Harden enterprise endpoints, configure zero-trust perimeters, and master cloud workload defense across AWS and GCP."
                tags={['Cloud IAM Hardening', 'Zero Trust Architecture', 'Kubernetes Security']}
                meta1="AWS & GCP Cloud Workload Defense"
                meta2="16 Weeks • 64 Hours • CDSA Credential"
                actionHref="/paths"
                actionText="Inspect Track Details"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRD Academic Safeguards */}
      <section className="py-20 border-b border-[#263440]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>STRICT ACADEMIC FIDELITY</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Protected Credential Integrity
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm">
              Our certifications are trusted by enterprise blue teams because every evaluation strictly enforces proctoring standards specified in our Developer Handover PRD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Safeguard 1: Card 4 (Crimson Red Alert Terminal) */}
            <DictoCyberCard
              variant={4}
              tag="CRITICAL PROCTORING SENTINEL"
              pathwayTag="3-Strike Anti-Cheat"
              title="3-Strike Exam Focus Tracking"
              description="Active window blur and tab-switching surveillance. Strike 1 warns the candidate; Strike 2 deducts 50 RedKross tokens; Strike 3 terminates the exam immediately with an automated violation incident report."
              tags={['Client Blur Tracking', 'Token Penalty', 'Automated Exam Abort']}
              meta1="Real-Time Proctoring Telemetry Active"
              meta2="Immutable Incident Audit Queue Logging"
              actionHref="/verify"
              actionText="View Proctoring Standards"
            />

            {/* Safeguard 2: Card 7 (Radar HUD with Checkmark & Progress Bar) */}
            <DictoCyberCard
              variant={7}
              tag="REMEDIATION COOLDOWN"
              pathwayTag="24h Mandatory Cooldown"
              title="24-Hour Mandatory Retake Lockout"
              description="Exhausting 3 failed attempts or suffering a Strike 3 violation locks the candidate out for 24 hours server-side to enforce structured review of curriculum materials before re-attempting."
              tags={['Attempt Threshold', '24-Hour Cooldown', 'Structured Remediation']}
              meta1="Server-Enforced Cooldown Protocol"
              meta2="Mandatory Material Review Verification"
              progress={100}
              actionHref="/verify"
              actionText="Read Cooldown Policy"
            />

            {/* Safeguard 3: Card 3 (Bastion Glass Shield with Padlock) */}
            <DictoCyberCard
              variant={3}
              tag="CRYPTOGRAPHIC INTEGRITY"
              pathwayTag="Public Resolver"
              title="Cryptographic Proof & Public Resolver"
              description="Every earned certificate produces an immutable SHA-256 digital signature, tamper-proof QR code, and instant verification URL directly verifiable by prospective employers."
              tags={['SHA-256 Hash', 'Tamper-Proof Proofs', 'Live QR Scan']}
              meta1="Public Key Escrow Ledger Integration"
              meta2="Instant Employer QR Code Verification"
              actionHref="/verify"
              actionText="Test Live Resolver"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
