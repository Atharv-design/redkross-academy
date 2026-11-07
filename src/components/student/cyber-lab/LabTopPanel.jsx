import React from 'react';
import {
  Wifi,
  Volume2,
  Power,
  Home,
  Folder,
  HardDrive,
  Terminal as TerminalIcon,
  Globe,
  Eye,
  Database,
  Shield
} from 'lucide-react';

export default function LabTopPanel({
  isApplicationsMenuOpen,
  setIsApplicationsMenuOpen,
  isPlacesMenuOpen,
  setIsPlacesMenuOpen,
  currentTimeStr,
  activeWorkspace,
  handleRebootKali,
  appSearchQuery,
  setAppSearchQuery,
  whiskerCategories,
  appMenuCategory,
  setAppMenuCategory,
  setActiveWindow,
  runQuickCommand
}) {
  return (
    <>
      {/* Top Panel Bar */}
      <div className="h-7 px-3 bg-[#0a1422]/95 border-b border-black/60 flex items-center justify-between text-xs font-sans text-gray-200 flex-shrink-0 z-30 select-none shadow-md">
        {/* Left: Kali Icon + Applications + Places */}
        <div className="flex items-center space-x-3">
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

        {/* Center: Live Date & Time */}
        <div className="font-mono text-xs font-semibold text-gray-200 tracking-wide pointer-events-none">
          {currentTimeStr}
        </div>

        {/* Right: Workspace, Volume, Network, Power */}
        <div className="flex items-center space-x-2 text-gray-300">
          <div className="w-5 h-5 rounded bg-[#10233b] border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner">
            {activeWorkspace}
          </div>

          <div title="Connected to lab-isolated (10.10.11.100)">
            <Wifi className="w-3.5 h-3.5 text-[#35E6B5]" />
          </div>

          <div>
            <Volume2 className="w-3.5 h-3.5 text-gray-300" />
          </div>

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

      {/* Applications Menu Popover */}
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
              {whiskerCategories.map((cat) => {
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

      {/* Places Menu Popover */}
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
    </>
  );
}
