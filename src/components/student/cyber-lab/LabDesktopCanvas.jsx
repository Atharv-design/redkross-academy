import React from 'react';
import {
  Trash2,
  HardDrive,
  Home,
  Folder,
  FileText,
  FolderPlus,
  FilePlus,
  Terminal as TerminalIcon,
  Globe,
  Monitor,
  RefreshCw
} from 'lucide-react';
import OfficialKaliLogo from './OfficialKaliLogo';

export default function LabDesktopCanvas({
  handleDesktopContextMenu,
  desktopItems,
  selectedDesktopItemId,
  setSelectedDesktopItemId,
  setActiveWindow,
  runQuickCommand,
  contextMenu,
  setContextMenu,
  handleCreateFolder,
  handleCreateDocument,
  isMaximized,
  setIsMaximized,
  handleRebootKali,
  children
}) {
  return (
    <div
      onContextMenu={handleDesktopContextMenu}
      className="flex-1 relative overflow-hidden select-none bg-[#030814] flex flex-col"
    >
      {/* Wave Ribbons Wallpaper */}
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

      {/* Official Kali Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="opacity-90 transition-opacity transform -translate-y-4">
          <OfficialKaliLogo
            className="h-64 sm:h-72"
            showText={true}
            dragonSize="w-56 h-40 sm:w-64 sm:h-44"
          />
        </div>
      </div>

      {/* Left Desktop Shortcuts Stack */}
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

      {/* Children Windows (Terminal & Browser) */}
      {children}

      {/* Desktop Context Menu */}
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

      {/* Bottom Taskbar Status Footer */}
      <div className="mt-auto h-6 px-3 bg-[#08121f] border-t border-[#00AEEF]/20 flex items-center justify-between text-[10px] font-mono text-gray-400 flex-shrink-0">
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
  );
}
