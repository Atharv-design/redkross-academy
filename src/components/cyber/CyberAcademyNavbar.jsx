import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Terminal, Award, ArrowRight, UserCheck, Brain, ArrowLeft } from 'lucide-react';

export default function CyberAcademyNavbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-xl border-b border-[#FF7A00]/20 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand & Division Label */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-black border border-[#FF7A00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.35)] group-hover:scale-105 transition-transform flex-shrink-0">
              <img 
                src="/assets/crest-clean-circle.png" 
                alt="RedKross Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-royal text-base sm:text-lg font-bold text-white tracking-wide">
                  RedKross
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-[#FF7A00]/15 text-[#FFA439] border border-[#FF7A00]/30 uppercase">
                  CYBER ACADEMY
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#A3907C] tracking-wider">
                Defensive Security &amp; SOC Telemetry Division
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          <Link 
            to="/" 
            className="text-slate-300 hover:text-[#FFA439] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Foundation Home</span>
          </Link>
          <Link 
            to="/academy/cybersecurity" 
            className="text-[#FFA439] font-bold border-b-2 border-[#FF7A00] pb-1 flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FFA439]" />
            <span>Cyber Tracks</span>
          </Link>
          <Link 
            to="/student" 
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#FFA439]" />
            <span>Student Dashboard</span>
          </Link>
          <Link 
            to="/verify" 
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-[#FFA439]" />
            <span>Verify Credential</span>
          </Link>
          <Link 
            to="/academy/psychology" 
            className="text-slate-400 hover:text-teal-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
            title="Switch to Psychology Academy"
          >
            <Brain className="w-3.5 h-3.5 text-teal-400" />
            <span>Psychology Academy</span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/student"
            className="px-4 py-2 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FFA439] hover:bg-[#FF7A00]/25 hover:border-[#FFA439] text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,122,0,0.2)]"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#FFA439]" />
            <span>Cadet Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
