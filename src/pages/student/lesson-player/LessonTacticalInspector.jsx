import React, { useState } from 'react';
import {
  Shield,
  X,
  Zap,
  Activity,
  Copy,
  Check,
  RotateCcw,
  Flag,
  Send,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

/**
 * LessonTacticalInspector.jsx
 * Pixel-perfect Tactical Recon Hub for RedKross Learning Cockpit (Panel 3 drawer).
 * 
 * Features:
 * - Header: Shield icon + Tactical Recon Hub + +150 Tokens bounty badge + Close button
 * - macOS Terminal Pop-Up launch banner with red/yellow/green traffic dots
 * - 4 Segmented Tabs: [🎯 Target] [🚩 Flags] [⚡ Payloads] [💬 Notes]
 * - Target Host Matrix: Assigned target (10.10.11.205), copy IP, revert snapshot, 4 live ports
 */
export default function LessonTacticalInspector({
  isOpen = true,
  onClose = () => {},
  targetIp = '10.10.11.205',
  onOpenTerminal = () => {},
  onInjectPayload = () => {},
  isAssignment = false
}) {
  const [activeTab, setActiveTab] = useState('target'); // 'target' | 'flags' | 'payloads' | 'notes'
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [revertingTarget, setRevertingTarget] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyIp = () => {
    navigator.clipboard.writeText(targetIp);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleCopyCommand = (cmd, idx) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(idx);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleRevert = () => {
    setRevertingTarget(true);
    setTimeout(() => setRevertingTarget(false), 1500);
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    if (!flagInput.trim()) return;
    setFlagSubmitted(true);
  };

  const ports = [
    { port: '22/tcp', service: 'OpenSSH 8.9p1 (Ubuntu)', cmd: `nmap -p 22 -sV ${targetIp}` },
    { port: '80/tcp', service: 'Apache httpd 2.4.52 (Web Gateway)', cmd: `curl -I http://${targetIp}` },
    { port: '443/tcp', service: 'OpenSSL 3.0.2 (HTTPS)', cmd: `nmap -p 443 --script ssl-cert ${targetIp}` },
    { port: '3306/tcp', service: 'MySQL Database', cmd: `nmap -p 3306 -sC ${targetIp}` }
  ];

  const payloads = [
    {
      title: 'Full TCP Service & Script Scan',
      desc: 'Comprehensive multi-port banner grab and vulnerability detection.',
      cmd: `nmap -sC -sV -Pn ${targetIp}`
    },
    {
      title: 'Web Directory & API Fuzzing',
      desc: 'Brute-force hidden endpoints and admin portals.',
      cmd: `gobuster dir -u http://${targetIp}/ -w /usr/share/wordlists/dirb/common.txt`
    },
    {
      title: 'HTTP Response Headers Probe',
      desc: 'Extract server version, PHP build and hidden cookie flags.',
      cmd: `curl -I -X GET http://${targetIp}/admin/debug.php`
    },
    {
      title: 'Interactive Python Reverse Shell',
      desc: 'Spawn a TTY shell after establishing initial remote foothold.',
      cmd: `python3 -c 'import pty; pty.spawn("/bin/bash")'`
    }
  ];

  return (
    <aside className="w-80 xl:w-92 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar border-l border-[#FF7A00]/25 bg-[#0B0805]/95 backdrop-blur-2xl flex flex-col p-4 space-y-4 flex-shrink-0 z-20 self-start animate-fade-in font-mono select-none">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#FF7A00]/25">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#FF7A00]" />
          <h4 className="font-serif font-bold text-sm text-white tracking-wide">Tactical Recon Hub</h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF7A00]/15 text-[#FFA439] border border-[#FF7A00]/35 font-bold">
            +150 Tokens
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#A3907C] hover:text-[#FFA439] transition-colors cursor-pointer"
            title="Collapse Recon Hub"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Prominent macOS Terminal Pop-Up Launch Banner */}
      <button
        type="button"
        onClick={onOpenTerminal}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A1208] to-[#071018] border border-[#FFA439]/40 text-[#FFA439] hover:border-[#FF7A00] transition-all group cursor-pointer shadow-lg"
      >
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="font-mono text-xs font-bold text-white group-hover:text-[#FFA439]">macOS Terminal Pop-Up</span>
        </div>
        <div className="flex items-center space-x-1 text-[11px] font-mono text-[#FFA439]">
          <span>Launch ⤢</span>
        </div>
      </button>

      {/* 3. Segmented Tactical Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/60 border border-[#FF7A00]/25 text-[11px] font-mono">
        {[
          { id: 'target', label: '🎯 Target' },
          { id: 'flags', label: '🚩 Flags' },
          { id: 'payloads', label: '⚡ Payloads' },
          { id: 'notes', label: '💬 Notes' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#FF7A00] text-black shadow-sm'
                : 'text-[#A3907C] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Tab 1: Target HUD */}
      {activeTab === 'target' && (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-[#1A1208]/60 border border-[#FF7A00]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#A3907C] uppercase tracking-wider">
                Assigned Target Host
              </span>
              <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[10px] font-mono text-[#FFA439] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                <span>ONLINE - 18ms</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-mono font-bold text-base block">{targetIp}</span>
                <span className="text-[#8BA2B5] text-[11px] font-mono">vuln-alpha.redkross.local</span>
              </div>
              <button
                type="button"
                onClick={handleCopyIp}
                className="px-2.5 py-1 rounded-lg bg-black/40 border border-[#FFA439]/30 text-[#FFA439] hover:text-white hover:border-[#FF7A00] text-xs font-mono flex items-center space-x-1 transition-all cursor-pointer"
              >
                {copiedIp ? <Check className="w-3 h-3 text-[#FF7A00]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIp ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[11px] text-[#A3907C]">Ubuntu 22.04 LTS (x86_64)</span>
              <button
                type="button"
                onClick={handleRevert}
                disabled={revertingTarget}
                className="px-2.5 py-1 rounded-lg bg-[#FF5F56]/15 border border-[#FF5F56]/30 text-[#FF5F56] hover:bg-[#FF5F56]/25 transition-all flex items-center space-x-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className={`w-3 h-3 ${revertingTarget ? 'animate-spin' : ''}`} />
                <span>{revertingTarget ? 'Reverting...' : 'Revert Snapshot'}</span>
              </button>
            </div>
          </div>

          {/* Service Matrix */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#FFA439]" />
                <span>Discovered Service Matrix</span>
              </span>
              <span className="text-[10px] font-mono text-[#A3907C]">4 Open Ports</span>
            </div>

            <div className="space-y-1.5">
              {ports.map((p, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-black/40 border border-[#FFA439]/20 hover:border-[#FF7A00]/40 transition-all flex items-center justify-between text-xs font-mono group"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="px-1.5 py-0.5 rounded bg-[#FF7A00]/20 text-[#FFA439] font-bold text-[10px]">
                      {p.port}
                    </span>
                    <span className="text-[#E6F4EA] truncate text-[11px]">{p.service}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInjectPayload(p.cmd)}
                    className="p-1 rounded bg-black/60 text-[#A3907C] group-hover:text-[#FFA439] hover:bg-[#FF7A00]/20 transition-all flex-shrink-0 cursor-pointer"
                    title="Probe service in Mac Terminal"
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Flags */}
      {activeTab === 'flags' && (
        <div className="space-y-3.5 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#1A1208]/60 border border-[#FF7A00]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#A3907C]">Operational Status:</span>
              <span className="text-[#FFA439] font-bold">2 / 3 Objectives Cleared</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FFA439] to-[#FF7A00] rounded-full w-[66%]" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Objective 1: User Foothold</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#65F58A]/20 text-[#65F58A] text-[10px] font-bold">
                CLAIMED (+25 Tokens)
              </span>
            </div>
            <p className="text-[11px] text-[#8BA2B5]">
              Credentials verified from local database recon; low-privilege bash shell established.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-[#FFA439]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[#FFBD2E]" />
                <span>Objective 2: Root Privilege Escalation</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFBD2E]/20 text-[#FFBD2E] font-bold">
                +50 Tokens
              </span>
            </div>
            <form onSubmit={handleFlagSubmit} className="space-y-2">
              <div className="flex items-center space-x-1.5">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="rk_flag{...}"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#071018] border border-[#FFA439]/30 text-white font-mono text-xs outline-none focus:border-[#FF7A00]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-black font-mono font-bold text-xs transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit</span>
                </button>
              </div>
              {flagSubmitted && (
                <div className="text-[11px] text-[#65F58A] font-bold">
                  ✓ Flag verified! 50 tokens added to your cadet balance.
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Payloads */}
      {activeTab === 'payloads' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono font-bold text-white">Lesson Tactical Arsenal</span>
            <span className="text-[10px] font-mono text-[#A3907C]">1-Click Injection</span>
          </div>

          {payloads.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/40 border border-[#FFA439]/20 hover:border-[#FF7A00]/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">{item.title}</span>
                <span className="text-[10px] font-mono text-[#A3907C]">Payload #{idx + 1}</span>
              </div>
              <p className="text-[11px] font-mono text-[#8BA2B5]">{item.desc}</p>
              <div className="p-2 rounded-lg bg-[#071018] border border-white/10 font-mono text-xs text-[#FFA439] break-all select-all">
                {item.cmd}
              </div>
              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyCommand(item.cmd, idx)}
                  className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 hover:border-[#FFA439] text-[#8BA2B5] hover:text-white text-[11px] font-mono transition-all cursor-pointer flex items-center space-x-1"
                >
                  {copiedCmd === idx ? <Check className="w-3 h-3 text-[#FF7A00]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd === idx ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onInjectPayload(item.cmd)}
                  className="px-3 py-1 rounded-lg bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 border border-[#FF7A00]/40 text-[#FFA439] font-bold text-[11px] font-mono transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Send to Terminal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7. Tab 4: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#1A1208]/50 border border-[#FF7A00]/20 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#FFA439] font-bold">
              <FileCheck className="w-4 h-4" />
              <span>Lab Findings & Forensics</span>
            </div>
            <p className="text-[11px] font-mono text-[#8BA2B5] leading-relaxed">
              Unit Telemetry: Defensive laboratory briefing and operational objectives verified.
            </p>
          </div>
          <textarea
            rows={6}
            placeholder="Document reconnaissance findings, discovered credentials, or operational thoughts..."
            className="w-full bg-[#071018] border border-[#FFA439]/30 rounded-xl p-3 text-white font-mono text-xs outline-none focus:border-[#FF7A00] resize-none"
          />
        </div>
      )}
    </aside>
  );
}
