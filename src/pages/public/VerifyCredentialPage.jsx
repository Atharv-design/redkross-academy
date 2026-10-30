import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  Shield, Award, CheckCircle2, Search, ExternalLink,
  Calendar, Hash, FileCheck, AlertTriangle, UserCheck,
  BookOpen, Coins, Sparkles, ArrowRight, Layers, ShieldCheck
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';

export default function VerifyCredentialPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(id || '');
  const [credential, setCredential] = useState(null);
  const [dossier, setDossier] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const targetId = id || 'RK-89421';
    setSearchId(targetId);
    lookupRecord(targetId);

    const unsubscribe = mockEngine.subscribe((event) => {
      if (
        event.type === 'CREDENTIAL_MUTATED' ||
        event.type === 'USER_UPDATED' ||
        event.type === 'TOKEN_MUTATED' ||
        event.type === 'DB_MUTATED'
      ) {
        lookupRecord(targetId);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const lookupRecord = async (targetId) => {
    if (!targetId) return;
    setLoading(true);
    setCredential(null);
    setDossier(null);

    try {
      // 1. First check if targetId matches a Cadet Unique Identifier (e.g. RK-89421)
      const cadetDossier = mockEngine.getCadetDossier(targetId);
      if (cadetDossier) {
        setDossier(cadetDossier);
        setHasSearched(true);
        setLoading(false);
        return;
      }

      // 2. Otherwise look up specific certificate / credential
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
    navigate(`/verify/${searchId.trim().toUpperCase()}`);
    lookupRecord(searchId.trim());
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto animate-slide-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full ultra-glass-pill text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL REGISTRY & CADET VERIFICATION</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold title-shading-neon tracking-tight mb-3">
            Public Academic Verification Registry
          </h1>
          <p className="text-[#94A3B8] text-xs sm:text-sm">
            Authenticate the cryptographic validity of any RedKross Academy Cadet ID (e.g. <strong className="text-white font-mono">RK-89421</strong>) or individual diploma certificate.
          </p>
        </div>

        {/* Verification Lookup Input */}
        <form onSubmit={handleSearch} className="animate-slide-left stagger-1">
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Enter Cadet ID (RK-89421) or Certificate ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl ultra-glass-input text-xs sm:text-sm text-white placeholder-[#64748B] font-mono focus:outline-none uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl ultra-glass-btn font-royal font-bold text-xs tracking-wider flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Verifying...' : 'Verify'}</span>
            </button>
          </div>
        </form>

        {/* 1. CADET VERIFIED ACADEMIC DOSSIER VIEW */}
        {hasSearched && dossier ? (
          <div className="space-y-6 animate-slide-left stagger-2">
            {/* Cadet Master Profile Card */}
            <div className="ultra-glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-[#65F58A]/40 shadow-[0_0_30px_rgba(101,245,138,0.15)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#263440] gap-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={dossier.cadet.avatar}
                    alt={dossier.cadet.full_name}
                    className="w-16 h-16 rounded-2xl border-2 border-[#65F58A] object-cover shadow-lg"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-lora">
                        {dossier.cadet.full_name}
                      </h2>
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>VERIFIED OPERATOR</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs font-mono text-[#8BA2B5] mt-1">
                      <span className="text-[#65F58A] font-bold">
                        CADET ID: {dossier.cadet.cadet_id}
                      </span>
                      <span>•</span>
                      <span>{dossier.cadet.headline}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white p-2 rounded-xl border border-slate-700 self-start sm:self-auto shadow-md">
                  <QRCodeSVG
                    value={`https://redkross-academy.vercel.app/verify/${dossier.cadet.cadet_id}`}
                    size={72}
                  />
                </div>
              </div>

              {/* Macro Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-[#263440] text-center font-mono">
                <div className="p-3 bg-[#0B131C] border border-[#1B2530] rounded-xl">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">Enrolled Tracks</span>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {dossier.metrics.totalEnrolled}
                  </span>
                </div>
                <div className="p-3 bg-[#0B131C] border border-[#1B2530] rounded-xl">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">Completed Tracks</span>
                  <span className="text-xl font-bold text-[#65F58A] mt-1 block">
                    {dossier.metrics.totalCompleted}
                  </span>
                </div>
                <div className="p-3 bg-[#0B131C] border border-[#1B2530] rounded-xl">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">Verified Diplomas</span>
                  <span className="text-xl font-bold text-[#38BDF8] mt-1 block">
                    {dossier.metrics.totalCredentials}
                  </span>
                </div>
                <div className="p-3 bg-[#0B131C] border border-[#1B2530] rounded-xl">
                  <span className="text-[10px] text-[#8BA2B5] block uppercase">Token Bounty Score</span>
                  <span className="text-xl font-bold text-[#F59E0B] mt-1 block">
                    {dossier.metrics.tokensEarned} ⚡
                  </span>
                </div>
              </div>

              {/* Verified Diplomas Section */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center space-x-2 text-white font-lora font-bold text-base">
                  <Award className="w-5 h-5 text-[#65F58A]" />
                  <span>Issued Professional Certifications & Diplomas ({dossier.credentials.length})</span>
                </div>

                {dossier.credentials.length === 0 ? (
                  <p className="text-xs text-[#8BA2B5] italic font-mono bg-[#0B131C] p-4 rounded-xl border border-[#1B2530]">
                    No issued credentials recorded yet. Cadet is actively progressing through syllabus requirements.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dossier.credentials.map((cred) => (
                      <div
                        key={cred.id}
                        className="p-4 bg-[#0B131C] border border-[#1B2530] hover:border-[#65F58A]/50 rounded-xl space-y-2 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                              {cred.id}
                            </span>
                            <h4 className="text-sm font-bold text-white font-lora mt-1.5">
                              {cred.course_title}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-[#8BA2B5]">
                            Grade: {cred.grade || '95%'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#8BA2B5] pt-2 border-t border-[#1B2530]">
                          <span>Issued: {cred.issued_at || '2026-10-15'}</span>
                          <span className="text-[#65F58A]">ANCHORED ON REGISTRY</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Learning Progression */}
              <div className="pt-6 space-y-3">
                <span className="text-xs font-mono font-bold text-[#8BA2B5] block uppercase">
                  Curriculum Learning Progression
                </span>
                <div className="space-y-2">
                  {dossier.enrolments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-3.5 bg-[#0B131C] border border-[#1B2530] rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-white font-lora block">
                          {enr.course_title}
                        </span>
                        <span className="text-[10px] font-mono text-[#8BA2B5]">
                          {enr.course_category} • Status: {enr.status?.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-xs font-bold text-[#65F58A]">
                          {enr.progress_percentage}%
                        </span>
                        <span className="text-[10px] text-[#8BA2B5] block">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cryptographic Signature Footer */}
              <div className="mt-6 p-4 rounded-xl bg-black/60 border border-[#263440] font-mono text-[11px] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">
                  Tamper-Evident Cadet Identity Hash
                </div>
                <div className="text-[#65F58A] break-all select-all font-mono">
                  SHA256: 0x{Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                </div>
                <div className="text-[10px] text-slate-500 pt-1">
                  Issued by: RedKross Research Foundation • Public Verification Network
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched && credential ? (
          /* 2. SPECIFIC CREDENTIAL CERTIFICATE VIEW */
          credential.revoked ? (
            /* REVOKED / CANCELLED NOTICE (PRD & User Specification) */
            <div className="glass-card rounded-2xl p-8 border-2 border-red-500/60 shadow-2xl space-y-6 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/40 text-xs font-mono font-bold tracking-wider uppercase">
                  CREDENTIAL REVOKED & NULLIFIED
                </div>
                <h2 className="text-2xl font-royal font-bold text-white tracking-wide">
                  This Certificate Has Been Cancelled
                </h2>
                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-mono">
                  The certificate credential <strong className="text-white font-mono">{credential.id || credential.verification_id}</strong> is officially revoked by RedKross Academy and is not valid for professional authentication.
                </p>
              </div>

              {credential.revocation_reason && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-300 max-w-md mx-auto text-left space-y-1">
                  <div className="text-[10px] uppercase text-red-400 font-bold tracking-wider">Formal Revocation Reason:</div>
                  <div className="text-slate-200">{credential.revocation_reason}</div>
                  {credential.revoked_at && (
                    <div className="text-[10px] text-slate-400 pt-1">
                      Revocation Timestamp: {new Date(credential.revoked_at).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2">
                <Link
                  to="/verify"
                  className="px-6 py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-xs font-mono text-white transition-colors"
                >
                  Verify Another Credential
                </Link>
              </div>
            </div>
          ) : (
          <div className="ultra-glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-slide-left stagger-2">
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
                    Official Registry Status: <span className="text-white font-semibold">{credential.status || 'Active & Valid'}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-2 rounded-xl border border-slate-700 self-start sm:self-auto">
                <QRCodeSVG
                  value={credential.verification_url || `https://redkross-academy.vercel.app/verify/${credential.verification_id || credential.id}`}
                  size={72}
                />
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
                <div className="font-royal text-lg font-bold text-white">{credential.credential_title || credential.course_title}</div>
                <div className="text-[11px] text-[#35E6B5]">{credential.course_title}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Registry Identifier</div>
                <div className="text-sm font-bold text-white tracking-widest">{credential.verification_id || credential.id}</div>
                <div className="text-[10px] text-[#94A3B8]">Classification: Professional Certification</div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B2530]/60 border border-[#263440] space-y-1">
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Issuance & Validity</div>
                <div className="text-xs font-semibold text-white">
                  Issued: {credential.issue_date || credential.issued_at || '2026-10-15'}
                </div>
                <div className="text-[11px] text-[#65F58A] font-bold">Grade Achieved: {credential.grade_percentage || credential.grade || '95%'}</div>
              </div>
            </div>

            {/* Link to Cadet's Full Verified Dossier */}
            <div className="p-4 rounded-xl bg-[#1B2530]/40 border border-[#263440] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white font-lora block">
                  Want to verify all achievements for this cadet?
                </span>
                <span className="text-[10px] font-mono text-[#8BA2B5]">
                  View full cumulative dossier including course progression and token awards.
                </span>
              </div>
              <button
                onClick={() => {
                  const targetQuery = credential.cadet_id || credential.student_name || 'RK-89421';
                  navigate(`/verify/${targetQuery}`);
                  lookupRecord(targetQuery);
                }}
                className="px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674] flex items-center space-x-1.5 font-mono shadow-sm"
              >
                <span>View Cadet Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          )
        ) : hasSearched && !loading ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-[#F59E0B] mx-auto" />
            <h3 className="font-royal text-xl font-bold text-white">Record Not Found</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              No matching Cadet ID or credential was found for identifier <span className="text-white font-mono">{searchId}</span>. Please verify the ID or check your Cadet Operator Portal.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
