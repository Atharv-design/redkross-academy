import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, ArrowUpRight, Lock } from 'lucide-react';
import DoodleCrewFooter from '../ui/doodle-crew-footer-cyber';

export default function CyberAcademyFooter() {
  return (
    <footer className="w-full bg-transparent border-t border-[#FF7A00]/20 text-gray-400 font-sans relative overflow-hidden select-none z-10">
      {/* Subtle Amber Radial Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[300px] bg-[#FF7A00]/[0.035] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black border border-[#FF7A00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                <img src="/assets/crest-clean-circle.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-royal font-bold text-lg text-white">
                RedKross <span className="text-[#FF7A00]">Cyber Academy</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Hands-on defensive engineering, web application penetration defense, and tamper-proof cryptographic credentials. Section 8 non-profit research foundation.
            </p>
          </div>

          {/* Quick Division Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFA439] font-semibold">Division Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/" className="hover:text-[#FFA439] transition-colors">Foundation Gateway</Link></li>
              <li><Link to="/academy/psychology" className="hover:text-teal-300 transition-colors">Psychology Academy</Link></li>
              <li><Link to="/student" className="hover:text-white transition-colors">Cadet Dashboard</Link></li>
              <li><Link to="/verify" className="hover:text-[#FFA439] transition-colors">Verify Credential</Link></li>
            </ul>
          </div>

          {/* Institutional Integrity */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFA439] font-semibold">Integrity Standards</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5 text-white">
                <Lock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>SHA-256 Verified Certificates</span>
              </li>
              <li>NIST SP 800-61r2 Playbooks</li>
              <li>OWASP Top 10 Real Mitigation</li>
            </ul>
          </div>
        </div>

        {/* Interactive Hand-Drawn Doodle Crew Brandmark for Cybersecurity */}
        <div className="my-6 pt-4 border-t border-white/5">
          <DoodleCrewFooter
            as="div"
            showTop={false}
            showBar={false}
            wordmark="REDKROSS"
            subWordmark="CYBERSECURITY"
            wordmarkColorMode="logo"
            tagline="Pioneering Applied Cybersecurity, Isolated Lab Sandboxes & Verifiable Defensive Engineering"
            height="auto"
            palette={{
              background: "transparent",
              ink: "#f1f5f9",
              accent: "#FF7A00"
            }}
            crew={[
              { kind: "yeti", letter: 0, seat: "front", scale: 0.44, offset: -0.32, says: "Guarding zero-day vectors & perimeter!" },
              { kind: "bird", letter: 1, seat: "top", offset: 0.08, says: "Real-time telemetry audit clean!" },
              { kind: "ghost", letter: 2, seat: "behind", offset: 0.0, says: "Hidden backdoors neutralized!" },
              { kind: "cat", letter: 3, seat: "top", offset: 0.05, says: "Forensic memory dump verified!" },
              { kind: "kid", letter: 4, seat: "front", offset: 0.1, says: "Air-gap sandbox isolation active!" },
              { kind: "mushroom", letter: 5, seat: "front", offset: -0.05, says: "Adversarial attack surface closed!" },
              { kind: "bird", letter: 6, seat: "top", offset: -0.08, flip: true, says: "CVE reproduction pipeline running!" },
              { kind: "cat", letter: 7, seat: "front", flip: true, offset: 0.12, says: "RedKross Cybersecurity sentry online!" }
            ]}
            doodles={[]}
            doodleCount={0}
            actions={[
              { label: "Student Dashboard", href: "/student", variant: "solid" },
              { label: "Verify Credential", href: "/verify", variant: "outline" }
            ]}
          />
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <p>&copy; {new Date().getFullYear()} RedKross Research Foundation. Academic Cyber Division.</p>
          <p>CIN: U85300HR2022NPL107482 &bull; RoC Haryana</p>
        </div>
      </div>
    </footer>
  );
}
