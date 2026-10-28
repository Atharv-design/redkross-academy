import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Lock, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060910] border-t border-surface-border text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-redkross-500" />
              <span className="font-bold text-white font-mono tracking-tight text-sm">REDKROSS ACADEMY</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Institutional cybersecurity academy operated by the RedKross Research Foundation. Setting rigorous benchmarks for defensive SOC operations, incident triage, and tamper-proof practitioner credentials.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
              <Lock className="w-3.5 h-3.5 text-cyber-emerald" />
              <span>Cryptographically Verifiable Credentials</span>
            </div>
          </div>

          {/* Academy Tracks */}
          <div>
            <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-3">Learning Tracks</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/paths" className="hover:text-white transition-colors">SOC Analyst Career Path</Link>
              </li>
              <li>
                <Link to="/paths" className="hover:text-white transition-colors">Threat Hunting & Forensics</Link>
              </li>
              <li>
                <Link to="/paths" className="hover:text-white transition-colors">Defensive Infrastructure Engineer</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">All Modular Courses (10)</Link>
              </li>
            </ul>
          </div>

          {/* Academic Integrity & Policies */}
          <div>
            <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-3">Academic Safeguards</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/verify" className="hover:text-white transition-colors flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-cyber-emerald" />
                  <span>Public Credential Verification</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-400">3-Strike Exam Focus Loss Policy</span>
              </li>
              <li>
                <span className="text-slate-400">24-Hour Evaluation Lockout Protocol</span>
              </li>
              <li>
                <span className="text-slate-400">Closed-Loop Non-Monetary Token Ledger</span>
              </li>
            </ul>
          </div>

          {/* RedKross Ecosystem */}
          <div>
            <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-3">RedKross Ecosystem</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="https://redkross.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>RedKross Foundation Main</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cyber.redkross.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>RedKross Cybersecurity</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://psychology.redkross.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>RedKross Psychology & Care</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-border/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div>
            © 2026 RedKross Research Foundation. All rights reserved. PRD v1.0 Production Implementation.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Engineered for Defensive Excellence with</span>
            <Heart className="w-3 h-3 text-redkross-500 inline fill-redkross-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
