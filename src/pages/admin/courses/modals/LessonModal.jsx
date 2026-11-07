import React from 'react';
import { Plus, Trash2, Image as ImageIcon, FileText, Loader2, X } from 'lucide-react';

export default function LessonModal({
  isOpen,
  onClose,
  editingLessonIdx,
  lessonForm,
  setLessonForm,
  onSaveLesson,
  lessonImageRef,
  uploadingLessonImage,
  onLessonImageUpload,
  onRemoveLessonImage,
  lessonPdfRef,
  uploadingLessonPdf,
  onLessonPdfUpload
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-xl w-full p-6 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-white">
            {editingLessonIdx !== null ? 'Edit Lesson' : 'Add New Instructional Lesson'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C]">Lesson Title *</label>
          <input
            type="text"
            value={lessonForm.title}
            onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            placeholder="e.g. 1.2 Telemetry Ingestion & Filtering"
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C]">Duration</label>
          <input
            type="text"
            value={lessonForm.duration}
            onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
            placeholder="15 mins"
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>

        {/* Instructional Diagrams & Images */}
        <div className="p-3.5 bg-[#080705] rounded-xl border border-[#FF7A00]/25 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#FFA439]" />
                <span>Instructional Diagrams & Images</span>
              </span>
              <span className="text-[10px] text-[#A3907C] block">
                Attach network topologies, packet captures, and flowcharts
              </span>
            </div>

            <label className="px-3 py-1.5 bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FFA439] border border-[#FFA439]/40 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center space-x-1.5 transition-colors">
              {uploadingLessonImage ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Upload Image</span>
                </>
              )}
              <input
                ref={lessonImageRef}
                type="file"
                accept="image/*"
                disabled={uploadingLessonImage}
                onChange={onLessonImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {(!lessonForm.images || lessonForm.images.length === 0) ? (
            <div className="text-[11px] font-mono text-slate-500 italic p-2 border border-dashed border-white/5 rounded-lg text-center">
              No images attached yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lessonForm.images.map((img, iIdx) => (
                <div
                  key={img.id || iIdx}
                  className="p-2 rounded-lg bg-[#0E0C09] border border-[#FFA439]/20 flex items-center gap-2.5 text-xs"
                >
                  <img
                    src={img.url}
                    alt={img.caption || img.name}
                    className="w-12 h-12 object-cover rounded-md border border-white/10 flex-shrink-0"
                  />
                  <div className="truncate flex-1">
                    <input
                      type="text"
                      value={img.caption || img.name}
                      onChange={(e) => {
                        const updated = [...lessonForm.images];
                        updated[iIdx] = { ...updated[iIdx], caption: e.target.value };
                        setLessonForm({ ...lessonForm, images: updated });
                      }}
                      placeholder="Diagram Caption"
                      className="w-full bg-transparent text-xs text-white font-mono focus:outline-none focus:border-b border-[#FFA439]"
                    />
                    <span className="text-[10px] text-[#A3907C] font-mono block">
                      {img.size || 'Diagram'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveLessonImage(iIdx)}
                    className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lesson Theory & Markdown Content */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C]">Lesson Theory Content (Markdown)</label>
          <textarea
            rows={6}
            value={lessonForm.content}
            onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
            placeholder="### Objectives&#10;&#10;Detailed technical notes and terminal syntax..."
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00] font-mono"
          />
        </div>

        {/* PDF Document Attachment */}
        <div className="p-3.5 bg-[#080705] rounded-xl border border-[#FF7A00]/25 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Attach Student PDF</span>
            </span>
            <label className="px-2.5 py-1 bg-[#1A1208] text-emerald-400 border border-emerald-400/40 rounded-lg text-xs font-mono cursor-pointer">
              {uploadingLessonPdf ? 'Attaching...' : '+ Browse PDF'}
              <input
                ref={lessonPdfRef}
                type="file"
                accept=".pdf"
                disabled={uploadingLessonPdf}
                onChange={onLessonPdfUpload}
                className="hidden"
              />
            </label>
          </div>
          {lessonForm.pdf_attachment && (
            <div className="text-xs font-mono text-emerald-400 flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
              <span>{lessonForm.pdf_attachment.name}</span>
              <button
                type="button"
                onClick={() => setLessonForm({ ...lessonForm, pdf_attachment: null })}
                className="text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveLesson}
            className="px-4 py-2 rounded-xl bg-[#FF7A00] text-[#071018] font-bold text-xs font-mono cursor-pointer"
          >
            Save Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
