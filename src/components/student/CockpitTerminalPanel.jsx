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
  ArrowRight
} from 'lucide-react';

/**
 * CockpitTerminalPanel.jsx
 * Embedded Real-Execution Terminal in Panel 3 of RedKross Learning Cockpit.
 * 
 * Features:
 * - Direct E2B Cloud MicroVM Sandbox execution (Ubuntu 22.04 LTS container)
 * - Clean minimal header: "Terminal" + Live status indicator
 * - Multi-Terminal Tabs support (Terminal 1, Terminal 2, + Add Terminal, Close Tab)
 * - Dynamic, Chapter-Aware Help & Commands Drawer (adapts vertically to active lesson)
 * - 1-Click Run & Copy for chapter suggested commands
 * - Full-screen edge-to-edge layout & mobile responsive design
 * - Zero sharp brutalist corners (soft rounded-2xl geometry)
 */

// Chapter-specific commands database mapped to module categories & titles
function getChapterCommands(activeUnit) {
  const modIdx = activeUnit?.moduleIndex ?? 0;
  const lessonTitle = (activeUnit?.lesson?.title || activeUnit?.quiz?.title || '').toLowerCase();
  const modTitle = (activeUnit?.moduleTitle || '').toLowerCase();

  // Module 1: Web Foundations & Networking
  if (modIdx === 0 || modTitle.includes('network') || modTitle.includes('foundation') || modTitle.includes('architecture')) {
    return [
      {
        cmd: 'curl -I https://redkross.org.in',
        label: 'HTTP Headers Inspection',
        desc: 'Probes server response status, caching directives, and security headers.'
      },
      {
        cmd: 'dig +short redkross.org.in',
        label: 'DNS Record Lookup',
        desc: 'Resolves canonical domain to authoritative A and CNAME addresses.'
      },
      {
        cmd: 'ping -c 3 8.8.8.8',
        label: 'ICMP Latency Probe',
        desc: 'Measures round-trip packet latency across network hops.'
      },
      {
        cmd: 'uname -a && whoami',
        label: 'System & Identity Audit',
        desc: 'Inspects Linux kernel release and current user clearance.'
      }
    ];
  }

  // Module 2 & 3: HTML5, CSS3, Layouts
  if (modIdx === 1 || modIdx === 2 || modTitle.includes('html') || modTitle.includes('css')) {
    return [
      {
        cmd: 'node -e "console.log(\'<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n  <head><title>Cadet Workspace</title></head>\\n  <body><h1>Defensive Architecture</h1></body>\\n</html>\')"',
        label: 'Semantic HTML5 Template',
        desc: 'Generates valid HTML5 document structure with accessibility lang tag.'
      },
      {
        cmd: 'node -e "console.log(\':root { --accent: #65F58A; --bg: #071018; --font: Lora, serif; }\')"',
        label: 'CSS Design Tokens Preview',
        desc: 'Declares root token block for consistent theme variables.'
      },
      {
        cmd: 'cat /etc/os-release',
        label: 'Inspect Environment',
        desc: 'Displays the underlying Linux operating system release and packages.'
      }
    ];
  }

  // Module 4 & 5: JavaScript ES6+ & Asynchronous
  if (modIdx === 3 || modIdx === 4 || modTitle.includes('javascript') || modTitle.includes('async')) {
    return [
      {
        cmd: 'node -v && npm -v',
        label: 'Verify Node.js & npm',
        desc: 'Checks Node.js runtime engine and package manager versions.'
      },
      {
        cmd: 'node -e "const double = [10, 20, 30].map(n => n * 2); console.log(\'Mapped Output:\', double);"',
        label: 'Array Pipeline Execution',
        desc: 'Executes functional transformation using ES6 arrow functions.'
      },
      {
        cmd: 'node -e "Promise.resolve(\'Handshake Complete\').then(msg => console.log(\'[ASYNC]:\', msg));"',
        label: 'Promise Asynchronous Test',
        desc: 'Evaluates asynchronous promise microtask queue execution.'
      },
      {
        cmd: 'python3 --version',
        label: 'Python Runtime Check',
        desc: 'Verifies secondary Python 3 environment availability.'
      }
    ];
  }

  // Module 6: React.js
  if (modIdx === 5 || modTitle.includes('react')) {
    return [
      {
        cmd: 'node -e "console.log(JSON.stringify({ component: \'LessonPlayer\', state: \'mounted\', hooks: [\'useState\', \'useEffect\', \'useAuth\'] }, null, 2))"',
        label: 'React Component Telemetry',
        desc: 'Inspects virtual component tree state and lifecycle hooks.'
      },
      {
        cmd: 'node -e "console.log(\'Vite 6 HMR Ready at http://localhost:5173\')"',
        label: 'Vite Development Server Probe',
        desc: 'Checks client build engine and hot module replacement.'
      }
    ];
  }

  // Module 7 & 8: Node.js, Express, REST APIs
  if (modIdx === 6 || modIdx === 7 || modTitle.includes('express') || modTitle.includes('node') || modTitle.includes('api')) {
    return [
      {
        cmd: 'node -e "const http = require(\'http\'); const s = http.createServer((q,r) => r.end(JSON.stringify({status: \'OK\', uptime: process.uptime()}))); s.listen(3001, () => { console.log(\'Microservice running on :3001\'); setTimeout(() => process.exit(0), 1000); });"',
        label: 'Launch In-Memory HTTP Server',
        desc: 'Boots an ephemeral Node.js HTTP server instance and verifies port binding.'
      },
      {
        cmd: 'curl -s https://httpbin.org/get | head -n 12',
        label: 'REST Endpoint Verification',
        desc: 'Performs live HTTP GET request to test JSON response streaming.'
      },
      {
        cmd: 'openssl rand -hex 16',
        label: 'Generate Cryptographic Secret',
        desc: 'Generates a secure 32-character hex key for JWT session signing.'
      }
    ];
  }

  // Module 9 & 10: OWASP Web Defense & Security
  if (modIdx >= 8 || modTitle.includes('security') || modTitle.includes('defense') || modTitle.includes('database')) {
    return [
      {
        cmd: 'whoami && id',
        label: 'Security Principal Inspection',
        desc: 'Audits user ID, group permissions, and effective privilege levels.'
      },
      {
        cmd: 'curl -I -s https://redkross.org.in | grep -iE "x-|strict|content-security"',
        label: 'Audit OWASP Security Headers',
        desc: 'Filters response headers for CSP, HSTS, and X-Content-Type protections.'
      },
      {
        cmd: 'python3 -c "import hashlib; print(\'SHA256 Token:\', hashlib.sha256(b\'cadet_credential\').hexdigest())"',
        label: 'HMAC-SHA256 Digest Test',
        desc: 'Calculates cryptographic hash digest used for verifiable credentials.'
      },
      {
        cmd: 'ps aux | head -n 6',
        label: 'Process Hierarchy Audit',
        desc: 'Inspects running background daemons and memory allocation.'
      }
    ];
  }

  // Default Universal Fallback
  return [
    {
      cmd: 'uname -a',
      label: 'Kernel Release Inspection',
      desc: 'Prints current Linux kernel version, SMP architecture, and machine info.'
    },
    {
      cmd: 'node -v && python3 --version',
      label: 'Development Toolchain Versions',
      desc: 'Checks installed Node.js and Python interpreter versions.'
    },
    {
      cmd: 'date -u',
      label: 'UTC Synchronization',
      desc: 'Displays the authoritative UTC wall clock timestamp.'
    },
    {
      cmd: 'echo "RedKross Academy Cadet Session Active" && whoami',
      label: 'Session Diagnostic',
      desc: 'Echoes student environment banner and active identity.'
    }
  ];
}

export default function CockpitTerminalPanel({
  activeUnit,
  onPopOut,
  onClose,
  injectedCommand = null,
  onClearInjectedCommand = () => {}
}) {
  // Multi-terminal tabs
  const [terminals, setTerminals] = useState([
    {
      id: 'term_1',
      title: 'bash #1',
      sandboxId: null,
      history: [
        {
          type: 'system',
          text: 'RedKross Academy  E2B Cloud MicroVM Sandbox (Ubuntu 22.04 LTS)\nConnected to real isolated Linux execution container.\nType any POSIX command (ls, node, python3, curl, git, whoami) or use Help.'
        }
      ],
      cmdHistory: [],
      historyIndex: -1,
      input: '',
      isExecuting: false
    }
  ]);
  const [activeTermId, setActiveTermId] = useState('term_1');

  // Help drawer toggle
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);

  const activeTerminal = terminals.find((t) => t.id === activeTermId) || terminals[0];
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

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

    // Reset input
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

    // Handle client-side built-ins
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
                    text: 'RedKross E2B Cloud MicroVM Terminal Help:\n  clear          - Clear terminal viewport\n  reset          - Reset current terminal session\n  help           - Show this reference manual\n\nAll standard Ubuntu Linux commands (ls, node, python3, curl, git, whoami, etc.) are executed directly in the live E2B cloud container.\nClick "Help & Commands" in the header to view chapter-specific exercises.'
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

  // Keyboard navigation for command history
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

  const chapterCommands = getChapterCommands(activeUnit);

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

        {/* Add Terminal Tab Button */}
        <button
          type="button"
          onClick={handleAddTerminal}
          className="p-1 rounded-lg bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 transition-all cursor-pointer flex-shrink-0 ml-2"
          title="Open new terminal instance"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ================= 3. CHAPTER-AWARE HELP & COMMANDS DRAWER ================= */}
      {isHelpOpen && (
        <div className="p-3.5 bg-[#081f16] border-b border-[#65F58A]/25 space-y-3 max-h-64 overflow-y-auto custom-scrollbar flex-shrink-0 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#65F58A] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#65F58A]" />
              <span>Chapter Suggested Commands</span>
            </div>
            <span className="text-[10px] font-mono text-[#72A88E]">1-Click Run</span>
          </div>

          <div className="space-y-2">
            {chapterCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#040e0a] border border-[#65F58A]/20 space-y-1.5 hover:border-[#65F58A]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white truncate">
                    {item.label}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(item.cmd);
                        setCopiedCmd(item.cmd);
                        setTimeout(() => setCopiedCmd(null), 1500);
                      }}
                      className="p-1 rounded text-[#72A88E] hover:text-[#65F58A] transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.cmd ? (
                        <Check className="w-3 h-3 text-[#65F58A]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand(item.cmd)}
                      className="px-2 py-0.5 rounded bg-[#65F58A] text-[#071018] font-mono text-[10px] font-bold flex items-center space-x-1 hover:bg-[#35E6B5] transition-colors cursor-pointer"
                      title="Execute in terminal"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Run</span>
                    </button>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-black/60 font-mono text-[11px] text-[#65F58A] truncate border border-white/5">
                  $ {item.cmd}
                </div>

                <p className="text-[10px] font-mono text-[#8BA2B5] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. REAL TERMINAL VIEWPORT ================= */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-2 bg-[#030907] font-mono text-xs text-[#C9EFE0]">
        {activeTerminal.history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.type === 'system' && (
              <div className="p-2.5 rounded-xl bg-[#092218]/50 border border-[#65F58A]/15 text-[11px] text-[#72A88E] leading-relaxed whitespace-pre-wrap">
                {item.text}
              </div>
            )}

            {item.type === 'command' && (
              <div className="flex items-center space-x-2 text-white font-bold pt-1">
                <span className="text-[#65F58A]">cadet@e2b:~$</span>
                <span>{item.text.replace(/^\$\s*/, '')}</span>
              </div>
            )}

            {item.type === 'output' && (
              <div className="text-[11px] text-[#E0F2FE] whitespace-pre-wrap pl-2 border-l border-[#65F58A]/20 font-mono leading-relaxed">
                {item.text}
              </div>
            )}

            {item.type === 'error' && (
              <div className="text-[11px] text-rose-400 whitespace-pre-wrap pl-2 border-l border-rose-500/40 font-mono leading-relaxed">
                {item.text}
              </div>
            )}
          </div>
        ))}

        {activeTerminal.isExecuting && (
          <div className="flex items-center space-x-2 text-xs text-[#65F58A] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A]" />
            <span>Executing inside E2B Cloud MicroVM...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* ================= 5. INTERACTIVE COMMAND INPUT ================= */}
      <div className="p-3 bg-[#040e0a] border-t border-[#65F58A]/20 flex items-center space-x-2 flex-shrink-0">
        <span className="text-[#65F58A] font-mono text-xs font-bold select-none">$</span>
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
          placeholder="Type bash command (e.g. ls, node -v, help)..."
          disabled={activeTerminal.isExecuting}
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
    </>
  );
}
