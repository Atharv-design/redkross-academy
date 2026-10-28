import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Lock, ExternalLink, ArrowUpRight, LifeBuoy } from 'lucide-react';
import DoodleCrewFooter from '../ui/doodle-crew-footer-academy';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden select-none bg-[#071018]/75 backdrop-blur-2xl border-t border-[#65F58A]/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_-12px_45px_rgba(0,0,0,0.6)] text-[#94A3B8] font-sans">
      {/* Subtle Neon Radial Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#65F58A]/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Platform Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-[#65F58A]/50 flex items-center justify-center shadow-[0_0_15px_rgba(101,245,138,0.3)]">
                <img src="/assets/crest-clean-circle.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-royal font-bold text-lg text-white">
                RedKross <span className="text-[#65F58A]">Academy</span>
              </span>
            </div>
            
            <p className="text-xs text-[#94A3B8] leading-relaxed font-sans max-w-sm">
              The professional defensive cybersecurity education & credentialing division of <a href="https://redkross.org.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#65F58A] underline">RedKross Research Foundation</a>. Hands-on SOC operations, adversary simulation defense, and cryptographically signed credentials.
            </p>

            <div className="text-[11px] font-mono text-slate-500 space-y-1">
              <p>CIN: <span className="text-slate-300 font-bold">U85300HR2022NPL107482</span> (RoC Haryana)</p>
              <p>Section 8 Non-Profit Research Foundation</p>
            </div>
          </div>

          {/* Col 3: Career Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#65F58A] font-semibold">Defensive Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/paths" className="hover:text-white transition-colors">SOC Analyst Career Track</Link></li>
              <li><Link to="/paths" className="hover:text-white transition-colors">Threat Hunting & Forensics</Link></li>
              <li><Link to="/paths" className="hover:text-white transition-colors">Defensive Infrastructure Engineer</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Curriculum Catalogue (10)</Link></li>
              <li><Link to="/verify" className="hover:text-white transition-colors">Verify Credential</Link></li>
            </ul>
          </div>

          {/* Col 4: Academic Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#65F58A] font-semibold">Integrity Standards</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Immutable Digital Signatures</span>
              </li>
              <li><span className="text-slate-400">3-Strike Exam Focus Tracking</span></li>
              <li><span className="text-slate-400">24-Hour Evaluation Lockout Protocol</span></li>
              <li><span className="text-slate-400">NIST SP 800-61r2 Aligned Playbooks</span></li>
              <li><span className="text-slate-400">MITRE ATT&CK Framework Mapping</span></li>
            </ul>
          </div>

          {/* Col 5: Connected Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#65F58A] font-semibold">Connected Ecosystem</h4>
            <div className="space-y-2.5">
              <a 
                href="https://redkross.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#101923]/60 backdrop-blur-md border border-[#263440] flex items-center justify-between text-xs text-gray-300 hover:border-[#65F58A]/50 hover:bg-[#1B2530]/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-mono block">PARENT FOUNDATION</span>
                  <span className="font-semibold text-white group-hover:text-[#65F58A]">redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#65F58A]" />
              </a>

              <a 
                href="https://cyber.redkross.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#101923]/60 backdrop-blur-md border border-[#263440] flex items-center justify-between text-xs text-gray-300 hover:border-[#35E6B5]/50 hover:bg-[#1B2530]/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-mono block">CYBERSECURITY LABS</span>
                  <span className="font-semibold text-white group-hover:text-[#35E6B5]">cyber.redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#35E6B5]" />
              </a>

              <a 
                href="https://psychology.redkross.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#101923]/60 backdrop-blur-md border border-[#263440] flex items-center justify-between text-xs text-gray-300 hover:border-[#F59E0B]/50 hover:bg-[#1B2530]/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-mono block">PSYCHOLOGY & WELLBEING</span>
                  <span className="font-semibold text-white group-hover:text-[#F59E0B]">psychology.redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F59E0B]" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Hand-Drawn Doodle Crew Brandmark for RedKross Academy */}
        <div className="my-8 pt-6 border-t border-white/10 glass-card rounded-2xl p-4 sm:p-6 shadow-xl">
          <DoodleCrewFooter
            as="div"
            showTop={false}
            showBar={false}
            wordmark="REDKROSS"
            subWordmark="ACADEMY"
            wordmarkColorMode="logo"
            preset="academy"
            tagline="Empowering Next-Gen Defensive Security Practitioners with Rigorous Curricula and Verifiable Credentials"
            height="520px"
            palette={{
              background: "transparent",
              ink: "#65F58A",
              accent: "#00FFA3"
            }}
            crew={[
              { kind: "yeti", letter: 0, seat: "front", scale: 0.44, offset: -0.32, says: "Mastering Tier-1 to Tier-2 SOC log triage!" },
              { kind: "bird", letter: 1, seat: "top", offset: 0.08, says: "SIEM correlation rules deployed!" },
              { kind: "ghost", letter: 2, seat: "behind", offset: 0.0, says: "Adversary memory footprint extracted!" },
              { kind: "cat", letter: 3, seat: "top", offset: 0.05, says: "Cryptographic signature verified on-chain!" },
              { kind: "kid", letter: 4, seat: "front", offset: 0.1, says: "Zero-day remediation protocol active!" },
              { kind: "mushroom", letter: 5, seat: "front", offset: -0.05, says: "MITRE ATT&CK mapping complete!" },
              { kind: "bird", letter: 6, seat: "top", offset: -0.08, flip: true, says: "Final certification milestone unlocked!" },
              { kind: "cat", letter: 7, seat: "front", flip: true, offset: 0.12, says: "Defend against advanced persistent threats!" }
            ]}
            doodles={["bolt", "star", "flame", "sparkle", "spiral", "plane"]}
            doodleCount={12}
            actions={[
              { label: "Explore Learning Tracks", href: "/paths", variant: "solid" },
              { label: "Verify Credential", href: "/verify", variant: "outline" }
            ]}
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} RedKross Research Foundation. Academic Division. Zero Fabrications Policy Enforced.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/verify" className="hover:text-gray-300">Public Verification</Link>
            <span>&bull;</span>
            <a href="mailto:academy@redkross.org.in" className="hover:text-[#65F58A]">academy@redkross.org.in</a>
            <span>&bull;</span>
            <a href="https://cyber.redkross.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Cybersecurity Lab</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
