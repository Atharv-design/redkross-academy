import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, ArrowUpRight, Lock } from 'lucide-react';
import DoodleCrewFooter from '../ui/doodle-crew-footer-cyber';

export default function CyberAcademyFooter() {
  return (
    <footer className="w-full bg-[#03060A] border-t border-cyan-500/20 text-gray-400 font-sans relative overflow-hidden select-none z-10">
      {/* Subtle Cyan Radial Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00F0FF]/[0.025] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black border border-[#00F0FF]/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <img src="/assets/crest-clean-circle.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-royal font-bold text-lg text-white">
                RedKross <span className="text-[#00F0FF]">Cyber Academy</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Hands-on defensive engineering, web application penetration defense, and tamper-proof cryptographic credentials. Section 8 non-profit research foundation.
            </p>
          </div>

          {/* Quick Division Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-semibold">Division Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Foundation Gateway</Link></li>
              <li><Link to="/academy/psychology" className="hover:text-teal-300 transition-colors">Psychology Academy</Link></li>
              <li><Link to="/student" className="hover:text-white transition-colors">Cadet Dashboard</Link></li>
              <li><Link to="/verify" className="hover:text-[#00F0FF] transition-colors">Verify Credential</Link></li>
            </ul>
          </div>

          {/* Institutional Integrity */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-semibold">Integrity Standards</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-center gap-1.5 text-white">
                <Lock className="w-3.5 h-3.5 text-[#00F0FF]" />
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
              background: "#03060A",
              ink: "#f1f5f9",
              accent: "#00F0FF"
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

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-gray-500">
          <p>&copy; {new Date().getFullYear()} RedKross Research Foundation. Academic Cyber Division.</p>
          <p>CIN: U85300HR2022NPL107482 &bull; RoC Haryana</p>
        </div>
      </div>
    </footer>
  );
}
