import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Award, CheckCircle2, Search, ExternalLink, Calendar, Hash, FileCheck, AlertTriangle } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function VerifyCredentialPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(id || '');
  const [credential, setCredential] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (id) {
      const match = mockEngine.getCredentialByVerificationId(id);
      setCredential(match || null);
      setHasSearched(true);
    } else {
      // Default to the first seed credential for demonstration
      const defaultCred = mockEngine.getCredentialByVerificationId('RK-SOC-89421');
      setCredential(defaultCred || null);
      setSearchId('RK-SOC-89421');
      setHasSearched(true);
    }
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const match = mockEngine.getCredentialByVerificationId(searchId);
    setCredential(match || null);
    setHasSearched(true);
    navigate(`/verify/${searchId.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#090D16] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL REGISTRY LOOKUP</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Public Credential Verification Portal
          </h1>
          <p className="text-slate-300 text-sm">
            Authenticate the cryptographic validity of any RedKross Academy diploma, certificate of completion, or professional cybersecurity certification.
          </p>
        </div>

        {/* Verification Lookup Input */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Credential ID (e.g. RK-SOC-89421)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-card border border-surface-border rounded-lg text-sm text-white placeholder-slate-400 font-mono focus:outline-none focus:border-redkross-500 uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-redkross-600 hover:bg-redkross-700 text-white font-semibold text-sm transition-all shadow-md flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </div>
        </form>

        {/* Verification Result Display */}
        {hasSearched && credential ? (
          <div className="bg-surface-card border border-surface-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
            {/* Top Security Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-border mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-emerald-400 font-mono tracking-wider">
                      CRYPTOGRAPHICALLY VERIFIED
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Official Registry Status: <span className="text-white font-semibold">{credential.status}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-lg border border-slate-700 self-start sm:self-auto">
                <QRCodeSVG value={credential.verification_url} size={72} />
              </div>
            </div>

            {/* Credential Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs font-mono">
              <div className="p-4 rounded-lg bg-surface-100/70 border border-surface-border space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Certified Recipient</div>
                <div className="text-base font-bold text-white font-sans">{credential.student_name}</div>
                <div className="text-[11px] text-slate-400">Defensive Cyber Candidate</div>
              </div>

              <div className="p-4 rounded-lg bg-surface-100/70 border border-surface-border space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Credential Issued</div>
                <div className="text-base font-bold text-white font-sans">{credential.credential_title}</div>
                <div className="text-[11px] text-redkross-400">{credential.course_title}</div>
              </div>

              <div className="p-4 rounded-lg bg-surface-100/70 border border-surface-border space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Registry Identifier</div>
                <div className="text-sm font-bold text-white tracking-widest">{credential.verification_id}</div>
                <div className="text-[10px] text-slate-400">Class: {credential.type}</div>
              </div>

              <div className="p-4 rounded-lg bg-surface-100/70 border border-surface-border space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Issuance & Validity</div>
                <div className="text-sm font-semibold text-white">
                  Issued: {credential.issue_date} • Expires: {credential.expiration_date}
                </div>
                <div className="text-[10px] text-emerald-400">Grade Achieved: {credential.grade_percentage}%</div>
              </div>
            </div>

            {/* Validated Skills */}
            <div className="mb-6 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Validated Competencies & Domains
              </div>
              <div className="flex flex-wrap gap-2">
                {credential.skills_validated.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded bg-surface-100 border border-surface-border text-slate-300 font-mono"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Digital Signature Hash */}
            <div className="p-3.5 rounded-lg bg-black/50 border border-surface-border/80 text-[11px] font-mono text-slate-400 break-all space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">256-bit Digital Signature Hash</div>
              <div className="text-slate-300">{credential.digital_signature}</div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="bg-surface-card border border-rose-900/50 rounded-xl p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Credential Verification Failed</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No active certificate or diploma matches the identifier "{searchId}". Please check the alphanumeric code or contact RedKross Academy Registrar.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2">
              Valid Demo ID: <span className="text-white font-bold cursor-pointer" onClick={() => { setSearchId('RK-SOC-89421'); navigate('/verify/RK-SOC-89421'); }}>RK-SOC-89421</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
