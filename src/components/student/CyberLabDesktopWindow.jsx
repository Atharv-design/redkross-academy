import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Minimize2,
  Maximize2,
  Terminal as TerminalIcon,
  Globe,
  Folder,
  HardDrive,
  Trash2,
  Shield,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  Play,
  Copy,
  Check,
  Menu,
  ShoppingCart,
  Lock,
  Unlock,
  Key,
  Database,
  Cpu,
  Wifi,
  Volume2,
  Clock,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  CYBER_LAB_CONTAINERS,
  JUICE_SHOP_PRODUCTS,
  executeCyberLabCommand
} from '../../data/cyberLabEngine';

/**
 * CyberLabDesktopWindow.jsx
 * Authentic, movable medium-sized Kali Linux GUI Desktop for RedKross Academy cadets.
 * Directly integrates the architecture and vulnerable targets from godofweak/cyber-lab.
 * 
 * Features:
 * - High-fidelity Kali Linux desktop environment with glowing neon dragon background
 * - Top XFCE status bar: Kali dragon menu, workspaces (1 2 3 4), window taskbar tabs, system tray, clock 13:50
 * - Desktop shortcuts: Home, File System, Trash, Terminal, Web Browser
 * - Dual-Target In-Desktop Browser:
 *   - OWASP Juice Shop: Exact replica from reference image (All Products, Apple Juice, Apple Pomace)
 *   - DVWA: Damn Vulnerable Web Application with interactive login and SQLi/XSS labs
 *   - Authentic bookmarks bar: Kali Linux, Kali Tools, Kali Docs, Exploit-DB, Google Hacking DB, OffSec
 * - In-Desktop Kali Attacker Terminal (root@kali-sandbox) executing all 'lab' and attack commands
 * - Hardware-accelerated dragging, minimize to dock, and maximize/restore capability
 */
export default function CyberLabDesktopWindow({
  isOpen,
  onClose,
  isMinimized,
  onMinimize,
  onRestore
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 90, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });

  // Desktop active window management
  const [activeDesktopApp, setActiveDesktopApp] = useState('browser'); // 'browser' | 'terminal' | 'both'
  const [browserTab, setBrowserTab] = useState('juiceshop'); // 'juiceshop' | 'dvwa' | 'webgoat' | 'vampi'
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isKaliMenuOpen, setIsKaliMenuOpen] = useState(false);

  // Juice Shop interactive state (matching user reference screenshot)
  const [juiceSearchQuery, setJuiceSearchQuery] = useState('');
  const [juiceCartCount, setJuiceCartCount] = useState(0);
  const [juiceNotification, setJuiceNotification] = useState(null);

  // DVWA interactive state
  const [dvwaUsername, setDvwaUsername] = useState('admin');
  const [dvwaPassword, setDvwaPassword] = useState('password');
  const [dvwaIsLoggedIn, setDvwaIsLoggedIn] = useState(false);
  const [dvwaSecurityLevel, setDvwaSecurityLevel] = useState('low');
  const [dvwaActiveSection, setDvwaActiveSection] = useState('sqli');
  const [dvwaSqliId, setDvwaSqliId] = useState('1');
  const [dvwaSqliResult, setDvwaSqliResult] = useState(null);

  // Kali in-desktop terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'system',
      text: `Linux kali-sandbox 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 (2024-01-08) x86_64\n\nThe programs included with the Kali GNU/Linux system are free software.\nCyber Lab V3 initialized on isolated Docker bridge: lab-isolated (Subnet: 10.10.11.0/24)\n\nType 'lab status' to inspect containers or 'lab targets' for the targets matrix.`
    }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalExecuting, setTerminalExecuting] = useState(false);
  const terminalScrollRef = useRef(null);

  // Center window on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultX = Math.max(16, Math.floor((window.innerWidth - 880) / 2));
      const defaultY = Math.max(40, Math.floor((window.innerHeight - 590) / 2) - 15);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory, terminalExecuting]);

  // Pointer dragging handlers for top title bar
  const handlePointerDown = (e) => {
    if (isMaximized) return;
    if (e.target.closest('button') || e.target.closest('input')) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: position.x,
      initialPosY: position.y
    };
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const newX = Math.max(10, Math.min(window.innerWidth - 300, dragRef.current.initialPosX + deltaX));
    const newY = Math.max(40, Math.min(window.innerHeight - 150, dragRef.current.initialPosY + deltaY));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.target.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
    }
  };

  // Execute command inside Kali terminal
  const handleTerminalSubmit = (e) => {
    e?.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `root@kali-sandbox:~# ${cmd}` }
    ]);
    setTerminalInput('');
    setTerminalExecuting(true);

    setTimeout(() => {
      const res = executeCyberLabCommand(cmd, {
        onOpenTarget: (alias) => {
          if (alias === 'juice' || alias === 'juiceshop') {
            setBrowserTab('juiceshop');
            setActiveDesktopApp('browser');
          } else if (alias === 'dvwa') {
            setBrowserTab('dvwa');
            setActiveDesktopApp('browser');
          } else if (alias === 'webgoat') {
            setBrowserTab('webgoat');
            setActiveDesktopApp('browser');
          } else if (alias === 'vampi') {
            setBrowserTab('vampi');
            setActiveDesktopApp('browser');
          }
        }
      });

      setTerminalHistory((prev) => [
        ...prev,
        { type: res.isError ? 'error' : 'output', text: res.output }
      ]);
      setTerminalExecuting(false);
    }, 200);
  };

  // Run quick helper command
  const runQuickCommand = (cmd) => {
    setTerminalInput(cmd);
    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `root@kali-sandbox:~# ${cmd}` }
    ]);
    setTerminalExecuting(true);
    setTimeout(() => {
      const res = executeCyberLabCommand(cmd);
      setTerminalHistory((prev) => [
        ...prev,
        { type: 'output', text: res.output }
      ]);
      setTerminalExecuting(false);
      setTerminalInput('');
    }, 180);
  };

  // Handle DVWA Login
  const handleDvwaLogin = (e) => {
    e.preventDefault();
    if (dvwaUsername.trim() === 'admin' && dvwaPassword.trim() === 'password') {
      setDvwaIsLoggedIn(true);
    } else {
      alert('Login failed. Default lab credentials: admin / password');
    }
  };

  // Handle DVWA SQLi submit
  const handleDvwaSqliSubmit = (e) => {
    e.preventDefault();
    const val = dvwaSqliId.trim();
    if (val === '1') {
      setDvwaSqliResult([
        { id: '1', first_name: 'admin', surname: 'admin' }
      ]);
    } else if (val.includes("'") || val.includes('OR') || val.includes('or')) {
      setDvwaSqliResult([
        { id: '1', first_name: 'admin', surname: 'admin' },
        { id: '2', first_name: 'Gordon', surname: 'Brown' },
        { id: '3', first_name: 'Hack', surname: 'Me' },
        { id: '4', first_name: 'Pablo', surname: 'Picasso' },
        { id: '5', first_name: 'Bob', surname: 'Smith' }
      ]);
    } else {
      setDvwaSqliResult([{ id: val, first_name: 'User', surname: `ID_${val}` }]);
    }
  };

  // Filtered Juice Shop products
  const filteredJuiceProducts = JUICE_SHOP_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(juiceSearchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(juiceSearchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  // Minimized Floating Dock Pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-24 z-50 animate-fadeIn">
        <button
          type="button"
          onClick={onRestore}
          className="flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl bg-[#0b1320] border border-[#35E6B5]/50 text-white shadow-[0_0_25px_rgba(53,230,181,0.35)] hover:scale-105 transition-all cursor-pointer font-lora"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#35E6B5] animate-pulse" />
          <div className="w-5 h-5 rounded-lg bg-[#14283f] flex items-center justify-center text-[#35E6B5]">
            <Shield className="w-3.5 h-3.5 text-[#35E6B5]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white">CyberLab V3 (Kali GUI)</span>
            <span className="text-[9px] font-mono text-[#72A88E] uppercase tracking-wider">
              {browserTab.toUpperCase()} & ATTACKER ONLINE
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        transform: isMaximized
          ? 'none'
          : `translate3d(${position.x}px, ${position.y}px, 0px)`
      }}
      className={`fixed z-50 flex flex-col font-mono select-none overflow-hidden transition-all duration-150 ${
        isMaximized
          ? 'inset-3 w-[calc(100vw-1.5rem)] h-[calc(100vh-1.5rem)] rounded-2xl'
          : 'w-[95vw] sm:w-[880px] h-[590px] rounded-2xl max-w-[calc(100vw-20px)] max-h-[calc(100vh-40px)] shadow-[0_25px_70px_rgba(0,0,0,0.92)]'
      } bg-[#0a0f18] border border-[#35E6B5]/40 backdrop-blur-2xl`}
    >
      {/* ================= 1. WINDOW DRAGGABLE HEADER ================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="h-10 px-3.5 bg-[#0d1420] border-b border-[#35E6B5]/25 flex items-center justify-between cursor-move flex-shrink-0"
      >
        {/* Left: Window Control Dots */}
        <div className="flex items-center space-x-2">
          {/* Close Window Dot */}
          <button
            type="button"
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Close CyberLab"
          >
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          {/* Minimize Window Dot */}
          <button
            type="button"
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Minimize to Dock"
          >
            <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          {/* Maximize Window Dot */}
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title={isMaximized ? 'Restore Window' : 'Maximize Window'}
          >
            <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Center: Title Bar */}
        <div className="flex items-center space-x-2 truncate px-2">
          <span className="w-2 h-2 rounded-full bg-[#35E6B5] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white truncate">
            CyberLab V3 - Kali Linux Desktop GUI (godofweak/cyber-lab)
          </span>
        </div>

        {/* Right: Subnet badge & Watermark */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-[#35E6B5] font-bold px-2 py-0.5 rounded bg-[#0f2334] border border-[#35E6B5]/40 tracking-wider">
            lab-isolated : 10.10.11.0/24
          </span>
        </div>
      </div>

      {/* ================= 2. KALI TOP XFCE PANEL (From User Reference Image) ================= */}
      <div className="h-7 px-3 bg-[#0f1522] border-b border-black/40 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0 z-20">
        {/* Left Side: Kali Dragon Menu + Workspaces + Open Window Tabs */}
        <div className="flex items-center space-x-2">
          {/* Blue Kali Dragon Application Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsKaliMenuOpen(!isKaliMenuOpen)}
              className="px-2 py-0.5 rounded bg-[#162134] hover:bg-[#1e2d47] text-white flex items-center space-x-1 border border-white/10 cursor-pointer"
              title="Kali Application Menu"
            >
              <Shield className="w-3.5 h-3.5 text-[#35E6B5]" />
              <span className="text-[11px] font-bold hidden sm:inline text-[#35E6B5]">Kali</span>
            </button>

            {/* Application Menu Dropdown */}
            {isKaliMenuOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-64 bg-[#0d1420] border border-[#35E6B5]/40 rounded-xl p-2 shadow-2xl z-50 text-xs space-y-1 animate-fadeIn"
                onClick={() => setIsKaliMenuOpen(false)}
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-[#72A88E] border-b border-white/10">
                  Cyber Lab Tools (Kali Linux)
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDesktopApp('browser')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#162738] text-white flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4 text-[#35E6B5]" />
                  <span>Chromium Browser (Juice Shop / DVWA)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDesktopApp('terminal')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#162738] text-white flex items-center space-x-2"
                >
                  <TerminalIcon className="w-4 h-4 text-[#65F58A]" />
                  <span>Kali Terminal (root@kali-sandbox)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDesktopApp('both')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#162738] text-white flex items-center space-x-2"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Dual Split View (Browser + Terminal)</span>
                </button>
                <div className="pt-1 border-t border-white/10 text-[10px] text-[#72A88E] px-2">
                  Isolated Network: lab-isolated
                </div>
              </div>
            )}
          </div>

          {/* Workspaces 1 2 3 4 (Matching Screenshot) */}
          <div className="flex items-center space-x-1 pl-1">
            {[1, 2, 3, 4].map((ws) => (
              <button
                key={ws}
                type="button"
                onClick={() => setActiveWorkspace(ws)}
                className={`w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  activeWorkspace === ws
                    ? 'bg-[#183955] text-[#35E6B5] border border-[#35E6B5]/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {ws}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Active Window Tabs on Top Panel (Matching Screenshot) */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveDesktopApp('browser')}
              className={`px-2.5 py-0.5 rounded text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeDesktopApp === 'browser' || activeDesktopApp === 'both'
                  ? 'bg-[#17253a] text-white font-bold border border-white/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3 text-[#35E6B5]" />
              <span className="truncate max-w-[130px]">
                {browserTab === 'juiceshop' ? 'OWASP Juice Shop' : 'DVWA'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDesktopApp('terminal')}
              className={`px-2.5 py-0.5 rounded text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeDesktopApp === 'terminal' || activeDesktopApp === 'both'
                  ? 'bg-[#17253a] text-white font-bold border border-white/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3 h-3 text-[#65F58A]" />
              <span>root@kali</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDesktopApp(activeDesktopApp === 'both' ? 'browser' : 'both')}
              className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                activeDesktopApp === 'both'
                  ? 'bg-[#35E6B5] text-[#071018] font-bold border-[#35E6B5]'
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Toggle Split Dual View"
            >
              Split View
            </button>
          </div>
        </div>

        {/* Right Side: System Tray + Clock 13:50 (Matching Screenshot) */}
        <div className="flex items-center space-x-3 text-gray-300">
          <div className="hidden sm:flex items-center space-x-2 text-[10px] text-[#72A88E]">
            <Cpu className="w-3 h-3 text-[#35E6B5]" />
            <span>2.4 GHz</span>
            <Wifi className="w-3 h-3 text-[#65F58A]" />
            <Volume2 className="w-3 h-3" />
          </div>

          {/* Clock: 13:50 */}
          <div className="flex items-center space-x-1 text-white font-bold text-[11px] px-1.5 py-0.5 rounded bg-black/30">
            <Clock className="w-3 h-3 text-[#35E6B5]" />
            <span>13:50</span>
          </div>

          <span className="text-[10px] text-gray-400 font-bold uppercase hidden sm:inline">root</span>
        </div>
      </div>

      {/* ================= 3. KALI DESKTOP CANVAS WITH DRAGON WALLPAPER ================= */}
      <div className="flex-1 relative overflow-hidden flex bg-[#060a12]">
        {/* Glowing Neon Kali Dragon Emblem in Background (Matching Screenshot) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-35">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(255,100,50,0.35)]"
          >
            <defs>
              <linearGradient id="kaliDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7700" />
                <stop offset="35%" stopColor="#FF007F" />
                <stop offset="70%" stopColor="#7F00FF" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
            {/* Dragon Wing & Head Silhouette */}
            <path
              d="M 180 280 C 220 220, 310 180, 420 200 C 470 210, 520 240, 550 280 C 580 320, 560 360, 520 380 C 480 400, 420 390, 370 420 C 320 450, 280 500, 230 520 C 180 540, 130 510, 160 460 C 190 410, 260 380, 280 340 C 300 300, 260 270, 200 270 Z"
              fill="none"
              stroke="url(#kaliDragonGrad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Dragon Spines & Claws */}
            <path
              d="M 330 190 L 350 140 L 370 195 M 410 200 L 440 150 L 455 210 M 490 225 L 530 180 L 535 240"
              stroke="url(#kaliDragonGrad)"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Desktop Left Icon Stack (Home, File System, Trash from Screenshot) */}
        <div className="absolute left-3 top-3 z-10 flex flex-col space-y-4">
          {/* Home Icon */}
          <div
            onClick={() => setActiveDesktopApp('terminal')}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-10 h-10 rounded-xl bg-[#122033]/90 border border-white/10 group-hover:border-[#35E6B5]/60 flex items-center justify-center text-[#35E6B5] shadow-lg transition-transform group-hover:scale-105">
              <Folder className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[10px] font-mono text-gray-200 mt-1 drop-shadow-md text-center">Home</span>
          </div>

          {/* File System Icon */}
          <div
            onClick={() => runQuickCommand('ls -la /')}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-10 h-10 rounded-xl bg-[#122033]/90 border border-white/10 group-hover:border-[#35E6B5]/60 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
              <HardDrive className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-200 mt-1 drop-shadow-md text-center">File System</span>
          </div>

          {/* Trash Icon */}
          <div
            onClick={() => alert('Trash folder is empty.')}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-10 h-10 rounded-xl bg-[#122033]/90 border border-white/10 group-hover:border-rose-400/60 flex items-center justify-center text-gray-300 shadow-lg transition-transform group-hover:scale-105">
              <Trash2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-200 mt-1 drop-shadow-md text-center">Trash</span>
          </div>
        </div>

        {/* ================= 4. DESKTOP WINDOWS VIEWPORT ================= */}
        <div className="flex-1 ml-20 p-2 relative z-10 flex flex-col sm:flex-row gap-2 overflow-hidden">
          {/* WINDOW 1: CHROMIUM WEB BROWSER (DVWA & JUICE SHOP) */}
          {(activeDesktopApp === 'browser' || activeDesktopApp === 'both') && (
            <div
              className={`flex-1 flex flex-col rounded-xl overflow-hidden border border-[#35E6B5]/30 bg-[#0d131e]/98 shadow-2xl transition-all ${
                activeDesktopApp === 'both' ? 'sm:w-1/2' : 'w-full'
              }`}
            >
              {/* Browser Window Chrome / Tabs Bar (Matching Screenshot) */}
              <div className="h-9 px-2 bg-[#090e17] border-b border-black/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-1 overflow-x-auto custom-scrollbar">
                  {/* DVWA Tab */}
                  <button
                    type="button"
                    onClick={() => setBrowserTab('dvwa')}
                    className={`px-3 py-1 rounded-t-lg text-[11px] font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                      browserTab === 'dvwa'
                        ? 'bg-[#141d2c] text-white font-bold border-t-2 border-[#35E6B5]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Shield className="w-3 h-3 text-[#65F58A]" />
                    <span className="truncate max-w-[120px]">Login :: Damn Vulnerable...</span>
                  </button>

                  {/* OWASP Juice Shop Tab (Active in Screenshot) */}
                  <button
                    type="button"
                    onClick={() => setBrowserTab('juiceshop')}
                    className={`px-3 py-1 rounded-t-lg text-[11px] font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                      browserTab === 'juiceshop'
                        ? 'bg-[#141d2c] text-white font-bold border-t-2 border-amber-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-[120px]">OWASP Juice Shop</span>
                  </button>

                  {/* WebGoat Tab */}
                  <button
                    type="button"
                    onClick={() => setBrowserTab('webgoat')}
                    className={`px-2.5 py-1 rounded-t-lg text-[11px] font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                      browserTab === 'webgoat'
                        ? 'bg-[#141d2c] text-white font-bold border-t-2 border-emerald-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>WebGoat</span>
                  </button>

                  {/* VAmPI Tab */}
                  <button
                    type="button"
                    onClick={() => setBrowserTab('vampi')}
                    className={`px-2.5 py-1 rounded-t-lg text-[11px] font-mono flex items-center space-x-1 transition-all cursor-pointer ${
                      browserTab === 'vampi'
                        ? 'bg-[#141d2c] text-white font-bold border-t-2 border-cyan-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>VAmPI</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1.5 pl-2">
                  <button
                    type="button"
                    onClick={() => setActiveDesktopApp('terminal')}
                    className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10"
                    title="Switch to Terminal"
                  >
                    <TerminalIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Browser Address & Navigation Bar (Matching Screenshot) */}
              <div className="px-3 py-1.5 bg-[#141d2c] border-b border-white/5 flex items-center space-x-2 text-xs">
                <button
                  type="button"
                  onClick={() => alert('Navigated back in session')}
                  className="p-1 rounded hover:bg-white/10 text-gray-300"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Navigated forward in session')}
                  className="p-1 rounded hover:bg-white/10 text-gray-400"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setJuiceSearchQuery('');
                    setJuiceNotification('Browser viewport reloaded.');
                    setTimeout(() => setJuiceNotification(null), 2500);
                  }}
                  className="p-1 rounded hover:bg-white/10 text-gray-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* URL Bar (Editable/Interactive) */}
                <div className="flex-1 px-3 py-1 rounded-lg bg-[#0a1019] border border-white/10 flex items-center space-x-2 text-xs font-mono text-gray-200">
                  <Lock className="w-3 h-3 text-[#35E6B5] flex-shrink-0" />
                  <span className="truncate">
                    {browserTab === 'juiceshop'
                      ? 'juiceshop.example.com/#/'
                      : browserTab === 'dvwa'
                      ? 'dvwa.example.com/login.php'
                      : browserTab === 'webgoat'
                      ? 'webgoat.example.com/WebGoat'
                      : 'vampi.example.com/api'}
                  </span>
                </div>
              </div>

              {/* Browser Bookmarks Bar (Matching Screenshot Exactly) */}
              <div className="px-3 py-1 bg-[#0f1724] border-b border-black/40 flex items-center space-x-3 text-[10px] font-mono text-gray-300 overflow-x-auto custom-scrollbar flex-shrink-0">
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#35E6B5]" /> Kali Linux
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-sky-400" /> Kali Tools
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Folder className="w-3 h-3 text-amber-400" /> Kali Docs
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Globe className="w-3 h-3 text-violet-400" /> Kali Forums
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-emerald-400" /> Kali NetHunter
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1 text-amber-300">
                  <Zap className="w-3 h-3 text-amber-400" /> Exploit-DB
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Search className="w-3 h-3 text-cyan-400" /> Google Hacking DB
                </span>
                <span className="hover:text-white cursor-pointer flex items-center gap-1 text-[#35E6B5]">
                  <Key className="w-3 h-3 text-[#35E6B5]" /> OffSec
                </span>
              </div>

              {/* Browser Content Viewport */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#1c212c]">
                {/* ================= TAB CONTENT 1: OWASP JUICE SHOP (Matching Screenshot) ================= */}
                {browserTab === 'juiceshop' && (
                  <div className="min-h-full flex flex-col font-sans text-gray-100">
                    {/* Juice Shop Header (Matching Screenshot) */}
                    <header className="h-12 px-4 bg-[#414b5c] border-b border-black/30 flex items-center justify-between shadow-md">
                      <div className="flex items-center space-x-3">
                        <button type="button" className="text-white hover:opacity-80">
                          <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-1.5 font-bold tracking-tight text-white">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-xs font-mono font-bold">JS</span>
                          <span className="text-sm">OWASP Juice Shop</span>
                        </div>
                      </div>

                      {/* Search Bar in Juice Shop Header (Matching Screenshot) */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={juiceSearchQuery}
                            onChange={(e) => setJuiceSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-36 sm:w-56 pl-8 pr-3 py-1 rounded-md bg-[#2d3644] text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>

                        {/* Account & Language EN (Matching Screenshot) */}
                        <button
                          type="button"
                          onClick={() => alert('Juice Shop Cadets Account: cadet@redkross.internal')}
                          className="text-xs font-medium text-white hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>Account</span>
                        </button>

                        <span className="text-xs text-gray-300 font-mono px-2 py-0.5 rounded bg-black/20">
                          EN
                        </span>

                        {/* Shopping Basket Counter */}
                        <div className="relative cursor-pointer" onClick={() => alert(`Shopping basket contains ${juiceCartCount} items.`)}>
                          <ShoppingCart className="w-4 h-4 text-white" />
                          {juiceCartCount > 0 && (
                            <span className="absolute -top-2 -right-2 px-1 rounded-full bg-amber-400 text-black text-[9px] font-bold">
                              {juiceCartCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </header>

                    {/* Notification Toast */}
                    {juiceNotification && (
                      <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-mono">
                        {juiceNotification}
                      </div>
                    )}

                    {/* All Products Container (Matching Screenshot) */}
                    <div className="p-4 sm:p-6 flex-1 bg-[#232a36]">
                      <div className="max-w-4xl mx-auto space-y-4">
                        <div className="p-2.5 rounded-lg bg-[#2e3746] border border-white/5">
                          <h3 className="text-base font-bold text-gray-200">All Products</h3>
                        </div>

                        {/* Products Grid (Apple Juice & Apple Pomace matching screenshot) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {filteredJuiceProducts.map((product) => (
                            <div
                              key={product.id}
                              className="rounded-xl overflow-hidden bg-[#2e3746] border border-white/10 hover:border-amber-400/50 transition-all shadow-lg flex flex-col justify-between"
                            >
                              {/* Product Graphic Matching Reference Screenshot */}
                              <div className="aspect-video bg-white flex items-center justify-center p-3">
                                {product.image === 'pomace' ? (
                                  /* Apple Pomace illustrated cheese wheel + apples matching reference screenshot */
                                  <svg viewBox="0 0 200 140" className="w-36 h-24">
                                    {/* Plate/Dish */}
                                    <ellipse cx="90" cy="85" rx="55" ry="24" fill="#fdf6e2" stroke="#1f2937" strokeWidth="4" />
                                    <path d="M 35 85 C 35 105, 145 105, 145 85" fill="#f5e6c8" stroke="#1f2937" strokeWidth="4" />
                                    {/* Texture dots */}
                                    <ellipse cx="90" cy="82" rx="46" ry="18" fill="#fff8e7" />
                                    <circle cx="75" cy="80" r="2" fill="#d97706" opacity="0.6" />
                                    <circle cx="95" cy="78" r="2.5" fill="#d97706" opacity="0.6" />
                                    <circle cx="110" cy="83" r="2" fill="#d97706" opacity="0.6" />
                                    <circle cx="85" cy="88" r="2" fill="#d97706" opacity="0.6" />
                                    {/* Left Apple */}
                                    <ellipse cx="140" cy="98" rx="14" ry="13" fill="#ef4444" stroke="#1f2937" strokeWidth="3" />
                                    <path d="M 140 85 Q 142 80 145 77" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M 144 80 Q 152 78 152 83 Q 148 85 144 80" fill="#22c55e" stroke="#1f2937" strokeWidth="1.5" />
                                    {/* Right Apple */}
                                    <ellipse cx="160" cy="102" rx="13" ry="12" fill="#dc2626" stroke="#1f2937" strokeWidth="3" />
                                    <path d="M 160 90 Q 163 85 166 82" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M 164 85 Q 171 83 170 88 Q 167 90 164 85" fill="#22c55e" stroke="#1f2937" strokeWidth="1.5" />
                                  </svg>
                                ) : product.image === 'shirt' ? (
                                  /* RedKross T-Shirt */
                                  <svg viewBox="0 0 160 140" className="w-28 h-24">
                                    <path d="M 50 25 L 65 38 C 75 42, 85 42, 95 38 L 110 25 L 140 45 L 125 65 L 115 58 L 115 125 L 45 125 L 45 58 L 35 65 L 20 45 Z" fill="#1e293b" stroke="#35E6B5" strokeWidth="3" strokeLinejoin="round" />
                                    <circle cx="80" cy="75" r="14" fill="#0f172a" stroke="#35E6B5" strokeWidth="2" />
                                    <path d="M 74 75 L 86 75 M 80 69 L 80 81" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                                  </svg>
                                ) : (
                                  /* Apple Juice illustrated cup with straw + red apple matching reference screenshot */
                                  <svg viewBox="0 0 160 160" className="w-28 h-28">
                                    {/* Straw */}
                                    <path d="M 88 15 L 75 45 L 70 110" fill="none" stroke="#1f2937" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Cup Body */}
                                    <path d="M 45 50 L 55 125 C 56 130, 94 130, 95 125 L 105 50 Z" fill="#fef08a" stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
                                    {/* Liquid Fill */}
                                    <path d="M 48 65 L 56 122 C 58 126, 92 126, 94 122 L 102 65 Z" fill="#fde047" opacity="0.85" />
                                    {/* Cup Lid & Rim */}
                                    <ellipse cx="75" cy="50" rx="33" ry="8" fill="#e2e8f0" stroke="#1f2937" strokeWidth="4" />
                                    <ellipse cx="75" cy="47" rx="26" ry="6" fill="#f1f5f9" stroke="#1f2937" strokeWidth="2" />
                                    {/* Apple in front of cup */}
                                    <ellipse cx="108" cy="120" rx="19" ry="17" fill="#ef4444" stroke="#1f2937" strokeWidth="4" />
                                    <ellipse cx="102" cy="116" rx="4" ry="7" fill="#fca5a5" opacity="0.6" />
                                    {/* Apple Stem and Leaf */}
                                    <path d="M 108 103 Q 111 96 116 92" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
                                    <path d="M 113 97 Q 124 93 122 101 Q 117 103 113 97" fill="#22c55e" stroke="#1f2937" strokeWidth="2" />
                                  </svg>
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="p-3.5 flex flex-col justify-between flex-1">
                                <div>
                                  <div className="flex items-baseline justify-between">
                                    <h4 className="font-bold text-sm text-white">{product.name}</h4>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-amber-400 block pt-0.5">
                                    {product.price}{product.currency}
                                  </span>
                                  <p className="text-[11px] text-gray-300 pt-1 leading-relaxed">
                                    {product.description}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setJuiceCartCount((c) => c + 1);
                                    setJuiceNotification(`Added 1x ${product.name} to basket!`);
                                    setTimeout(() => setJuiceNotification(null), 2500);
                                  }}
                                  className="mt-3 w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  <span>Add to Basket</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= TAB CONTENT 2: DVWA ================= */}
                {browserTab === 'dvwa' && (
                  <div className="min-h-full p-4 sm:p-6 bg-[#f4f4f4] text-[#333] font-sans">
                    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                      {/* DVWA Header with Swoosh Logo */}
                      <div className="p-6 bg-[#2d3748] text-white flex items-center justify-between border-b-4 border-[#38a169]">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow">
                            <span className="text-xl font-black text-[#2d3748] tracking-tighter">DV<span className="text-[#38a169]">WA</span></span>
                          </div>
                          <div>
                            <h2 className="text-lg font-bold">Damn Vulnerable Web Application</h2>
                            <p className="text-xs text-gray-300">v1.10 *Development Baseline*</p>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#38a169]/20 text-[#38a169] border border-[#38a169]/40">
                          {dvwaIsLoggedIn ? 'AUTHENTICATED' : 'GUEST'}
                        </span>
                      </div>

                      {/* Login Form or Vulnerability Modules */}
                      {!dvwaIsLoggedIn ? (
                        <form onSubmit={handleDvwaLogin} className="p-6 space-y-4 font-mono text-xs">
                          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                            Default Lab Credentials: Username: <b>admin</b> | Password: <b>password</b>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-bold mb-1">Username</label>
                            <input
                              type="text"
                              value={dvwaUsername}
                              onChange={(e) => setDvwaUsername(e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38a169]"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-bold mb-1">Password</label>
                            <input
                              type="password"
                              value={dvwaPassword}
                              onChange={(e) => setDvwaPassword(e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38a169]"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-[#38a169] hover:bg-[#2f855a] text-white font-bold cursor-pointer shadow-md transition-colors"
                          >
                            Login to DVWA
                          </button>
                        </form>
                      ) : (
                        <div className="p-6 space-y-5">
                          {/* Top Controls */}
                          <div className="flex items-center justify-between border-b pb-3 text-xs font-mono">
                            <div className="flex items-center space-x-2">
                              <span>Security Level:</span>
                              <select
                                value={dvwaSecurityLevel}
                                onChange={(e) => setDvwaSecurityLevel(e.target.value)}
                                className="px-2 py-1 rounded border bg-gray-50 font-bold"
                              >
                                <option value="low">Low (Vulnerable)</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="impossible">Impossible (Secure)</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={() => setDvwaIsLoggedIn(false)}
                              className="text-rose-600 hover:underline font-bold"
                            >
                              Logout
                            </button>
                          </div>

                          {/* Vulnerability Module: SQL Injection */}
                          <div className="space-y-3 font-mono text-xs">
                            <h4 className="text-base font-bold text-gray-800 font-sans">
                              Vulnerability: SQL Injection
                            </h4>
                            <p className="text-gray-600 text-[11px]">
                              Enter a User ID to fetch database credentials. Test payload: <code className="bg-gray-100 px-1 py-0.5 rounded text-rose-600">1' OR '1'='1</code>
                            </p>

                            <form onSubmit={handleDvwaSqliSubmit} className="flex gap-2">
                              <input
                                type="text"
                                value={dvwaSqliId}
                                onChange={(e) => setDvwaSqliId(e.target.value)}
                                placeholder="User ID (e.g. 1)"
                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38a169]"
                              />
                              <button
                                type="submit"
                                className="px-5 py-2 rounded-lg bg-[#38a169] text-white font-bold cursor-pointer hover:bg-[#2f855a]"
                              >
                                Submit
                              </button>
                            </form>

                            {dvwaSqliResult && (
                              <div className="p-3 rounded-lg bg-gray-50 border space-y-1.5">
                                <span className="font-bold text-[#38a169] block">Database Output:</span>
                                {dvwaSqliResult.map((u, uIdx) => (
                                  <div key={uIdx} className="text-gray-700 text-[11px]">
                                    ID: <b>{u.id}</b> | First name: <b>{u.first_name}</b> | Surname: <b>{u.surname}</b>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= TAB CONTENT 3: WEBGOAT ================= */}
                {browserTab === 'webgoat' && (
                  <div className="p-6 font-mono text-xs text-gray-200 space-y-3">
                    <h3 className="text-lg font-bold text-emerald-400">OWASP WebGoat (Java Security Benchmark)</h3>
                    <p className="text-gray-300">Container Target: webgoat (10.10.11.130:8080/WebGoat)</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <span className="text-[#65F58A] font-bold block">Available Lesson Modules:</span>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>General: HTTP Basics & Developer Tools</li>
                        <li>Injection: SQL Injection (advanced), Path Traversal</li>
                        <li>Authentication: Password Reset Flaws, JWT Token Tampering</li>
                        <li>Cross-Site Scripting: DOM-based XSS, Stored XSS</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* ================= TAB CONTENT 4: VAMPI ================= */}
                {browserTab === 'vampi' && (
                  <div className="p-6 font-mono text-xs text-gray-200 space-y-3">
                    <h3 className="text-lg font-bold text-cyan-400">VAmPI (Vulnerable REST API Target)</h3>
                    <p className="text-gray-300">Container Target: vampi (10.10.11.140:5000/api)</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <span className="text-[#35E6B5] font-bold block">Test Endpoints:</span>
                      <div className="space-y-1 text-gray-300">
                        <div><code>GET /api/v1/users/v1</code> - BOLA / IDOR testing</div>
                        <div><code>POST /api/v1/users/login</code> - Token validation</div>
                        <div><code>GET /api/v1/books/v1</code> - SQL injection on books catalog</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WINDOW 2: IN-DESKTOP KALI ATTACKER TERMINAL (root@kali-sandbox) */}
          {(activeDesktopApp === 'terminal' || activeDesktopApp === 'both') && (
            <div
              className={`flex-1 flex flex-col rounded-xl overflow-hidden border border-[#65F58A]/35 bg-[#040906]/98 shadow-2xl transition-all ${
                activeDesktopApp === 'both' ? 'sm:w-1/2' : 'w-full'
              }`}
            >
              {/* Terminal Title Bar */}
              <div className="h-8 px-3 bg-[#08150e] border-b border-[#65F58A]/20 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#65F58A]" />
                  <span className="font-bold text-white text-[11px]">root@kali-sandbox : ~ (bash)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setActiveDesktopApp('browser')}
                    className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10"
                    title="Switch to Browser"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Lab Actions Bar */}
              <div className="px-3 py-1 bg-[#020704] border-b border-[#65F58A]/10 flex items-center space-x-1.5 overflow-x-auto custom-scrollbar flex-shrink-0 text-[10px] font-mono">
                <span className="text-[#72A88E] font-bold pr-1">QUICK:</span>
                <button
                  type="button"
                  onClick={() => runQuickCommand('lab status')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  lab status
                </button>
                <button
                  type="button"
                  onClick={() => runQuickCommand('lab targets')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  lab targets
                </button>
                <button
                  type="button"
                  onClick={() => runQuickCommand('nmap dvwa')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  nmap dvwa
                </button>
                <button
                  type="button"
                  onClick={() => runQuickCommand('nmap juice-shop')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  nmap juice
                </button>
                <button
                  type="button"
                  onClick={() => runQuickCommand('curl http://juice-shop')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  curl juice
                </button>
                <button
                  type="button"
                  onClick={() => runQuickCommand('sqlmap -u http://dvwa')}
                  className="px-2 py-0.5 rounded bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/20 cursor-pointer"
                >
                  sqlmap dvwa
                </button>
              </div>

              {/* Terminal Viewport */}
              <div
                ref={terminalScrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5 text-xs font-mono bg-black/95 select-text leading-relaxed"
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    {item.type === 'system' && (
                      <div className="text-[#72A88E] text-[11px] whitespace-pre-wrap leading-relaxed pb-1 border-b border-white/5">
                        {item.text}
                      </div>
                    )}
                    {item.type === 'command' && (
                      <div className="text-white font-bold text-[#65F58A] pt-1">
                        {item.text}
                      </div>
                    )}
                    {item.type === 'output' && (
                      <div className="text-gray-200 pl-2.5 border-l-2 border-[#65F58A]/40 whitespace-pre-wrap text-[11px] leading-relaxed overflow-x-auto custom-scrollbar">
                        {item.text}
                      </div>
                    )}
                    {item.type === 'error' && (
                      <div className="text-rose-400 pl-2.5 border-l-2 border-rose-500/50 whitespace-pre-wrap text-[11px]">
                        {item.text}
                      </div>
                    )}
                  </div>
                ))}

                {terminalExecuting && (
                  <div className="flex items-center space-x-2 text-[#65F58A] text-xs pt-1">
                    <span className="w-2 h-2 rounded-full bg-[#65F58A] animate-ping" />
                    <span>Executing on Kali attacker container...</span>
                  </div>
                )}
              </div>

              {/* Terminal Input Bar */}
              <form
                onSubmit={handleTerminalSubmit}
                className="p-2.5 bg-[#05140e] border-t border-[#65F58A]/20 flex items-center space-x-2"
              >
                <span className="text-[#65F58A] font-bold text-xs select-none">root@kali:~#</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  disabled={terminalExecuting}
                  placeholder="Type 'lab status', 'lab targets', or any Kali command..."
                  className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-[#72A88E]/40"
                  autoFocus
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={terminalExecuting || !terminalInput.trim()}
                  className="px-2.5 py-1 rounded bg-[#65F58A] text-[#071018] text-xs font-bold hover:bg-[#35E6B5] transition-colors cursor-pointer"
                >
                  Enter
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ================= 5. DESKTOP BOTTOM TELEMETRY FOOTER ================= */}
      <div className="h-7 px-4 bg-[#080d16] border-t border-[#35E6B5]/20 flex items-center justify-between text-[10px] font-mono text-[#72A88E] flex-shrink-0">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-[#35E6B5] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35E6B5] animate-pulse" />
            <span>KALI SANDBOX : ONLINE</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">RAM: 3.0 GB Allocated</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">7 Containers Healthy</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[9px] text-[#72A88E]/80 uppercase tracking-wider font-semibold">
            REDKROSS RESEARCH FOUNDATION
          </span>
        </div>
      </div>
    </div>
  );
}
