import React, { useState } from 'react';
import { Phone, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const EMERGENCY_HELPLINES = {
  disclaimer: "RedKross Academy Psychology Division is an educational and training platform, not an emergency medical intervention service. If you, a student, or someone you know is in acute distress or experiencing thoughts of self-harm, please connect immediately with verified 24/7 national mental health helplines.",
  helplines: [
    {
      name: "Tele-MANAS",
      number: "14416",
      phoneLink: "tel:14416",
      description: "National Tele Mental Health Programme of India. Free, confidential, 24/7 multi-lingual crisis support.",
      badge: "GOVERNMENT OF INDIA // TOLL-FREE 24/7"
    },
    {
      name: "KIRAN Helpline",
      number: "1800-599-0019",
      phoneLink: "tel:18005990019",
      description: "Mental Health Rehabilitation Helpline by the Ministry of Social Justice & Empowerment, Govt. of India.",
      badge: "MINISTRY OF SOCIAL JUSTICE // 24/7"
    },
    {
      name: "Emergency Services",
      number: "112",
      phoneLink: "tel:112",
      description: "National unified emergency response service for immediate physical or psychological medical danger.",
      badge: "NATIONAL EMERGENCY 24/7"
    }
  ]
};

export default function UrgentHelpStrip() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-[#08121E]/90 backdrop-blur-xl border-b border-amber-500/30 text-amber-200 text-xs select-none sticky top-0 z-40 transition-all duration-300 shadow-lg shadow-black/20">
      {/* Primary Compact Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Notice */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-amber-400">
            Psychological Support Notice:
          </span>
          <span className="text-[11px] sm:text-xs text-amber-200/90 hidden md:inline">
            In acute crisis, please call 24/7 national helplines:
          </span>
        </div>

        {/* Center / Right: Direct Click-to-Call Glass Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <a 
            href="tel:14416"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 backdrop-blur-md border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold transition-all shadow-sm"
            title="Tele-MANAS National Helpline"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Tele-MANAS: 14416</span>
          </a>

          <a 
            href="tel:18005990019"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 backdrop-blur-md border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold transition-all shadow-sm"
            title="KIRAN Ministry Helpline"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>KIRAN: 1800-599-0019</span>
          </a>

          <a 
            href="tel:112"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/40 hover:bg-rose-900/50 backdrop-blur-md border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold transition-all shadow-sm"
            title="National Unified Emergency"
          >
            <span>Emergency: 112</span>
          </a>

          {/* Expand Details Trigger */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-lg hover:bg-white/10 text-amber-400 hover:text-amber-200 transition-colors ml-1"
            aria-label="Toggle crisis helpline details"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Accordion Panel for Detailed Helplines */}
      {expanded && (
        <div className="bg-[#050B14]/95 backdrop-blur-2xl border-t border-amber-500/20 px-4 sm:px-6 py-4 transition-all">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-amber-200/80 mb-3 leading-relaxed">
              {EMERGENCY_HELPLINES.disclaimer}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EMERGENCY_HELPLINES.helplines.map((item) => (
                <div 
                  key={item.number} 
                  className="p-3.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-amber-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-royal font-bold text-amber-300 text-sm uppercase tracking-wide">{item.name}</span>
                      <span className="text-[9px] font-mono text-amber-400/80">{item.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                      {item.description}
                    </p>
                  </div>
                  <a 
                    href={item.phoneLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:underline pt-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Dial {item.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
