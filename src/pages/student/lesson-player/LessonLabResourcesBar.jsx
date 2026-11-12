import React from 'react';
import { Terminal, Download } from 'lucide-react';

export default function LessonLabResourcesBar({ labResources }) {
  if (!Array.isArray(labResources) || labResources.length === 0) return null;

  return (
    <div className="p-4 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-2">
      <span className="text-xs font-mono font-bold text-[#FF7A00] block">
        Laboratory Scripts &amp; Practice Artifacts:
      </span>
      <div className="flex flex-wrap gap-2">
        {labResources.map((res, idx) => (
          <a
            key={res.url || idx}
            href={res.url}
            download={res.name}
            title={res.description || `Download ${res.name}`}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E1308] border border-[#FF7A00]/30 text-xs font-mono text-[#E2D9CE] hover:text-white hover:border-[#FF7A00]/60 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>{res.name}</span>
            <Download className="w-3 h-3 text-[#FFA439]/80" />
          </a>
        ))}
      </div>
    </div>
  );
}
