import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Award, CheckCircle2, Search, ExternalLink, Calendar, Hash, FileCheck, AlertTriangle } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';

export default function VerifyCredentialPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(id || '');
  const [credential, setCredential] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const targetId = id || 'RK-SOC-89421';
    setSearchId(targetId);
    lookupCredential(targetId);
  }, [id]);

  const lookupCredential = async (targetId) => {
    if (!targetId) return;
    setLoading(true);
    try {
      const res = await apiClient.verifyCredential(targetId);
      if (res && res.found) {
        setCredential(res.credential);
      } else {
        const local = mockEngine.getCredentialByVerificationId(targetId);
        setCredential(local || null);
      }
      setHasSearched(true);
    } catch (e) {
      const local = mockEngine.getCredentialByVerificationId(targetId);
      setCredential(local || null);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    lookupCredential(searchId.trim());
    navigate(`/verify/${searchId.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL REGISTRY LOOKUP</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold title-shading-neon tracking-tight mb-3">
            Public Credential Verification Portal
          </h1>
          <p className="text-[#94A3B8] text-xs sm:text-sm">
            Authenticate the cryptographic validity of any RedKross Academy diploma, certificate of completion, or professional cybersecurity certification.
          </p>
        </div>

        {/* Verification Lookup Input */}
        <form onSubmit={handleSearch}>
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Enter Credential ID (e.g. RK-SOC-89421)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#101923]/90 border border-[#263440] text-xs sm:text-sm text-white placeholder-[#64748B] font-mono focus:outline-none focus:border-[#65F58A] uppercase tracking-wider transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Verifying...' : 'Verify'}</span>
            </button>
          </div>
        </form>

        {/* Verification Result Display */}
        {hasSearched && credential ? (
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Top Security Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#263440] gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-bold text-[#65F58A] font-mono tracking-wider">
                      CRYPTOGRAPHICALLY VERIFIED RECORD
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
                  </div>
                  <div className="text-xs text-[#94A3B8] font-mono">
                    Official Registry Status: <span className="text-white font-semibold">{credential.status}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-xl border border-slate-700 self-start sm:self-auto">
                <QRCodeSVG value={credential.verification_url || `https://redkross-academy.vercel.app/verify/${credential.verification_id}`} size={72} />
              </div>
            </div>

            {/* Credential Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Certified Recipient</div>
                <div className="font-royal text-lg font-bold text-white">{credential.student_name}</div>
                <div className="text-[11px] text-[#65F58A]">Defensive Cyber Candidate</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Credential Issued</div>
                <div className="font-royal text-lg font-bold text-white">{credential.credential_title}</div>
                <div className="text-[11px] text-[#35E6B5]">{credential.course_title}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Registry Identifier</div>
                <div className="text-sm font-bold text-white tracking-widest">{credential.verification_id}</div>
                <div className="text-[10px] text-[#94A3B8]">Classification: {credential.credential_type || 'Professional Certification'}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Issuance & Validity</div>
                <div className="text-xs font-semibold text-white">
                  Issued: {credential.issue_date} • Expires: {credential.expiration_date}
                </div>
                <div className="text-[11px] text-[#65F58A] font-bold">Grade Achieved: {credential.grade_percentage}%</div>
              </div>
            </div>

            {/* Validated Competencies */}
            <div className="p-4 rounded-xl bg-[#1B2530]/40 border border-[#263440] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                Validated Operational Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(credential.skills_validated || [
                  'SOC Log Ingestion', 'MITRE ATT&CK Mapping', 'SIEM Threat Triage',
                  'Order of Volatility', 'Defensive Remediation'
                ]).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#101923] text-slate-300 font-mono text-[11px] border border-[#263440]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Digital Signature */}
            <div className="p-4 rounded-xl bg-black/60 border border-[#263440] font-mono text-[11px] space-y-1">
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Cryptographic Authority Signature
              </div>
              <div className="text-[#65F58A] break-all select-all font-mono">
                {credential.digital_signature}
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Issuer: RedKross Research Foundation • Academic Verification Registry
              </div>
            </div>
          </div>
        ) : hasSearched && !loading ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-[#F59E0B] mx-auto" />
            <h3 className="font-royal text-xl font-bold text-white">Credential Record Not Found</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              No matching credential was found for identifier <span className="text-white font-mono">{searchId}</span>. Please verify the ID on your printed diploma or submit a query to our support desk.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
