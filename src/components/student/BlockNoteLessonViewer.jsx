import React, { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { BookOpen, Sparkles, Check, Edit3, Eye } from 'lucide-react';

/**
 * BlockNoteLessonViewer
 * 
 * Interactive Rich Block-Based Classroom Document Engine for RedKross Academy.
 * Adheres strictly to:
 * - Obsidian Black foundations
 * - Amber Orange (#FF7A00, #FFA439) highlights
 * - Universal Lora typography
 * - Client-side mounted lifecycle
 */
export default function BlockNoteLessonViewer({
  lessonId,
  initialBlocks,
  lessonTitle
}) {
  const [mounted, setMounted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-black/40 rounded-2xl border border-[#FF7A00]/20 text-xs font-mono text-[#A3907C]">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-ping" />
          <span>Mounting BlockNote Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <BlockNoteInstance
      key={lessonId}
      lessonId={lessonId}
      initialBlocks={initialBlocks}
      lessonTitle={lessonTitle}
      isEditable={isEditable}
      setIsEditable={setIsEditable}
    />
  );
}

function BlockNoteInstance({
  lessonId,
  initialBlocks,
  lessonTitle,
  isEditable,
  setIsEditable
}) {
  const editor = useCreateBlockNote(
    {
      initialContent: initialBlocks && initialBlocks.length > 0 ? initialBlocks : undefined
    },
    [lessonId]
  );

  return (
    <div className="w-full rounded-2xl bg-black/35 backdrop-blur-2xl border border-[#FF7A00]/30 hover:border-[#FFA439]/50 shadow-[0_0_35px_rgba(255,122,0,0.12)] transition-all overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="px-5 py-3 border-b border-[#FF7A00]/20 bg-black/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FFA439]">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-[#FFA439] uppercase tracking-wider flex items-center gap-1.5">
              <span>BLOCKNOTE RICH ACADEMIC ENGINE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
            </div>
            <span className="text-xs text-white font-bold font-lora">
              {lessonTitle || 'Interactive Laboratory Study Guide'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
              isEditable
                ? 'bg-[#FF7A00] text-black font-bold border-[#FFA439] shadow-[0_0_12px_rgba(255,122,0,0.3)]'
                : 'bg-black/60 text-[#FFA439] border-[#FF7A00]/30 hover:border-[#FF7A00]'
            }`}
            title={isEditable ? 'Switch to Read-Only Mode' : 'Switch to Student Annotation Mode'}
          >
            {isEditable ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditable ? 'Done Taking Notes' : 'Annotate / Edit'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body with expanded vertical height */}
      <div className="p-4 sm:p-6 lg:p-8 min-h-[580px] max-h-[850px] overflow-y-auto custom-scrollbar blocknote-redkross-theme">
        <BlockNoteView
          editor={editor}
          theme="dark"
          editable={isEditable}
        />
      </div>

      {/* Footer Info Strip */}
      <div className="px-5 py-2.5 bg-black/60 border-t border-[#FF7A00]/15 flex items-center justify-between text-[11px] font-mono text-[#A3907C]">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FFA439]" />
          <span>Interactive Student Workpad • Edits preserved locally</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          Module 1 Technical Foundations
        </div>
      </div>
    </div>
  );
}
