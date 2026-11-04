import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Play,
  Copy,
  Check,
  Shield,
  Terminal as TerminalIcon,
  Filter,
  Radio,
  Globe,
  Key,
  ShieldAlert,
  Activity,
  Binary,
  Cloud,
  Code2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CornerDownLeft,
  BookOpen
} from 'lucide-react';
import {
  CYBER_CATEGORIES,
  CYBER_COMMAND_VAULT,
  searchCyberCommands
} from '../../data/cybersecurityCommandVault';

const ICON_MAP = {
  Terminal: TerminalIcon,
  Radio,
  Globe,
  Key,
  ShieldAlert,
  Activity,
  Binary,
  Search,
  Cloud,
  Code2
};

export default function CommandVaultModal({
  isOpen,
  onClose,
  onRunCommand,
  onInsertCommand
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Keyboard shortcut listener: ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    return searchCyberCommands({
      query: searchQuery,
      category: selectedCategory,
      difficulty: selectedDifficulty
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleCopy = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleRun = (cmd) => {
    onRunCommand(cmd);
    onClose();
  };

  const handleInsert = (cmd) => {
    if (onInsertCommand) {
      onInsertCommand(cmd);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-title"
    >
      {/* Background click overlay to dismiss */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Window */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0E0C09] border border-[#FF7A00]/30 rounded-2xl shadow-2xl overflow-hidden z-10 font-lora">
        {/* ================= 1. MODAL HEADER & CONTROLS ================= */}
        <div className="p-4 sm:p-5 border-b border-[#FF7A00]/20 bg-[#120E09]/95 flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 id="vault-title" className="text-base sm:text-lg font-bold text-white font-lora">
                    Cybersecurity Command Vault
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] font-mono text-[10px] font-bold">
                    340 Commands
                  </span>
                </div>
                <p className="text-xs font-mono text-[#A3907C]">
                  Verified POSIX & Linux binaries for E2B Cloud MicroVM Sandbox
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline-block px-2 py-1 rounded bg-[#1A1208] border border-white/10 text-[10px] font-mono text-[#8BA2B5]">
                ESC to close
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-[#FF7A00]/20 bg-[#1A1208] text-[#A3907C] hover:text-[#FF7A00] hover:bg-[#FF7A00]/20 transition-all cursor-pointer"
                title="Close Command Vault"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar & Difficulty Selector */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A3907C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tool (nmap, openssl, curl, jwt, iptables), CVE, or attack vector..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#080705] border border-[#FF7A00]/30 text-white placeholder-[#A3907C]/60 text-xs font-mono focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3907C] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#080705] border border-[#FF7A00]/30 text-xs font-mono text-[#FF7A00] focus:outline-none focus:border-[#FF7A00] cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="novice">Novice (Fundamentals)</option>
              <option value="intermediate">Intermediate (Practitioner)</option>
              <option value="advanced">Advanced (Specialist)</option>
            </select>
          </div>
        </div>

        {/* ================= 2. HORIZONTAL CATEGORY SCROLL BAR ================= */}
        <div className="px-4 py-2 bg-[#080705] border-b border-[#FF7A00]/15 flex items-center space-x-1.5 overflow-x-auto custom-scrollbar flex-shrink-0">
          {CYBER_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || TerminalIcon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex-shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF7A00] text-[#071018] font-bold border-[#FF7A00] shadow-md'
                    : 'bg-[#0E0C09] text-[#A3907C] border-[#FF7A00]/20 hover:text-white hover:bg-[#1A1208]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#071018]/20 text-[#071018]' : 'bg-black/40 text-[#A3907C]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= 3. COMMANDS SCROLLABLE LIST ================= */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3 bg-[#040a08]/90">
          {filteredCommands.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono">
              <ShieldAlert className="w-10 h-10 text-[#A3907C]/40 mx-auto" />
              <p className="text-sm text-gray-400">No commands match your search query.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
                className="px-4 py-1.5 rounded-xl bg-[#1A1208] border border-[#FF7A00]/30 text-xs text-[#FF7A00] hover:bg-[#FF7A00]/20 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredCommands.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/20 hover:border-[#FF7A00]/45 transition-all space-y-2 group shadow-sm"
              >
                {/* Command Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white font-lora">
                      {item.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        item.difficulty === 'Novice'
                          ? 'bg-[#FF7A00]/15 text-[#FF7A00] border-[#FF7A00]/30'
                          : item.difficulty === 'Intermediate'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-[#A3907C] hidden md:inline">
                      [{item.categoryLabel}]
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.command, item.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#1A1208] border border-[#FF7A00]/25 text-[#A3907C] hover:text-white text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer"
                      title="Copy exact command"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#FF7A00]" />
                          <span className="text-[#FF7A00]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {onInsertCommand && (
                      <button
                        type="button"
                        onClick={() => handleInsert(item.command)}
                        className="px-2.5 py-1 rounded-lg bg-[#1A1208] border border-[#FF7A00]/25 text-[#A3907C] hover:text-[#FF7A00] text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer"
                        title="Insert into active terminal prompt"
                      >
                        <CornerDownLeft className="w-3 h-3" />
                        <span className="hidden sm:inline">Insert</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRun(item.command)}
                      className="px-3 py-1 rounded-lg bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] text-xs font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_12px_rgba(255,122,0,0.25)] transition-all cursor-pointer"
                      title="Execute directly in E2B microVM"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Run</span>
                    </button>
                  </div>
                </div>

                {/* Exact Code Viewport */}
                <div className="p-2.5 rounded-lg bg-black/80 border border-white/5 font-mono text-xs text-[#FF7A00] overflow-x-auto custom-scrollbar select-all">
                  <span className="text-[#A3907C] mr-1.5 select-none">$</span>
                  {item.command}
                </div>

                {/* Description & Flags Explanation */}
                <p className="text-xs text-gray-300 font-lora leading-relaxed">
                  {item.description}
                </p>

                {item.flagsExplanation && (
                  <div className="text-[11px] font-mono text-[#8BA2B5] pt-0.5 border-t border-white/5 flex items-start space-x-1.5">
                    <span className="text-[#FF7A00] font-bold flex-shrink-0">Flags:</span>
                    <span className="truncate">{item.flagsExplanation}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* ================= 4. MODAL FOOTER ================= */}
        <div className="p-3 bg-[#120E09] border-t border-[#FF7A00]/20 flex items-center justify-between text-xs font-mono text-[#A3907C] flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span>Showing {filteredCommands.length} of {CYBER_COMMAND_VAULT.length} commands</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="hidden md:inline">Runs directly in E2B Ubuntu MicroVM</span>
            <button
              type="button"
              onClick={() => handleRun('rk-lab start web')}
              className="text-[#FF7A00] hover:underline flex items-center space-x-1 cursor-pointer font-bold"
            >
              <span>Quick Boot Practice Target (:8080)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
