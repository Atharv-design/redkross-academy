import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Plus,
  X,
  Play,
  Copy,
  Check,
  RotateCcw,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Cpu,
  Clock,
  Code2,
  Trash2,
  ArrowRight,
  Shield,
  Layers,
  FlaskConical,
  CornerDownLeft
} from 'lucide-react';
import CommandVaultModal from './CommandVaultModal';
import { getCommandsForModule, CYBER_COMMAND_VAULT } from '../../data/cybersecurityCommandVault';

/**
 * CockpitTerminalPanel.jsx
 * Production Cybersecurity Sandbox Terminal in Panel 3 of RedKross Learning Cockpit.
 * 
 * Powered by E2B Cloud MicroVM (Ubuntu 22.04 LTS isolated container)
 * Features:
 * - Clean minimal header: "Terminal" + Live status indicator
 * - 340+ Cybersecurity Command Vault Modal with search, filters & 1-click execution (Ctrl+K)
 * - Dynamic, Chapter-Aware Exercises mapped directly to active curriculum module
 * - Multi-Terminal Tabs support (Terminal 1, Terminal 2, + Add Tab, Close Tab)
 * - 1-Click Run, Insert, & Copy
 * - Built-in rk-vault & rk-lab companions with local vulnerable target (:8080)
 * - Desktop pinned sticky 3rd panel & mobile slide-over touch drawer with backdrop overlay
 */

export default function CockpitTerminalPanel({
  activeUnit,
  onPopOut,
  onClose,
  injectedCommand = null,
  onClearInjectedCommand = () => {}
}) {
  // Multi-terminal tabs state
  const [terminals, setTerminals] = useState([
    {
      id: 'term_1',
      title: 'bash #1',
      sandboxId: null,
      history: [
        {
          type: 'system',
          text: 'RedKross Academy Cybersecurity Sandbox (Ubuntu 22.04 LTS MicroVM)\nConnected to real isolated Linux execution container (Full sudo enabled).\nType any POSIX command (nmap, curl, openssl, python3, dig, whoami) or click "Vault" (Ctrl+K).'
        }
      ],
      cmdHistory: [],
      historyIndex: -1,
      input: '',
      isExecuting: false
    }
  ]);
  const [activeTermId, setActiveTermId] = useState('term_1');

  // Modals & Drawers
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);

  const activeTerminal = terminals.find((t) => t.id === activeTermId) || terminals[0];
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Global Ctrl+K / Cmd+K listener to toggle Command Vault
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsVaultOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll to bottom on new terminal output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTerminal?.history]);

  // Handle injected command from external clicks
  useEffect(() => {
    if (injectedCommand && activeTerminal) {
      executeCommand(injectedCommand);
      onClearInjectedCommand();
    }
  }, [injectedCommand]);

  // Focus input when tab changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeTermId]);

  // Add new terminal instance
  const handleAddTerminal = () => {
    const newIdx = terminals.length + 1;
    const newTerm = {
      id: `term_${Date.now()}`,
      title: `bash #${newIdx}`,
      sandboxId: null,
      history: [
        {
          type: 'system',
          text: `RedKross Terminal session #${newIdx} initialized.\nIsolated E2B Cloud Sandbox ready for bash execution.`
        }
      ],
      cmdHistory: [],
      historyIndex: -1,
      input: '',
      isExecuting: false
    };
    setTerminals((prev) => [...prev, newTerm]);
    setActiveTermId(newTerm.id);
  };

  // Close a terminal tab
  const handleCloseTerminal = (termIdToClose, e) => {
    e.stopPropagation();
    if (terminals.length <= 1) return; // Keep at least one

    setTerminals((prev) => {
      const filtered = prev.filter((t) => t.id !== termIdToClose);
      if (activeTermId === termIdToClose) {
        setActiveTermId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Execute command via E2B Cloud Gateway
  const executeCommand = async (cmdToRun = null) => {
    const cmd = (cmdToRun !== null ? cmdToRun : activeTerminal.input).trim();
    if (!cmd) return;

    // Reset input and add command line to history
    setTerminals((prev) =>
      prev.map((t) => {
        if (t.id === activeTermId) {
          return {
            ...t,
            input: '',
            cmdHistory: [...t.cmdHistory, cmd],
            historyIndex: -1,
            isExecuting: true,
            history: [...t.history, { type: 'command', text: `$ ${cmd}` }]
          };
        }
        return t;
      })
    );

    // Client-side built-ins
    if (cmd === 'clear') {
      setTerminals((prev) =>
        prev.map((t) => (t.id === activeTermId ? { ...t, history: [], isExecuting: false } : t))
      );
      return;
    }

    if (cmd === 'help') {
      setTerminals((prev) =>
        prev.map((t) =>
          t.id === activeTermId
            ? {
                ...t,
                isExecuting: false,
                history: [
                  ...t.history,
                  {
                    type: 'output',
                    text: `RedKross Cybersecurity Sandbox Terminal Help:
  rk-vault list    - View 9 cybersecurity categories (340+ verified commands)
  rk-lab start web - Start local vulnerable practice web target (:8080)
  rk-lab status    - Check status of local practice challenges
  clear            - Clear terminal viewport
  reset            - Reset current terminal session
  help             - Show this manual

Shortcut: Press Ctrl+K (or Cmd+K) to open the interactive Command Vault with 1-click execution.`
                  }
                ]
              }
            : t
        )
      );
      return;
    }

    if (cmd === 'reset') {
      setTerminals((prev) =>
        prev.map((t) =>
          t.id === activeTermId
            ? {
                ...t,
                sandboxId: null,
                isExecuting: false,
                history: [
                  {
                    type: 'system',
                    text: 'Session reset. Ready for interactive bash execution.'
                  }
                ]
              }
            : t
        )
      );
      return;
    }

    try {
      const res = await fetch('/api/e2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'exec',
          command: cmd,
          sandboxId: activeTerminal.sandboxId,
          sessionId: activeTerminal.id
        })
      });

      const data = await res.json();

      let outputText = '';
      if (data.stdout) outputText += data.stdout;
      if (data.stderr) outputText += (outputText ? '\n' : '') + data.stderr;
      if (!outputText && data.exitCode === 0) {
        outputText = '(command executed with exit code 0)';
      }

      setTerminals((prev) =>
        prev.map((t) => {
          if (t.id === activeTermId) {
            return {
              ...t,
              sandboxId: data.sandboxId || t.sandboxId,
              isExecuting: false,
              history: [
                ...t.history,
                {
                  type: data.exitCode === 0 ? 'output' : 'error',
                  text: outputText,
                  isRealMicroVM: data.isRealMicroVM,
                  executionTimeMs: data.executionTimeMs
                }
              ]
            };
          }
          return t;
        })
      );
    } catch (err) {
      setTerminals((prev) =>
        prev.map((t) => {
          if (t.id === activeTermId) {
            return {
              ...t,
              isExecuting: false,
              history: [
                ...t.history,
                {
                  type: 'error',
                  text: `Execution error: ${err.message}`
                }
              ]
            };
          }
          return t;
        })
      );
    }
  };

  // Insert command into input field without executing
  const handleInsertCommand = (cmd) => {
    setTerminals((prev) =>
      prev.map((t) => (t.id === activeTermId ? { ...t, input: cmd } : t))
    );
    inputRef.current?.focus();
  };

  // Keyboard navigation for command history (ArrowUp / ArrowDown)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const history = activeTerminal.cmdHistory;
      if (history.length === 0) return;
      const nextIdx =
        activeTerminal.historyIndex === -1
          ? history.length - 1
          : Math.max(0, activeTerminal.historyIndex - 1);
      setTerminals((prev) =>
        prev.map((t) =>
          t.id === activeTermId
            ? { ...t, historyIndex: nextIdx, input: history[nextIdx] || '' }
            : t
        )
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const history = activeTerminal.cmdHistory;
      if (activeTerminal.historyIndex === -1) return;
      const nextIdx = activeTerminal.historyIndex + 1;
      if (nextIdx >= history.length) {
        setTerminals((prev) =>
          prev.map((t) => (t.id === activeTermId ? { ...t, historyIndex: -1, input: '' } : t))
        );
      } else {
        setTerminals((prev) =>
          prev.map((t) =>
            t.id === activeTermId
              ? { ...t, historyIndex: nextIdx, input: history[nextIdx] || '' }
              : t
          )
        );
      }
    }
  };

  // Dynamic chapter exercises derived from authoritative 340+ command vault
  const chapterCommands = getCommandsForModule(activeUnit?.moduleIndex ?? 0);

  return (
    <>
      {/* Mobile Backdrop Overlay (only on screens < xl) */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 xl:hidden animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 right-0 w-full sm:w-[420px] z-50 xl:z-20 xl:static xl:sticky xl:top-14 h-full xl:h-[calc(100vh-3.5rem)] xl:w-80 2xl:w-[420px] flex flex-col flex-shrink-0 bg-[#061510]/98 xl:bg-[#061510]/95 backdrop-blur-xl border-l border-[#65F58A]/20 transition-all self-start shadow-2xl overflow-hidden font-lora animate-fadeIn">
        {/* ================= 1. CLEAN TERMINAL HEADER ================= */}
        <div className="p-3.5 border-b border-[#65F58A]/20 flex items-center justify-between bg-[#071912]/80 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#65F58A]/15 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A]">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white font-lora leading-tight">Terminal</h3>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#65F58A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-pulse" />
                <span>E2B Cloud MicroVM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Open 340+ Command Vault Modal */}
            <button
              type="button"
              onClick={() => setIsVaultOpen(true)}
              className="px-2.5 py-1 rounded-lg border border-[#65F58A]/40 bg-[#65F58A]/15 text-[#65F58A] hover:bg-[#65F58A] hover:text-[#071018] text-xs font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer shadow-[0_0_10px_rgba(101,245,138,0.2)]"
              title="Open 340+ Cybersecurity Command Vault (Ctrl+K)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Vault</span>
              <span className="text-[9px] opacity-75 hidden sm:inline">(340+)</span>
            </button>

            {/* Help & Commands Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                isHelpOpen
                  ? 'bg-[#65F58A] text-[#071018] font-bold border-[#65F58A]'
                  : 'bg-[#092218] text-[#65F58A] border-[#65F58A]/30 hover:bg-[#65F58A]/20'
              }`}
              title="Toggle Chapter Help & Commands"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Help</span>
            </button>

            {/* Optional Pop-Out / Float Window */}
            {onPopOut && (
              <button
                type="button"
                onClick={onPopOut}
                className="p-1.5 rounded-lg border border-[#65F58A]/30 bg-[#092218] text-[#72A88E] hover:text-[#65F58A] hover:bg-[#65F58A]/20 transition-all cursor-pointer"
                title="Pop out into floating window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close Panel Button */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[#65F58A]/20 bg-[#092218] text-[#72A88E] hover:text-[#65F58A] transition-all cursor-pointer"
                title="Close Terminal Panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ================= 2. MULTI-TERMINAL TAB BAR ================= */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#040e0a] border-b border-[#65F58A]/15 flex-shrink-0 overflow-x-auto custom-scrollbar">
          <div className="flex items-center space-x-1 min-w-0">
            {terminals.map((t) => {
              const isActive = t.id === activeTermId;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTermId(t.id)}
                  className={`group flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-[#092218] text-[#65F58A] border-[#65F58A]/40 font-bold shadow-sm'
                      : 'bg-[#061510] text-[#72A88E] border-transparent hover:text-white hover:bg-[#071912]'
                  }`}
                >
                  <TerminalIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate max-w-[80px]">{t.title}</span>
                  {terminals.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleCloseTerminal(t.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-rose-400 transition-opacity"
                      title="Close tab"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Lab Action & Add Terminal Tab Button */}
          <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
            <button
              type="button"
              onClick={() => executeCommand('rk-lab start web')}
              className="p-1 rounded-lg bg-[#092218] border border-[#65F58A]/30 text-[#72A88E] hover:text-[#65F58A] hover:bg-[#65F58A]/20 transition-all cursor-pointer"
              title="Quick Start Vulnerable Web Lab (:8080)"
            >
              <FlaskConical className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleAddTerminal}
              className="p-1 rounded-lg bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 transition-all cursor-pointer"
              title="Open new terminal instance"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= 3. CHAPTER-AWARE HELP & COMMANDS DRAWER ================= */}
        {isHelpOpen && (
          <div className="p-3.5 bg-[#081f16] border-b border-[#65F58A]/25 space-y-3 max-h-72 overflow-y-auto custom-scrollbar flex-shrink-0 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Chapter Suggested Exercises</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVaultOpen(true)}
                className="text-[10px] font-mono text-[#72A88E] hover:text-[#65F58A] underline cursor-pointer"
              >
                View all 340+
              </button>
            </div>

            <div className="space-y-2">
              {chapterCommands.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-[#040e0a] border border-[#65F58A]/20 space-y-1.5 hover:border-[#65F58A]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(item.command);
                          setCopiedCmd(item.command);
                          setTimeout(() => setCopiedCmd(null), 1500);
                        }}
                        className="p-1 rounded text-[#72A88E] hover:text-[#65F58A] transition-colors"
                        title="Copy command"
                      >
                        {copiedCmd === item.command ? (
                          <Check className="w-3 h-3 text-[#65F58A]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => executeCommand(item.command)}
                        className="px-2 py-0.5 rounded bg-[#65F58A] text-[#071018] font-mono text-[10px] font-bold flex items-center space-x-1 hover:bg-[#35E6B5] transition-colors cursor-pointer"
                        title="Execute in terminal"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Run</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-black/60 font-mono text-[11px] text-[#65F58A] truncate border border-white/5 select-all">
                    $ {item.command}
                  </div>

                  <p className="text-[10px] font-mono text-[#8BA2B5] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. REAL-TIME TERMINAL VIEWPORT ================= */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 bg-[#030a07] font-mono text-xs select-text">
          {activeTerminal.history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.type === 'system' && (
                <div className="p-2.5 rounded-lg bg-[#061510] border border-[#65F58A]/25 text-[#72A88E] text-[11px] leading-relaxed whitespace-pre-wrap">
                  {entry.text}
                </div>
              )}

              {entry.type === 'command' && (
                <div className="flex items-start space-x-1.5 text-white font-bold pt-1">
                  <span className="text-[#65F58A] select-none">$</span>
                  <span className="text-[#65F58A]">{entry.text.replace(/^\$\s*/, '')}</span>
                </div>
              )}

              {entry.type === 'output' && (
                <div className="text-gray-200 pl-3 border-l-2 border-[#65F58A]/30 whitespace-pre-wrap font-mono text-[11px] leading-relaxed overflow-x-auto custom-scrollbar">
                  {entry.text}
                  {entry.executionTimeMs !== undefined && (
                    <div className="text-[9px] text-[#72A88E]/70 pt-1 flex items-center space-x-1.5 select-none">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{entry.executionTimeMs}ms</span>
                      {entry.isRealMicroVM && (
                        <span className="text-[#65F58A] font-bold">● E2B Cloud Container</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {entry.type === 'error' && (
                <div className="text-rose-400 pl-3 border-l-2 border-rose-500/50 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                  {entry.text}
                </div>
              )}
            </div>
          ))}

          {activeTerminal.isExecuting && (
            <div className="flex items-center space-x-2 text-xs text-[#65F58A] pl-3 animate-pulse">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>Executing in E2B Ubuntu MicroVM...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* ================= 5. INTERACTIVE COMMAND INPUT PROMPT ================= */}
        <div className="p-2.5 bg-[#071912] border-t border-[#65F58A]/20 flex items-center space-x-2 flex-shrink-0">
          <span className="text-[#65F58A] font-mono text-sm font-bold pl-1 select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={activeTerminal.input}
            onChange={(e) => {
              const val = e.target.value;
              setTerminals((prev) =>
                prev.map((t) => (t.id === activeTermId ? { ...t, input: val } : t))
              );
            }}
            onKeyDown={handleKeyDown}
            disabled={activeTerminal.isExecuting}
            placeholder="Type command (nmap, openssl, whois, rk-vault) or press Ctrl+K..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-[#72A88E]/50 disabled:opacity-50"
            autoFocus
          />
          <button
            type="button"
            onClick={() => executeCommand()}
            disabled={activeTerminal.isExecuting || !activeTerminal.input.trim()}
            className="px-2.5 py-1.5 rounded-lg bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-mono text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1"
            title="Execute Command (Enter)"
          >
            <Play className="w-3 h-3 fill-current" />
          </button>
        </div>
      </aside>

      {/* ================= 6. INTERACTIVE 340+ COMMAND VAULT MODAL ================= */}
      <CommandVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onRunCommand={(cmd) => executeCommand(cmd)}
        onInsertCommand={(cmd) => handleInsertCommand(cmd)}
      />
    </>
  );
}
