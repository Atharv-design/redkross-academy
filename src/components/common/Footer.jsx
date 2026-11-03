import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Lock, ExternalLink, ArrowUpRight, LifeBuoy } from 'lucide-react';
import DoodleCrewFooter from '../ui/doodle-crew-footer-academy';
import { getEcosystemLinks } from '../../utils/ecosystemLinks';

export default function Footer() {
  const ecosystem = getEcosystemLinks();
  return (
    <footer className="bg-transparent border-t border-[#FF7A00]/20 text-[#E2D9CE] relative overflow-hidden select-none">
      {/* Subtle Amber Radial Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#FF7A00]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-4 sm:mb-6">
          
          {/* Col 1 & 2: Platform Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-[#FF7A00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                <img src="/assets/crest-clean-circle.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-royal font-bold text-lg text-white">
                RedKross <span className="text-[#FF7A00]">Academy</span>
              </span>
            </div>
            
            <p className="text-xs text-[#E2D9CE] leading-relaxed max-w-sm">
              The dual-discipline education & credentialing division of <a href={ecosystem.foundation} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF7A00] underline">RedKross Research Foundation</a>. Hands-on application defense and evidence-based psychological wellbeing with cryptographically signed credentials.
            </p>

            <div className="text-[11px] font-mono text-[#A3907C] space-y-1">
              <p>CIN: <span className="text-white font-bold">U85300HR2022NPL107482</span> (RoC Haryana)</p>
              <p>Section 8 Non-Profit Research Foundation</p>
            </div>
          </div>

          {/* Col 3: Academic Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFA439] font-semibold">Academic Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/academy/cybersecurity" className="hover:text-[#FFA439] transition-colors">Cybersecurity Academy</Link></li>
              <li><Link to="/academy/psychology" className="hover:text-teal-300 transition-colors">Psychology Academy</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalogue</Link></li>
              <li><Link to="/verify" className="hover:text-white transition-colors">Verify Credential</Link></li>
              <li><Link to="/student" className="hover:text-white transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 4: Academic Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFA439] font-semibold">Integrity Standards</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5 text-white">
                <Lock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Immutable Digital Signatures</span>
              </li>
              <li><span className="text-[#E2D9CE]">3-Strike Exam Focus Tracking</span></li>
              <li><span className="text-[#E2D9CE]">24-Hour Evaluation Lockout Protocol</span></li>
              <li><span className="text-[#E2D9CE]">NIST SP 800-61r2 &amp; OWASP Standards</span></li>
              <li><span className="text-[#E2D9CE]">RCI-Aligned Ethical Mental Health Frameworks</span></li>
            </ul>
          </div>

          {/* Col 5: Connected Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFA439] font-semibold">Connected Ecosystem</h4>
            <div className="space-y-2.5">
              <a 
                href={ecosystem.foundation}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-black/60 border border-[#FF7A00]/20 flex items-center justify-between text-xs text-slate-200 hover:border-[#FF7A00]/60 hover:bg-black/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-[#A3907C] font-mono block">PARENT FOUNDATION</span>
                  <span className="font-semibold text-white group-hover:text-[#FF7A00]">redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A3907C] group-hover:text-[#FF7A00]" />
              </a>

              <a 
                href={ecosystem.cybersecurity}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-black/60 border border-[#FF7A00]/20 flex items-center justify-between text-xs text-slate-200 hover:border-[#FFA439]/60 hover:bg-black/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-[#A3907C] font-mono block">CYBERSECURITY PLATFORM</span>
                  <span className="font-semibold text-white group-hover:text-[#FFA439]">cybersecurity.redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A3907C] group-hover:text-[#FFA439]" />
              </a>

              <a 
                href={ecosystem.psychology}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-black/60 border border-[#FF7A00]/20 flex items-center justify-between text-xs text-slate-200 hover:border-teal-400/60 hover:bg-black/80 transition-all group shadow-sm"
              >
                <div>
                  <span className="text-[10px] text-[#A3907C] font-mono block">PSYCHOLOGY &amp; WELLBEING</span>
                  <span className="font-semibold text-white group-hover:text-teal-300">psychology.redkross.org.in</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A3907C] group-hover:text-teal-300]" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Hand-Drawn Doodle Crew Brandmark */}
        <div className="mt-1 sm:mt-2 mb-4">
          <DoodleCrewFooter
            as="div"
            showTop={false}
            showBar={false}
            wordmark="REDKROSS"
            subWordmark="ACADEMY"
            wordmarkColorMode="logo"
            tagline="Empowering Emerging Practitioners with Practical Knowledge and Cryptographically Verifiable Credentials"
            height="auto"
            palette={{
              background: "transparent",
              ink: "#F1F5F9",
              accent: "#FF7A00"
            }}
            crew={[
              { kind: "yeti", letter: 0, seat: "front", scale: 0.44, offset: -0.32, says: "Full stack defense laboratories active!" },
              { kind: "bird", letter: 1, seat: "top", offset: 0.08, says: "Evidence-based CBT frameworks ready!" },
              { kind: "ghost", letter: 2, seat: "behind", offset: 0.0, says: "Cryptographic credential issued!" },
              { kind: "cat", letter: 3, seat: "top", offset: 0.05, says: "Interactive Kali CyberLab online!" },
              { kind: "kid", letter: 4, seat: "front", offset: 0.1, says: "Peer study circles active!" },
              { kind: "mushroom", letter: 5, seat: "front", offset: -0.05, says: "Section 8 non-profit education for all!" },
              { kind: "bird", letter: 6, seat: "top", offset: -0.08, flip: true, says: "Clinical burnout prevention guides!" },
              { kind: "cat", letter: 7, seat: "front", flip: true, offset: 0.12, says: "Master ethical research & defense!" }
            ]}
            doodles={[]}
            doodleCount={0}
            actions={[
              { label: "Cyber Academy", href: "/academy/cybersecurity", variant: "solid" },
              { label: "Psychology Academy", href: "/academy/psychology", variant: "outline" }
            ]}
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} RedKross Research Foundation. Academic Division. Zero Fabrications Policy Enforced.
          </p>
          <div className="flex items-center gap-3">
            {/* 1. RedKross Foundation Main Website */}
            <a
              href="https://redkross.org.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RedKross Research Foundation"
              className="w-7 h-7 rounded-lg bg-black/80 border border-[#FF7A00]/30 hover:border-[#FF7A00] hover:bg-black flex items-center justify-center p-1 transition-all"
            >
              <img src="/assets/crest-clean-circle.png" alt="Foundation" className="w-full h-full object-contain" />
            </a>

            {/* 2. WhatsApp Official Channel */}
            <a
              href="https://whatsapp.com/channel/0029VbBbRCn7tkj2M1Sj7f3Z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="w-7 h-7 rounded-lg bg-black/80 border border-[#FF7A00]/30 hover:border-[#25D366] hover:bg-black flex items-center justify-center p-1.5 text-[#25D366] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.507 2 2.019 6.488 2.019 12.02c0 1.768.461 3.494 1.336 5.011L2 22l5.12-1.343c1.465.798 3.12 1.22 4.92 1.22 5.533 0 10.021-4.488 10.021-10.02S17.573 2 12.04 2zm0 18.337c-1.579 0-3.125-.424-4.47-1.225l-.32-.19-3.322.871.887-3.238-.208-.331c-.88-1.399-1.344-3.031-1.344-4.704 0-4.606 3.748-8.354 8.357-8.354 4.608 0 8.356 3.748 8.356 8.354 0 4.606-3.748 8.354-8.356 8.354zm4.992-6.195c-.276-.138-1.633-.806-1.886-.899-.253-.092-.437-.138-.621.138-.184.276-.713.899-.874 1.083-.161.184-.322.207-.598.069-.276-.138-1.166-.43-2.221-1.371-.821-.732-1.375-1.637-1.536-1.913-.161-.276-.017-.425.121-.562.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.495-.851-2.048-.224-.54-.452-.467-.621-.475-.161-.008-.345-.009-.529-.009-.184 0-.483.069-.736.345-.253.276-.966.943-.966 2.3 0 1.357.989 2.668 1.127 2.852.138.184 1.945 2.97 4.712 4.165.658.284 1.172.454 1.573.581.661.21 1.262.18 1.737.109.53-.079 1.633-.667 1.863-1.312.23-.645.23-1.197.161-1.312-.069-.115-.253-.184-.529-.322z"/>
              </svg>
            </a>

            {/* 3. Instagram Official Channel */}
            <a
              href="https://www.instagram.com/redkross_research_foundation?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-lg bg-black/80 border border-[#FF7A00]/30 hover:border-[#E1306C] hover:bg-black flex items-center justify-center p-1.5 text-[#E1306C] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
