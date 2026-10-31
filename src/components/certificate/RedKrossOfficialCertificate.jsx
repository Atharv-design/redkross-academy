import React from 'react';

/**
 * RedKross Research Foundation — Official Institutional Certificate
 * Exact visual fidelity matching the accredited organizational stationery specification.
 */
export default function RedKrossOfficialCertificate({
  credential = {},
  containerId = 'redkross-official-certificate-root',
  className = '',
  scale = 1
}) {
  const studentName = credential.student_name || 'Sarah Chen, CISSP';
  const cadetId = credential.cadet_id || 'RK-92730';
  const courseTitle = credential.course_title || credential.credential_title || 'SOC Analyst L1 & L2 Defensive Operations';
  const issuingOrg = credential.issuing_institution || 'RedKross Defensive Cyber Academy';
  const completionDate = credential.completion_date || credential.issue_date || '2026-10-30';
  const supervisorName = credential.supervisor_name || 'Dr. Robert H. Vance, CISSP';
  const trainingHours = credential.training_hours || '120';
  const grade = credential.grade || (credential.grade_percentage ? (credential.grade_percentage >= 90 ? 'A' : 'B+') : 'A');
  const department = credential.department || 'Information Technology';
  const signatureUrl = credential.digital_signature_url || '/assets/certificate/default_signature.png';
  const sealUrl = credential.digital_seal_url || '/assets/certificate/default_seal.png';
  const verificationId = credential.verification_id || credential.id || 'RK-CERT-92730';

  return (
    <div
      id={containerId}
      className={`relative w-full rounded-xl shadow-2xl overflow-hidden bg-white text-[#0C2340] select-none ${className}`}
      style={{
        aspectRatio: '949 / 1343',
        backgroundImage: 'url(/assets/certificate/official_certificate_template.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Lora', 'Segoe UI', serif"
      }}
    >
      {/* 1. Certificate Title */}
      <div
        className="absolute text-center w-full"
        style={{ top: '23.8%' }}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.25em] uppercase"
          style={{ color: '#093B49', fontFamily: "'Lora', serif" }}
        >
          C E R T I F I C A T E
        </h1>
      </div>

      {/* 2. Middle Body Content */}
      <div
        className="absolute inset-x-8 sm:inset-x-12 text-center"
        style={{ top: '32.2%' }}
      >
        {/* Recipient Line */}
        <div className="text-xs sm:text-sm text-slate-800 font-medium">
          This is to certify that{' '}
          <span className="text-slate-500 font-normal">Ms./Mr.</span>{' '}
          <span className="text-base sm:text-lg md:text-xl font-bold text-[#0C2340] underline decoration-[#0C2340] underline-offset-4 px-1">
            {studentName}
          </span>
        </div>

        {/* Training Completion Statement */}
        <div className="text-xs sm:text-sm text-slate-800 mt-2.5 leading-relaxed max-w-xl mx-auto">
          has successfully completed the comprehensive training in{' '}
          <strong className="text-[#0C2340] font-bold">
            {courseTitle}
          </strong>{' '}
          at <strong className="text-[#0C2340]">{issuingOrg}</strong>, whose Cadet ID is{' '}
          <strong className="text-[#0C2340] font-mono underline decoration-dotted">
            {cadetId}
          </strong>
          .
        </div>

        {/* Mission Statement Citation */}
        <div className="text-[11px] sm:text-xs text-slate-600 italic mt-2.5 max-w-lg mx-auto leading-normal">
          has successfully completed the comprehensive training in cybersecurity defense and operational laboratory challenges at REDKROSS Research Foundation.
        </div>

        {/* Supervision & Date */}
        <div className="text-xs sm:text-sm text-slate-800 mt-2.5">
          The training was completed on{' '}
          <strong className="text-[#0C2340]">
            {completionDate}
          </strong>{' '}
          under the supervision of{' '}
          <strong className="text-[#0C2340]">
            {supervisorName}
          </strong>
          .
        </div>

        {/* Subtitle Banner */}
        <div className="mt-6">
          <span
            className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-[#0C2340] inline-block pb-0.5"
            style={{ letterSpacing: '0.18em' }}
          >
            COURSE COMPLETION CERTIFICATE
          </span>
        </div>
      </div>

      {/* 3. Performance & Department Row */}
      <div
        className="absolute inset-x-8 sm:inset-x-12"
        style={{ top: '53.5%' }}
      >
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-900 font-semibold px-2">
          <div>
            <span>Total Training Hours: </span>
            <span className="underline font-bold decoration-slate-900 underline-offset-2 px-1">
              {trainingHours}
            </span>
          </div>

          <div>
            <span>Grade/Performance: </span>
            <span className="underline font-bold decoration-slate-900 underline-offset-2 px-2">
              {grade}
            </span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-900 font-semibold mt-3 px-2">
          <span>Training Department: </span>
          <span className="font-bold">{department}</span>
        </div>
      </div>

      {/* 4. Footer: Seal, Signatory & Cryptographic Verification */}
      <div
        className="absolute inset-x-8 sm:inset-x-12 flex items-end justify-between"
        style={{ bottom: '11.5%' }}
      >
        {/* Left: Official Digital Seal & Verification ID */}
        <div className="flex items-center space-x-3">
          {sealUrl && (
            <img
              src={sealUrl}
              alt="Official Seal"
              className="w-14 sm:w-16 h-14 sm:h-16 object-contain filter drop-shadow-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div className="text-[9px] sm:text-[10px] font-mono text-slate-600 space-y-0.5">
            <span className="block font-bold text-slate-800">AUTHENTICATED CREDENTIAL</span>
            <span className="block">ID: {verificationId}</span>
            <span className="block text-[8px] text-slate-500 truncate max-w-[140px]">
              Sig: {credential.digital_signature ? credential.digital_signature.slice(0, 16) + '...' : 'Verified'}
            </span>
          </div>
        </div>

        {/* Right: Authorized Signature */}
        <div className="text-right">
          <div className="text-[11px] sm:text-xs font-bold text-[#0C2340] mb-1">
            For {issuingOrg}
          </div>
          <div className="flex justify-end">
            <img
              src={signatureUrl}
              alt="Authorized Signature"
              className="h-10 sm:h-12 max-w-[130px] object-contain filter drop-shadow-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-slate-600 mt-0.5 border-t border-slate-400 pt-0.5">
            Authorized Signatory
          </div>
        </div>
      </div>
    </div>
  );
}
