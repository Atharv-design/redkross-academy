import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Monitor,
  Star,
  Clock,
  Layers,
  Eye,
  Key,
  Zap,
  Shield,
  Lock,
  Search,
  Activity,
  Wifi,
  HardDrive
} from 'lucide-react';
import {
  CYBER_LAB_CONTAINERS,
  JUICE_SHOP_PRODUCTS,
  executeCyberLabCommand,
  virtualFS
} from '../../../data/cyberLabEngine';
import {
  CYBER_COMMAND_VAULT,
  searchCyberCommands
} from '../../../data/cybersecurityCommandVault';

import OfficialKaliLogo from './OfficialKaliLogo';
import LabTopPanel from './LabTopPanel';
import LabDesktopCanvas from './LabDesktopCanvas';
import LabTerminalWindow from './LabTerminalWindow';
import LabBrowserWindow from './LabBrowserWindow';

export { OfficialKaliLogo };

export default function CyberLabDesktopWindow({
  isOpen = false,
  onClose = () => {},
  isMinimized = false,
  onMinimize = () => {},
  onRestore = () => {}
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 70, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(15);
  const [bootLogLines, setBootLogLines] = useState([
    '[  OK  ] Started systemd-udevd Kernel Device Manager.',
    '[  OK  ] Initialized Docker Container Runtime (7 Lab Containers Active).'
  ]);

  const [activeWindow, setActiveWindow] = useState(null);
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isApplicationsMenuOpen, setIsApplicationsMenuOpen] = useState(false);
  const [isPlacesMenuOpen, setIsPlacesMenuOpen] = useState(false);
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appMenuCategory, setAppMenuCategory] = useState('favorites');

  const [desktopItems, setDesktopItems] = useState([
    { id: 'item_trash', name: 'Trash', type: 'trash' },
    { id: 'item_system', name: 'File System', type: 'system' },
    { id: 'item_home', name: 'Home', type: 'home' }
  ]);
  const [selectedDesktopItemId, setSelectedDesktopItemId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [currentTimeStr, setCurrentTimeStr] = useState('Nov 3  01:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = monthNames[now.getMonth()];
      const d = now.getDate();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(`${m} ${d}  ${hh}:${mm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const [browserTab, setBrowserTab] = useState('juiceshop');
  const [juiceSearchQuery, setJuiceSearchQuery] = useState('');
  const [juiceCartCount, setJuiceCartCount] = useState(0);
  const [juiceNotification, setJuiceNotification] = useState(null);

  const [dvwaUsername, setDvwaUsername] = useState('admin');
  const [dvwaPassword, setDvwaPassword] = useState('password');
  const [dvwaIsLoggedIn, setDvwaIsLoggedIn] = useState(false);
  const [dvwaSqliId, setDvwaSqliId] = useState('1');
  const [dvwaSqliResult, setDvwaSqliResult] = useState(null);

  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'neofetch',
      text: `               ............
            ..,;:clooooolc:;..
          .';codxkOOOOOOOOxkdoc;'.
        .;ldxOOOOOOOOOOOOOOOOOOOOxoc;.
       .cdOOOOOOOOOOOOOOOOOOOOOOOOOOdc.
      .okOOOOOOOOOOOOOOOOOOOOOOOOOOOOko.
     .okOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOko.
     :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:
     :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:
     .okOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOko.
      .okOOOOOOOOOOOOOOOOOOOOOOOOOOOOko.
       .cdOOOOOOOOOOOOOOOOOOOOOOOOOOdc.
        .;ldxOOOOOOOOOOOOOOOOOOOOxoc;.
          .';codxkOOOOOOOOxkdoc;'.
            ..,;:clooooolc:;..
               ............
OS: Kali GNU/Linux Rolling x86_64
Host: KasmVNC Cloud Container Suite (v1.14.0)
Kernel: 6.8.11-amd64
Uptime: 2 days, 14 hours
Packages: 2430 (dpkg)
Shell: zsh 5.9
Resolution: 1920x1080 @ 60Hz
WM: XFCE 4.20 / Xfwm4
Theme: Kali-Dark [GTK2/3]
Icons: Flat-Remix-Blue-Dark [GTK2/3]
Terminal: qterminal 1.4.0
CPU: AMD EPYC 7763 (8) @ 3.24GHz
Memory: 3.42GiB / 15.61GiB (21%)`
    },
    {
      type: 'output',
      text: 'Kali GNU/Linux Rolling (2024.1) - Offensive Security Lab Active.\nType any of 143+ cyber commands (e.g. ls, nmap, sqlmap, curl, gobuster).'
    }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalExecuting, setTerminalExecuting] = useState(false);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState(0);

  const terminalScrollRef = useRef(null);
  const terminalInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !isBooting) return;
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setActiveWindow(null);
          }, 300);
          return 100;
        }
        return prev + 22;
      });
    }, 180);

    const logTimer = setTimeout(() => {
      setBootLogLines((prev) => [
        ...prev,
        '[  OK  ] Started NetworkManager & Virtual Bridge (10.10.11.0/24).',
        '[  OK  ] Started KasmVNC Remote Frame Server on Port 8443.',
        '[  OK  ] Started LightDM Display Manager & XFCE 4.20 Session.'
      ]);
    }, 280);

    return () => {
      clearInterval(interval);
      clearTimeout(logTimer);
    };
  }, [isOpen, isBooting]);

  const handleRebootKali = () => {
    setIsBooting(true);
    setBootProgress(10);
    setActiveWindow(null);
    setBootLogLines([
      '[  OK  ] Shutting down XFCE 4.20 desktop session...',
      '[  OK  ] Rebooting Kali attacker environment...'
    ]);
  };

  const handlePointerDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffset.x)),
      y: Math.max(10, Math.min(window.innerHeight - 200, e.clientY - dragOffset.y))
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const suggestions = useMemo(() => {
    if (!terminalInput.trim()) return [];
    return searchCyberCommands(terminalInput.trim()).slice(0, 5);
  }, [terminalInput]);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory, terminalExecuting]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd || terminalExecuting) return;

    if (cmd.toLowerCase() === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: `┌──(kali㉿kali)-[~]\n└─$ ${cmd}` }
    ]);
    setTerminalInput('');
    setTerminalExecuting(true);

    setTimeout(() => {
      const res = executeCyberLabCommand(cmd);
      setTerminalHistory((prev) => [
        ...prev,
        { type: res.isError ? 'error' : 'output', text: res.output }
      ]);
      setTerminalExecuting(false);
    }, 180);
  };

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

  const runQuickCommand = (cmd) => {
    setActiveWindow('terminal');
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

  const handleDvwaLogin = (e) => {
    e.preventDefault();
    if (dvwaUsername.trim() === 'admin' && dvwaPassword.trim() === 'password') {
      setDvwaIsLoggedIn(true);
    } else {
      alert('Login failed. Default credentials: admin / password');
    }
  };

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

  const filteredJuiceProducts = JUICE_SHOP_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(juiceSearchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(juiceSearchQuery.toLowerCase())
  );

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

  const handleDesktopContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:', 'New Folder');
    if (!folderName) return;
    setDesktopItems((prev) => [
      ...prev,
      { id: `item_${Date.now()}`, name: folderName, type: 'folder' }
    ]);
    setContextMenu(null);
  };

  const handleCreateDocument = () => {
    const docName = prompt('Enter document name:', 'notes.txt');
    if (!docName) return;
    setDesktopItems((prev) => [
      ...prev,
      { id: `item_${Date.now()}`, name: docName, type: 'file' }
    ]);
    setContextMenu(null);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-24 z-50 animate-fadeIn">
        <button
          type="button"
          onClick={onRestore}
          className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#081220]/95 border border-[#00AEEF]/50 text-white shadow-[0_0_30px_rgba(0,174,239,0.4)] hover:scale-105 transition-all cursor-pointer font-sans"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF] animate-pulse" />
          <OfficialKaliLogo className="h-6" showText={false} dragonSize="w-8 h-6" />
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
          : 'w-[95vw] sm:w-[960px] h-[640px] rounded-2xl max-w-[calc(100vw-20px)] max-h-[calc(100vh-36px)] shadow-[0_30px_80px_rgba(0,0,0,0.95)] border border-[#00AEEF]/35'
      } bg-[#040914] backdrop-blur-2xl`}
    >
      {/* 1. KasmVNC Remote Desktop Top Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="h-9 px-3 bg-[#07111e] border-b border-[#00AEEF]/20 flex items-center justify-between cursor-move flex-shrink-0 z-30"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Close Kali Remote Session"
          >
            <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button
            type="button"
            onClick={onMinimize}
            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title="Minimize to Bottom Dock"
          >
            <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
            title={isMaximized ? 'Restore to Medium' : 'Maximize to Fullscreen'}
          >
            <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-[#0d1e34] border border-[#00AEEF]/30 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            <span className="font-bold text-[#00AEEF]">KasmVNC :1</span>
            <span className="text-gray-300">(10.10.11.100)</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono text-gray-300 pointer-events-none">
          <span className="font-bold text-white tracking-wider">KALI LINUX 2024.1</span>
          <span className="text-[#00AEEF] hidden md:inline">- Lab Isolated Suite</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden md:inline text-[10px] font-mono text-[#00AEEF] px-2 py-0.5 rounded bg-black/40 border border-[#00AEEF]/20">
            60 FPS | 8ms
          </span>

          <button
            type="button"
            onClick={handleRebootKali}
            className="px-2 py-0.5 rounded-lg bg-[#0e2238] hover:bg-[#163658] border border-white/10 text-gray-200 hover:text-white text-[10px] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
            title="Restart Kali OS"
          >
            <RefreshCw className="w-3 h-3 text-[#00AEEF]" />
            <span className="hidden sm:inline">Reboot</span>
          </button>

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

      {/* 2. Boot Screen OR Desktop Canvas */}
      {isBooting ? (
        <div className="flex-1 bg-[#040812] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.12),transparent_70%)] pointer-events-none" />

          <button
            type="button"
            onClick={() => {
              setIsBooting(false);
              setActiveWindow(null);
            }}
            className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white cursor-pointer"
          >
            Skip Boot [ESC]
          </button>

          <div className="space-y-6 max-w-md w-full flex flex-col items-center">
            <OfficialKaliLogo className="h-40" showText={true} dragonSize="w-44 h-32" />

            <div className="w-full bg-[#091524] rounded-full h-2 p-0.5 border border-[#00AEEF]/40 shadow-[0_0_15px_rgba(0,174,239,0.3)]">
              <div
                className="bg-gradient-to-r from-[#00AEEF] to-[#35E6B5] h-full rounded-full transition-all duration-300"
                style={{ width: `${bootProgress}%` }}
              />
            </div>

            <div className="w-full text-left bg-black/60 rounded-xl p-3 border border-white/10 font-mono text-[10px] space-y-1 text-gray-300 max-h-28 overflow-hidden shadow-inner">
              {bootLogLines.map((log, lIdx) => (
                <div key={lIdx} className="truncate">
                  <span className="text-[#35E6B5] font-bold">[  OK  ]</span>{' '}
                  <span>{log.replace(/\[\s+OK\s+\]\s*/, '')}</span>
                </div>
              ))}
            </div>

            <span className="text-[10px] font-mono text-gray-400 animate-pulse">
              Starting Kali Linux Remote Desktop Environment...
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#040a16]">
          {/* Top Panel */}
          <LabTopPanel
            isApplicationsMenuOpen={isApplicationsMenuOpen}
            setIsApplicationsMenuOpen={setIsApplicationsMenuOpen}
            isPlacesMenuOpen={isPlacesMenuOpen}
            setIsPlacesMenuOpen={setIsPlacesMenuOpen}
            currentTimeStr={currentTimeStr}
            activeWorkspace={activeWorkspace}
            handleRebootKali={handleRebootKali}
            appSearchQuery={appSearchQuery}
            setAppSearchQuery={setAppSearchQuery}
            whiskerCategories={WHISKER_CATEGORIES}
            appMenuCategory={appMenuCategory}
            setAppMenuCategory={setAppMenuCategory}
            setActiveWindow={setActiveWindow}
            runQuickCommand={runQuickCommand}
          />

          {/* Desktop Canvas with Windows */}
          <LabDesktopCanvas
            handleDesktopContextMenu={handleDesktopContextMenu}
            desktopItems={desktopItems}
            selectedDesktopItemId={selectedDesktopItemId}
            setSelectedDesktopItemId={setSelectedDesktopItemId}
            setActiveWindow={setActiveWindow}
            runQuickCommand={runQuickCommand}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            handleCreateFolder={handleCreateFolder}
            handleCreateDocument={handleCreateDocument}
            isMaximized={isMaximized}
            setIsMaximized={setIsMaximized}
            handleRebootKali={handleRebootKali}
          >
            {/* Window 1: Terminal */}
            {activeWindow === 'terminal' && (
              <LabTerminalWindow
                onClose={() => setActiveWindow(null)}
                runQuickCommand={runQuickCommand}
                terminalHistory={terminalHistory}
                terminalExecuting={terminalExecuting}
                terminalScrollRef={terminalScrollRef}
                suggestions={suggestions}
                selectedSuggestionIdx={selectedSuggestionIdx}
                setTerminalInput={setTerminalInput}
                terminalInputRef={terminalInputRef}
                terminalInput={terminalInput}
                handleTerminalKeyDown={handleTerminalKeyDown}
                handleTerminalSubmit={handleTerminalSubmit}
                setSelectedSuggestionIdx={setSelectedSuggestionIdx}
              />
            )}

            {/* Window 2: Browser */}
            {activeWindow === 'browser' && (
              <LabBrowserWindow
                onClose={() => setActiveWindow(null)}
                browserTab={browserTab}
                setBrowserTab={setBrowserTab}
                setJuiceNotification={setJuiceNotification}
                juiceSearchQuery={juiceSearchQuery}
                setJuiceSearchQuery={setJuiceSearchQuery}
                juiceCartCount={juiceCartCount}
                setJuiceCartCount={setJuiceCartCount}
                filteredJuiceProducts={filteredJuiceProducts}
                dvwaIsLoggedIn={dvwaIsLoggedIn}
                handleDvwaLogin={handleDvwaLogin}
                dvwaUsername={dvwaUsername}
                setDvwaUsername={setDvwaUsername}
                dvwaPassword={dvwaPassword}
                setDvwaPassword={setDvwaPassword}
                dvwaSqliId={dvwaSqliId}
                setDvwaSqliId={setDvwaSqliId}
                handleDvwaSqliSubmit={handleDvwaSqliSubmit}
                dvwaSqliResult={dvwaSqliResult}
              />
            )}
          </LabDesktopCanvas>
        </div>
      )}
    </div>
  );
}
