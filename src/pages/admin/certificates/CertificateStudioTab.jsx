import React from 'react';
import {
  Building2,
  UserCheck,
  Search,
  Check,
  FileBadge,
  RotateCcw,
  Upload,
  Send,
  Loader2,
  Download
} from 'lucide-react';

export default function CertificateStudioTab({
  masterConfig,
  setMasterConfig,
  filteredStudents,
  studentSearch,
  setStudentSearch,
  selectedStudentId,
  handleSelectStudent,
  studioForm,
  setStudioForm,
  courses,
  resolveDynamicTags,
  sealInputRef,
  signatureInputRef,
  handleSealUpload,
  handleSignatureUpload,
  handleDispatchCertificate,
  exportingPdf,
  handleDownloadPreviewPdf
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column: Interactive Template Builder Controls */}
      <div className="col-span-12 xl:col-span-5 space-y-5">
        {/* 1. Master Template Settings Card */}
        <div className="liquid-glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1B2530] pb-3">
            <span className="text-xs font-mono font-bold text-[#FF7A00] uppercase flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF7A00]" />
              <span>Master Institutional Configuration</span>
            </span>
            <span className="text-[10px] font-mono text-[#8BA2B5]">
              Universal Across All Courses
            </span>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#8BA2B5] block mb-1">
              Issuing Organization / Academy Title
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

          {/* Supported Dynamic Merge Tags Infobox */}
          <div className="p-3.5 rounded-xl bg-[#071018]/80 border border-[#263440] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#FF7A00] uppercase tracking-wider block">
              SUPPORTED DYNAMIC MERGE TAGS:
            </span>
            <ul className="text-[11px] font-mono text-[#8BA2B5] space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="text-[#FF7A00]">• &#123;&#123;STUDENT_NAME&#125;&#125;</span>
                <span>- Student Full Legal Name</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#FF7A00]">• &#123;&#123;COURSE_NAME&#125;&#125;</span>
                <span>- Master Curriculum Title</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#FF7A00]">• &#123;&#123;COMPLETION_DATE&#125;&#125;</span>
                <span>- Timestamp ISO Date</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#FF7A00]">• &#123;&#123;CREDENTIAL_ID&#125;&#125;</span>
                <span>- Unique RK-CERT Identifier</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#FF7A00]">• &#123;&#123;VERIFY_URL&#125;&#125;</span>
                <span>- Public Authenticity Destination</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Student Search & Quick Selection Box */}
        <div className="liquid-glass-panel rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-[#FF7A00] uppercase flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#FF7A00]" />
              <span>Select Cadet (Live Search)</span>
            </label>
            <span className="text-[10px] font-mono text-[#8BA2B5]">
              {filteredStudents.length} candidates
            </span>
          </div>

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
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-white shadow-sm'
                        : 'liquid-glass-card hover:border-[#FF7A00]/30 text-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-7 h-7 rounded-full bg-[#1B2530] border border-[#263440] flex items-center justify-center text-xs font-mono font-bold text-[#FF7A00] flex-shrink-0">
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
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/30">
                        {st.cadet_id || 'RK-89421'}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF7A00]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* 3. Certificate Content Form */}
        <form onSubmit={handleDispatchCertificate} className="liquid-glass-panel rounded-2xl p-5 space-y-4">
          <label className="text-xs font-mono font-bold text-[#FFA439] uppercase flex items-center gap-2">
            <FileBadge className="w-4 h-4 text-[#FFA439]" />
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
                className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-[#FF7A00] font-mono font-bold"
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
                className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white cursor-pointer"
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
            <label className="text-[11px] font-mono text-[#FF7A00] font-bold block mb-1 flex items-center justify-between">
              <span>Middle Section Citation Description *</span>
              <span className="text-[10px] text-[#8BA2B5] font-normal">Supports Dynamic Tags</span>
            </label>
            <textarea
              rows={2}
              value={studioForm.description}
              onChange={(e) => setStudioForm({ ...studioForm, description: e.target.value })}
              placeholder="e.g. {{STUDENT_NAME}} has successfully completed {{COURSE_NAME}}..."
              className="w-full liquid-glass-input rounded-xl p-2.5 text-xs text-white focus:border-[#FF7A00] focus:outline-none leading-relaxed"
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

          {/* Digital Seal & Signature Uploaders */}
          <div className="pt-3 border-t border-[#1B2530] space-y-3">
            <label className="text-xs font-mono font-bold text-[#FF7A00] uppercase flex items-center justify-between">
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
                        className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5 cursor-pointer"
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
                      className="px-2.5 py-1 text-[10px] font-mono liquid-glass-button-secondary rounded-lg flex items-center gap-1 cursor-pointer"
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
                        className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5 cursor-pointer"
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
                      className="px-2.5 py-1 text-[10px] font-mono liquid-glass-button-secondary rounded-lg flex items-center gap-1 cursor-pointer"
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

          {/* Dispatch CTA */}
          <div className="pt-4 border-t border-[#1B2530]">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl liquid-glass-button font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,122,0,0.4)] cursor-pointer"
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
            <span className="text-[11px] font-mono text-[#FF7A00] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
              <span>AUTHENTIC REDKROSS CERTIFICATE (LIVE HIGH-RES PREVIEW)</span>
            </span>
            <button
              type="button"
              disabled={exportingPdf}
              onClick={handleDownloadPreviewPdf}
              className="px-3 py-1.5 rounded-lg liquid-glass-button text-xs font-mono font-bold text-[#FF7A00] hover:text-[#FFA439] flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(255,122,0,0.25)] cursor-pointer"
            >
              {exportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Exact High-Fidelity Canvas */}
          <div
            id="admin-certificate-preview-canvas"
            className="relative w-full rounded-xl shadow-2xl overflow-hidden bg-white text-[#0C2340] select-none"
            style={{
              aspectRatio: '949 / 1343',
              backgroundImage: 'url(/assets/certificate/official_certificate_template.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
          >
            {/* Title */}
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

            {/* Middle Body */}
            <div
              className="absolute inset-x-8 sm:inset-x-12 text-center"
              style={{ top: '32.5%' }}
            >
              <div className="text-xs sm:text-sm text-slate-800 font-medium">
                This is to certify that{' '}
                <span className="text-slate-500 font-normal">Ms./Mr.</span>{' '}
                <span className="text-base sm:text-lg md:text-xl font-bold text-[#0C2340] underline decoration-[#0C2340]/40 underline-offset-4 px-1">
                  {studioForm.student_name}
                </span>
              </div>

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

              <div className="text-[11px] sm:text-xs text-slate-600 italic mt-2.5 max-w-lg mx-auto leading-normal">
                {resolveDynamicTags(studioForm.description)}
              </div>

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

              <div className="mt-5">
                <span
                  className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-[#0C2340] inline-block pb-0.5"
                  style={{ letterSpacing: '0.18em' }}
                >
                  COURSE COMPLETION CERTIFICATE
                </span>
              </div>
            </div>

            {/* Metrics Row */}
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

            {/* Signatory Block & Official Stamp */}
            <div
              className="absolute right-8 sm:right-14 text-right"
              style={{ top: '61.5%' }}
            >
              <div className="text-sm sm:text-base font-bold text-[#0C2340]">
                For {masterConfig.issuing_institution}
              </div>

              <div className="relative h-16 sm:h-20 w-44 sm:w-52 mt-1 ml-auto">
                <img
                  src={studioForm.digital_seal_url || '/assets/certificate/default_seal.png'}
                  alt="Official Seal"
                  className="absolute right-12 top-0 h-16 sm:h-20 w-16 sm:w-20 object-contain opacity-90 transform -rotate-6 pointer-events-none"
                />

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

            {/* Micro Reference */}
            <div
              className="absolute left-8 bottom-14 text-[8px] sm:text-[9px] font-mono text-slate-400"
            >
              REF: RK-CERT-PREVIEW • ANCHORED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
