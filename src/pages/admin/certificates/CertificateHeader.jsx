import React from 'react';
import { FileBadge, Sparkles, Send, Award, CheckCircle, ExternalLink } from 'lucide-react';

export default function CertificateHeader({
  activeTab,
  setActiveTab,
  certRequestsCount,
  credentialsCount,
  dispatchSuccess
}) {
  return (
    <>
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 liquid-glass-panel p-5 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center">
            <FileBadge className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-royal flex items-center gap-2">
              <span>Official Certification Center</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/30">
                REDKROSS MASTER TEMPLATE
              </span>
            </h2>
            <p className="text-xs text-[#8BA2B5] font-mono">
              RedKross Research Foundation Accredited Credential Studio & Registry
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('template_designer')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'template_designer'
                ? 'liquid-glass-button shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                : 'liquid-glass-button-secondary'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>OFFICIAL CERTIFICATE STUDIO</span>
          </button>
          <button
            onClick={() => setActiveTab('pending_requests')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pending_requests'
                ? 'liquid-glass-button shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                : 'liquid-glass-button-secondary'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>PENDING REQUESTS ({certRequestsCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'registry'
                ? 'liquid-glass-button shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                : 'liquid-glass-button-secondary'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>REGISTRY ({credentialsCount})</span>
          </button>
        </div>
      </div>

      {/* Dispatch Success Alert Banner */}
      {dispatchSuccess && (
        <div className="p-4 rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/40 flex items-center justify-between animate-fadeIn text-xs font-mono liquid-glass-panel">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#FF7A00] flex-shrink-0" />
            <div>
              <span className="font-bold text-white">Certificate Successfully Dispatched!</span>
              <div className="text-[#8BA2B5] mt-0.5">
                Issued credential <strong className="text-[#FF7A00]">{dispatchSuccess.id}</strong> to{' '}
                <strong className="text-white">{dispatchSuccess.student_name}</strong> (Cadet ID:{' '}
                <span className="text-[#FFA439]">{dispatchSuccess.cadet_id}</span>). It is immediately active on their portal and verified publicly.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/verify/${dispatchSuccess.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl liquid-glass-button text-xs font-bold flex items-center gap-1.5"
            >
              <span>View Public Dossier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
