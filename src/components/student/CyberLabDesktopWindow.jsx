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
  Monitor,
  Home,
  Plus,
  FilePlus,
  FolderPlus,
  MoreVertical,
  Minus,
  Square
} from 'lucide-react';
import {
  CYBER_LAB_CONTAINERS,
  JUICE_SHOP_PRODUCTS,
  executeCyberLabCommand,
  virtualFS
} from '../../data/cyberLabEngine';
import {
  CYBER_COMMAND_VAULT,
  searchCyberCommands
} from '../../data/cybersecurityCommandVault';

/**
 * Official Kali Linux Vector Logo Component
 * Matches the official Kali dragon and typography from reference media_1793650534997_a817b6a3.png:
 * - Crisp white dragon silhouette with 3 wing spines, curved loop neck, head & tail
 * - Clean rectangular box enclosing "KALI"
 * - Subtitle: "BY OFFENSIVE SECURITY(R)"
 */
export function OfficialKaliLogo({
  className = 'h-24',
  showText = true,
  isWhiteVariant = true,
  dragonSize = 'w-36 h-28',
  variant = 'wallpaper'
}) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Kali Dragon Vector Mark */}
      <svg
        viewBox="0 0 200 130"
        className={`${dragonSize} filter drop-shadow-[0_4px_16px_rgba(0,174,239,0.35)] flex-shrink-0`}
        fill="currentColor"
      >
        {/* Dragon 3 Wings (Curving Left) */}
        <path
          d="M 25 32 C 55 24, 90 28, 110 48 C 82 40, 50 42, 28 50 C 50 48, 85 54, 102 68 C 72 62, 42 66, 30 74 C 52 70, 84 76, 98 88"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dragon Loop Neck & Head (Facing Right) */}
        <path
          d="M 110 48 C 122 58, 136 56, 146 60 C 152 52, 146 47, 142 44 C 152 44, 162 52, 172 58 C 182 64, 176 70, 166 68 C 156 66, 146 72, 134 66 C 124 60, 112 56, 100 62 C 88 70, 84 84, 90 94 C 98 106, 118 108, 126 116 C 132 122, 128 128, 122 128 C 112 124, 104 118, 98 110 C 86 98, 80 88, 78 72 C 76 54, 88 42, 110 48 Z"
          fill="#FFFFFF"
        />
        {/* Dragon Horns & Spines */}
        <path
          d="M 130 52 L 142 38 L 138 52 M 148 56 L 160 44 L 154 58 M 162 60 L 174 52 L 168 64"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Dragon Tail Loop Underneath */}
        <path
          d="M 100 90 C 115 105, 140 108, 155 120 C 160 124, 156 128, 150 126 C 135 120, 118 112, 108 98"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Official Kali Branding */}
      {showText && (
        variant === 'brand' ? (
          <div className="flex items-center space-x-1.5 mt-2 font-sans tracking-wide">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              KALI
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#00A2FF] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center">
              LINUX<sup className="text-xs text-white ml-0.5 font-bold">®</sup>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-2 font-sans tracking-widest text-center">
            {/* Bordered Box around KALI */}
            <div className="px-6 py-1.5 rounded-lg border-2 border-white bg-black/30 backdrop-blur-sm shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-[0.25em] pl-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                KALI
              </span>
            </div>
            {/* Subtitle */}
            <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-[0.3em] mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              BY OFFENSIVE SECURITY®
            </span>
          </div>
        )
      )}
    </div>
  );
}

/**
 * Authentic Kali Linux Desktop GUI & KasmVNC Remote Workspace
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
  const [position, setPosition] = useState({ x: 70, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });

  // Boot Screen State (Authentic system startup on first load or reboot)
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(15);
  const [bootLogLines, setBootLogLines] = useState([
    '[  OK  ] Started systemd-udevd.service - Device Events Manager.',
    '[  OK  ] Initializing lab-isolated bridge (Subnet: 10.10.11.0/24)...'
  ]);

  // Active Applications on Desktop Canvas (CLEAN BY DEFAULT: null means no window is open)
  const [activeWindow, setActiveWindow] = useState(null); // null | 'terminal' | 'browser'
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isApplicationsMenuOpen, setIsApplicationsMenuOpen] = useState(false);
  const [isPlacesMenuOpen, setIsPlacesMenuOpen] = useState(false);
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appMenuCategory, setAppMenuCategory] = useState('favorites');

  // Real Desktop Folders & Files (Working folder & file creation)
  const [desktopItems, setDesktopItems] = useState([
    { id: 'trash', name: 'Trash', type: 'trash' },
    { id: 'filesystem', name: 'File System', type: 'system' },
    { id: 'home', name: 'Home', type: 'home' }
  ]);
  const [selectedDesktopItemId, setSelectedDesktopItemId] = useState(null);

  // Desktop Context Menu (Right Click)
  const [contextMenu, setContextMenu] = useState(null); // { x, y }

  // Live Dynamic Clock (Formatted like Image 2: "Nov 3  01:00")
  const [currentTimeStr, setCurrentTimeStr] = useState('Nov 3  01:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const monthStr = now.toLocaleDateString('en-US', { month: 'short' });
      const day = now.getDate();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(`${monthStr} ${day}  ${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

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
........:*******+...............     Uptime: 24 mins
.......-*********:..............     Packages: 2879 (dpkg)
......:***********:.............     Shell: zsh 5.9
.....-*************:............     Display (QEMU Monitor): 1680x1050
....:***************:...........     DE: Xfce4 4.20
...-*****************:..........     WM: Xfwm4 (Kali-Dark)
..:*******************:.........     Terminal: qterminal 2.4.0
.-*********************:........     Terminal Font: FiraCode (10pt)
:***********************:.......     Local IP (eth0): 10.10.11.100/24
.:::::::::::::::::::::::........     Network: lab-isolated (7 Containers)
................................     Memory: 887.32 MiB / 3.83 GiB (23%)`
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
      const defaultY = Math.max(30, Math.floor((window.innerHeight - 640) / 2) - 10);
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
      }, 300);

      const timer2 = setTimeout(() => {
        setBootProgress(80);
        setBootLogLines((prev) => [
          ...prev,
          '[  OK  ] Started LightDM Display Manager & XFCE 4.20 Session.',
          '[  OK  ] Initialized 7 Target Containers (Juice Shop, DVWA, WebGoat, VAmPI).'
        ]);
      }, 650);

      const timer3 = setTimeout(() => {
        setBootProgress(100);
        setBootLogLines((prev) => [
          ...prev,
          '[  OK  ] Reached target Graphical Interface.',
          '[  OK  ] Kali Linux Desktop Ready.'
        ]);
      }, 950);

      const timer4 = setTimeout(() => {
        setIsBooting(false);
        // Ensure desktop starts completely clean!
        setActiveWindow(null);
      }, 1250);

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
    setActiveWindow(null);
    setIsApplicationsMenuOpen(false);
    setIsPlacesMenuOpen(false);
    setContextMenu(null);
  };

  // Close context menu on global click
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('#desktop-context-menu')) {
        setContextMenu(null);
      }
      if (!e.target.closest('#applications-menu') && !e.target.closest('#applications-btn')) {
        setIsApplicationsMenuOpen(false);
      }
      if (!e.target.closest('#places-menu') && !e.target.closest('#places-btn')) {
        setIsPlacesMenuOpen(false);
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

  // Desktop Right Click handler (Opens authentic desktop context menu)
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

  // Real Folder & File Creation on Desktop
  const handleCreateFolder = () => {
    const folderCount = desktopItems.filter((i) => i.type === 'folder').length;
    const folderName = folderCount === 0 ? 'New Folder' : `New Folder (${folderCount})`;
    const newItem = {
      id: 'folder_' + Date.now(),
      name: folderName,
      type: 'folder'
    };
    setDesktopItems((prev) => [...prev, newItem]);
    virtualFS.mkdir(`/home/kali/Desktop/${folderName}`);
    setContextMenu(null);
  };

  const handleCreateDocument = () => {
    const fileCount = desktopItems.filter((i) => i.type === 'file').length;
    const fileName = fileCount === 0 ? 'notes.txt' : `notes_${fileCount}.txt`;
    const newItem = {
      id: 'file_' + Date.now(),
      name: fileName,
      type: 'file'
    };
    setDesktopItems((prev) => [...prev, newItem]);
    virtualFS.touch(`/home/kali/Desktop/${fileName}`);
    setContextMenu(null);
  };

  const handleDeleteDesktopItem = (id) => {
    const item = desktopItems.find((i) => i.id === id);
    if (item && item.type !== 'trash' && item.type !== 'system' && item.type !== 'home') {
      setDesktopItems((prev) => prev.filter((i) => i.id !== id));
      virtualFS.rm(`/home/kali/Desktop/${item.name}`);
    }
  };

  // Curved Autocomplete Suggestions for ALL 143+ Commands
  const suggestions = useMemo(() => {
    const q = terminalInput.trim().toLowerCase();
    if (!q) return [];

    const matches = [];

    // All 143 Scribd & Lab Commands
    const allKnownCmds = [
      { cmd: 'ls', desc: 'List directory contents', cat: 'Basic' },
      { cmd: 'ls -la', desc: 'List all files including hidden with permissions', cat: 'Basic' },
      { cmd: 'cd', desc: 'Change working directory', cat: 'Basic' },
      { cmd: 'pwd', desc: 'Print working directory', cat: 'Basic' },
      { cmd: 'mkdir', desc: 'Create a new directory', cat: 'Basic' },
      { cmd: 'rmdir', desc: 'Remove empty directories', cat: 'Basic' },
      { cmd: 'rm', desc: 'Remove files or directories', cat: 'Basic' },
      { cmd: 'cp', desc: 'Copy files and directories', cat: 'Basic' },
      { cmd: 'mv', desc: 'Move or rename files', cat: 'Basic' },
      { cmd: 'touch', desc: 'Create an empty file', cat: 'Basic' },
      { cmd: 'find', desc: 'Search for files in directory hierarchy', cat: 'Basic' },
      { cmd: 'locate', desc: 'Find files by name using indexed database', cat: 'Basic' },
      { cmd: 'cat', desc: 'View file contents', cat: 'Basic' },
      { cmd: 'whoami', desc: 'Show current logged in user', cat: 'Basic' },
      { cmd: 'id', desc: 'Show user ID and group IDs', cat: 'Basic' },
      { cmd: 'chmod 755', desc: 'Set read/execute permissions', cat: 'Perms' },
      { cmd: 'chmod 777', desc: 'Set full read/write/execute permissions', cat: 'Perms' },
      { cmd: 'chown', desc: 'Change file owner and group', cat: 'Perms' },
      { cmd: 'df -h', desc: 'Show disk space usage in human readable format', cat: 'System' },
      { cmd: 'du -sh', desc: 'Show total directory size', cat: 'System' },
      { cmd: 'ifconfig', desc: 'Show network interface details', cat: 'Network' },
      { cmd: 'ip a', desc: 'Show IP addresses and interfaces', cat: 'Network' },
      { cmd: 'ip route', desc: 'Show kernel routing table', cat: 'Network' },
      { cmd: 'netstat -tulnp', desc: 'Show listening network ports and sockets', cat: 'Network' },
      { cmd: 'ss -tuln', desc: 'Show active socket connections', cat: 'Network' },
      { cmd: 'ping dvwa', desc: 'Test ICMP reachability to DVWA target', cat: 'Network' },
      { cmd: 'traceroute dvwa', desc: 'Trace network hops on lab bridge', cat: 'Network' },
      { cmd: 'arp -a', desc: 'Display ARP cache table', cat: 'Network' },
      { cmd: 'dig dvwa.lab', desc: 'Perform advanced DNS query', cat: 'Network' },
      { cmd: 'whois', desc: 'Look up domain WHOIS registration', cat: 'Network' },
      { cmd: 'top', desc: 'Display live Linux running processes', cat: 'System' },
      { cmd: 'htop', desc: 'Interactive visual process viewer', cat: 'System' },
      { cmd: 'free -h', desc: 'Show memory usage (RAM / Swap)', cat: 'System' },
      { cmd: 'uptime', desc: 'Show system uptime and load average', cat: 'System' },
      { cmd: 'ps aux', desc: 'List all running system processes', cat: 'System' },
      { cmd: 'uname -a', desc: 'Show Linux kernel and OS architecture', cat: 'System' },
      { cmd: 'lsb_release -a', desc: 'Show Kali Linux release version', cat: 'System' },
      { cmd: 'apt update', desc: 'Refresh Kali repository package lists', cat: 'Packages' },
      { cmd: 'apt upgrade', desc: 'Upgrade installed packages', cat: 'Packages' },
      { cmd: 'dpkg -l', desc: 'List installed deb packages', cat: 'Packages' },
      { cmd: 'nmap dvwa', desc: 'Port scan DVWA target (10.10.11.110)', cat: 'Recon' },
      { cmd: 'nmap juice-shop', desc: 'Port scan Juice Shop (10.10.11.120)', cat: 'Recon' },
      { cmd: 'nmap -sV 10.10.11.0/24', desc: 'Scan services across entire lab subnet', cat: 'Recon' },
      { cmd: 'nmap -A 10.10.11.110', desc: 'Aggressive scan with OS detection and scripts', cat: 'Recon' },
      { cmd: 'tcpdump -nn -i any', desc: 'Live packet capture on network bridge', cat: 'Network' },
      { cmd: 'wireshark', desc: 'GUI packet analyzer', cat: 'Network' },
      { cmd: 'netcat -lvnp 4444', desc: 'Netcat listener on port 4444', cat: 'Network' },
      { cmd: 'nc -zv 10.10.11.110 80', desc: 'Check if port 80 is open on DVWA', cat: 'Network' },
      { cmd: 'aircrack-ng', desc: 'Wireless 802.11 WEP/WPA key cracker', cat: 'Wireless' },
      { cmd: 'airmon-ng', desc: 'Enable monitor mode on wireless interface', cat: 'Wireless' },
      { cmd: 'macchanger -s eth0', desc: 'Show or spoof network MAC address', cat: 'Wireless' },
      { cmd: 'hydra -l admin -P wordlist.txt 10.10.11.110 http-post-form', desc: 'Brute force login', cat: 'Passwords' },
      { cmd: 'john --wordlist=wordlist.txt hashes.txt', desc: 'John the Ripper password cracker', cat: 'Passwords' },
      { cmd: 'hashcat -m 0 hashes.txt wordlist.txt', desc: 'Advanced GPU password recovery', cat: 'Passwords' },
      { cmd: 'sqlmap -u http://dvwa', desc: 'Automate SQL injection on DVWA target', cat: 'Web' },
      { cmd: 'wpscan --url http://10.10.11.105', desc: 'WordPress vulnerability scanner', cat: 'Web' },
      { cmd: 'gobuster dir -u http://dvwa -w common.txt', desc: 'Directory brute-forcing', cat: 'Web' },
      { cmd: 'dirb http://juice-shop', desc: 'Fast web content scanner', cat: 'Web' },
      { cmd: 'sublist3r -d example.com', desc: 'Subdomain enumeration tool', cat: 'Web' },
      { cmd: 'nikto -h dvwa', desc: 'Web server vulnerability scanner', cat: 'Web' },
      { cmd: 'burpsuite', desc: 'Web penetration testing proxy suite', cat: 'Web' },
      { cmd: 'msfconsole', desc: 'Launch Metasploit Framework console', cat: 'Exploit' },
      { cmd: 'msfvenom', desc: 'Generate custom standalone payloads', cat: 'Exploit' },
      { cmd: 'searchsploit apache 2.4', desc: 'Search Exploit Database archives', cat: 'Exploit' },
      { cmd: 'mimikatz', desc: 'Extract Windows LSASS credentials and hashes', cat: 'PostExploit' },
      { cmd: 'volatility -f memory.dmp imageinfo', desc: 'Memory forensic analysis framework', cat: 'Forensics' },
      { cmd: 'binwalk firmware.bin', desc: 'Firmware analysis and extraction', cat: 'Forensics' },
      { cmd: 'strings /bin/ls', desc: 'Extract printable strings from binary', cat: 'Forensics' },
      { cmd: 'ghidra', desc: 'NSA software reverse engineering suite', cat: 'Reverse' },
      { cmd: 'gdb binary.elf', desc: 'GNU Debugger for binary analysis', cat: 'Reverse' },
      { cmd: 'ssh kali@10.10.11.105', desc: 'Connect to remote Debian target via SSH', cat: 'Misc' },
      { cmd: 'lsof -i :80', desc: 'List processes listening on port 80', cat: 'Misc' },
      { cmd: 'strace ls', desc: 'Trace system calls and signals', cat: 'Misc' },
      { cmd: 'lab status', desc: 'Show status of all 7 isolated lab containers', cat: 'Lab' },
      { cmd: 'lab targets', desc: 'Display target matrix, IPs & ports', cat: 'Lab' },
      { cmd: 'lab start', desc: 'Boot isolated containers on lab-isolated', cat: 'Lab' },
      { cmd: 'lab stop', desc: 'Gracefully suspend lab containers', cat: 'Lab' },
      { cmd: 'lab reset', desc: 'Purge volatile state and restore clean sandbox', cat: 'Lab' },
      { cmd: 'lab open juice', desc: 'Open OWASP Juice Shop in Chromium', cat: 'Lab' },
      { cmd: 'lab open dvwa', desc: 'Open Damn Vulnerable Web App (DVWA)', cat: 'Lab' },
      { cmd: 'neofetch', desc: 'Display Kali Linux system info & ASCII dragon', cat: 'System' }
    ];

    allKnownCmds.forEach((c) => {
      if (c.cmd.toLowerCase().startsWith(q) || c.cmd.toLowerCase().includes(q)) {
        matches.push({
          id: `cmd_${c.cmd}`,
          command: c.cmd,
          category: c.cat,
          description: c.desc
        });
      }
    });

    // Also pull matches from verified 340+ command vault
    const vaultMatches = searchCyberCommands({ query: q }).slice(0, 8);
    vaultMatches.forEach((vc) => {
      if (!matches.some((m) => m.command === vc.command)) {
        matches.push({
          id: vc.id,
          command: vc.command,
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
........:*******+...............     Uptime: 24 mins
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
        },
        onFolderCreated: (name) => {
          if (virtualFS.currentPath.includes('Desktop')) {
            setDesktopItems((prev) => [
              ...prev,
              { id: 'folder_' + Date.now(), name, type: 'folder' }
            ]);
          }
        },
        onFileCreated: (name) => {
          if (virtualFS.currentPath.includes('Desktop')) {
            setDesktopItems((prev) => [
              ...prev,
              { id: 'file_' + Date.now(), name, type: 'file' }
            ]);
          }
        },
        onItemDeleted: (name) => {
          setDesktopItems((prev) => prev.filter((i) => i.name !== name));
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

  // MITRE / Kali categories from Whisker menu
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
      {/* ================= 1. KASMVNC REMOTE DESKTOP TOP BAR ================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="h-9 px-3 bg-[#07111e] border-b border-[#00AEEF]/20 flex items-center justify-between cursor-move flex-shrink-0 z-30"
      >
        {/* Left: Window Control Traffic Lights */}
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

          {/* KasmVNC Remote Frame Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-[#0d1e34] border border-[#00AEEF]/30 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            <span className="font-bold text-[#00AEEF]">KasmVNC :1</span>
            <span className="text-gray-300">(10.10.11.100)</span>
          </div>
        </div>

        {/* Center: Remote Header Title */}
        <div className="flex items-center space-x-1.5 text-xs font-mono text-gray-300 pointer-events-none">
          <span className="font-bold text-white tracking-wider">KALI LINUX 2024.1</span>
          <span className="text-[#00AEEF] hidden md:inline">- Lab Isolated Suite</span>
        </div>

        {/* Right: Telemetry & Controls */}
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

      {/* ================= 2. BOOT SCREEN (If Starting / Rebooting) ================= */}
      {isBooting ? (
        <div className="flex-1 bg-[#040812] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden animate-fadeIn">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.12),transparent_70%)] pointer-events-none" />

          {/* Skip Boot Button */}
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

          {/* Centered Official Kali Linux Logo (Matching Image 2) */}
          <div className="space-y-6 max-w-md w-full flex flex-col items-center">
            <OfficialKaliLogo className="h-40" showText={true} dragonSize="w-44 h-32" />

            {/* Glowing Cyan Boot Progress Bar */}
            <div className="w-full bg-[#091524] rounded-full h-2 p-0.5 border border-[#00AEEF]/40 shadow-[0_0_15px_rgba(0,174,239,0.3)]">
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
              Starting Kali Linux Remote Desktop Environment...
            </span>
          </div>
        </div>
      ) : (
        /* ================= 3. AUTHENTIC KALI LINUX DESKTOP (EXACT MATCH TO IMAGE 2) ================= */
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#040a16]">
          {/* Top Panel (Exact Match to Image 2: Kali Dragon, Applications, Places | Date/Time | Workspace 1, Volume, Network, Power) */}
          <div className="h-7 px-3 bg-[#0a1422]/95 border-b border-black/60 flex items-center justify-between text-xs font-sans text-gray-200 flex-shrink-0 z-30 select-none shadow-md">
            {/* Left: Kali Icon + Applications + Places */}
            <div className="flex items-center space-x-3">
              {/* Kali Dragon Application Trigger */}
              <button
                id="applications-btn"
                type="button"
                onClick={() => setIsApplicationsMenuOpen(!isApplicationsMenuOpen)}
                className={`flex items-center space-x-1.5 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  isApplicationsMenuOpen ? 'bg-[#00AEEF] text-black font-bold' : 'hover:bg-white/10 text-white'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 120 100" className="w-4 h-4 fill-current">
                    <path
                      d="M 10 24 C 30 18, 55 22, 68 38 C 50 32, 28 34, 12 40 C 28 38, 52 42, 64 54 C 45 49, 25 52, 14 58 C 30 55, 52 60, 62 70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 68 38 C 76 46, 85 45, 92 48 C 96 42, 92 38, 90 36 C 96 36, 102 42, 108 46 C 114 50, 110 54, 104 53 C 98 52, 92 56, 84 52 C 78 48, 70 44, 62 48 C 54 54, 52 66, 56 74 C 62 84, 76 86, 82 92 C 86 96, 84 100, 80 100 C 74 98, 68 94, 64 88 C 56 78, 52 70, 50 58 C 48 44, 56 34, 68 38 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-xs">Applications</span>
              </button>

              {/* Places Menu Trigger */}
              <button
                id="places-btn"
                type="button"
                onClick={() => setIsPlacesMenuOpen(!isPlacesMenuOpen)}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  isPlacesMenuOpen ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                Places
              </button>
            </div>

            {/* Center: Live Date & Time (Matching Image 2: "Nov 3  01:00") */}
            <div className="font-mono text-xs font-semibold text-gray-200 tracking-wide pointer-events-none">
              {currentTimeStr}
            </div>

            {/* Right: Workspace 1 Indicator, Volume, Network, Power (Image 2) */}
            <div className="flex items-center space-x-2 text-gray-300">
              {/* Workspace 1 Box */}
              <div className="w-5 h-5 rounded bg-[#10233b] border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner">
                {activeWorkspace}
              </div>

              {/* Network / Ethernet Icon */}
              <div title="Connected to lab-isolated (10.10.11.100)">
                <Wifi className="w-3.5 h-3.5 text-[#35E6B5]" />
              </div>

              {/* Volume */}
              <div>
                <Volume2 className="w-3.5 h-3.5 text-gray-300" />
              </div>

              {/* Power / Shutdown */}
              <button
                type="button"
                onClick={handleRebootKali}
                className="hover:text-rose-400 cursor-pointer p-0.5"
                title="Restart Session"
              >
                <Power className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop Canvas (Deep Blue Wave Ribbons Wallpaper Matching Image 2) */}
          <div
            onContextMenu={handleDesktopContextMenu}
            className="flex-1 relative overflow-hidden select-none bg-[#030814]"
          >
            {/* Smooth Curved Blue Wave Ribbons Background (Exact Match to Image 2 Wallpaper) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 1440 900" className="w-full h-full object-cover">
                <defs>
                  <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#081830" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0e2a52" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#040916" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#143c72" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#1b5096" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#061224" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="ribbonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0055AA" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Flowing Dark Blue Wave Ribbons */}
                <path
                  d="M 0 120 C 350 40, 720 300, 1440 180 L 1440 900 L 0 900 Z"
                  fill="url(#waveGrad1)"
                />
                <path
                  d="M 0 350 C 420 180, 850 520, 1440 380 L 1440 900 L 0 900 Z"
                  fill="url(#waveGrad2)"
                />
                <path
                  d="M 0 620 C 380 440, 920 720, 1440 560 L 1440 900 L 0 900 Z"
                  fill="url(#waveGrad1)"
                />

                {/* Subtle Electric Cyan Accent Wave */}
                <path
                  d="M 0 350 C 420 180, 850 520, 1440 380"
                  fill="none"
                  stroke="url(#ribbonCyan)"
                  strokeWidth="4"
                />
                <path
                  d="M 0 620 C 380 440, 920 720, 1440 560"
                  fill="none"
                  stroke="url(#ribbonCyan)"
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* CENTER OF DESKTOP: OFFICIAL KALI LOGO (Exact Match to Image 2: Dragon + [ KALI ] BY OFFENSIVE SECURITY) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="opacity-90 transition-opacity transform -translate-y-4">
                <OfficialKaliLogo
                  className="h-64 sm:h-72"
                  showText={true}
                  dragonSize="w-56 h-40 sm:w-64 sm:h-44"
                />
              </div>
            </div>

            {/* Left Desktop Shortcuts Stack (Trash, File System, Home + User Created Folders) */}
            <div className="absolute left-4 top-4 z-10 flex flex-col space-y-4">
              {desktopItems.map((item) => {
                const isSelected = selectedDesktopItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDesktopItemId(item.id)}
                    onDoubleClick={() => {
                      if (item.type === 'home' || item.type === 'system' || item.type === 'folder') {
                        setActiveWindow('terminal');
                        runQuickCommand(`cd ~/Desktop && ls -la`);
                      } else if (item.type === 'file') {
                        setActiveWindow('terminal');
                        runQuickCommand(`cat ~/Desktop/${item.name}`);
                      } else {
                        alert(`${item.name} is empty.`);
                      }
                    }}
                    className={`flex flex-col items-center group cursor-pointer w-20 p-1.5 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-[#00AEEF]/20 border border-[#00AEEF]/60'
                        : 'hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {/* Icon matching Image 2 */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                      {item.type === 'trash' ? (
                        <div className="w-10 h-10 rounded-lg bg-[#142338] border border-white/20 flex items-center justify-center text-gray-200">
                          <Trash2 className="w-5 h-5" />
                        </div>
                      ) : item.type === 'system' ? (
                        <div className="w-10 h-10 rounded-lg bg-[#142338] border border-white/20 flex items-center justify-center text-[#00AEEF]">
                          <HardDrive className="w-5 h-5" />
                        </div>
                      ) : item.type === 'home' ? (
                        <div className="w-10 h-10 rounded-lg bg-[#1a4a82] border border-[#00AEEF]/40 flex items-center justify-center text-white">
                          <Home className="w-5 h-5" />
                        </div>
                      ) : item.type === 'folder' ? (
                        <div className="w-10 h-10 rounded-lg bg-[#00AEEF]/25 border border-[#00AEEF]/60 flex items-center justify-center text-[#00AEEF]">
                          <Folder className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#10233b] border border-white/20 flex items-center justify-center text-gray-200">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] font-sans text-white text-center mt-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate max-w-[76px]">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ================= OPEN WINDOW 1: AUTHENTIC KALI TERMINAL ================= */}
            {activeWindow === 'terminal' && (
              <div className="absolute inset-3 sm:inset-6 z-20 flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/50 bg-[#060e18]/98 shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-fadeIn">
                {/* Authentic Window Titlebar with Close Cross (X), Minimize, Maximize */}
                <div className="h-8 px-3 bg-[#0a1524] border-b border-[#00AEEF]/30 flex items-center justify-between text-xs font-mono text-gray-300 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#00AEEF]" />
                    <span className="font-bold text-white text-[11px]">kali@kali: ~</span>
                  </div>

                  {/* Window Control Buttons: Minimize, Maximize, Close Cross (X) */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveWindow(null)}
                      className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                      title="Minimize to Desktop"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWindow(null)}
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

                {/* CURVED AUTOCOMPLETE SUGGESTIONS POPOVER */}
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

                {/* Terminal Input Bar with Kali Prompt */}
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
            )}

            {/* ================= OPEN WINDOW 2: CHROMIUM WEB BROWSER ================= */}
            {activeWindow === 'browser' && (
              <div className="absolute inset-3 sm:inset-6 z-20 flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/40 bg-[#141e2e] shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-fadeIn">
                {/* Browser Window Titlebar with Close Cross (X), Tabs */}
                <div className="h-9 px-3 bg-[#0c1624] border-b border-black/40 flex items-center justify-between text-xs flex-shrink-0">
                  <div className="flex items-center space-x-1 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setBrowserTab('juiceshop')}
                      className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                        browserTab === 'juiceshop'
                          ? 'bg-[#1b283a] text-white font-bold border-t-2 border-amber-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>OWASP Juice Shop</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBrowserTab('dvwa')}
                      className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                        browserTab === 'dvwa'
                          ? 'bg-[#1b283a] text-white font-bold border-t-2 border-[#FF7A00]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5 text-[#FFA439]" />
                      <span>DVWA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBrowserTab('webgoat')}
                      className={`px-2.5 py-1 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                        browserTab === 'webgoat'
                          ? 'bg-[#1b283a] text-white font-bold border-t-2 border-[#00AEEF]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      WebGoat
                    </button>
                  </div>

                  {/* Window Close Cross (X) */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveWindow(null)}
                      className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                      title="Minimize to Desktop"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWindow(null)}
                      className="p-1 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                      title="Close Browser (Return to Clean Desktop)"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Browser Navigation Bar */}
                <div className="px-3 py-1.5 bg-[#101b2a] border-b border-black/30 flex items-center space-x-2 text-xs">
                  <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setJuiceNotification('Browser reloaded.');
                      setTimeout(() => setJuiceNotification(null), 1500);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-gray-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1 px-3 py-1 rounded-lg bg-[#070e18] border border-white/10 flex items-center space-x-2 text-xs font-mono text-gray-200">
                    <Lock className="w-3 h-3 text-[#35E6B5]" />
                    <span className="truncate">
                      {browserTab === 'juiceshop'
                        ? 'http://10.10.11.120:3000/#/'
                        : browserTab === 'dvwa'
                        ? 'http://10.10.11.110/login.php'
                        : 'http://10.10.11.130:8080/WebGoat'}
                    </span>
                  </div>
                </div>

                {/* Browser Viewport Content */}
                <div className="flex-1 overflow-y-auto bg-[#182332] text-gray-100 font-sans">
                  {/* TAB 1: JUICE SHOP */}
                  {browserTab === 'juiceshop' && (
                    <div className="min-h-full flex flex-col">
                      <header className="h-11 px-4 bg-[#3949ab] flex items-center justify-between shadow">
                        <div className="flex items-center space-x-2 font-bold text-white text-sm">
                          <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black text-xs font-mono font-black">
                            JS
                          </span>
                          <span>OWASP Juice Shop</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs">
                          <input
                            type="text"
                            value={juiceSearchQuery}
                            onChange={(e) => setJuiceSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-32 sm:w-44 px-2 py-0.5 rounded bg-[#283593] text-white placeholder-gray-300 text-xs focus:outline-none"
                          />
                          <div className="flex items-center gap-1 cursor-pointer">
                            <ShoppingCart className="w-4 h-4 text-white" />
                            <span>{juiceCartCount}</span>
                          </div>
                        </div>
                      </header>

                      <div className="p-4 flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                          {filteredJuiceProducts.map((p) => (
                            <div
                              key={p.id}
                              className="rounded-xl overflow-hidden bg-[#222f42] border border-white/10 p-3 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-baseline">
                                  <h4 className="font-bold text-xs text-white">{p.name}</h4>
                                  <span className="text-amber-400 font-bold text-xs">¤ {p.price}</span>
                                </div>
                                <p className="text-[11px] text-gray-300 pt-1">{p.description}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setJuiceCartCount((c) => c + 1)}
                                className="mt-3 w-full py-1 rounded bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 cursor-pointer"
                              >
                                Add to Basket
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DVWA */}
                  {browserTab === 'dvwa' && (
                    <div className="min-h-full p-4 bg-[#f4f6f8] text-[#222]">
                      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow border p-5 font-sans">
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                          <div className="font-black text-lg text-[#2d3748]">
                            DV<span className="text-[#38a169]">WA</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#38a169]">
                            {dvwaIsLoggedIn ? 'AUTHENTICATED' : 'GUEST'}
                          </span>
                        </div>

                        {!dvwaIsLoggedIn ? (
                          <form onSubmit={handleDvwaLogin} className="space-y-3 font-mono text-xs">
                            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded">
                              Default Credentials: admin / password
                            </p>
                            <input
                              type="text"
                              value={dvwaUsername}
                              onChange={(e) => setDvwaUsername(e.target.value)}
                              placeholder="Username"
                              className="w-full p-2 border rounded"
                            />
                            <input
                              type="password"
                              value={dvwaPassword}
                              onChange={(e) => setDvwaPassword(e.target.value)}
                              placeholder="Password"
                              className="w-full p-2 border rounded"
                            />
                            <button type="submit" className="w-full p-2 bg-[#38a169] text-white font-bold rounded cursor-pointer">
                              Login
                            </button>
                          </form>
                        ) : (
                          <div className="space-y-3 font-mono text-xs">
                            <h4 className="font-bold text-sm">SQL Injection Lab</h4>
                            <p className="text-[11px] text-gray-600">Payload test: <code>1' OR '1'='1</code></p>
                            <form onSubmit={handleDvwaSqliSubmit} className="flex gap-2">
                              <input
                                type="text"
                                value={dvwaSqliId}
                                onChange={(e) => setDvwaSqliId(e.target.value)}
                                className="flex-1 p-2 border rounded"
                              />
                              <button type="submit" className="px-4 py-2 bg-[#38a169] text-white font-bold rounded cursor-pointer">
                                Submit
                              </button>
                            </form>
                            {dvwaSqliResult && (
                              <div className="p-2.5 bg-gray-50 border rounded text-[11px]">
                                {dvwaSqliResult.map((u, i) => (
                                  <div key={i}>ID: {u.id} | User: {u.first_name} | Surname: {u.surname}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WEBGOAT */}
                  {browserTab === 'webgoat' && (
                    <div className="p-5 font-mono text-xs text-gray-200">
                      <h3 className="font-bold text-sm text-[#FFA439]">OWASP WebGoat (10.10.11.130:8080)</h3>
                      <p className="text-gray-400 pt-1">Java Vulnerability Benchmark</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= 4. AUTHENTIC APPLICATIONS MENU ================= */}
            {isApplicationsMenuOpen && (
              <div
                id="applications-menu"
                className="absolute top-1 left-3 w-80 sm:w-96 h-[440px] bg-[#091524]/98 border border-[#00AEEF]/40 rounded-xl shadow-2xl z-50 flex flex-col font-sans animate-fadeIn text-gray-200 select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2.5 border-b border-white/10 bg-[#06101c]">
                  <input
                    type="text"
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    placeholder="Search 143+ Kali applications..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0e2138] text-xs text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="flex-1 flex overflow-hidden">
                  <div className="w-44 border-r border-white/10 overflow-y-auto py-1.5 text-xs bg-[#06101c]/50">
                    {WHISKER_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setAppMenuCategory(cat.id)}
                          className={`w-full px-3 py-1.5 flex items-center space-x-2 text-left cursor-pointer ${
                            appMenuCategory === cat.id
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

                  <div className="flex-1 overflow-y-auto p-2 text-xs space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveWindow('terminal');
                        setIsApplicationsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2 text-left cursor-pointer"
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
                        setIsApplicationsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2 text-left cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-[#00AEEF]" />
                      <div>
                        <div className="font-bold text-white">Web Browser</div>
                        <div className="text-[10px] text-gray-400">Target Range (Juice Shop / DVWA)</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('nmap dvwa');
                        setIsApplicationsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2 text-left cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="font-bold text-white">Nmap Scanner</div>
                        <div className="text-[10px] text-gray-400">Port and service scanner</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('sqlmap -u http://dvwa');
                        setIsApplicationsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2 text-left cursor-pointer"
                    >
                      <Database className="w-4 h-4 text-rose-400" />
                      <div>
                        <div className="font-bold text-white">SQLMap Auto Injector</div>
                        <div className="text-[10px] text-gray-400">Database exploit tool</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        runQuickCommand('lab status');
                        setIsApplicationsMenuOpen(false);
                      }}
                      className="w-full p-2 rounded-lg hover:bg-[#14283f] flex items-center space-x-2 text-left cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-[#00AEEF]" />
                      <div>
                        <div className="font-bold text-white">CyberLab V3 Manager</div>
                        <div className="text-[10px] text-gray-400">7 isolated containers</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 5. AUTHENTIC PLACES MENU ================= */}
            {isPlacesMenuOpen && (
              <div
                id="places-menu"
                className="absolute top-1 left-28 w-48 bg-[#091524]/98 border border-[#00AEEF]/40 rounded-xl shadow-2xl py-1 z-50 text-xs font-sans text-gray-200 select-none animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('terminal');
                    runQuickCommand('cd ~ && ls -la');
                    setIsPlacesMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black text-left cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home Folder</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('terminal');
                    runQuickCommand('cd ~/Desktop && ls -la');
                    setIsPlacesMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black text-left cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('terminal');
                    runQuickCommand('cd ~/Downloads && ls -la');
                    setIsPlacesMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black text-left cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>Downloads</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveWindow('terminal');
                    runQuickCommand('cd / && ls -la');
                    setIsPlacesMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black text-left cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>File System (/)</span>
                </button>
              </div>
            )}

            {/* ================= 6. DESKTOP RIGHT-CLICK CONTEXT MENU ================= */}
            {contextMenu && (
              <div
                id="desktop-context-menu"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                className="absolute w-52 bg-[#081322]/98 border border-[#00AEEF]/40 rounded-xl shadow-2xl py-1 z-50 text-xs font-sans text-gray-200 select-none animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleCreateFolder}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Create Folder</span>
                </button>

                <button
                  type="button"
                  onClick={handleCreateDocument}
                  className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-[#00AEEF] hover:text-black transition-colors text-left cursor-pointer"
                >
                  <FilePlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Create Document</span>
                </button>

                <div className="h-px bg-white/10 my-1" />

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
                  <RefreshCw className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span>Reboot Kali OS</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Taskbar Status Footer */}
          <div className="h-6 px-3 bg-[#08121f] border-t border-[#00AEEF]/20 flex items-center justify-between text-[10px] font-mono text-gray-400 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 text-[#00AEEF] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                <span>KALI SANDBOX : ONLINE</span>
              </span>
              <span>|</span>
              <span>Subnet: 10.10.11.0/24</span>
              <span>|</span>
              <span>7 Containers Healthy</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="font-semibold text-[9px] uppercase tracking-wider">
                REDKROSS RESEARCH FOUNDATION
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
