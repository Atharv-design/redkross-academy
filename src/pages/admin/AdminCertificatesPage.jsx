import React, { useState, useEffect } from 'react';
import {
  Award, Plus, Search, ShieldCheck, ShieldAlert, ExternalLink,
  Trash2, RefreshCw, Eye, CheckCircle2, Download, QrCode, FileText
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminCertificatesPage() {
  const [credentials, setCredentials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('registry'); // registry | template_designer
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedCred, setSelectedCred] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [manualIssueModalOpen, setManualIssueModalOpen] = useState(false);
  const [issueForm, setIssueForm] = useState({
    student_name: '',
    student_email: '',
    course_title: 'SOC Analyst L1 & L2 Defensive Operations',
    grade: '96%'
  });

  // Template Designer state with Merge Tags
  const [templateConfig, setTemplateConfig] = useState({
    signatory_name: 'Dr. Robert H. Vance, CISSP',
    signatory_title: 'Director of Cyber Defense Academics',
    institute_name: 'RedKross Defensive Cyber Academy',
    badge_label: 'OFFICIALLY VERIFIED SPECIALIST',
    show_qr: true
  });

  const loadCredentials = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.credentials) {
        setCredentials(db.credentials);
      }
    } catch (e) {
      console.error('Failed to load credentials:', e);
    }
  };

  useEffect(() => {
    loadCredentials();
  }, []);

  const handleRevokeCredential = () => {
    if (!selectedCred || !revokeReason) return;
    try {
      const db = mockEngine.getDb();
      db.credentials = db.credentials.map((c) =>
        c.id === selectedCred.id
          ? {
              ...c,
              revoked: true,
              revocation_reason: revokeReason,
              revoked_at: new Date().toISOString()
            }
          : c
      );
      mockEngine.saveDb(db);
      setCredentials(db.credentials);

      mockEngine.logAction({
        action: 'CREDENTIAL_REVOKED',
        category: 'STUDENT_ADMIN',
        details: `Revoked credential ${selectedCred.id} for ${selectedCred.student_name}. Reason: ${revokeReason}`,
        severity: 'CRITICAL'
      });

      setRevokeModalOpen(false);
      setSelectedCred(null);
      setRevokeReason('');
    } catch (e) {
      console.error(e);
    }
  };

  const handleManualIssue = (e) => {
    e.preventDefault();
    if (!issueForm.student_name || !issueForm.student_email) return;

    try {
      const db = mockEngine.getDb();
      const newCredId = 'RK-CERT-' + Math.floor(100000 + Math.random() * 900000);
      const newCred = {
        id: newCredId,
        student_name: issueForm.student_name,
        student_email: issueForm.student_email,
        course_title: issueForm.course_title,
        issued_at: new Date().toISOString().split('T')[0],
        grade: issueForm.grade || '95%',
        verification_hash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        revoked: false
      };

      db.credentials = [newCred, ...(db.credentials || [])];
      mockEngine.saveDb(db);
      setCredentials(db.credentials);

      mockEngine.logAction({
        action: 'CREDENTIAL_MANUAL_ISSUANCE',
        category: 'STUDENT_ADMIN',
        details: `Manually issued credential ${newCredId} to ${issueForm.student_name}`,
        severity: 'INFO'
      });

      setManualIssueModalOpen(false);
      setIssueForm({
        student_name: '',
        student_email: '',
        course_title: 'SOC Analyst L1 & L2 Defensive Operations',
        grade: '96%'
      });
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCredentials = credentials.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.id?.toLowerCase().includes(q) ||
      c.student_name?.toLowerCase().includes(q) ||
      c.course_title?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-[#0F1720] border border-[#1B2530] p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Credential ID, student or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#071018] border border-[#1B2530] text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          <div className="flex items-center space-x-1 bg-[#071018] border border-[#1B2530] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('registry')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                activeTab === 'registry'
                  ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              ISSUED REGISTRY ({credentials.length})
            </button>
            <button
              onClick={() => setActiveTab('template_designer')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                activeTab === 'template_designer'
                  ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                  : 'text-[#8BA2B5] hover:text-white'
              }`}
            >
              TEMPLATE & MERGE TAGS
            </button>
          </div>
        </div>

        <button
          onClick={() => setManualIssueModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Issue Certificate</span>
        </button>
      </div>

      {activeTab === 'registry' ? (
        /* Registry Table */
        <div className="bg-[#0F1720] border border-[#1B2530] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1B2530] bg-[#0A121A] text-[11px] font-mono text-[#8BA2B5]">
                <th className="p-3.5">CREDENTIAL ID</th>
                <th className="p-3.5">STUDENT RECIPIENT</th>
                <th className="p-3.5">CERTIFIED CURRICULUM</th>
                <th className="p-3.5">DATE ISSUED</th>
                <th className="p-3.5">VERIFICATION STATUS</th>
                <th className="p-3.5 text-right">OPERATIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
              {filteredCredentials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#8BA2B5] italic">
                    No issued certificates found in registry.
                  </td>
                </tr>
              ) : (
                filteredCredentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-[#071018]/50">
                    <td className="p-3.5 font-bold text-[#65F58A] flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-[#65F58A]" />
                      <span>{cred.id}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="text-white font-sans font-medium">{cred.student_name}</div>
                      <div className="text-[10px] text-[#8BA2B5]">{cred.student_email || 'Verified Student'}</div>
                    </td>
                    <td className="p-3.5 text-white max-w-xs truncate">{cred.course_title}</td>
                    <td className="p-3.5 text-[#8BA2B5]">{cred.issued_at}</td>
                    <td className="p-3.5">
                      {cred.revoked ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30">
                          <ShieldAlert className="w-3 h-3" />
                          <span>REVOKED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                          <ShieldCheck className="w-3 h-3" />
                          <span>VALID & ANCHORED</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={`/verify/${cred.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1B2530] text-[#CBD5E1] hover:text-[#65F58A] rounded border border-[#263440] text-[11px]"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Public Link</span>
                      </a>

                      {!cred.revoked && (
                        <button
                          onClick={() => {
                            setSelectedCred(cred);
                            setRevokeReason('');
                            setRevokeModalOpen(true);
                          }}
                          className="px-2.5 py-1 bg-[#1B2530] text-[#EF4444] hover:bg-[#EF4444]/20 rounded border border-[#263440] text-[11px]"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Template Designer & Merge Tags Preview */
        <div className="grid grid-cols-12 gap-6 min-h-[600px]">
          {/* Left Form: Signatory & Merge Tag Info */}
          <div className="col-span-5 bg-[#0F1720] border border-[#1B2530] rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-lora">Template Master Configuration</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Issuing Institution Name
                </label>
                <input
                  type="text"
                  value={templateConfig.institute_name}
                  onChange={(e) =>
                    setTemplateConfig({ ...templateConfig, institute_name: e.target.value })
                  }
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Authorized Signatory Name
                </label>
                <input
                  type="text"
                  value={templateConfig.signatory_name}
                  onChange={(e) =>
                    setTemplateConfig({ ...templateConfig, signatory_name: e.target.value })
                  }
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Signatory Title / Certification
                </label>
                <input
                  type="text"
                  value={templateConfig.signatory_title}
                  onChange={(e) =>
                    setTemplateConfig({ ...templateConfig, signatory_title: e.target.value })
                  }
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="p-3 bg-[#071018] border border-[#1B2530] rounded-lg">
                <span className="text-xs font-mono font-bold text-[#65F58A] block mb-2">
                  SUPPORTED DYNAMIC MERGE TAGS:
                </span>
                <ul className="text-[11px] font-mono text-[#8BA2B5] space-y-1">
                  <li>• <code className="text-[#38BDF8]">{'{{STUDENT_NAME}}'}</code> - Student Full Legal Name</li>
                  <li>• <code className="text-[#38BDF8]">{'{{COURSE_NAME}}'}</code> - Master Curriculum Title</li>
                  <li>• <code className="text-[#38BDF8]">{'{{COMPLETION_DATE}}'}</code> - Timestamp ISO Date</li>
                  <li>• <code className="text-[#38BDF8]">{'{{CREDENTIAL_ID}}'}</code> - Unique RK-CERT Identifier</li>
                  <li>• <code className="text-[#38BDF8]">{'{{VERIFY_URL}}'}</code> - Public Authenticity Destination</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Live Preview: High-Fidelity Certificate Canvas */}
          <div className="col-span-7 bg-[#071018] border border-[#1B2530] rounded-xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Ambient Watermark Border */}
            <div className="absolute inset-4 border-2 border-[#65F58A]/30 pointer-events-none rounded-lg" />
            <div className="absolute inset-6 border border-[#65F58A]/10 pointer-events-none rounded" />

            <div className="text-center relative z-10 pt-4">
              <span className="text-[10px] font-mono tracking-widest text-[#65F58A] uppercase">
                {templateConfig.institute_name}
              </span>
              <h2 className="text-2xl font-bold text-white font-lora mt-2">
                Certificate of Cyber Mastery
              </h2>
              <p className="text-xs text-[#8BA2B5] mt-1">This is officially presented to</p>

              <div className="text-xl font-bold text-[#65F58A] my-4 font-mono tracking-wide underline decoration-[#65F58A]/40 decoration-1 underline-offset-8">
                {'{{STUDENT_NAME}}'}
              </div>

              <p className="text-xs text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                For successfully fulfilling all rigorous operational requirements, proctored examinations, and offensive laboratory challenges in
              </p>

              <h4 className="text-base font-bold text-white font-lora mt-2 text-[#38BDF8]">
                {'{{COURSE_NAME}}'}
              </h4>
            </div>

            <div className="flex items-end justify-between relative z-10 pt-8 border-t border-[#1B2530] mt-8">
              <div className="text-left font-mono">
                <span className="text-[10px] text-[#8BA2B5] block">AUTHORIZED SIGNATORY</span>
                <span className="text-xs font-bold text-white block mt-1">{templateConfig.signatory_name}</span>
                <span className="text-[10px] text-[#8BA2B5]">{templateConfig.signatory_title}</span>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#0F1720] border border-[#1B2530] rounded flex items-center justify-center mx-auto mb-1">
                  <QrCode className="w-12 h-12 text-[#65F58A]" />
                </div>
                <span className="text-[9px] font-mono text-[#8BA2B5]">SCAN TO VERIFY</span>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-[#8BA2B5] block">ISSUED REGISTRY HASH</span>
                <span className="text-xs text-[#65F58A] font-bold block mt-1">{'{{CREDENTIAL_ID}}'}</span>
                <span className="text-[10px] text-[#8BA2B5]">{'{{COMPLETION_DATE}}'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revocation Reason Modal */}
      {revokeModalOpen && selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[480px] bg-[#0F1720] border border-[#1B2530] rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#EF4444] mb-2 font-lora">
              Revoke Issued Credential
            </h3>
            <p className="text-xs text-[#8BA2B5] mb-4">
              Revoking credential <strong className="text-white">{selectedCred.id}</strong> issued to{' '}
              <strong className="text-white">{selectedCred.student_name}</strong>. This immediately sets its public verification status to REVOKED.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Official Revocation Reason *
                </label>
                <select
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                >
                  <option value="">-- Select Audit Justification --</option>
                  <option value="Proctoring violation or unauthorized browser tampering">
                    Proctoring violation or unauthorized browser tampering
                  </option>
                  <option value="Plagiarism or code submission sharing">
                    Plagiarism or code submission sharing
                  </option>
                  <option value="Identity verification failure upon forensic audit">
                    Identity verification failure upon forensic audit
                  </option>
                  <option value="Administrative correction / reissue request">
                    Administrative correction / reissue request
                  </option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setRevokeModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  disabled={!revokeReason}
                  onClick={handleRevokeCredential}
                  className="px-4 py-1.5 bg-[#EF4444] text-white text-xs font-bold rounded hover:bg-[#dc2626] disabled:opacity-50"
                >
                  Confirm Revocation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Issuance Modal */}
      {manualIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[500px] bg-[#0F1720] border border-[#1B2530] rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 font-lora">
              Manual Certificate Issuance
            </h3>
            <form onSubmit={handleManualIssue} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={issueForm.student_name}
                  onChange={(e) => setIssueForm({ ...issueForm, student_name: e.target.value })}
                  placeholder="e.g. Maya Krishnan"
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Student Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={issueForm.student_email}
                  onChange={(e) => setIssueForm({ ...issueForm, student_email: e.target.value })}
                  placeholder="e.g. maya@cyber.org"
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Certified Master Course
                </label>
                <input
                  type="text"
                  value={issueForm.course_title}
                  onChange={(e) => setIssueForm({ ...issueForm, course_title: e.target.value })}
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Final Certified Grade / Honors
                </label>
                <input
                  type="text"
                  value={issueForm.grade}
                  onChange={(e) => setIssueForm({ ...issueForm, grade: e.target.value })}
                  className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  type="button"
                  onClick={() => setManualIssueModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Issue & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
