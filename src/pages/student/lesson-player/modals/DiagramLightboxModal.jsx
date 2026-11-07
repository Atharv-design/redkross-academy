import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

export default function DiagramLightboxModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-label="High-Resolution Diagram Inspection"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col bg-[#071018] border border-[#FFA439]/40 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#FFA439]/25 bg-[#0E0C09]">
          <div className="flex items-center space-x-3 min-w-0">
            <ImageIcon className="w-5 h-5 text-[#FFA439] flex-shrink-0" />
            <div className="truncate">
              <h3 className="text-sm font-bold font-mono text-white truncate">
                {image.caption || image.name || 'Inspection Diagram'}
              </h3>
              <p className="text-[11px] font-mono text-[#A3907C]">
                {image.name} • {image.size || 'Local High-Res Asset'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#A3907C] hover:text-white hover:bg-white/10 transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Body */}
        <div className="p-4 overflow-auto max-h-[75vh] flex items-center justify-center bg-black/80">
          <img
            src={image.url}
            alt={image.caption || image.name}
            className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-lg"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-[#FFA439]/20 bg-[#0E0C09] flex items-center justify-between text-xs font-mono">
          <span className="text-[#A3907C]">
            High-Fidelity Instructional Evidence & Diagram
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/30 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
