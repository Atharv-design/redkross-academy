import React from 'react';
import {
  Terminal as TerminalIcon,
  Minus,
  X,
  Sparkles,
  CornerDownLeft
} from 'lucide-react';

export default function LabTerminalWindow({
  onClose,
  runQuickCommand,
  terminalHistory,
  terminalExecuting,
  terminalScrollRef,
  suggestions,
  selectedSuggestionIdx,
  setTerminalInput,
  terminalInputRef,
  terminalInput,
  handleTerminalKeyDown,
  handleTerminalSubmit,
  setSelectedSuggestionIdx
}) {
  return (
    <div className="absolute inset-3 sm:inset-6 z-20 flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/50 bg-[#060e18]/98 shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-fadeIn">
      {/* Titlebar with Close Cross (X), Minimize, Maximize */}
      <div className="h-8 px-3 bg-[#0a1524] border-b border-[#00AEEF]/30 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#00AEEF]" />
          <span className="font-bold text-white text-[11px]">kali@kali: ~</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
            title="Minimize to Desktop"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
            title="Close Window (Return to Clean Desktop)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Quick Lab Action Bar */}
      <div className="px-3 py-1 bg-[#050b14] border-b border-white/5 flex items-center space-x-1.5 overflow-x-auto text-[10px] font-mono flex-shrink-0">
        <span className="text-[#00AEEF] font-bold pr-1">QUICK:</span>
        <button
          type="button"
          onClick={() => runQuickCommand('lab status')}
          className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
        >
          lab status
        </button>
        <button
          type="button"
          onClick={() => runQuickCommand('lab targets')}
          className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
        >
          lab targets
        </button>
        <button
          type="button"
          onClick={() => runQuickCommand('nmap dvwa')}
          className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
        >
          nmap dvwa
        </button>
        <button
          type="button"
          onClick={() => runQuickCommand('curl http://juice-shop')}
          className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
        >
          curl juice
        </button>
        <button
          type="button"
          onClick={() => runQuickCommand('sqlmap -u http://dvwa')}
          className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
        >
          sqlmap dvwa
        </button>
      </div>

      {/* Terminal History Viewport */}
      <div
        ref={terminalScrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 text-xs font-mono bg-black/95 select-text leading-relaxed"
      >
        {terminalHistory.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.type === 'neofetch' && (
              <div className="text-gray-200 text-[11px] whitespace-pre-wrap leading-tight border-b border-white/10 pb-2">
                <span className="text-[#00AEEF]">{item.text.slice(0, 500)}</span>
                <span>{item.text.slice(500)}</span>
                <div className="flex space-x-1.5 mt-2">
                  <span className="w-3.5 h-3.5 rounded bg-red-600" />
                  <span className="w-3.5 h-3.5 rounded bg-green-500" />
                  <span className="w-3.5 h-3.5 rounded bg-yellow-400" />
                  <span className="w-3.5 h-3.5 rounded bg-blue-500" />
                  <span className="w-3.5 h-3.5 rounded bg-purple-500" />
                  <span className="w-3.5 h-3.5 rounded bg-cyan-400" />
                  <span className="w-3.5 h-3.5 rounded bg-gray-100" />
                </div>
              </div>
            )}
            {item.type === 'command' && (
              <div className="text-[#00AEEF] font-bold text-[11px] whitespace-pre-wrap pt-1">
                {item.text}
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-gray-200 pl-2.5 border-l-2 border-[#00AEEF]/40 whitespace-pre-wrap text-[11px] leading-relaxed overflow-x-auto">
                {item.text}
              </div>
            )}
            {item.type === 'error' && (
              <div className="text-rose-400 pl-2.5 border-l-2 border-rose-500 whitespace-pre-wrap text-[11px]">
                {item.text}
              </div>
            )}
          </div>
        ))}

        {terminalExecuting && (
          <div className="flex items-center space-x-2 text-[#00AEEF] text-xs pt-1">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-ping" />
            <span>Executing on Kali attacker container (10.10.11.100)...</span>
          </div>
        )}
      </div>

      {/* Autocomplete Suggestions Popover */}
      {suggestions.length > 0 && !terminalExecuting && (
        <div className="px-3 py-2 bg-[#091626] border-t border-[#00AEEF]/30 animate-fadeIn">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00AEEF] pb-1.5">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> COMMAND SUGGESTIONS (TAB OR CLICK TO INSERT):
            </span>
            <span className="text-gray-400">{suggestions.length} MATCHES</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {suggestions.map((s, sIdx) => (
              <button
                key={s.id || sIdx}
                type="button"
                onClick={() => {
                  setTerminalInput(s.command);
                  terminalInputRef.current?.focus();
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center space-x-2 cursor-pointer border ${
                  sIdx === selectedSuggestionIdx
                    ? 'bg-[#00AEEF] text-black font-bold border-[#00AEEF] shadow-[0_0_12px_rgba(0,174,239,0.5)] scale-102'
                    : 'bg-[#0e243d] text-gray-200 border-[#00AEEF]/30 hover:border-[#00AEEF] hover:bg-[#16365b]'
                }`}
              >
                <span className="font-bold">{s.command}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-bold ${
                    sIdx === selectedSuggestionIdx
                      ? 'bg-black/30 text-black'
                      : 'bg-black/50 text-[#00AEEF]'
                  }`}
                >
                  {s.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleTerminalSubmit}
        className="p-2.5 bg-[#081220] border-t border-[#00AEEF]/20 flex items-center space-x-2 relative"
      >
        <span className="text-[#00AEEF] font-bold text-xs font-mono select-none">
          kali@kali:~$
        </span>
        <input
          ref={terminalInputRef}
          type="text"
          value={terminalInput}
          onChange={(e) => {
            setTerminalInput(e.target.value);
            setSelectedSuggestionIdx(0);
          }}
          onKeyDown={handleTerminalKeyDown}
          disabled={terminalExecuting}
          placeholder="Type any of 143+ Kali commands (e.g. ls, nmap, sqlmap, curl)..."
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-gray-500"
          autoFocus
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={terminalExecuting || !terminalInput.trim()}
          className="px-3 py-1 rounded-full bg-[#00AEEF] text-black text-xs font-bold hover:bg-[#33c2ff] transition-all cursor-pointer shadow-md disabled:opacity-40"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
