import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Power,
  RefreshCw,
  Sliders,
  Star,
  Check,
  FileText,
  Layers,
  Eye,
  Activity,
  CornerDownLeft,
  Monitor
} from 'lucide-react';
import {
  CYBER_LAB_CONTAINERS,
  JUICE_SHOP_PRODUCTS,
  executeCyberLabCommand
} from '../../data/cyberLabEngine';
import {
  CYBER_COMMAND_VAULT,
  searchCyberCommands
} from '../../data/cybersecurityCommandVault';

/**
 * Official Kali Linux Vector Logo Component
 * Matches the official Kali dragon and typography from reference media_1793648008671_b35f1ce3.png:
 * - Crisp white dragon silhouette with 3 wing spines, curved neck, sharp head & tail
 * - Bold "KALI" (white) + vibrant electric cyan "LINUX(R)" (#00AEEF)
 */
export function OfficialKaliLogo({ className = 'h-10', showText = true, isCompact = false }) {
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Official Kali Dragon Vector Mark */}
      <svg
        viewBox="0 0 120 100"
        className="h-full w-auto filter drop-shadow-[0_0_12px_rgba(0,174,239,0.35)] flex-shrink-0"
        fill="currentColor"
      >
        {/* Dragon 3 Wings */}
        <path
          d="M 10 24 C 30 18, 55 22, 68 38 C 50 32, 28 34, 12 40 C 28 38, 52 42, 64 54 C 45 49, 25 52, 14 58 C 30 55, 52 60, 62 70"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dragon Loop Neck & Head */}
        <path
          d="M 68 38 C 76 46, 85 45, 92 48 C 96 42, 92 38, 90 36 C 96 36, 102 42, 108 46 C 114 50, 110 54, 104 53 C 98 52, 92 56, 84 52 C 78 48, 70 44, 62 48 C 54 54, 52 66, 56 74 C 62 84, 76 86, 82 92 C 86 96, 84 100, 80 100 C 74 98, 68 94, 64 88 C 56 78, 52 70, 50 58 C 48 44, 56 34, 68 38 Z"
          fill="#FFFFFF"
        />
        {/* Dragon Eye / Horn accent */}
        <path
          d="M 94 44 L 98 40 L 96 46 Z"
          fill="#00AEEF"
        />
      </svg>

      {/* Official Kali Linux Typography */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-sans">
          <span className="text-xl font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            KALI
          </span>
          <span className="text-xl font-black text-[#00AEEF] ml-1.5 tracking-wider drop-shadow-[0_0_8px_rgba(0,174,239,0.5)]">
            LINUX
          </span>
          <span className="text-[10px] font-bold text-[#00AEEF] ml-0.5 align-super">
            ®
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Authentic Kali Linux Desktop GUI & KasmVNC Remote Workspace
 * Engineered to match official Kali Linux 2024 / XFCE4 desktop from user reference images.
 */
export default function CyberLabDesktopWindow({
  isOpen,
  onClose,
  isMinimized,
  onMinimize,
  onRestore
}) {
  // Sizing & Position State
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 80, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });

  // Boot Screen State (Authentic system startup on first load or reboot)
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(15);
  const [bootLogLines, setBootLogLines] = useState([
    '[  OK  ] Started systemd-udevd.service - Device Events Manager.',
    '[  OK  ] Initializing lab-isolated bridge (Subnet: 10.10.11.0/24)...'
  ]);

  // Active Applications on Desktop Canvas
  const [activeWindow, setActiveWindow] = useState('terminal'); // 'terminal' | 'browser' | 'split'
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isWhiskerMenuOpen, setIsWhiskerMenuOpen] = useState(false);
  const [whiskerSearch, setWhiskerSearch] = useState('');
  const [whiskerCategory, setWhiskerCategory] = useState('favorites');

  // Desktop Context Menu (Right Click)
  const [contextMenu, setContextMenu] = useState(null); // { x, y }

  // In-Desktop Web Browser (Target Range: Juice Shop, DVWA, WebGoat, VAmPI)
  const [browserTab, setBrowserTab] = useState('juiceshop'); // 'juiceshop' | 'dvwa' | 'webgoat' | 'vampi'
  const [juiceSearchQuery, setJuiceSearchQuery] = useState('');
  const [juiceCartCount, setJuiceCartCount] = useState(0);
  const [juiceNotification, setJuiceNotification] = useState(null);

  // DVWA Interactive States
  const [dvwaUsername, setDvwaUsername] = useState('admin');
  const [dvwaPassword, setDvwaPassword] = useState('password');
  const [dvwaIsLoggedIn, setDvwaIsLoggedIn] = useState(false);
  const [dvwaSecurityLevel, setDvwaSecurityLevel] = useState('low');
  const [dvwaSqliId, setDvwaSqliId] = useState('1');
  const [dvwaSqliResult, setDvwaSqliResult] = useState(null);

  // In-Desktop Kali Terminal State (Authentic fastfetch neofetch on launch)
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'neofetch',
      text: `...............-*-............      linuxiac@kali
............:***:...............     -------------
...........+****-...............     OS: Kali GNU/Linux Rolling x86_64
..........+*****-...............     Host: KVM/QEMU Standard PC (Q35 + ICH9)
.........-******:...............     Kernel: Linux 6.19.14-kali-amd64
........:*******+...............     Uptime: 4 mins
.......-*********:..............     Packages: 2879 (dpkg)
......:***********:.............     Shell: zsh 5.9
.....-*************:............     Display (QEMU Monitor): 1680x1050
....:***************:...........     DE: Xfce4 4.20
...-*****************:..........     WM: Xfwm4 (X11)
..:*******************:.........     WM Theme: Kali-Dark
.-*********************:........     Terminal: qterminal 2.4.0
:***********************:.......     Terminal Font: FiraCode (10pt)
.:::::::::::::::::::::::........     Local IP (eth0): 10.10.11.100/24
................................     Network: lab-isolated (7 Containers)
                                     Memory: 887.32 MiB / 3.83 GiB (23%)`
    }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalExecuting, setTerminalExecuting] = useState(false);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState(0);
  const terminalScrollRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Center window on initial viewport mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultX = Math.max(16, Math.floor((window.innerWidth - 960) / 2));
      const defaultY = Math.max(36, Math.floor((window.innerHeight - 640) / 2) - 10);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);

  // Boot sequence simulation
  useEffect(() => {
    if (!isOpen) return;
    if (isBooting) {
      setBootProgress(15);
      const timer1 = setTimeout(() => {
        setBootProgress(45);
        setBootLogLines((prev) => [
          ...prev,
          '[  OK  ] Started KasmVNC 1.3.2 High-Performance Remote Display Server (:1).',
          '[  OK  ] Mounting /dev/sda1 on / (ext4, rw, relatime)...'
        ]);
      }, 350);

      const timer2 = setTimeout(() => {
        setBootProgress(78);
        setBootLogLines((prev) => [
          ...prev,
          '[  OK  ] Started LightDM Display Manager & XFCE 4.20 Session.',
          '[  OK  ] Initialized 7 Target Containers (Juice Shop, DVWA, WebGoat, VAmPI).'
        ]);
      }, 750);

      const timer3 = setTimeout(() => {
        setBootProgress(100);
        setBootLogLines((prev) => [
          ...prev,
          '[  OK  ] Reached target Graphical Interface.',
          '[  OK  ] CyberLab V3 Desktop Ready.'
        ]);
      }, 1100);

      const timer4 = setTimeout(() => {
        setIsBooting(false);
      }, 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isOpen, isBooting]);

  // Restart / Reboot Kali function
  const handleRebootKali = () => {
    setIsBooting(true);
    setBootProgress(10);
    setBootLogLines([
      '[  OK  ] Restarting Kali Linux system...',
      '[  OK  ] Resetting KasmVNC display buffer...'
    ]);
    setIsWhiskerMenuOpen(false);
    setContextMenu(null);
  };

  // Close context menu on global click
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('#desktop-context-menu')) {
        setContextMenu(null);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory, terminalExecuting]);

  // Pointer dragging handlers for title bar
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
    const newY = Math.max(30, Math.min(window.innerHeight - 150, dragRef.current.initialPosY + deltaY));

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

  // Desktop Right Click handler
  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bounds = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const clickY = e.clientY - bounds.top;

    setContextMenu({
      x: Math.min(clickX, bounds.width - 220),
      y: Math.min(clickY, bounds.height - 240)
    });
  };

  // Curved Autocomplete Suggestions (Triggers on typing even 1 character)
  const suggestions = useMemo(() => {
    const q = terminalInput.trim().toLowerCase();
    if (!q) return [];

    const matches = [];

    // 1. Lab CLI commands
    const labCommands = [
      { cmd: 'lab status', desc: 'Inspect all 7 isolated lab containers', cat: 'Lab' },
      { cmd: 'lab targets', desc: 'Display target matrix, IPs & ports', cat: 'Lab' },
      { cmd: 'lab start', desc: 'Boot isolated containers on lab-isolated', cat: 'Lab' },
      { cmd: 'lab stop', desc: 'Gracefully suspend lab containers', cat: 'Lab' },
      { cmd: 'lab reset', desc: 'Purge volatile state and restore clean sandbox', cat: 'Lab' },
      { cmd: 'lab open juice', desc: 'Open OWASP Juice Shop in Chromium', cat: 'Lab' },
      { cmd: 'lab open dvwa', desc: 'Open Damn Vulnerable Web App (DVWA)', cat: 'Lab' },
      { cmd: 'lab open webgoat', desc: 'Open OWASP WebGoat lesson portal', cat: 'Lab' },
      { cmd: 'lab open vampi', desc: 'Open VAmPI vulnerable REST API', cat: 'Lab' },
      { cmd: 'nmap dvwa', desc: 'Port scan DVWA target (10.10.11.110)', cat: 'Recon' },
      { cmd: 'nmap juice-shop', desc: 'Port scan Juice Shop target (10.10.11.120)', cat: 'Recon' },
      { cmd: 'curl http://juice-shop', desc: 'Inspect HTTP response headers', cat: 'Web' },
      { cmd: 'sqlmap -u http://dvwa', desc: 'Automate SQL injection on DVWA', cat: 'Exploit' },
      { cmd: 'gobuster dir -u http://dvwa', desc: 'Enumerate directories and files', cat: 'Web' },
      { cmd: 'nikto -h dvwa', desc: 'Run web server vulnerability scan', cat: 'Web' },
      { cmd: 'ping -c 3 dvwa', desc: 'Verify ICMP reachability on subnet', cat: 'Network' },
      { cmd: 'tcpdump -nn -i any', desc: 'Capture live traffic on lab bridge', cat: 'Network' },
      { cmd: 'neofetch', desc: 'Display Kali Linux system info & ASCII dragon', cat: 'System' }
    ];

    labCommands.forEach((c) => {
      if (c.cmd.toLowerCase().startsWith(q) || c.cmd.toLowerCase().includes(q)) {
        matches.push({
          id: `lab_${c.cmd}`,
          command: c.cmd,
          name: c.cmd,
          category: c.cat,
          description: c.desc
        });
      }
    });

    // 2. Verified 340+ Cyber Commands
    const vaultMatches = searchCyberCommands({ query: q }).slice(0, 8);
    vaultMatches.forEach((vc) => {
      if (!matches.some((m) => m.command === vc.command)) {
        matches.push({
          id: vc.id,
          command: vc.command,
          name: vc.name,
          category: vc.categoryName || 'Cyber',
          description: vc.description
        });
      }
    });

    return matches.slice(0, 6);
  }, [terminalInput]);

  // Terminal submission
  const handleTerminalSubmit = (e) => {
    e?.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `┌──(kali㉿kali)-[~]\n└─$ ${cmd}` }
    ]);
    setTerminalInput('');
    setTerminalExecuting(true);

    setTimeout(() => {
      if (cmd.toLowerCase() === 'clear') {
        setTerminalHistory([]);
        setTerminalExecuting(false);
        return;
      }

      if (cmd.toLowerCase() === 'neofetch' || cmd.toLowerCase() === 'fastfetch') {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: 'neofetch',
            text: `...............-*-............      linuxiac@kali
............:***:...............     -------------
...........+****-...............     OS: Kali GNU/Linux Rolling x86_64
..........+*****-...............     Host: KVM/QEMU Standard PC (Q35 + ICH9)
.........-******:...............     Kernel: Linux 6.19.14-kali-amd64
........:*******+...............     Uptime: 4 mins
.......-*********:..............     Packages: 2879 (dpkg)
......:***********:.............     Shell: zsh 5.9
.....-*************:............     DE: Xfce4 4.20
..:*******************:.........     WM: Xfwm4 (Kali-Dark)
.-*********************:........     Terminal: qterminal 2.4.0
:***********************:.......     Local IP (eth0): 10.10.11.100/24
.:::::::::::::::::::::::........     Memory: 887.32 MiB / 3.83 GiB (23%)`
          }
        ]);
        setTerminalExecuting(false);
        return;
      }

      const res = executeCyberLabCommand(cmd, {
        onOpenTarget: (alias) => {
          if (alias === 'juice' || alias === 'juiceshop') {
            setBrowserTab('juiceshop');
            setActiveWindow('browser');
          } else if (alias === 'dvwa') {
            setBrowserTab('dvwa');
            setActiveWindow('browser');
          } else if (alias === 'webgoat') {
            setBrowserTab('webgoat');
            setActiveWindow('browser');
          } else if (alias === 'vampi') {
            setBrowserTab('vampi');
            setActiveWindow('browser');
          }
        }
      });

      setTerminalHistory((prev) => [
        ...prev,
        { type: res.isError ? 'error' : 'output', text: res.output }
      ]);
      setTerminalExecuting(false);
    }, 180);
  };

  // Keyboard navigation for suggestions
  const handleTerminalKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIdx((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const chosen = suggestions[selectedSuggestionIdx] || suggestions[0];
        if (chosen) {
          setTerminalInput(chosen.command);
        }
        return;
      }
    }
  };

  // Run quick helper command
  const runQuickCommand = (cmd) => {
    setTerminalInput(cmd);
    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `┌──(kali㉿kali)-[~]\n└─$ ${cmd}` }
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
      alert('Login failed. Default credentials: admin / password');
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

  // MITRE / Kali categories from reference image media_1793648025254_f2a4f11b.png
  const WHISKER_CATEGORIES = [
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'recent', label: 'Recently Used', icon: Clock },
    { id: 'all', label: 'All Applications', icon: Layers },
    { id: 'recon', label: '01 - Reconnaissance', icon: Eye },
    { id: 'initial', label: '03 - Initial Access', icon: Key },
    { id: 'execution', label: '04 - Execution', icon: Zap },
    { id: 'privesc', label: '06 - Privilege Escalation', icon: Shield },
    { id: 'creds', label: '08 - Credential Access', icon: Lock },
    { id: 'discovery', label: '09 - Discovery', icon: Search },
    { id: 'lateral', label: '10 - Lateral Movement', icon: Activity },
    { id: 'c2', label: '12 - Command and Control', icon: Wifi },
    { id: 'forensics', label: '15 - Forensics', icon: HardDrive }
  ];

  if (!isOpen) return null;

  // Minimized Floating Pill at Bottom Dock
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-24 z-50 animate-fadeIn">
        <button
          type="button"
          onClick={onRestore}
          className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#081220]/95 border border-[#00AEEF]/50 text-white shadow-[0_0_30px_rgba(0,174,239,0.4)] hover:scale-105 transition-all cursor-pointer font-sans"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF] animate-pulse" />
          <OfficialKaliLogo className="h-6" showText={false} />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wide">Kali Linux Desktop (VNC)</span>
            <span className="text-[10px] font-mono text-[#00AEEF]">10.10.11.100 - ONLINE</span>
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
      className={`fixed z-50 flex flex-col font-sans select-none overflow-hidden transition-all duration-150 ${
        isMaximized
          ? 'inset-0 w-screen h-screen rounded-none shadow-none border-none'
          : 'w-[95vw] sm:w-[940px] h-[620px] rounded-2xl max-w-[calc(100vw-20px)] max-h-[calc(100vh-36px)] shadow-[0_30px_80px_rgba(0,0,0,0.95)] border border-[#00AEEF]/35'
      } bg-[#060c16] backdrop-blur-2xl`}
    >
      {/* ================= 1. KASMVNC REMOTE DESKTOP TOP BAR ================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="h-10 px-3 bg-[#081322] border-b border-[#00AEEF]/25 flex items-center justify-between cursor-move flex-shrink-0 z-30"
      >
        {/* Left: Window Control Traffic Lights */}
        <div className="flex items-center space-x-2">
          {/* Close Window */}
          <button
            type="button"
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Close Kali Remote Session"
          >
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>

          {/* Minimize Window */}
          <button
            type="button"
            onClick={onMinimize}
            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Minimize to Bottom Dock"
          >
            <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>

          {/* Maximize / Fullscreen Window */}
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title={isMaximized ? 'Restore to Medium' : 'Maximize to Fullscreen'}
          >
            <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* KasmVNC Connection Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-[#0e2238] border border-[#00AEEF]/30 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            <span className="font-bold text-[#00AEEF]">KasmVNC</span>
            <span className="text-gray-300">:1 (10.10.11.100)</span>
          </div>
        </div>

        {/* Center: Official Kali Linux Logo Branding (From Image 2) */}
        <div className="flex items-center justify-center pointer-events-none">
          <OfficialKaliLogo className="h-5" showText={true} />
        </div>

        {/* Right: Telemetry & Window Actions */}
        <div className="flex items-center space-x-2">
          {/* Latency & Mode */}
          <span className="hidden md:inline text-[10px] font-mono text-[#00AEEF] px-2 py-0.5 rounded bg-black/40 border border-[#00AEEF]/20">
            60 FPS | 8ms
          </span>

          {/* Reboot Kali Trigger */}
          <button
            type="button"
            onClick={handleRebootKali}
            className="px-2 py-1 rounded-lg bg-[#0e2238] hover:bg-[#163658] border border-white/10 text-gray-200 hover:text-white text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
            title="Restart Kali OS & Re-run Boot Screen"
          >
            <RefreshCw className="w-3 h-3 text-[#00AEEF]" />
            <span className="hidden sm:inline">Reboot</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 rounded-lg bg-[#0e2238] hover:bg-[#163658] border border-white/10 text-gray-200 hover:text-white transition-colors cursor-pointer"
            title={isMaximized ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <Monitor className="w-3.5 h-3.5 text-[#00AEEF]" />
          </button>
        </div>
      </div>

      {/* ================= 2. BOOT SCREEN (If Starting / Rebooting) ================= */}
      {isBooting ? (
        <div className="flex-1 bg-[#050810] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden animate-fadeIn">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.15),transparent_70%)] pointer-events-none" />

          {/* Skip Boot Button */}
          <button
            type="button"
            onClick={() => setIsBooting(false)}
            className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white cursor-pointer"
          >
            Skip Boot [ESC]
          </button>

          {/* Centered Kali Linux Official Logo (Image 2) */}
          <div className="space-y-6 max-w-md w-full flex flex-col items-center">
            <OfficialKaliLogo className="h-20" showText={true} />

            <p className="text-xs font-mono text-[#00AEEF] tracking-widest uppercase">
              The Most Advanced Penetration Testing Distribution
            </p>

            {/* Glowing Cyan Boot Progress Bar */}
            <div className="w-full bg-[#0a1626] rounded-full h-2 p-0.5 border border-[#00AEEF]/40 shadow-[0_0_15px_rgba(0,174,239,0.3)]">
              <div
                className="bg-gradient-to-r from-[#00AEEF] to-[#35E6B5] h-full rounded-full transition-all duration-300"
                style={{ width: `${bootProgress}%` }}
              />
            </div>

            {/* Real Systemd Boot Logs */}
            <div className="w-full text-left bg-black/60 rounded-xl p-3 border border-white/10 font-mono text-[10px] space-y-1 text-gray-300 max-h-28 overflow-hidden shadow-inner">
              {bootLogLines.map((log, lIdx) => (
                <div key={lIdx} className="truncate">
                  <span className="text-[#35E6B5] font-bold">[  OK  ]</span>{' '}
                  <span>{log.replace(/\[\s+OK\s+\]\s*/, '')}</span>
                </div>
              ))}
            </div>

            <span className="text-[10px] font-mono text-gray-400 animate-pulse">
              Initializing KasmVNC XFCE4 Display Server...
            </span>
          </div>
        </div>
      ) : (
        /* ================= 3. AUTHENTIC KALI LINUX XFCE DESKTOP ================= */
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#07111e]">
          {/* Top XFCE Panel (From User Reference Image 3) */}
          <div className="h-7 px-2.5 bg-[#0a1320] border-b border-black/50 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0 z-20">
            {/* Left: Kali Application Menu + Quick Launchers + Workspaces */}
            <div className="flex items-center space-x-1.5">
              {/* Kali Dragon Menu Trigger (From Image 3) */}
              <button
                type="button"
                onClick={() => setIsWhiskerMenuOpen(!isWhiskerMenuOpen)}
                className={`px-2 py-0.5 rounded flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  isWhiskerMenuOpen
                    ? 'bg-[#00AEEF] text-black font-bold'
                    : 'bg-[#10233b] text-white hover:bg-[#183559] border border-white/10'
                }`}
                title="Kali Whisker Application Menu"
              >
                <OfficialKaliLogo className="h-4" showText={false} />
                <span className="text-[11px] font-bold hidden sm:inline">Kali</span>
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              {/* Quick Launchers: Terminal, Web Browser, File Manager */}
              <button
                type="button"
                onClick={() => setActiveWindow('terminal')}
                className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  activeWindow === 'terminal' || activeWindow === 'split' ? 'text-[#00AEEF]' : 'text-gray-400'
                }`}
                title="Open Kali Terminal Emulator"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveWindow('browser')}
                className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  activeWindow === 'browser' || activeWindow === 'split' ? 'text-[#00AEEF]' : 'text-gray-400'
                }`}
                title="Open Web Browser (Target Range)"
              >
                <Globe className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => runQuickCommand('lab targets')}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Target Matrix (Thunar)"
              >
                <Folder className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              {/* Workspaces 1 2 3 4 (Matching Image 3) */}
              <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4].map((ws) => (
                  <button
                    key={ws}
                    type="button"
                    onClick={() => setActiveWorkspace(ws)}
                    className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                      activeWorkspace === ws
                        ? 'bg-[#1b436e] text-[#00AEEF] border border-[#00AEEF]/60'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {ws}
                  </button>
                ))}
              </div>

              {/* Active Window Taskbar Button */}
              <div className="hidden sm:flex items-center space-x-1 pl-2">
                <button
                  type="button"
                  onClick={() => setActiveWindow('terminal')}
                  className={`px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border cursor-pointer ${
                    activeWindow === 'terminal'
                      ? 'bg-[#14283f] text-white border-white/20 font-bold'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <TerminalIcon className="w-3 h-3 text-[#35E6B5]" />
                  <span>qterminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWindow('browser')}
                  className={`px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border cursor-pointer ${
                    activeWindow === 'browser'
                      ? 'bg-[#14283f] text-white border-white/20 font-bold'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3 h-3 text-[#00AEEF]" />
                  <span>Chromium ({browserTab})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWindow(activeWindow === 'split' ? 'terminal' : 'split')}
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    activeWindow === 'split'
                      ? 'bg-[#00AEEF] text-black font-bold border-[#00AEEF]'
                      : 'border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  Split View
                </button>
              </div>
            </div>

            {/* Right Side: System Tray + Clock 12:43 (Matching Image 3) */}
            <div className="flex items-center space-x-2.5 text-gray-300">
              <div className="hidden sm:flex items-center space-x-2 text-[10px] text-[#00AEEF]">
                <Cpu className="w-3 h-3" />
                <span>2.4 GHz</span>
                <Wifi className="w-3 h-3 text-[#35E6B5]" />
                <Volume2 className="w-3 h-3 text-gray-300" />
              </div>

              {/* Clock: 12:43 (From Image 3) */}
              <div className="flex items-center space-x-1 text-white font-bold text-[11px] px-1.5 py-0.5 rounded bg-black/40">
                <Clock className="w-3 h-3 text-[#00AEEF]" />
                <span>12:43</span>
              </div>

              <span className="text-[10px] font-bold text-gray-300 px-1 rounded bg-[#10233b]">kali</span>
            </div>
          </div>

          {/* Desktop Canvas (Deep Blue Geometric Crystalline Wallpaper from Image 3) */}
          <div
            onContextMenu={handleDesktopContextMenu}
            className="flex-1 relative overflow-hidden flex bg-[#081324] select-none"
          >
            {/* Authentic Crystalline Polygon Kali Wallpaper Background (Image 3) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Shaded 3D Facet Polygons */}
              <svg viewBox="0 0 1200 800" className="w-full h-full object-cover opacity-60">
                <defs>
                  <linearGradient id="poly1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0c1d35" />
                    <stop offset="100%" stopColor="#060e1b" />
                  </linearGradient>
                  <linearGradient id="poly2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#142e54" />
                    <stop offset="100%" stopColor="#0a182d" />
                  </linearGradient>
                  <linearGradient id="poly3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a3d6f" />
                    <stop offset="100%" stopColor="#102543" />
                  </linearGradient>
                  <linearGradient id="polyHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* 3D Crystal facet planes */}
                <polygon points="0,0 450,0 350,380 0,250" fill="url(#poly1)" />
                <polygon points="450,0 850,0 720,280 350,380" fill="url(#poly2)" />
                <polygon points="850,0 1200,0 1200,420 720,280" fill="url(#poly1)" />
                <polygon points="0,250 350,380 200,680 0,600" fill="url(#poly2)" />
                <polygon points="350,380 720,280 620,620 200,680" fill="url(#poly3)" />
                <polygon points="720,280 1200,420 1020,700 620,620" fill="url(#poly2)" />
                <polygon points="200,680 620,620 540,800 0,800" fill="url(#poly1)" />
                <polygon points="620,620 1020,700 1200,800 540,800" fill="url(#poly3)" />
                <polygon points="350,380 500,200 720,280 620,620" fill="url(#polyHighlight)" />
              </svg>

              {/* Embossed White Kali Dragon Motif in Crystal Center (Image 3) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <OfficialKaliLogo className="h-80" showText={false} />
              </div>
            </div>

            {/* Left Desktop Shortcuts Stack (Home, File System, Trash from Image 3) */}
            <div className="absolute left-3 top-3 z-10 flex flex-col space-y-4">
              {/* Home */}
              <button
                type="button"
                onClick={() => setActiveWindow('terminal')}
                className="flex flex-col items-center group cursor-pointer w-16 p-1 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center text-[#00AEEF] shadow-lg group-hover:scale-105 transition-transform">
                  <Folder className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-sans text-white text-center mt-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Home
                </span>
              </button>

              {/* File System */}
              <button
                type="button"
                onClick={() => runQuickCommand('lab targets')}
                className="flex flex-col items-center group cursor-pointer w-16 p-1 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1b3b64] border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  <HardDrive className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <span className="text-[11px] font-sans text-white text-center mt-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  File System
                </span>
              </button>

              {/* Trash */}
              <button
                type="button"
                onClick={() => alert('Trash is empty.')}
                className="flex flex-col items-center group cursor-pointer w-16 p-1 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#13253b] border border-white/10 flex items-center justify-center text-gray-300 shadow-lg group-hover:scale-105 transition-transform">
                  <Trash2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-sans text-white text-center mt-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  Trash
                </span>
              </button>
            </div>

            {/* Desktop Canvas Window Workspace Area */}
            <div className="flex-1 p-2 sm:p-4 flex gap-3 relative z-10 overflow-hidden">
              {/* ================= DESKTOP WINDOW 1: AUTHENTIC KALI TERMINAL (Image 3) ================= */}
              {(activeWindow === 'terminal' || activeWindow === 'split') && (
                <div
                  className={`flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/40 bg-[#070e18]/95 shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all ${
                    activeWindow === 'split' ? 'w-1/2' : 'w-full'
                  }`}
                >
                  {/* Terminal Menubar & Header (Matching Image 3: Session Actions Edit View Help) */}
                  <div className="h-8 px-3 bg-[#0a1524] border-b border-[#00AEEF]/20 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      <TerminalIcon className="w-3.5 h-3.5 text-[#00AEEF]" />
                      <span className="font-bold text-white text-[11px]">kali@kali: ~</span>
                      <div className="hidden sm:flex items-center space-x-2 text-[10px] text-gray-400 pl-2">
                        <span className="hover:text-white cursor-pointer">Session</span>
                        <span className="hover:text-white cursor-pointer">Actions</span>
                        <span className="hover:text-white cursor-pointer">Edit</span>
                        <span className="hover:text-white cursor-pointer">View</span>
                        <span className="hover:text-white cursor-pointer">Help</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveWindow('browser')}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#122842] text-gray-200 hover:text-white hover:bg-[#1b3d64] cursor-pointer"
                        title="Switch to Browser"
                      >
                        Open Browser
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
                      onClick={() => runQuickCommand('nmap juice-shop')}
                      className="px-2 py-0.5 rounded bg-[#0b1c30] border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/20 cursor-pointer"
                    >
                      nmap juice
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
                    className="flex-1 overflow-y-auto p-3 space-y-2 text-xs font-mono bg-black/90 select-text leading-relaxed"
                  >
                    {terminalHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        {item.type === 'neofetch' && (
                          <div className="text-gray-200 text-[11px] whitespace-pre-wrap leading-tight border-b border-white/10 pb-2">
                            <span className="text-[#00AEEF]">{item.text.slice(0, 500)}</span>
                            <span>{item.text.slice(500)}</span>
                            {/* Color blocks palette (From Image 3) */}
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

                  {/* CURVED AUTOCOMPLETE SUGGESTIONS POPOVER (User prompt: curved suggestion pills on letter type) */}
                  {suggestions.length > 0 && !terminalExecuting && (
                    <div className="px-3 py-2 bg-[#091626] border-t border-[#00AEEF]/30 animate-fadeIn">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#00AEEF] pb-1.5">
                        <span className="font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> COMMAND SUGGESTIONS (TAB OR CLICK TO INSERT):
                        </span>
                        <span className="text-gray-400">{suggestions.length} MATCHES</span>
                      </div>
                      {/* Curved Suggestion Pills */}
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

                  {/* Terminal Input Bar with Kali Prompt (┌──(kali㉿kali)-[~]\n└─$) */}
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
                      placeholder="Type any command (e.g. nmap, lab status, curl)..."
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
              )}

              {/* ================= DESKTOP WINDOW 2: AUTHENTIC CHROMIUM WEB BROWSER ================= */}
              {(activeWindow === 'browser' || activeWindow === 'split') && (
                <div
                  className={`flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/30 bg-[#162132] shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all ${
                    activeWindow === 'split' ? 'w-1/2' : 'w-full'
                  }`}
                >
                  {/* Browser Window Titlebar & Target Tabs */}
                  <div className="h-9 px-3 bg-[#0d1828] border-b border-black/40 flex items-center justify-between text-xs flex-shrink-0">
                    <div className="flex items-center space-x-1 overflow-x-auto">
                      {/* OWASP Juice Shop Tab */}
                      <button
                        type="button"
                        onClick={() => setBrowserTab('juiceshop')}
                        className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                          browserTab === 'juiceshop'
                            ? 'bg-[#1e2d42] text-white font-bold border-t-2 border-amber-400'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>OWASP Juice Shop</span>
                      </button>

                      {/* DVWA Tab */}
                      <button
                        type="button"
                        onClick={() => setBrowserTab('dvwa')}
                        className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                          browserTab === 'dvwa'
                            ? 'bg-[#1e2d42] text-white font-bold border-t-2 border-emerald-400'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>DVWA</span>
                      </button>

                      {/* WebGoat Tab */}
                      <button
                        type="button"
                        onClick={() => setBrowserTab('webgoat')}
                        className={`px-2.5 py-1 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                          browserTab === 'webgoat'
                            ? 'bg-[#1e2d42] text-white font-bold border-t-2 border-[#00AEEF]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        WebGoat
                      </button>

                      {/* VAmPI Tab */}
                      <button
                        type="button"
                        onClick={() => setBrowserTab('vampi')}
                        className={`px-2.5 py-1 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                          browserTab === 'vampi'
                            ? 'bg-[#1e2d42] text-white font-bold border-t-2 border-cyan-400'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        VAmPI
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveWindow('terminal')}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#122842] text-gray-200 hover:text-white cursor-pointer"
                    >
                      Terminal
                    </button>
                  </div>

                  {/* Browser Address & Navigation Bar */}
                  <div className="px-3 py-1.5 bg-[#121f30] border-b border-black/30 flex items-center space-x-2 text-xs">
                    <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setJuiceNotification('Browser viewport reloaded.');
                        setTimeout(() => setJuiceNotification(null), 2000);
                      }}
                      className="p-1 rounded hover:bg-white/10 text-gray-300 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    {/* URL Bar */}
                    <div className="flex-1 px-3 py-1 rounded-lg bg-[#09121d] border border-white/10 flex items-center space-x-2 text-xs font-mono text-gray-200">
                      <Lock className="w-3 h-3 text-[#35E6B5]" />
                      <span className="truncate">
                        {browserTab === 'juiceshop'
                          ? 'http://10.10.11.120:3000/#/'
                          : browserTab === 'dvwa'
                          ? 'http://10.10.11.110/login.php'
                          : browserTab === 'webgoat'
                          ? 'http://10.10.11.130:8080/WebGoat'
                          : 'http://10.10.11.140:5000/api'}
                      </span>
                    </div>
                  </div>

                  {/* Browser Bookmarks Bar (Matching Official Kali Chromium) */}
                  <div className="px-3 py-1 bg-[#0b1420] border-b border-black/40 flex items-center space-x-3 text-[10px] font-mono text-gray-300 overflow-x-auto flex-shrink-0">
                    <span className="hover:text-white cursor-pointer flex items-center gap-1">
                      <Shield className="w-3 h-3 text-[#00AEEF]" /> Kali Linux
                    </span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-sky-400" /> Kali Tools
                    </span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1">
                      <Folder className="w-3 h-3 text-amber-400" /> Kali Docs
                    </span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1 text-amber-300">
                      <Zap className="w-3 h-3 text-amber-400" /> Exploit-DB
                    </span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1">
                      <Search className="w-3 h-3 text-cyan-400" /> Google Hacking DB
                    </span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1 text-[#00AEEF]">
                      <Key className="w-3 h-3 text-[#00AEEF]" /> OffSec
                    </span>
                  </div>

                  {/* Browser Viewport Content */}
                  <div className="flex-1 overflow-y-auto bg-[#1b2636] text-gray-100 font-sans">
                    {/* TAB 1: OWASP JUICE SHOP (Authentic Clean Web Interface - No Cartoon Drawings!) */}
                    {browserTab === 'juiceshop' && (
                      <div className="min-h-full flex flex-col">
                        {/* Juice Shop Angular Material Header */}
                        <header className="h-12 px-4 bg-[#3949ab] border-b border-black/30 flex items-center justify-between shadow-md">
                          <div className="flex items-center space-x-3">
                            <Menu className="w-5 h-5 text-white cursor-pointer" />
                            <div className="flex items-center space-x-1.5 font-bold tracking-tight text-white">
                              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black text-xs font-mono font-black">
                                JS
                              </span>
                              <span className="text-sm">OWASP Juice Shop</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 text-gray-300 absolute left-2.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={juiceSearchQuery}
                                onChange={(e) => setJuiceSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-36 sm:w-52 pl-8 pr-3 py-1 rounded-md bg-[#283593] text-xs text-white placeholder-gray-300 focus:outline-none"
                              />
                            </div>
                            <span className="text-xs text-white font-medium cursor-pointer">Account</span>
                            <span className="text-xs text-gray-200 font-mono px-1.5 py-0.5 rounded bg-black/20">
                              EN
                            </span>
                            <div
                              onClick={() => alert(`Shopping basket contains ${juiceCartCount} items.`)}
                              className="relative cursor-pointer"
                            >
                              <ShoppingCart className="w-4 h-4 text-white" />
                              {juiceCartCount > 0 && (
                                <span className="absolute -top-2 -right-2 px-1 rounded-full bg-amber-400 text-black text-[9px] font-bold">
                                  {juiceCartCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </header>

                        {juiceNotification && (
                          <div className="bg-emerald-600 text-white text-xs py-1 px-4 text-center font-mono">
                            {juiceNotification}
                          </div>
                        )}

                        {/* Juice Shop Products Grid (Clean Web UI) */}
                        <div className="p-4 sm:p-6 flex-1 bg-[#1a2332]">
                          <div className="max-w-4xl mx-auto space-y-4">
                            <div className="p-2 rounded-lg bg-[#243144] border border-white/5 flex items-center justify-between">
                              <h3 className="text-sm font-bold text-gray-200">All Products</h3>
                              <span className="text-[11px] font-mono text-gray-400">
                                {filteredJuiceProducts.length} items catalogued
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {filteredJuiceProducts.map((p) => (
                                <div
                                  key={p.id}
                                  className="rounded-xl overflow-hidden bg-[#243144] border border-white/10 hover:border-[#00AEEF]/50 transition-all shadow-md flex flex-col justify-between"
                                >
                                  {/* Authentic Web Photography Card Placeholder */}
                                  <div className="aspect-video bg-[#182332] flex items-center justify-center p-3 relative border-b border-white/5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#121c2a] to-[#2b3c56] border border-white/10 flex flex-col items-center justify-center text-center shadow-inner">
                                      <Sparkles className="w-6 h-6 text-amber-400" />
                                      <span className="text-[9px] font-mono text-gray-300 mt-1 uppercase font-bold">
                                        Authentic
                                      </span>
                                    </div>
                                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-[10px] font-mono font-bold text-amber-400">
                                      ¤ {p.price}
                                    </span>
                                  </div>

                                  <div className="p-3.5 flex flex-col justify-between flex-1">
                                    <div>
                                      <h4 className="font-bold text-sm text-white">{p.name}</h4>
                                      <p className="text-[11px] text-gray-300 pt-1 leading-relaxed">
                                        {p.description}
                                      </p>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setJuiceCartCount((c) => c + 1);
                                        setJuiceNotification(`Added 1x ${p.name} to cart.`);
                                        setTimeout(() => setJuiceNotification(null), 2000);
                                      }}
                                      className="mt-3 w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow"
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

                    {/* TAB 2: DVWA */}
                    {browserTab === 'dvwa' && (
                      <div className="min-h-full p-4 sm:p-6 bg-[#f4f6f8] text-[#222]">
                        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden font-sans">
                          <div className="p-5 bg-[#2d3748] text-white flex items-center justify-between border-b-4 border-[#38a169]">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-black text-xl text-[#2d3748]">
                                DV<span className="text-[#38a169]">WA</span>
                              </div>
                              <div>
                                <h2 className="text-base font-bold">Damn Vulnerable Web Application</h2>
                                <p className="text-xs text-gray-300">Target IP: 10.10.11.110</p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#38a169]/20 text-[#38a169]">
                              {dvwaIsLoggedIn ? 'AUTHENTICATED' : 'GUEST'}
                            </span>
                          </div>

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
                                  className="w-full px-3 py-2 border rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 font-bold mb-1">Password</label>
                                <input
                                  type="password"
                                  value={dvwaPassword}
                                  onChange={(e) => setDvwaPassword(e.target.value)}
                                  className="w-full px-3 py-2 border rounded-lg"
                                />
                              </div>
                              <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-[#38a169] hover:bg-[#2f855a] text-white font-bold cursor-pointer"
                              >
                                Login to DVWA
                              </button>
                            </form>
                          ) : (
                            <div className="p-6 space-y-4 font-mono text-xs">
                              <div className="flex items-center justify-between border-b pb-3">
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

                              <div className="space-y-3">
                                <h4 className="text-base font-bold text-gray-800 font-sans">
                                  Vulnerability: SQL Injection
                                </h4>
                                <p className="text-gray-600 text-[11px]">
                                  Payload test: <code className="bg-gray-100 px-1 py-0.5 rounded text-rose-600">1' OR '1'='1</code>
                                </p>
                                <form onSubmit={handleDvwaSqliSubmit} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={dvwaSqliId}
                                    onChange={(e) => setDvwaSqliId(e.target.value)}
                                    placeholder="User ID (e.g. 1)"
                                    className="flex-1 px-3 py-2 border rounded-lg"
                                  />
                                  <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-[#38a169] text-white font-bold cursor-pointer"
                                  >
                                    Submit
                                  </button>
                                </form>

                                {dvwaSqliResult && (
                                  <div className="p-3 rounded-lg bg-gray-50 border space-y-1 text-gray-700">
                                    <span className="font-bold text-[#38a169] block">Database Output:</span>
                                    {dvwaSqliResult.map((u, uIdx) => (
                                      <div key={uIdx} className="text-[11px]">
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

                    {/* TAB 3: WebGoat */}
                    {browserTab === 'webgoat' && (
                      <div className="p-6 font-mono text-xs space-y-3">
                        <h3 className="text-lg font-bold text-emerald-400">OWASP WebGoat (Java Lessons)</h3>
                        <p className="text-gray-300">Container Target: webgoat (10.10.11.130:8080/WebGoat)</p>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                          <span className="text-[#35E6B5] font-bold block">Available Modules:</span>
                          <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            <li>General: HTTP Basics & Developer Tools</li>
                            <li>Injection: SQL Injection (advanced)</li>
                            <li>Authentication Flaws & Password Reset Bugs</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: VAmPI */}
                    {browserTab === 'vampi' && (
                      <div className="p-6 font-mono text-xs space-y-3">
                        <h3 className="text-lg font-bold text-cyan-400">VAmPI (Vulnerable REST API)</h3>
                        <p className="text-gray-300">Container Target: vampi (10.10.11.140:5000/api)</p>
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                          <span className="text-[#00AEEF] font-bold block">Endpoints:</span>
                          <div className="space-y-1 text-gray-300">
                            <div><code>GET /api/v1/users/v1</code> - BOLA / IDOR testing</div>
                            <div><code>POST /api/v1/users/login</code> - Token verification</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= 4. AUTHENTIC WHISKER APPLICATION MENU (Image 3) ================= */}
            {isWhiskerMenuOpen && (
              <div
                className="absolute top-0 left-0 w-80 sm:w-96 h-[460px] bg-[#0c1828]/98 border border-[#00AEEF]/40 rounded-br-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50 flex flex-col font-sans animate-fadeIn text-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Bar at Top of Whisker Menu (From Image 3) */}
                <div className="p-3 border-b border-white/10 bg-[#08121f]">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#00AEEF] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={whiskerSearch}
                      onChange={(e) => setWhiskerSearch(e.target.value)}
                      placeholder="Type to search Kali applications..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#14263e] text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00AEEF]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Body: Two Column (Left: Categories, Right: App Items) */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Left Categories List (Image 3) */}
                  <div className="w-44 border-r border-white/10 overflow-y-auto py-2 bg-[#08121f]/60 text-xs">
                    {WHISKER_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSel = whiskerCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setWhiskerCategory(cat.id)}
                          className={`w-full px-3 py-2 flex items-center space-x-2 text-left transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#00AEEF] text-black font-bold'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Apps List */}
                  <div className="flex-1 overflow-y-auto p-2 text-xs space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWindow('terminal');
                        setIsWhiskerMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2.5 text-left cursor-pointer transition-colors"
                    >
                      <TerminalIcon className="w-4 h-4 text-[#35E6B5]" />
                      <div>
                        <div className="font-bold text-white">Terminal Emulator</div>
                        <div className="text-[10px] text-gray-400">qterminal bash/zsh</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveWindow('browser');
                        setIsWhiskerMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2.5 text-left cursor-pointer transition-colors"
                    >
                      <Globe className="w-4 h-4 text-[#00AEEF]" />
                      <div>
                        <div className="font-bold text-white">Web Browser (Chromium)</div>
                        <div className="text-[10px] text-gray-400">Target Range (Juice Shop / DVWA)</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('lab status');
                        setActiveWindow('terminal');
                        setIsWhiskerMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2.5 text-left cursor-pointer transition-colors"
                    >
                      <Shield className="w-4 h-4 text-[#00AEEF]" />
                      <div>
                        <div className="font-bold text-white">CyberLab V3 Control</div>
                        <div className="text-[10px] text-gray-400">lab status / targets manager</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('nmap dvwa');
                        setActiveWindow('terminal');
                        setIsWhiskerMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2.5 text-left cursor-pointer transition-colors"
                    >
                      <Eye className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="font-bold text-white">Nmap Network Scanner</div>
                        <div className="text-[10px] text-gray-400">Port & service detection</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('sqlmap -u http://dvwa');
                        setActiveWindow('terminal');
                        setIsWhiskerMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2.5 text-left cursor-pointer transition-colors"
                    >
                      <Database className="w-4 h-4 text-rose-400" />
                      <div>
                        <div className="font-bold text-white">SQLMap Auto Injector</div>
                        <div className="text-[10px] text-gray-400">Database exploitation tool</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Whisker Menu Bottom Bar (kali user, reboot, power from Image 3) */}
                <div className="h-10 px-3 bg-[#08121f] border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/50 flex items-center justify-center text-[10px] font-bold text-[#00AEEF]">
                      K
                    </div>
                    <span className="font-bold text-white">kali</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400">
                    <button
                      type="button"
                      onClick={handleRebootKali}
                      className="p-1 hover:text-[#00AEEF] cursor-pointer"
                      title="Reboot Kali OS"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1 hover:text-rose-400 cursor-pointer"
                      title="Shut Down Session"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 5. DESKTOP RIGHT-CLICK CONTEXT MENU ================= */}
            {contextMenu && (
              <div
                id="desktop-context-menu"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                className="absolute w-52 bg-[#091524]/98 border border-[#00AEEF]/40 rounded-xl shadow-2xl py-1 z-50 text-xs font-sans text-gray-200 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('terminal');
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Open Terminal Here</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('browser');
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Web Browser</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    runQuickCommand('lab status');
                    setActiveWindow('terminal');
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>CyberLab V3 Status</span>
                </button>

                <div className="h-px bg-white/10 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setIsMaximized(!isMaximized);
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Toggle Fullscreen</span>
                </button>

                <button
                  type="button"
                  onClick={handleRebootKali}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reboot Kali OS</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="h-6 px-3 bg-[#08121f] border-t border-[#00AEEF]/20 flex items-center justify-between text-[10px] font-mono text-gray-400 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-[#00AEEF] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                <span>KASM DISPLAY : STREAMING</span>
              </span>
              <span>|</span>
              <span>Subnet: 10.10.11.0/24</span>
              <span>|</span>
              <span>7 Containers Healthy</span>
            </div>

            <span className="text-gray-500 font-semibold uppercase tracking-wider text-[9px]">
              REDKROSS RESEARCH FOUNDATION
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
