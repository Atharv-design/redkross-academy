import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, HeartHandshake, Shield } from 'lucide-react';

export default function PsychologyAcademyFooter() {
  return (
    <footer className="w-full bg-[#050B14] border-t border-teal-500/15 py-12 px-4 sm:px-6 lg:px-8 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <img src="/assets/crest-clean-circle.png" alt="" className="w-7 h-7 object-contain opacity-80" />
          <div>
            <div className="text-teal-200 font-bold">RedKross Psychology &amp; Mental Wellbeing Academy</div>
            <div className="text-[11px] text-slate-500">Evidence-Based Clinical Education &amp; Crisis Response // Section 8 Non-Profit</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-white transition-colors">Foundation Gateway</Link>
          <Link to="/academy/cybersecurity" className="hover:text-[#65F58A] transition-colors">Cybersecurity Academy</Link>
          <Link to="/student" className="hover:text-white transition-colors">Student Portal</Link>
          <Link to="/verify" className="hover:text-amber-300 transition-colors">Credential Verification</Link>
        </div>

        <div className="text-[10px] text-slate-500">
          CIN: U85499HR2026NPL144741 &bull; 2026 RedKross Research Foundation
        </div>
      </div>
    </footer>
  );
}
