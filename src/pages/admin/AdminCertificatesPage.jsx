import React, { useState, useEffect, useRef } from 'react';
import {
  Award, Plus, Search, ShieldCheck, ShieldAlert, ExternalLink,
  Trash2, RefreshCw, Eye, CheckCircle2, Download, QrCode, FileText,
  UserCheck, Send, Check, Sparkles, Building2, Calendar, Clock,
  FileBadge, CheckCircle, ArrowRight, Upload, Image, X, RotateCcw,
  Sliders, Terminal
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminCertificatesPage() {
  const [credentials, setCredentials] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('template_designer'); // 'template_designer' | 'registry'
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedCred, setSelectedCred] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(null);

  const signatureInputRef = useRef(null);
  const sealInputRef = useRef(null);

  // Student search inside Studio
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  // Template Master Configuration state
  const [masterConfig, setMasterConfig] = useState({
    issuing_institution: 'RedKross Defensive Cyber Academy',
    authorized_signatory: 'Dr. Robert H. Vance, CISSP',
    signatory_title: 'Director of Cyber Defense Academics'
  });

  // Form state for Certificate Customization (based on RedKross Official Letter Template)
  const [studioForm, setStudioForm] = useState({
    student_name: 'Student Candidate',
    student_email: '',
    cadet_id: 'RK-89421',
    course_title: 'SOC Analyst L1 & L2 Defensive Operations',
    start_date: '15 MAY',
    completion_date: new Date().toISOString().split('T')[0],
    training_hours: '120',
    grade: 'A',
    department: 'Information Technology',
    supervisor_name: 'Dr. Robert H. Vance, CISSP',
    description: 'has successfully completed the comprehensive training in cybersecurity defense and operational laboratory challenges at REDKROSS Research Foundation.',
    digital_signature_url: null,
    digital_seal_url: null
  });

  const loadData = () => {
    try {
      const db = mockEngine.getDb();
      if (db) {
        if (db.credentials) setCredentials(db.credentials);
        if (db.users) {
          const studentList = db.users.filter((u) => u.role === 'student' || !u.role || u.role === 'cadet');
          setStudents(studentList);
          if (studentList.length > 0 && !selectedStudentId) {
            const first = studentList[0];
            setSelectedStudentId(first.id);
            setStudioForm((prev) => ({
              ...prev,
              student_name: first.full_name || first.name || 'Verified Cadet',
              student_email: first.email || '',
              cadet_id: first.cadet_id || 'RK-89421'
            }));
          }
        }
        if (db.courses) {
          setCourses(db.courses);
        }
      }
    } catch (e) {
      console.error('Failed to load certificate data:', e);
    }
  };

  useEffect(() => {
    loadData();

    const unsubscribe = mockEngine.subscribe((event) => {
      if (
        event.type === 'CREDENTIAL_MUTATED' ||
        event.type === 'DB_MUTATED' ||
        event.type === 'USER_REGISTERED'
      ) {
        loadData();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudentId(student.id);
    setStudioForm((prev) => ({
      ...prev,
      student_name: student.full_name || student.name || 'Student Candidate',
      student_email: student.email,
      cadet_id: student.cadet_id || 'RK-89421'
    }));

    try {
      const db = mockEngine.getDb();
      const studentEnrolment = (db.enrolments || []).find((e) => e.user_id === student.id);
      if (studentEnrolment) {
        const enrolledCourse = (db.courses || []).find((c) => c.id === studentEnrolment.course_id);
        if (enrolledCourse) {
          setStudioForm((prev) => ({ ...prev, course_title: enrolledCourse.title }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setStudioForm((prev) => ({
        ...prev,
        digital_signature_url: event.target?.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSealUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setStudioForm((prev) => ({
        ...prev,
        digital_seal_url: event.target?.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Resolves dynamic merge tags: {{STUDENT_NAME}}, {{COURSE_NAME}}, etc.
  const resolveDynamicTags = (text) => {
    if (!text) return '';
    return text
      .replace(/{{STUDENT_NAME}}/g, studioForm.student_name || 'Cadet Operator')
      .replace(/{{COURSE_NAME}}/g, studioForm.course_title || 'Defensive Cyber Operations')
      .replace(/{{COMPLETION_DATE}}/g, studioForm.completion_date || new Date().toISOString().split('T')[0])
      .replace(/{{CREDENTIAL_ID}}/g, 'RK-CERT-PENDING')
      .replace(/{{VERIFY_URL}}/g, `https://redkross.org.in/verify/${studioForm.cadet_id}`);
  };

  const handleDispatchCertificate = (e) => {
    e.preventDefault();
    if (!studioForm.student_name || !studioForm.student_email) {
      alert('Please provide student legal name and email.');
      return;
    }

    try {
      const db = mockEngine.getDb();
      const newCredId = 'RK-CERT-' + Math.floor(100000 + Math.random() * 900000);
      const verificationHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const newCredential = {
        id: newCredId,
        verification_id: newCredId,
        student_name: studioForm.student_name,
        student_email: studioForm.student_email,
        cadet_id: studioForm.cadet_id,
        course_title: studioForm.course_title,
        issued_at: studioForm.completion_date,
        completion_date: studioForm.completion_date,
        training_hours: studioForm.training_hours,
        grade: studioForm.grade,
        department: studioForm.department,
        description: resolveDynamicTags(studioForm.description),
        supervisor_name: masterConfig.authorized_signatory || studioForm.supervisor_name,
        issuing_institution: masterConfig.issuing_institution,
        signatory_title: masterConfig.signatory_title,
        digital_signature_url: studioForm.digital_signature_url || '/assets/certificate/default_signature.png',
        digital_seal_url: studioForm.digital_seal_url || '/assets/certificate/default_seal.png',
        verification_hash: verificationHash,
        cryptographic_hash: verificationHash,
        skills_validated: [
          'Defensive Security Operations',
          'Threat Hunting & Telemetry',
          'Tactical Incident Response'
        ],
        revoked: false
      };

      db.credentials = [newCredential, ...(db.credentials || [])];

      mockEngine.saveDb(db, {
        type: 'CREDENTIAL_MUTATED',
        payload: {
          credentialId: newCredId,
          cadetId: studioForm.cadet_id,
          studentEmail: studioForm.student_email,
          status: 'DISPATCHED'
        }
      });

      mockEngine.logAction({
        action: 'CREDENTIAL_DISPATCHED',
        category: 'STUDENT_ADMIN',
        details: `Dispatched official certificate ${newCredId} to ${studioForm.student_name} (${studioForm.cadet_id})`,
        severity: 'INFO'
      });

      setCredentials(db.credentials);
      setDispatchSuccess(newCredential);
      setTimeout(() => setDispatchSuccess(null), 8000);
    } catch (err) {
      console.error('Dispatch failed:', err);
      alert('Failed to dispatch certificate: ' + err.message);
    }
  };

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
      mockEngine.saveDb(db, {
        type: 'CREDENTIAL_MUTATED',
        payload: { credentialId: selectedCred.id, status: 'REVOKED' }
      });
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

  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (s.full_name || s.name || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.cadet_id || '').toLowerCase().includes(q)
    );
  });

  const filteredCredentials = credentials.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.id?.toLowerCase().includes(q) ||
      c.student_name?.toLowerCase().includes(q) ||
      c.cadet_id?.toLowerCase().includes(q) ||
      c.course_title?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 liquid-glass-panel p-5 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
            <FileBadge className="w-5 h-5 text-[#65F58A]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-royal flex items-center gap-2">
              <span>Official Certification Center</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
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
                ? 'liquid-glass-button shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                : 'liquid-glass-button-secondary'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>OFFICIAL CERTIFICATE STUDIO</span>
          </button>
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'registry'
                ? 'liquid-glass-button shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                : 'liquid-glass-button-secondary'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>REGISTRY ({credentials.length})</span>
          </button>
        </div>
      </div>

      {/* Dispatch Success Alert Banner */}
      {dispatchSuccess && (
        <div className="p-4 rounded-2xl bg-[#65F58A]/10 border border-[#65F58A]/40 flex items-center justify-between animate-fadeIn text-xs font-mono liquid-glass-panel">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#65F58A] flex-shrink-0" />
            <div>
              <span className="font-bold text-white">Certificate Successfully Dispatched!</span>
              <div className="text-[#8BA2B5] mt-0.5">
                Issued credential <strong className="text-[#65F58A]">{dispatchSuccess.id}</strong> to{' '}
                <strong className="text-white">{dispatchSuccess.student_name}</strong> (Cadet ID:{' '}
                <span className="text-[#35E6B5]">{dispatchSuccess.cadet_id}</span>). It is immediately active on their portal and verified publicly.
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

      {/* Main Tab Content */}
      {activeTab === 'registry' ? (
        /* Registry View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-80">
              <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search registry by ID, Cadet, Course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full liquid-glass-input rounded-xl pl-9 pr-4 py-2 text-xs"
              />
            </div>
            <button
              onClick={() => setActiveTab('template_designer')}
              className="liquid-glass-button px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Certificate</span>
            </button>
          </div>

          <div className="liquid-glass-panel rounded-2xl overflow-hidden border border-[#263440]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1B2530] text-[10px] font-mono text-[#8BA2B5] bg-[#071018]/50 uppercase tracking-wider">
                  <th className="p-3.5">CREDENTIAL ID</th>
                  <th className="p-3.5">RECIPIENT & CADET ID</th>
                  <th className="p-3.5">COURSE / CURRICULUM</th>
                  <th className="p-3.5">ISSUED DATE</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B2530] text-xs font-mono">
                {filteredCredentials.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-[#8BA2B5] italic">
                      No issued certificates match query. Dispatch one from the Official Certificate Studio!
                    </td>
                  </tr>
                ) : (
                  filteredCredentials.map((cred) => (
                    <tr key={cred.id} className="hover:bg-[#071018]/50 transition-colors">
                      <td className="p-3.5 font-bold text-[#65F58A]">
                        <div className="flex items-center space-x-1.5">
                          <Award className="w-4 h-4 text-[#65F58A]" />
                          <span>{cred.id}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white font-sans font-medium">{cred.student_name}</div>
                        <div className="text-[10px] text-[#8BA2B5] flex items-center gap-1.5 mt-0.5">
                          <span>{cred.student_email || 'Verified Candidate'}</span>
                          {cred.cadet_id && (
                            <span className="px-1.5 py-0.2 rounded bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 font-bold text-[9px]">
                              {cred.cadet_id}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-white max-w-xs truncate">{cred.course_title}</td>
                      <td className="p-3.5 text-[#8BA2B5]">{cred.completion_date || cred.issued_at}</td>
                      <td className="p-3.5">
                        {cred.revoked ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30">
                            <ShieldAlert className="w-3 h-3" />
                            <span>REVOKED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>VALID & VERIFIED</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <a
                          href={`/verify/${cred.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 px-2.5 py-1 liquid-glass-button-secondary rounded-lg text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Public Dossier</span>
                        </a>

                        {!cred.revoked && (
                          <button
                            onClick={() => {
                              setSelectedCred(cred);
                              setRevokeReason('');
                              setRevokeModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-red-950/40 text-[#EF4444] hover:bg-[#EF4444]/20 rounded-lg border border-red-500/30 text-[11px]"
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
        </div>
      ) : (
        /* OFFICIAL CERTIFICATE STUDIO */
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Template Master Config, Student Selector & Parameters */}
          <div className="col-span-12 xl:col-span-5 space-y-5">
            {/* 1. Template Master Configuration Card (Exact User Spec) */}
            <div className="liquid-glass-panel rounded-2xl p-5 space-y-4 border border-[#263440]">
              <div className="flex items-center justify-between pb-2 border-b border-[#263440]">
                <h3 className="font-royal text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#65F58A]" />
                  <span>Template Master Configuration</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                  Global Issuer Policy
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                  Issuing Institution Name
                </label>
                <input
                  type="text"
                  value={masterConfig.issuing_institution}
                  onChange={(e) => setMasterConfig({ ...masterConfig, issuing_institution: e.target.value })}
                  className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                  Authorized Signatory Name
                </label>
                <input
                  type="text"
                  value={masterConfig.authorized_signatory}
                  onChange={(e) => setMasterConfig({ ...masterConfig, authorized_signatory: e.target.value })}
                  className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                  Signatory Title / Certification
                </label>
                <input
                  type="text"
                  value={masterConfig.signatory_title}
                  onChange={(e) => setMasterConfig({ ...masterConfig, signatory_title: e.target.value })}
                  className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              {/* Supported Dynamic Merge Tags Infobox (Exact User Spec) */}
              <div className="p-3.5 rounded-xl bg-[#071018]/80 border border-[#263440] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#65F58A] uppercase tracking-wider block">
                  SUPPORTED DYNAMIC MERGE TAGS:
                </span>
                <ul className="text-[11px] font-mono text-[#8BA2B5] space-y-1">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#65F58A]">• &#123;&#123;STUDENT_NAME&#125;&#125;</span>
                    <span>- Student Full Legal Name</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#65F58A]">• &#123;&#123;COURSE_NAME&#125;&#125;</span>
                    <span>- Master Curriculum Title</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#65F58A]">• &#123;&#123;COMPLETION_DATE&#125;&#125;</span>
                    <span>- Timestamp ISO Date</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#65F58A]">• &#123;&#123;CREDENTIAL_ID&#125;&#125;</span>
                    <span>- Unique RK-CERT Identifier</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#65F58A]">• &#123;&#123;VERIFY_URL&#125;&#125;</span>
                    <span>- Public Authenticity Destination</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Student Search & Quick Selection Box */}
            <div className="liquid-glass-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-[#65F58A] uppercase flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#65F58A]" />
                  <span>Select Cadet (Live Search)</span>
                </label>
                <span className="text-[10px] font-mono text-[#8BA2B5]">
                  {filteredStudents.length} candidates
                </span>
              </div>

              {/* Search Filter for Student Name / Cadet ID */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student name, email, or RK-XXXXX..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full liquid-glass-input rounded-xl pl-9 pr-3 py-2 text-xs"
                />
              </div>

              {/* Quick Select Student List */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-4 text-xs font-mono text-[#8BA2B5] italic">
                    No matching cadets found
                  </div>
                ) : (
                  filteredStudents.map((st) => {
                    const isSelected = selectedStudentId === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleSelectStudent(st)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#65F58A]/15 border border-[#65F58A]/40 text-white shadow-sm'
                            : 'liquid-glass-card hover:border-[#65F58A]/30 text-[#CBD5E1]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-7 h-7 rounded-full bg-[#1B2530] border border-[#263440] flex items-center justify-center text-xs font-mono font-bold text-[#65F58A] flex-shrink-0">
                            {(st.full_name || st.name || 'S').charAt(0)}
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold truncate">
                              {st.full_name || st.name}
                            </div>
                            <div className="text-[10px] text-[#8BA2B5] font-mono truncate">
                              {st.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                            {st.cadet_id || 'RK-89421'}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#65F58A]" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* 3. Certificate Content & Middle Section Controls */}
            <form onSubmit={handleDispatchCertificate} className="liquid-glass-panel rounded-2xl p-5 space-y-4">
              <label className="text-xs font-mono font-bold text-[#35E6B5] uppercase flex items-center gap-2">
                <FileBadge className="w-4 h-4 text-[#35E6B5]" />
                <span>Certificate Text & Parameters</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                    Student Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studioForm.student_name}
                    onChange={(e) => setStudioForm({ ...studioForm, student_name: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                    Cadet Identity ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={studioForm.cadet_id}
                    onChange={(e) => setStudioForm({ ...studioForm, cadet_id: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-[#65F58A] font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                  Candidate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={studioForm.student_email}
                  onChange={(e) => setStudioForm({ ...studioForm, student_email: e.target.value })}
                  className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
                  Course / Training Curriculum Title *
                </label>
                {courses.length > 0 ? (
                  <select
                    value={studioForm.course_title}
                    onChange={(e) => setStudioForm({ ...studioForm, course_title: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title} className="bg-[#101923] text-white">
                        {c.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={studioForm.course_title}
                    onChange={(e) => setStudioForm({ ...studioForm, course_title: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white"
                  />
                )}
              </div>

              {/* Middle Section Custom Description */}
              <div>
                <label className="text-[11px] font-mono text-[#65F58A] font-bold block mb-1 flex items-center justify-between">
                  <span>Middle Section Citation Description *</span>
                  <span className="text-[10px] text-[#8BA2B5] font-normal">Supports Dynamic Tags</span>
                </label>
                <textarea
                  rows={2}
                  value={studioForm.description}
                  onChange={(e) => setStudioForm({ ...studioForm, description: e.target.value })}
                  placeholder="e.g. {{STUDENT_NAME}} has successfully completed {{COURSE_NAME}}..."
                  className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white focus:border-[#65F58A] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Performance & Dates */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">Hours</label>
                  <input
                    type="text"
                    value={studioForm.training_hours}
                    onChange={(e) => setStudioForm({ ...studioForm, training_hours: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">Grade</label>
                  <input
                    type="text"
                    value={studioForm.grade}
                    onChange={(e) => setStudioForm({ ...studioForm, grade: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">Date</label>
                  <input
                    type="date"
                    value={studioForm.completion_date}
                    onChange={(e) => setStudioForm({ ...studioForm, completion_date: e.target.value })}
                    className="w-full liquid-glass-input rounded-xl p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* 4. Digital Seal & Signature Uploaders */}
              <div className="pt-3 border-t border-[#1B2530] space-y-3">
                <label className="text-xs font-mono font-bold text-[#65F58A] uppercase flex items-center justify-between">
                  <span>Digital Seal & Digital Signature Uploads</span>
                  <span className="text-[10px] text-[#8BA2B5] font-normal">PNG / JPG / SVG</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {/* Digital Seal / Stamp Upload */}
                  <div className="liquid-glass-card rounded-xl p-3 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-white font-bold mb-1 flex items-center justify-between">
                        <span>Official Seal</span>
                        {studioForm.digital_seal_url && (
                          <button
                            type="button"
                            onClick={() => setStudioForm({ ...studioForm, digital_seal_url: null })}
                            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8BA2B5]">
                        {studioForm.digital_seal_url ? 'Custom seal uploaded' : 'Official Director Stamp active'}
                      </p>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={studioForm.digital_seal_url || '/assets/certificate/default_seal.png'}
                          alt="Seal preview"
                          className="w-10 h-10 object-contain rounded bg-white/90 p-0.5 border border-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => sealInputRef.current?.click()}
                          className="px-2.5 py-1 text-[10px] font-mono liquid-glass-button-secondary rounded-lg flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload New</span>
                        </button>
                      </div>
                      <input
                        ref={sealInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleSealUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Digital Signature Upload */}
                  <div className="liquid-glass-card rounded-xl p-3 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-white font-bold mb-1 flex items-center justify-between">
                        <span>Digital Signature</span>
                        {studioForm.digital_signature_url && (
                          <button
                            type="button"
                            onClick={() => setStudioForm({ ...studioForm, digital_signature_url: null })}
                            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8BA2B5]">
                        {studioForm.digital_signature_url ? 'Custom signature active' : 'Official signature active'}
                      </p>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={studioForm.digital_signature_url || '/assets/certificate/default_signature.png'}
                          alt="Signature preview"
                          className="h-8 max-w-[80px] object-contain rounded bg-white/90 p-0.5 border border-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => signatureInputRef.current?.click()}
                          className="px-2.5 py-1 text-[10px] font-mono liquid-glass-button-secondary rounded-lg flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload New</span>
                        </button>
                      </div>
                      <input
                        ref={signatureInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Action CTA: Dispatch Certificate to Student */}
              <div className="pt-4 border-t border-[#1B2530]">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl liquid-glass-button font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(101,245,138,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH OFFICIAL CERTIFICATE TO STUDENT</span>
                </button>
                <p className="text-[10px] font-mono text-[#8BA2B5] text-center mt-2">
                  Anchors verified credential in ledger. Student immediately sees it on dashboard & public dossier.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Authentic RedKross Official Letterhead Certificate Canvas */}
          <div className="col-span-12 xl:col-span-7 sticky top-4">
            <div className="liquid-glass-panel rounded-2xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[11px] font-mono text-[#65F58A] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-pulse" />
                  <span>AUTHENTIC REDKROSS CERTIFICATE (LIVE HIGH-RES PREVIEW)</span>
                </span>
                <span className="text-[10px] font-mono text-[#8BA2B5]">
                  OFFICIAL LETTERHEAD SPEC
                </span>
              </div>

              {/* Exact High-Fidelity Canvas Using Official Stationery Template */}
              <div
                className="relative w-full rounded-xl shadow-2xl overflow-hidden bg-white text-[#0C2340] select-none"
                style={{
                  aspectRatio: '949 / 1343',
                  backgroundImage: 'url(/assets/certificate/official_certificate_template.png)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
              >
                {/* 1. Dynamic Title "CERTIFICATE" */}
                <div
                  className="absolute text-center w-full"
                  style={{ top: '23.8%' }}
                >
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.25em] uppercase"
                    style={{ color: '#093B49', fontFamily: "'Trebuchet MS', sans-serif" }}
                  >
                    CERTIFICATE
                  </h1>
                </div>

                {/* 2. Middle Body Text Section */}
                <div
                  className="absolute inset-x-8 sm:inset-x-12 text-center"
                  style={{ top: '32.5%' }}
                >
                  {/* Recipient Line */}
                  <div className="text-xs sm:text-sm text-slate-800 font-medium">
                    This is to certify that{' '}
                    <span className="text-slate-500 font-normal">Ms./Mr.</span>{' '}
                    <span className="text-base sm:text-lg md:text-xl font-bold text-[#0C2340] underline decoration-[#0C2340]/40 underline-offset-4 px-1">
                      {studioForm.student_name}
                    </span>
                  </div>

                  {/* Training Completion Statement */}
                  <div className="text-xs sm:text-sm text-slate-800 mt-2 leading-relaxed max-w-xl mx-auto">
                    has successfully completed the comprehensive training in{' '}
                    <strong className="text-[#0C2340] font-bold">
                      {studioForm.course_title}
                    </strong>{' '}
                    at <strong className="text-[#0C2340]">{masterConfig.issuing_institution}</strong>, whose Cadet ID is{' '}
                    <strong className="text-[#0C2340] font-mono underline decoration-dotted">
                      {studioForm.cadet_id || 'RK-89421'}
                    </strong>
                    .
                  </div>

                  {/* Customizable Middle Description Citation with dynamic tags */}
                  <div className="text-[11px] sm:text-xs text-slate-600 italic mt-2.5 max-w-lg mx-auto leading-normal">
                    {resolveDynamicTags(studioForm.description)}
                  </div>

                  {/* Supervision & Dates */}
                  <div className="text-xs sm:text-sm text-slate-800 mt-2.5">
                    The training was completed on{' '}
                    <strong className="text-[#0C2340]">
                      {studioForm.completion_date}
                    </strong>{' '}
                    under the supervision of{' '}
                    <strong className="text-[#0C2340]">
                      {masterConfig.authorized_signatory || studioForm.supervisor_name}
                    </strong>
                    .
                  </div>

                  {/* Subtitle Banner */}
                  <div className="mt-5">
                    <span
                      className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-[#0C2340] inline-block pb-0.5"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      COURSE COMPLETION CERTIFICATE
                    </span>
                  </div>
                </div>

                {/* 3. Metrics Row (Training Hours, Grade, Department) */}
                <div
                  className="absolute inset-x-8 sm:inset-x-12"
                  style={{ top: '53.5%' }}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-900 font-semibold px-2">
                    <div>
                      <span>Total Training Hours: </span>
                      <span className="underline font-bold decoration-slate-900 underline-offset-2 px-1">
                        {studioForm.training_hours}
                      </span>
                    </div>

                    <div>
                      <span>Grade/Performance: </span>
                      <span className="underline font-bold decoration-slate-900 underline-offset-2 px-2">
                        {studioForm.grade}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-900 font-semibold mt-4 px-2">
                    <span>Training Department: </span>
                    <span className="font-bold text-[#0C2340]">
                      {studioForm.department}
                    </span>
                  </div>
                </div>

                {/* 4. Signatory Block & Official Stamp */}
                <div
                  className="absolute right-8 sm:right-14 text-right"
                  style={{ top: '61.5%' }}
                >
                  <div className="text-sm sm:text-base font-bold text-[#0C2340]">
                    For {masterConfig.issuing_institution}
                  </div>

                  {/* Container for Overlapping Stamp and Signature */}
                  <div className="relative h-16 sm:h-20 w-44 sm:w-52 mt-1 ml-auto">
                    {/* Stamp */}
                    <img
                      src={studioForm.digital_seal_url || '/assets/certificate/default_seal.png'}
                      alt="Official Seal"
                      className="absolute right-12 top-0 h-16 sm:h-20 w-16 sm:w-20 object-contain opacity-90 transform -rotate-6 pointer-events-none"
                    />

                    {/* Signature */}
                    <img
                      src={studioForm.digital_signature_url || '/assets/certificate/default_signature.png'}
                      alt="Authorized Signature"
                      className="absolute right-2 top-2 h-12 sm:h-16 w-36 sm:w-44 object-contain pointer-events-none"
                    />
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-[#0C2340] mt-1">
                    {masterConfig.authorized_signatory}
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono">
                    {masterConfig.signatory_title}
                  </div>
                </div>

                {/* 5. Micro Reference at bottom for Live QR & Verification */}
                <div
                  className="absolute left-8 bottom-14 text-[8px] sm:text-[9px] font-mono text-slate-400"
                >
                  REF: RK-CERT-PREVIEW • ANCHORED
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revocation Modal */}
      {revokeModalOpen && selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
          <div className="w-[480px] liquid-glass-panel rounded-2xl p-6 shadow-2xl space-y-4 border border-red-500/40">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Confirm Credential Revocation</h3>
                <p className="text-xs text-slate-400 font-mono">Revoke cryptographic validity in public registry</p>
              </div>
            </div>

            <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-xl text-xs font-mono space-y-1">
              <div><span className="text-slate-400">ID:</span> <span className="text-white font-bold">{selectedCred.id}</span></div>
              <div><span className="text-slate-400">Recipient:</span> <span className="text-white">{selectedCred.student_name}</span></div>
              <div><span className="text-slate-400">Curriculum:</span> <span className="text-white">{selectedCred.course_title}</span></div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5 font-bold">
                Mandatory Reason for Revocation *
              </label>
              <textarea
                rows={3}
                required
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Specify institutional reason (e.g. academic integrity violation, identity misattribution)..."
                className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRevokeModalOpen(false);
                  setSelectedCred(null);
                }}
                className="px-4 py-2 text-xs font-mono liquid-glass-button-secondary rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!revokeReason.trim()}
                onClick={handleRevokeCredential}
                className="px-4 py-2 text-xs font-mono font-bold bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl shadow-lg transition-colors"
              >
                Permanently Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
