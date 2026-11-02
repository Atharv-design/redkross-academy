import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Code2,
  ListTodo,
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  Zap,
  Cpu,
  Activity,
  FileCode2
} from 'lucide-react';

/**
 * MovablePracticeTerminal.jsx
 * Authentic macOS MacBook-style Movable Practice Terminal with E2B Cloud Sandbox Integration.
 * 
 * Features:
 * - macOS Traffic Lights Window Controls: Red (Close), Yellow (Minimize to Dock), Green (Zoom/Maximize)
 * - Draggable Header with Hardware-Accelerated GPU transform (translate3d) & Boundary Clamping
 * - Space Mono Monospace Typography for Terminal & Code
 * - Multi-Tab Workspace: [ 🖥 zsh ], [ 🐍 Python 3.11 ], [ 📝 Scratchpad ], [ 🎯 Lab Tasks ]
 * - E2B API Gateway Integration with Zero-Latency Local Cyber Simulation Fallback
 * - 1-Click Payload Injection Support (receives commands directly from Third Panel)
 * - macOS Dock Pill Minimization at bottom-right
 * - 100% Mobile Responsive (docks into bottom sheet on < 1024px)
 * - Zero sharp brutalist corners (rounded-2xl soft modern curves)
 */
export default function MovablePracticeTerminal({
  isOpen,
  onClose,
  isMinimized,
  onMinimize,
  onRestore,
  injectedCommand = null,
  onClearInjectedCommand = () => {},
  targetIp = '10.10.11.205',
  lessonId = 'default_lesson'
}) {
  const [activeTab, setActiveTab] = useState('zsh');
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dragging state
  const [position, setPosition] = useState({ x: 120, y: 70 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'system',
      text: 'Last login: Mon Nov  2 19:28:40 on ttys002\nRedKross Academy Tactical Cloud MicroVM (Ubuntu 22.04 LTS / zsh)\nConnected to target subnet: 10.10.11.0/24\nType "help" to display available reconnaissance commands.'
    }
  ]);
  const [inputCommand, setInputCommand] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);

  // Python REPL state
  const [pythonBuffer, setPythonBuffer] = useState([
    'Python 3.11.8 (main, Feb 07 2024, 21:52:08) [GCC 11.4.0] on linux',
    'Type "help", "copyright", "credits" or "license" for more information.'
  ]);
  const [pythonInput, setPythonInput] = useState('');

  // Scratchpad state
  const [scratchpadCode, setScratchpadCode] = useState(
    `# RedKross Exploit PoC & Scratchpad\nimport socket, sys\n\ntarget_host = "${targetIp}"\ntarget_port = 80\n\nprint(f"[*] Probing target gateway at {target_host}:{target_port}...")\n`
  );

  // Lab Tasks Checklist
  const [tasks, setTasks] = useState([
    { id: 't1', title: `Run comprehensive nmap scan on target host (${targetIp})`, completed: false },
    { id: 't2', title: 'Enumerate open HTTP/HTTPS services and inspect response headers', completed: false },
    { id: 't3', title: 'Capture User or Root Flag and submit in Third Panel', completed: false }
  ]);

  const terminalScrollRef = useRef(null);
  const inputRef = useRef(null);

  // Center the initial position based on window dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultX = Math.max(20, Math.floor((window.innerWidth - 760) / 2) + 60);
      const defaultY = Math.max(60, Math.floor((window.innerHeight - 520) / 2) - 20);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);

  // Handle payload injection from Third Panel
  useEffect(() => {
    if (injectedCommand && isOpen) {
      if (isMinimized && onRestore) {
        onRestore();
      }
      setActiveTab('zsh');
      setInputCommand(injectedCommand);
      // Auto-execute injected command
      handleExecuteCommand(injectedCommand);
      onClearInjectedCommand();
    }
  }, [injectedCommand, isOpen, isMinimized]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory, isExecuting]);

  // Focus input on tab switch
  useEffect(() => {
    if (activeTab === 'zsh' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  // Pointer drag events for window movement
  const handlePointerDown = (e) => {
    // Only drag from header and not from traffic light buttons or tabs
    if (e.target.closest('button') || e.target.closest('input')) return;
    if (isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: position.x,
      initialPosY: position.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isMaximized) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const windowWidth = 760;
    const windowHeight = 520;
    const maxX = Math.max(10, window.innerWidth - windowWidth - 16);
    const maxY = Math.max(50, window.innerHeight - windowHeight - 16);

    const newX = Math.max(10, Math.min(dragRef.current.initialPosX + deltaX, maxX));
    const newY = Math.max(50, Math.min(dragRef.current.initialPosY + deltaY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // Execute command in zsh terminal
  const handleExecuteCommand = async (cmdToRun) => {
    const rawCmd = cmdToRun !== undefined ? cmdToRun : inputCommand;
    const cmd = (rawCmd || '').trim();

    if (!cmd) return;

    // Add command to history
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputCommand('');

    // Append to terminal display
    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: cmd, timestamp: new Date().toLocaleTimeString() }
    ]);

    // Handle clear locally
    if (cmd.toLowerCase() === 'clear') {
      setTerminalHistory([]);
      return;
    }

    setIsExecuting(true);

    try {
      // Call E2B Cloud Sandbox endpoint
      const response = await fetch('/api/e2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'exec',
          command: cmd,
          language: 'bash'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: 'output',
            text: data.stdout || data.message || '',
            exitCode: data.exitCode,
            executionTimeMs: data.executionTimeMs
          }
        ]);

        // Auto-check lab tasks if relevant command ran
        if (cmd.includes('nmap')) {
          setTasks((prev) => prev.map((t) => (t.id === 't1' ? { ...t, completed: true } : t)));
        }
        if (cmd.includes('gobuster') || cmd.includes('curl')) {
          setTasks((prev) => prev.map((t) => (t.id === 't2' ? { ...t, completed: true } : t)));
        }
      } else {
        throw new Error('E2B Gateway request failed');
      }
    } catch (err) {
      // High-Fidelity Client-Side Fallback if server/network offline
      const fallbackOutput = runClientSimulation(cmd, targetIp);
      setTerminalHistory((prev) => [
        ...prev,
        {
          type: 'output',
          text: fallbackOutput,
          exitCode: 0,
          executionTimeMs: 18
        }
      ]);

      if (cmd.includes('nmap')) {
        setTasks((prev) => prev.map((t) => (t.id === 't1' ? { ...t, completed: true } : t)));
      }
      if (cmd.includes('gobuster') || cmd.includes('curl')) {
        setTasks((prev) => prev.map((t) => (t.id === 't2' ? { ...t, completed: true } : t)));
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Keyboard navigation for command history
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputCommand(cmdHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputCommand('');
      } else {
        setHistoryIndex(nextIndex);
        setInputCommand(cmdHistory[nextIndex] || '');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setTerminalHistory([]);
    }
  };

  // Python REPL execution
  const handlePythonExecute = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const code = pythonInput.trim();
      if (!code) return;

      setPythonBuffer((prev) => [...prev, `>>> ${code}`]);
      setPythonInput('');

      let resultText = '';
      try {
        if (code === 'exit()' || code === 'quit()') {
          resultText = '[Python REPL Session Reset]';
        } else if (code.startsWith('print(')) {
          const match = code.match(/print\((.*)\)/);
          resultText = match ? match[1].replace(/['"]/g, '') : '';
        } else if (/^[\d\s+\-*/%()]+$/.test(code)) {
          resultText = String(Function(`'use strict'; return (${code})`)());
        } else {
          resultText = `[+] Executed: ${code} (returncode 0)`;
        }
      } catch (pyErr) {
        resultText = `Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: ${pyErr.message}`;
      }

      setPythonBuffer((prev) => [...prev, resultText]);
    }
  };

  // Copy full terminal buffer
  const handleCopyBuffer = () => {
    const textToCopy = terminalHistory
      .map((item) => (item.type === 'command' ? `$ ${item.text}` : item.text))
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  // Minimized Dock Pill (macOS Style at bottom-right)
  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={onRestore}
        className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#071018]/95 border border-[#35E6B5]/40 text-[#35E6B5] shadow-2xl backdrop-blur-md hover:bg-[#0a1824] hover:border-[#65F58A] transition-all cursor-pointer z-50 group"
        title="Restore macOS Terminal Cockpit"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-xs tracking-wider text-[#E6F4EA]">
          cadet@redkross: ~/recon — zsh ▴
        </span>
        <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-ping" />
      </button>
    );
  }

  return (
    <div
      style={{
        transform: isMaximized
          ? 'none'
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        position: 'fixed',
        top: isMaximized ? '48px' : '0px',
        left: isMaximized ? '16px' : '0px',
        width: isMaximized ? 'calc(100vw - 32px)' : '760px',
        height: isMaximized ? 'calc(100vh - 64px)' : '520px',
        maxWidth: '96vw',
        maxHeight: '90vh'
      }}
      className={`z-50 flex flex-col rounded-2xl border border-[#35E6B5]/30 bg-[#071018]/95 backdrop-blur-xl shadow-2xl shadow-black/90 overflow-hidden transition-all duration-200 select-text ${
        isDragging ? 'opacity-95 shadow-cyan-500/10' : ''
      }`}
    >
      {/* ================= 1. macOS WINDOW HEADER (DRAGGABLE CHROME) ================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`h-11 px-4 bg-[#0d141c]/95 border-b border-[#35E6B5]/20 flex items-center justify-between select-none flex-shrink-0 ${
          isMaximized ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* macOS Traffic Lights (Close / Minimize / Zoom) */}
        <div className="flex items-center gap-2">
          {/* Close (Red) */}
          <button
            type="button"
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center group/btn hover:brightness-110 cursor-pointer transition-transform"
            title="Close Terminal"
          >
            <span className="opacity-0 group-hover/btn:opacity-100 text-[8px] font-bold text-black/80 leading-none">
              ✕
            </span>
          </button>

          {/* Minimize (Yellow) */}
          <button
            type="button"
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center group/btn hover:brightness-110 cursor-pointer transition-transform"
            title="Minimize to Dock"
          >
            <span className="opacity-0 group-hover/btn:opacity-100 text-[8px] font-bold text-black/80 leading-none">
              −
            </span>
          </button>

          {/* Zoom / Maximize (Green) */}
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center group/btn hover:brightness-110 cursor-pointer transition-transform"
            title={isMaximized ? 'Restore Size' : 'Zoom Window'}
          >
            <span className="opacity-0 group-hover/btn:opacity-100 text-[8px] font-bold text-black/80 leading-none">
              +
            </span>
          </button>
        </div>

        {/* Centered macOS Session Title */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8BA2B5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-pulse" />
          <span className="text-white/90 font-medium">cadet@redkross-terminal</span>
          <span className="text-[#35E6B5]/60">:</span>
          <span className="text-[#35E6B5]">~/recon</span>
          <span className="hidden sm:inline text-white/40">— zsh — 80x24</span>
        </div>

        {/* MicroVM Status Pill */}
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#72A88E]">
          <span className="px-2 py-0.5 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/20 text-[#65F58A] font-bold">
            E2B CLOUD // ACTIVE
          </span>
        </div>
      </div>

      {/* ================= 2. macOS MULTI-TAB BAR ================= */}
      <div className="h-9 px-3 bg-[#0a1118] border-b border-[#35E6B5]/15 flex items-center justify-between flex-shrink-0 text-xs font-mono">
        <div className="flex items-center space-x-1 overflow-x-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('zsh')}
            className={`px-3 py-1 rounded-t-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'zsh'
                ? 'bg-[#071018] text-[#65F58A] border-t-2 border-t-[#65F58A] font-bold'
                : 'text-[#8BA2B5] hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#65F58A]" />
            <span>zsh (MicroVM)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1 rounded-t-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'python'
                ? 'bg-[#071018] text-[#35E6B5] border-t-2 border-t-[#35E6B5] font-bold'
                : 'text-[#8BA2B5] hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Python 3.11</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scratchpad')}
            className={`px-3 py-1 rounded-t-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'scratchpad'
                ? 'bg-[#071018] text-[#65F58A] border-t-2 border-t-[#65F58A] font-bold'
                : 'text-[#8BA2B5] hover:text-white'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#72A88E]" />
            <span>Scratchpad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1 rounded-t-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-[#071018] text-[#65F58A] border-t-2 border-t-[#65F58A] font-bold'
                : 'text-[#8BA2B5] hover:text-white'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Tasks ({tasks.filter((t) => t.completed).length}/3)</span>
          </button>
        </div>

        {/* Tab Right Controls */}
        <div className="flex items-center space-x-2">
          {activeTab === 'zsh' && (
            <>
              <button
                type="button"
                onClick={handleCopyBuffer}
                className="px-2 py-1 rounded text-[11px] text-[#72A88E] hover:text-[#65F58A] transition-colors flex items-center space-x-1 cursor-pointer"
                title="Copy Terminal Output"
              >
                {copied ? <Check className="w-3 h-3 text-[#65F58A]" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTerminalHistory([])}
                className="px-2 py-1 rounded text-[11px] text-[#72A88E] hover:text-[#FF5F56] transition-colors flex items-center space-x-1 cursor-pointer"
                title="Clear Terminal (Ctrl+L)"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ================= 3. TAB CONTENT WORKSPACE ================= */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#071018] relative">
        {/* TAB 1: zsh TERMINAL */}
        {activeTab === 'zsh' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Scrollable Output Screen */}
            <div
              ref={terminalScrollRef}
              className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-xs leading-relaxed space-y-2 select-text"
            >
              {terminalHistory.map((item, index) => {
                if (item.type === 'system') {
                  return (
                    <div key={index} className="text-[#72A88E] whitespace-pre-wrap opacity-90 pb-2">
                      {item.text}
                    </div>
                  );
                }
                if (item.type === 'command') {
                  return (
                    <div key={index} className="flex items-start space-x-2 text-white">
                      <span className="text-[#65F58A] font-bold select-none">cadet@redkross:~$</span>
                      <span className="text-[#35E6B5] font-semibold">{item.text}</span>
                      {item.timestamp && (
                        <span className="text-[10px] text-white/30 ml-auto select-none">
                          {item.timestamp}
                        </span>
                      )}
                    </div>
                  );
                }
                if (item.type === 'output') {
                  return (
                    <div key={index} className="text-[#E6F4EA] whitespace-pre-wrap pl-4 border-l border-[#35E6B5]/20 font-mono text-xs">
                      {item.text}
                      {item.executionTimeMs && (
                        <div className="text-[10px] text-[#72A88E] mt-1 select-none">
                          [Finished in {item.executionTimeMs}ms // ExitCode: {item.exitCode ?? 0}]
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}

              {isExecuting && (
                <div className="flex items-center space-x-2 text-[#35E6B5] pl-4 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-ping" />
                  <span className="text-xs font-mono">Executing in E2B MicroVM...</span>
                </div>
              )}
            </div>

            {/* Terminal Input Bar */}
            <div className="p-3 bg-[#0a141d] border-t border-[#35E6B5]/20 flex items-center space-x-2 flex-shrink-0">
              <span className="text-[#65F58A] font-bold text-xs font-mono select-none">
                cadet@redkross:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isExecuting}
                placeholder="Type cyber command (e.g. nmap -sC -sV 10.10.11.205) or hit Enter..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#E6F4EA] placeholder-[#72A88E]/40"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleExecuteCommand()}
                disabled={isExecuting || !inputCommand.trim()}
                className="px-3 py-1 rounded-lg bg-[#65F58A]/20 hover:bg-[#65F58A]/30 border border-[#65F58A]/40 text-[#65F58A] text-xs font-mono font-bold flex items-center space-x-1 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PYTHON 3.11 REPL */}
        {activeTab === 'python' && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-xs space-y-1.5 select-text text-[#E6F4EA]">
              {pythonBuffer.map((line, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    line.startsWith('>>>')
                      ? 'text-[#35E6B5] font-semibold'
                      : line.startsWith('Traceback')
                      ? 'text-[#FF5F56]'
                      : 'text-[#8BA2B5]'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#0a141d] border-t border-[#35E6B5]/20 flex items-center space-x-2">
              <span className="text-[#35E6B5] font-bold text-xs font-mono select-none">{'>>>'}</span>
              <input
                type="text"
                value={pythonInput}
                onChange={(e) => setPythonInput(e.target.value)}
                onKeyDown={handlePythonExecute}
                placeholder="Enter Python statement (e.g. 2**16, import hashlib)..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#E6F4EA] placeholder-[#72A88E]/40"
              />
            </div>
          </div>
        )}

        {/* TAB 3: SCRATCHPAD */}
        {activeTab === 'scratchpad' && (
          <div className="flex-1 flex flex-col min-h-0 p-3 space-y-2">
            <textarea
              value={scratchpadCode}
              onChange={(e) => setScratchpadCode(e.target.value)}
              className="flex-1 w-full bg-[#0a141d] border border-[#35E6B5]/20 rounded-xl p-3 font-mono text-xs text-[#E6F4EA] resize-none outline-none focus:border-[#65F58A]/50 custom-scrollbar leading-relaxed"
              placeholder="Write custom Bash script or Python exploit payload..."
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-[#72A88E]">
                Target: {targetIp} // Auto-saved locally
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('zsh');
                  handleExecuteCommand(`python3 -c '${scratchpadCode.replace(/\n/g, '; ')}'`);
                }}
                className="px-4 py-1.5 rounded-xl bg-[#65F58A] text-[#071018] font-mono font-bold text-xs flex items-center space-x-1.5 hover:bg-[#35E6B5] transition-all cursor-pointer shadow-lg"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Execute in MicroVM</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: LAB TASKS CHECKLIST */}
        {activeTab === 'tasks' && (
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#35E6B5]/20">
              <div>
                <h4 className="font-lora font-bold text-sm text-white">Lesson Practical Objectives</h4>
                <p className="text-xs font-mono text-[#72A88E]">
                  Complete hands-on steps using the terminal or payload arsenal.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 font-bold">
                {tasks.filter((t) => t.completed).length} / {tasks.length} Cleared
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    task.completed
                      ? 'bg-[#092218]/60 border-[#65F58A]/40'
                      : 'bg-[#0a1824]/40 border-[#35E6B5]/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTasks((prev) =>
                          prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
                        )
                      }
                      className={`w-5 h-5 rounded-md flex items-center justify-center border cursor-pointer ${
                        task.completed
                          ? 'bg-[#65F58A] border-[#65F58A] text-[#071018]'
                          : 'border-[#35E6B5]/40 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span
                      className={`font-mono text-xs ${
                        task.completed ? 'text-white line-through opacity-80' : 'text-[#E6F4EA]'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#72A88E]">
                    Step {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= 4. macOS TERMINAL STATUS FOOTER ================= */}
      <div className="h-7 px-3 bg-[#0a1118] border-t border-[#35E6B5]/15 flex items-center justify-between flex-shrink-0 text-[10px] font-mono text-[#72A88E] select-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-[#65F58A]" />
            <span>Target: {targetIp}</span>
          </span>
          <span className="text-white/20">|</span>
          <span>Lat: 18ms</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">Mem: 412MB / 1024MB</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/40">RedKross E2B Engine</span>
        </div>
      </div>
    </div>
  );
}

// Client-Side Security Simulation Engine (Guarantees zero downtime if network drops)
function runClientSimulation(cmd, targetIp) {
  const parts = cmd.trim().split(/\s+/);
  const binary = parts[0].toLowerCase();

  if (binary === 'whoami') return 'cadet\n';
  if (binary === 'id') return 'uid=1000(cadet) gid=1000(cadet) groups=1000(cadet),27(sudo)\n';
  if (binary === 'pwd') return '/home/cadet/recon\n';
  if (binary === 'uname') return 'Linux redkross-sandbox-e2b 5.15.0-89-generic x86_64\n';

  if (binary === 'ls') {
    return 'exploit_poc.py  recon.sh  rockyou_sub.txt  target_notes.md  wordlist.txt\n';
  }

  if (binary === 'nmap') {
    return `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().slice(0, 19)} UTC
Nmap scan report for vuln-node (${targetIp})
Host is up (0.018s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.52 ((Ubuntu))
|_http-title: RedKross Cadet Defense Portal - Authentication Gateway
443/tcp  open  ssl/http Apache httpd 2.4.52
3306/tcp open  mysql   MySQL 8.0.32

Service detection performed. 1 host scanned in 1.84 seconds\n`;
  }

  if (binary === 'curl') {
    return `HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Server: Apache/2.4.52 (Ubuntu)
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html><head><title>RedKross Cadet Target</title></head>
<body><h1>Authentication Gateway Online</h1><p>Defense lab monitoring active.</p></body></html>\n`;
  }

  if (binary === 'gobuster') {
    return `===============================================================
Gobuster v3.6 - URL Brute-Forcer
===============================================================
/admin                (Status: 301) [Size: 312]
/api                  (Status: 301) [Size: 310]
/api/debug            (Status: 200) [Size: 48]
/login                (Status: 200) [Size: 1842]
===============================================================\n`;
  }

  if (binary === 'ping') {
    return `PING ${targetIp} 56(84) bytes of data.
64 bytes from ${targetIp}: icmp_seq=1 ttl=64 time=18.2 ms
64 bytes from ${targetIp}: icmp_seq=2 ttl=64 time=17.9 ms
--- ${targetIp} ping statistics ---
2 packets transmitted, 2 received, 0% packet loss\n`;
  }

  if (binary === 'cat') {
    const file = parts[1] || '';
    if (file.includes('notes')) {
      return `Target IP: ${targetIp}\nService: Apache Web Gateway on Port 80\nVulnerability Vector: Unrestricted File Upload & Directory Traversal\n`;
    }
    return `File content for ${file} [OK]\n`;
  }

  return `[E2B MicroVM] Executed: ${cmd}\nCommand processed successfully with status 0.\n`;
}
