import React, { useState, useEffect, useRef } from 'react';
import { mockEngine } from '../../../services/db/mockEngine';
import { apiClient } from '../../../services/apiClient';
import { socketClient } from '../../../services/socket/socketClient';
import RedKrossOfficialCertificate from '../../../components/certificate/RedKrossOfficialCertificate';
import { downloadCertificatePdf } from '../../../utils/pdfGenerator';

import CertificateHeader from './CertificateHeader';
import CertificateStudioTab from './CertificateStudioTab';
import CertificatePendingTab from './CertificatePendingTab';
import CertificateRegistryTab from './CertificateRegistryTab';
import RevocationModal from './RevocationModal';

const safeLogAction = (entry) => {
  try {
    if (typeof mockEngine?.logAction === 'function') {
      mockEngine.logAction(entry);
    } else {
      const db = mockEngine.getDb ? mockEngine.getDb() : null;
      if (db) {
        if (!db.audit_logs) db.audit_logs = [];
        db.audit_logs.unshift({
          id: `aud_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString(),
          ...entry
        });
        mockEngine.saveDb(db);
      }
    }
  } catch (err) {
    console.warn('safeLogAction warning:', err);
  }
};

export default function AdminCertificatesPage() {
  const [credentials, setCredentials] = useState([]);
  const [certRequests, setCertRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('template_designer');
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedCred, setSelectedCred] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [selectedExportCred, setSelectedExportCred] = useState(null);

  const signatureInputRef = useRef(null);
  const sealInputRef = useRef(null);

  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const [masterConfig, setMasterConfig] = useState({
    issuing_institution: 'RedKross Defensive Cyber Academy',
    authorized_signatory: 'Dr. Robert H. Vance, CISSP',
    signatory_title: 'Director of Cyber Defense Academics'
  });

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

  const loadData = async () => {
    try {
      let serverRequests = [];
      try {
        serverRequests = await apiClient.getCertificateRequests();
      } catch (apiErr) {
        console.warn('API getCertificateRequests fallback:', apiErr);
      }

      const db = mockEngine.getDb();
      if (db) {
        if (db.credentials) setCredentials(db.credentials);
        const resolvedRequests = (serverRequests && serverRequests.length > 0) ? serverRequests : (db.certificate_requests || []);
        setCertRequests(resolvedRequests);
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

    const unsubCertReq = socketClient.on('certificate:requested', loadData);
    const unsubCertDisp = socketClient.on('certificate:dispatched', loadData);

    const unsubscribe = mockEngine.subscribe((event) => {
      if (
        event.type === 'CREDENTIAL_MUTATED' ||
        event.type === 'DB_MUTATED' ||
        event.type === 'USER_REGISTERED'
      ) {
        loadData();
      }
    });

    return () => {
      if (typeof unsubCertReq === 'function') unsubCertReq();
      if (typeof unsubCertDisp === 'function') unsubCertDisp();
      unsubscribe();
    };
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

      apiClient.dispatchCertificate({
        id: newCredId,
        verification_id: newCredId,
        user_id: selectedStudentId || studioForm.cadet_id,
        course_id: studioForm.course_title,
        credential_title: studioForm.course_title,
        grade_percentage: 95
      }).catch(console.warn);

      socketClient.emit('certificate:dispatched', {
        credentialId: newCredId,
        verificationId: newCredId,
        cadetId: studioForm.cadet_id,
        studentEmail: studioForm.student_email,
        courseTitle: studioForm.course_title
      });

      safeLogAction({
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

  const handleApproveRequest = (req) => {
    try {
      const db = mockEngine.getDb();
      const newCredId = 'RK-CERT-' + Math.floor(100000 + Math.random() * 900000);
      const verificationHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const newCredential = {
        id: newCredId,
        verification_id: newCredId,
        student_name: req.student_name || req.cadet_name || 'Cadet Operator',
        student_email: req.student_email || `${req.cadet_id?.toLowerCase() || 'cadet'}@redkross.org.in`,
        cadet_id: req.cadet_id || 'RK-89421',
        course_title: req.course_title || 'SOC Analyst L1 & L2 Defensive Operations',
        issued_at: new Date().toISOString().split('T')[0],
        completion_date: new Date().toISOString().split('T')[0],
        training_hours: '120',
        grade: req.score ? (req.score >= 90 ? 'A+' : 'A') : 'A',
        department: 'Defensive Security Operations',
        description: `has demonstrated operational excellence and successfully completed the comprehensive certification requirements for ${req.course_title || 'Defensive Cyber Operations'}.`,
        supervisor_name: masterConfig.authorized_signatory || 'Dr. Robert H. Vance, CISSP',
        issuing_institution: masterConfig.issuing_institution || 'RedKross Defensive Cyber Academy',
        signatory_title: masterConfig.signatory_title || 'Director of Cyber Defense Academics',
        digital_signature_url: '/assets/certificate/default_signature.png',
        digital_seal_url: '/assets/certificate/default_seal.png',
        verification_hash: verificationHash,
        cryptographic_hash: verificationHash,
        skills_validated: [
          'SOC Operations & Log Ingestion',
          'MITRE ATT&CK Behavioral Mapping',
          'SIEM Correlation & Threat Triage'
        ],
        revoked: false
      };

      db.credentials = [newCredential, ...(db.credentials || [])];

      if (db.certificate_requests) {
        db.certificate_requests = db.certificate_requests.map((r) =>
          r.id === req.id ? { ...r, status: 'approved', credential_id: newCredId, dispatched_at: new Date().toISOString() } : r
        );
      }

      mockEngine.saveDb(db, {
        type: 'CREDENTIAL_MUTATED',
        payload: {
          credentialId: newCredId,
          cadetId: newCredential.cadet_id,
          status: 'DISPATCHED'
        }
      });

      apiClient.dispatchCertificate({
        id: newCredId,
        verification_id: newCredId,
        user_id: req.user_id || req.cadet_id,
        course_id: req.course_id || req.course_title,
        credential_title: req.course_title,
        grade_percentage: req.score || 90
      }).catch(console.warn);

      socketClient.emit('certificate:dispatched', {
        credentialId: newCredId,
        verificationId: newCredId,
        cadetId: newCredential.cadet_id,
        courseTitle: newCredential.course_title
      });

      safeLogAction({
        action: 'CREDENTIAL_DISPATCHED',
        category: 'STUDENT_ADMIN',
        details: `Approved & dispatched official certificate ${newCredId} to ${newCredential.student_name} (${newCredential.cadet_id})`,
        severity: 'INFO'
      });

      loadData();
      setDispatchSuccess(newCredential);
      setTimeout(() => setDispatchSuccess(null), 8000);
    } catch (e) {
      alert('Failed to approve request: ' + e.message);
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

      safeLogAction({
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

  const handleDownloadPreviewPdf = async () => {
    try {
      setExportingPdf(true);
      const filename = `RedKross_Certificate_Preview_${studioForm.cadet_id || 'RK'}.pdf`;
      await downloadCertificatePdf('admin-certificate-preview-canvas', filename);
    } catch (err) {
      console.error('Failed to export preview PDF:', err);
      alert('Unable to export certificate PDF. Please check your browser print settings.');
    } finally {
      setExportingPdf(false);
    }
  };

  const handleDownloadRegistryPdf = async (cred) => {
    try {
      setExportingPdf(true);
      setSelectedExportCred(cred);
      await new Promise((res) => setTimeout(res, 350));
      const filename = `RedKross_Certificate_${cred.cadet_id || 'RK'}_${cred.id}.pdf`;
      await downloadCertificatePdf('admin-registry-export-element', filename);
    } catch (err) {
      console.error('Failed to export registry PDF:', err);
      alert('Unable to export certificate PDF.');
    } finally {
      setExportingPdf(false);
      setSelectedExportCred(null);
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
      <CertificateHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        certRequestsCount={certRequests.filter((r) => r.status === 'pending_review' || r.status === 'PENDING').length}
        credentialsCount={credentials.length}
        dispatchSuccess={dispatchSuccess}
      />

      {activeTab === 'template_designer' && (
        <CertificateStudioTab
          masterConfig={masterConfig}
          setMasterConfig={setMasterConfig}
          filteredStudents={filteredStudents}
          studentSearch={studentSearch}
          setStudentSearch={setStudentSearch}
          selectedStudentId={selectedStudentId}
          handleSelectStudent={handleSelectStudent}
          studioForm={studioForm}
          setStudioForm={setStudioForm}
          courses={courses}
          resolveDynamicTags={resolveDynamicTags}
          sealInputRef={sealInputRef}
          signatureInputRef={signatureInputRef}
          handleSealUpload={handleSealUpload}
          handleSignatureUpload={handleSignatureUpload}
          handleDispatchCertificate={handleDispatchCertificate}
          exportingPdf={exportingPdf}
          handleDownloadPreviewPdf={handleDownloadPreviewPdf}
        />
      )}

      {activeTab === 'pending_requests' && (
        <CertificatePendingTab
          certRequests={certRequests}
          onApproveRequest={handleApproveRequest}
        />
      )}

      {activeTab === 'registry' && (
        <CertificateRegistryTab
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDesigner={() => setActiveTab('template_designer')}
          filteredCredentials={filteredCredentials}
          exportingPdf={exportingPdf}
          onDownloadRegistryPdf={handleDownloadRegistryPdf}
          onOpenRevokeModal={(cred) => {
            setSelectedCred(cred);
            setRevokeModalOpen(true);
          }}
        />
      )}

      <RevocationModal
        isOpen={revokeModalOpen}
        selectedCred={selectedCred}
        revokeReason={revokeReason}
        setRevokeReason={setRevokeReason}
        onClose={() => {
          setRevokeModalOpen(false);
          setSelectedCred(null);
          setRevokeReason('');
        }}
        onConfirm={handleRevokeCredential}
      />

      {selectedExportCred && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: '-9999px',
            top: '0px',
            width: '949px',
            height: '1343px',
            zIndex: -9999,
            pointerEvents: 'none'
          }}
        >
          <RedKrossOfficialCertificate
            credential={selectedExportCred}
            containerId="admin-registry-export-element"
          />
        </div>
      )}
    </div>
  );
}
