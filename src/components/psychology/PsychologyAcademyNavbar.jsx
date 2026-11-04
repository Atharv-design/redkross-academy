import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, HeartHandshake, BookOpen, Award, Shield, UserCheck, Terminal } from 'lucide-react';

export default function PsychologyAcademyNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-md border-b border-[#FF7A00]/25 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src="/assets/crest-clean-circle.png" 
              alt="RedKross Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_12px_rgba(255,122,0,0.5)] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-royal text-base sm:text-lg font-bold text-white tracking-wide">
                  RedKross
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-[#FF7A00]/15 text-[#FFA439] border border-[#FF7A00]/35 uppercase">
                  PSYCHOLOGY ACADEMY
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                Mental Wellbeing &amp; Behavioral Science Division
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          <Link 
            to="/academy/psychology" 
            className="text-[#FFA439] font-bold border-b border-[#FF7A00]/60 pb-1 flex items-center gap-1.5"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Psychology Tracks</span>
          </Link>
          <Link 
            to="/academy/psychology/student" 
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
            to="/academy/cybersecurity" 
            className="text-slate-400 hover:text-[#FFA439] transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
            title="Switch to Cybersecurity Academy"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Cyber Academy</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/academy/psychology/student"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all flex items-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5 text-black" />
            <span>Student Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
