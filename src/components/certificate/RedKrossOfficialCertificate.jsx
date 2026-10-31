import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * RedKross Research Foundation — Authentic Institutional Certificate
 * 
 * High-craft, print-ready certificate rendered with crisp vector borders,
 * formal accredited typography, live cryptographic QR verification, and official seals.
 * Everything is embedded directly inside the document container (no disconnected background image).
 */
export default function RedKrossOfficialCertificate({
  credential = {},
  containerId = 'redkross-official-certificate-root',
  className = '',
  scale = 1
}) {
  const studentName = credential.student_name || 'Cadet Operator';
  const cadetId = credential.cadet_id || 'RK-45035';
  const courseTitle = credential.course_title || credential.credential_title || 'Defensive Cyber Operations & Network Defense';
  const issuingOrg = credential.issuing_institution || 'RedKross Defensive Cyber Academy';
  const completionDate = credential.completion_date || credential.issue_date || new Date().toISOString().split('T')[0];
  const supervisorName = credential.supervisor_name || 'Sarah Chen, CISSP';
  const supervisorTitle = credential.supervisor_title || 'Principal Incident Handler, RedKross Lab';
  const trainingHours = credential.training_hours || '18 Hours';
  const grade = credential.grade || (credential.grade_percentage ? `${credential.grade_percentage}% (Grade A)` : 'Grade A');
  const department = credential.department || 'Defensive Operations Directorate';
  const verificationId = credential.verification_id || credential.id || 'RK-CERT-2026-001';
  const verificationUrl = credential.verification_url || `https://academy.redkross.org.in/verify/${verificationId}`;
  const digitalSignature = credential.digital_signature || '0x7F9A2B4C8E1D3F5A6B7C8D9E0F1A2B3C4D5E6F7A';

  return (
    <div
      id={containerId}
      className={`relative w-full max-w-[840px] mx-auto bg-[#FDFBF7] text-[#0C2340] select-none shadow-2xl overflow-hidden ${className}`}
      style={{
        aspectRatio: '1 / 1.414', // Exact A4 Portrait Aspect Ratio
        fontFamily: "'Lora', 'Georgia', serif"
      }}
    >
      {/* ================= 1. ORNATE DOUBLE INSTITUTIONAL BORDERS ================= */}
      <div className="absolute inset-3 border-[5px] border-[#0C2340] pointer-events-none" />
      <div className="absolute inset-5 border-[1.5px] border-[#C5A059] pointer-events-none" />
      <div className="absolute inset-6 border-[0.5px] border-[#0C2340]/40 pointer-events-none" />

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

      {/* Corner Rosette Accents */}
      <div className="absolute top-[21px] left-[21px] w-2.5 h-2.5 bg-[#C5A059] rotate-45 pointer-events-none" />
      <div className="absolute top-[21px] right-[21px] w-2.5 h-2.5 bg-[#C5A059] rotate-45 pointer-events-none" />
      <div className="absolute bottom-[21px] left-[21px] w-2.5 h-2.5 bg-[#C5A059] rotate-45 pointer-events-none" />
      <div className="absolute bottom-[21px] right-[21px] w-2.5 h-2.5 bg-[#C5A059] rotate-45 pointer-events-none" />

      {/* ================= 2. CERTIFICATE INTERIOR CONTAINER ================= */}
      <div className="relative h-full flex flex-col justify-between px-10 py-10 sm:px-14 sm:py-12 text-center">

        {/* ----------------- TOP INSTITUTIONAL HEADER ----------------- */}
        <div className="space-y-2 pt-2">
          {/* Official Emblem / Crest */}
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] p-1 bg-white shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A059]" fill="currentColor">
                <path d="M50 5 L85 20 L85 55 C85 75 50 95 50 95 C50 95 15 75 15 55 L15 20 Z" fill="#0C2340" />
                <path d="M50 15 L75 27 L75 52 C75 67 50 82 50 82 C50 82 25 67 25 52 L25 27 Z" fill="#C5A059" opacity="0.9" />
                <path d="M50 25 L50 70 M35 45 L65 45" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="space-y-0.5">
            <h2
              className="text-lg sm:text-xl font-bold uppercase tracking-[0.2em] text-[#0C2340]"
              style={{ letterSpacing: '0.22em' }}
            >
              RedKross Research Foundation
            </h2>
            <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#79612F] uppercase">
              Initiate &bull; Innovate &bull; Impact
            </p>
            <p className="text-[9px] text-slate-500 font-sans tracking-wide">
              Govt. Registered Authority &bull; Section 8 License &bull; ISO 9001:2015 Accredited Institution
            </p>
          </div>

          <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-2" />
        </div>

        {/* ----------------- TITLE BANNER ----------------- */}
        <div className="my-1">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.25em] text-[#093B49]"
            style={{ letterSpacing: '0.28em' }}
          >
            C E R T I F I C A T E
          </h1>
          <p className="text-[10px] sm:text-xs font-serif italic text-slate-600 mt-1">
            of Operational Defense Excellence & Curriculum Mastery
          </p>
        </div>

        {/* ----------------- RECIPIENT BODY CONTENT ----------------- */}
        <div className="space-y-3.5 my-auto max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-700 font-serif">
            This is to solemnly certify that
          </p>

          {/* Student Name */}
          <div className="py-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0C2340] tracking-wide font-serif inline-block border-b-2 border-[#C5A059] pb-1 px-4">
              {studentName}
            </h3>
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
            bearing Cadet Registration ID{' '}
            <strong className="font-mono text-[#0C2340] font-bold px-1 py-0.5 bg-slate-100/80 rounded border border-slate-300">
              {cadetId}
            </strong>{' '}
            has successfully fulfilled all proctored technical benchmarks, continuous telemetry evaluations, and completed the accredited program in:
          </p>

          {/* Course Title */}
          <div className="py-1.5 px-3 bg-[#0C2340]/5 rounded-lg border border-[#0C2340]/15 inline-block w-full">
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#093B49] tracking-wide font-serif">
              {courseTitle}
            </h4>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-600 italic leading-snug">
            Demonstrating operational readiness across defensive cybersecurity tactics, perimeter hardening, and live proctored examination protocols at {issuingOrg}.
          </p>
        </div>

        {/* ----------------- ACCREDITATION METRICS GRID ----------------- */}
        <div className="my-2 py-2.5 px-4 bg-[#F5F2EB]/90 rounded-lg border border-[#C5A059]/40 max-w-lg mx-auto w-full">
          <div className="grid grid-cols-3 gap-2 text-center font-serif text-slate-800">
            <div className="border-r border-slate-300/80 pr-2">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans font-semibold">Training Hours</span>
              <span className="font-bold text-xs sm:text-sm text-[#0C2340]">{trainingHours}</span>
            </div>
            <div className="border-r border-slate-300/80 pr-2">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans font-semibold">Performance</span>
              <span className="font-bold text-xs sm:text-sm text-[#0C2340]">{grade}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans font-semibold">Issue Date</span>
              <span className="font-bold text-xs sm:text-sm text-[#0C2340]">{completionDate}</span>
            </div>
          </div>
        </div>

        {/* ----------------- FOOTER: SEAL, QR CODE & SIGNATURES ----------------- */}
        <div className="pt-2 border-t border-[#C5A059]/50 flex items-end justify-between gap-4 mt-auto">
          
          {/* Left: Official Gold Embossed Seal */}
          <div className="flex flex-col items-center text-center w-28 sm:w-32">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#C5A059] p-1 flex items-center justify-center bg-gradient-to-br from-[#FFF9E6] to-[#E6CA85] shadow-md">
              <div className="w-full h-full rounded-full border border-[#C5A059] flex flex-col items-center justify-center p-1 text-[7px] font-bold text-[#664D14] uppercase tracking-tighter leading-none text-center">
                <span>REDKROSS</span>
                <span className="text-[9px] my-0.5">&#9733; &#9733; &#9733;</span>
                <span>ACCREDITED</span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-700 mt-1 uppercase tracking-tight">
              Institutional Seal
            </span>
          </div>

          {/* Center: Live Scannable QR Code & Cryptographic Verification */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="bg-white p-1.5 rounded-lg border border-slate-300 shadow-sm">
              <QRCodeSVG
                value={verificationUrl}
                size={58}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-[9px] font-mono text-slate-600 leading-tight">
              <span className="block font-bold text-[#0C2340]">ID: {verificationId}</span>
              <span className="block text-[8px] text-slate-500 truncate max-w-[150px]">
                Sig: {digitalSignature.slice(0, 18)}...
              </span>
            </div>
          </div>

          {/* Right: Authorized Signatory */}
          <div className="flex flex-col items-center text-center w-36 sm:w-44">
            <div className="h-10 sm:h-12 flex items-end justify-center w-full">
              <svg viewBox="0 0 160 45" className="w-32 h-10 text-[#0C2340]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 35 C 30 15, 35 30, 50 18 C 65 6, 75 32, 90 20 C 105 8, 120 28, 140 15 C 145 12, 150 25, 155 22" />
                <path d="M25 38 C 45 35, 75 36, 110 34" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="w-full border-t border-slate-500/80 pt-1">
              <span className="block text-[11px] font-bold text-[#0C2340] font-serif leading-tight">
                {supervisorName}
              </span>
              <span className="block text-[9px] font-sans text-slate-600 tracking-tight leading-none mt-0.5">
                {supervisorTitle}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
