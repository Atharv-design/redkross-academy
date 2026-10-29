import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Layers,
  Users,
  ScanEye,
  ScrollText,
  Search,
  Radio,
  Lock,
  Coins,
  Armchair,
  BadgeCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Plus,
  Play,
  RotateCcw,
  Check,
  Ban,
  Wallet,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { apiClient } from '../../services/apiClient';
import CurriculumStudioTree from '../../components/admin/CurriculumStudioTree';

export default function SuperAdminDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'curriculum' | 'cadets' | 'proctor' | 'audit'
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [embargoed, setEmbargoed] = useState(false);
  const [togglingEmbargo, setTogglingEmbargo] = useState(false);
  const [toggleNotice, setToggleNotice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Cadet CRM local interactive state
  const [cadets, setCadets] = useState([
    { id: 'cd-001', callsign: 'VX-04', name: 'Dana Okafor', email: 'dana.okafor@tactical.redkross', status: 'In-Exam', path: 'Offensive Cyber Warfare', progress: 72, tokens: 450, strikes: 1, lastSeen: '14:12:07 UTC' },
    { id: 'cd-002', callsign: 'KR-11', name: 'Marek Silva', email: 'marek.silva@defensive.redkross', status: 'Certified', path: 'Offensive Cyber Warfare', progress: 100, tokens: 1200, strikes: 0, lastSeen: '09:41:55 UTC' },
    { id: 'cd-003', callsign: 'NX-07', name: 'Ines Karlsson', email: 'ines.k@cloud.redkross', status: 'Enrolled', path: 'Cloud Incident Response', progress: 34, tokens: 180, strikes: 0, lastSeen: '13:58:12 UTC' },
    { id: 'cd-004', callsign: 'RV-23', name: 'Tobias Grant', email: 'tobias.g@ops.redkross', status: 'Flagged', path: 'Offensive Cyber Warfare', progress: 61, tokens: 210, strikes: 2, lastSeen: '12:03:44 UTC' },
    { id: 'cd-005', callsign: 'ZK-19', name: 'Priya Raman', email: 'priya.raman@ir.redkross', status: 'In-Exam', path: 'Cloud Incident Response', progress: 88, tokens: 540, strikes: 3, lastSeen: '14:21:31 UTC' },
    { id: 'cd-006', callsign: 'QT-02', name: 'Leo Duarte', email: 'leo.d@threat.redkross', status: 'Enrolled', path: 'Offensive Cyber Warfare', progress: 12, tokens: 25, strikes: 0, lastSeen: '08:15:02 UTC' }
  ]);
  const [selectedCadet, setSelectedCadet] = useState(null);
  const [cadetFilter, setCadetFilter] = useState('ALL');
  const [tokenGrantModalOpen, setTokenGrantModalOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(100);

  // Proctor Telemetry Queue State
  const [incidents, setIncidents] = useState([
    { id: 'inc-01', cadetId: 'cd-001', cadetName: 'Dana Okafor', event: 'Tab Switch', strikes: 1, confidence: 93, at: '14:19:52 UTC', exam: 'OCW-301 Kernel Final' },
    { id: 'inc-02', cadetId: 'cd-005', cadetName: 'Priya Raman', event: 'Secondary Screen Detected', strikes: 3, confidence: 97, at: '14:18:04 UTC', exam: 'CIR-220 Midterm Lab' },
    { id: 'inc-03', cadetId: 'cd-004', cadetName: 'Tobias Grant', event: 'Webcam Feed Obscured', strikes: 2, confidence: 78, at: '13:44:09 UTC', exam: 'OCW-210 Practical' }
  ]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { id: 'aud-01', at: '14:18:04 UTC', actor: 'proctor-daemon', action: 'Strike issued (3/3)', target: 'ZK-19 · CIR-220', severity: 'critical', hash: '0x8f2c…a41b' },
    { id: 'aud-02', at: '13:58:12 UTC', actor: 'super.admin', action: 'Token grant +250 RK', target: 'NX-07', severity: 'info', hash: '0x71b9…c00d' },
    { id: 'aud-03', at: '13:44:09 UTC', actor: 'proctor-daemon', action: 'Tab switch flagged', target: 'RV-23 · OCW-210', severity: 'warn', hash: '0x5de1…77aa' },
    { id: 'aud-04', at: '12:30:00 UTC', actor: 'super.admin', action: 'Certificate minted', target: 'KR-11 · OCW-301', severity: 'info', hash: '0x3ac7…912f' },
    { id: 'aud-05', at: '11:02:37 UTC', actor: 'curriculum.ai', action: 'Module published', target: 'Resilient C2 Channels', severity: 'info', hash: '0x94f0…2be8' }
  ]);

  const fetchDashboardData = async () => {
    try {
      const res = await apiClient.getAdminMetrics();
      if (res) {
        setData(res);
        setEmbargoed(!res.public_catalog_enabled);
      }
    } catch (err) {
      console.error('Failed to load telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleCatalog = async () => {
    setTogglingEmbargo(true);
    setToggleNotice('');
    try {
      const newStatus = embargoed; // if embargoed is true, we want to enable public catalog (newStatus = true)
      await apiClient.toggleCatalogVisibility(newStatus);
      setEmbargoed(!newStatus);
      setToggleNotice(
        newStatus
          ? 'Catalog LIVE: Public visitors can now view the entire curriculum.'
          : 'Catalog EMBARGOED: Learning paths and catalog now show "Courses will be out soon".'
      );
      setTimeout(() => setToggleNotice(''), 4000);
    } catch (err) {
      console.error('Failed to toggle embargo:', err);
      setToggleNotice('Error updating catalog embargo setting.');
    } finally {
      setTogglingEmbargo(false);
    }
  };

  const handlePardonIncident = (incidentId) => {
    const inc = incidents.find((i) => i.id === incidentId);
    if (!inc) return;
    setIncidents((prev) => prev.filter((i) => i.id !== incidentId));
    setCadets((prev) =>
      prev.map((c) => (c.id === inc.cadetId ? { ...c, strikes: Math.max(0, c.strikes - 1) } : c))
    );
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        at: new Date().toLocaleTimeString() + ' UTC',
        actor: 'super.admin',
        action: `Pardoned incident: ${inc.event}`,
        target: inc.cadetName,
        severity: 'warn',
        hash: '0x' + Math.random().toString(16).slice(2, 6) + '…'
      },
      ...prev
    ]);
  };

  const handleDisqualifyIncident = (incidentId) => {
    const inc = incidents.find((i) => i.id === incidentId);
    if (!inc) return;
    setIncidents((prev) => prev.filter((i) => i.id !== incidentId));
    setCadets((prev) =>
      prev.map((c) => (c.id === inc.cadetId ? { ...c, status: 'Flagged', strikes: 3 } : c))
    );
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        at: new Date().toLocaleTimeString() + ' UTC',
        actor: 'super.admin',
        action: `Cadet Disqualified: ${inc.event}`,
        target: `${inc.cadetName} (${inc.exam})`,
        severity: 'critical',
        hash: '0x' + Math.random().toString(16).slice(2, 6) + '…'
      },
      ...prev
    ]);
  };

  const handleGrantTokens = (cadetId) => {
    setCadets((prev) =>
      prev.map((c) => (c.id === cadetId ? { ...c, tokens: c.tokens + tokenAmount } : c))
    );
    const target = cadets.find((c) => c.id === cadetId);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        at: new Date().toLocaleTimeString() + ' UTC',
        actor: 'super.admin',
        action: `Token grant +${tokenAmount} RK`,
        target: target?.callsign || cadetId,
        severity: 'info',
        hash: '0x' + Math.random().toString(16).slice(2, 6) + '…'
      },
      ...prev
    ]);
    setTokenGrantModalOpen(false);
  };

  const handleIssueCert = (cadetId) => {
    setCadets((prev) =>
      prev.map((c) => (c.id === cadetId ? { ...c, status: 'Certified', progress: 100 } : c))
    );
    const target = cadets.find((c) => c.id === cadetId);
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        at: new Date().toLocaleTimeString() + ' UTC',
        actor: 'super.admin',
        action: 'Minted Cryptographic Credential',
        target: `${target?.callsign} (${target?.name})`,
        severity: 'info',
        hash: '0x' + Math.random().toString(16).slice(2, 6) + '…'
      },
      ...prev
    ]);
  };

  const filteredCadets = cadets.filter((c) => {
    const matchesFilter = cadetFilter === 'ALL' || c.status.toLowerCase() === cadetFilter.toLowerCase();
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#071018] text-[#F1F5F9] pb-24 selection:bg-[#65F58A]/30 selection:text-white">
      {/* 1. Tactical Command Header */}
      <header className="sticky top-0 z-40 border-b border-[#263440] bg-[#071018]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Node */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#101923] border border-[#65F58A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(101,245,138,0.2)]">
              <Shield className="w-4 h-4 text-[#65F58A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-white tracking-wider">
                  RED<span className="text-[#65F58A]">KROSS</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30">
                  NODE eu-tac-01
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#94A3B8]">Super Admin Intelligence & Curriculum Studio</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cadets, modules, telemetry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#101923] border border-[#263440] text-xs font-mono text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#65F58A]"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#94A3B8] px-1 rounded bg-[#071018] border border-[#263440]">
              ⌘K
            </span>
          </div>

          {/* Embargo Master Switch */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleCatalog}
              disabled={togglingEmbargo}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                embargoed
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/40 shadow-[0_0_15px_rgba(101,245,138,0.15)]'
              }`}
            >
              {embargoed ? <Lock className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
              <span>{togglingEmbargo ? 'Updating...' : embargoed ? 'EMBARGOED' : 'PUBLIC LIVE'}</span>
            </button>
          </div>
        </div>

        {toggleNotice && (
          <div className="bg-[#101923] border-b border-[#263440] py-1.5 px-4 text-center text-xs font-mono text-[#65F58A] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{toggleNotice}</span>
          </div>
        )}
      </header>

      {/* 2. Framer Motion Tab Navigation Strip */}
      <div className="border-b border-[#263440] bg-[#0A121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Command Overview', icon: Shield },
            { id: 'curriculum', label: 'Curriculum & Video Studio', icon: Layers },
            { id: 'cadets', label: 'Cadet CRM', icon: Users, badge: cadets.length },
            { id: 'proctor', label: 'Proctor Telemetry Queue', icon: ScanEye, alertBadge: incidents.length },
            { id: 'audit', label: 'Audit Trail', icon: ScrollText }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-3.5 px-4 font-mono text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#65F58A]' : 'text-[#94A3B8]'}`} />
                <span>{tab.label}</span>

                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1B2530] text-[#35E6B5] border border-[#263440]">
                    {tab.badge}
                  </span>
                )}

                {tab.alertBadge > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {tab.alertBadge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute bottom-0 inset-x-2 h-0.5 bg-[#65F58A] shadow-[0_0_10px_rgba(101,245,138,0.8)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Operational Workstation Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">Enrolled Cadets</div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">{cadets.length}</div>
                  <div className="text-[10px] font-mono text-[#65F58A]">100% ID Verified</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">Curriculum Seats</div>
                  <div className="text-2xl font-bold font-mono text-[#35E6B5] tabular-nums">412 / 500</div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">82.4% Allocation</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">Minted Credentials</div>
                  <div className="text-2xl font-bold font-mono text-[#65F58A] tabular-nums">
                    {cadets.filter((c) => c.status === 'Certified').length + 52}
                  </div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">Signed on Ledger</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">Active Incidents</div>
                  <div className="text-2xl font-bold font-mono text-rose-400 tabular-nums">{incidents.length}</div>
                  <div className="text-[10px] font-mono text-rose-400">Proctor Telemetry</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">Tokens in Circulation</div>
                  <div className="text-2xl font-bold font-mono text-[#35E6B5] tabular-nums">
                    {cadets.reduce((sum, c) => sum + c.tokens, 0).toLocaleString()} RK
                  </div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">Non-Monetary Ledger</div>
                </div>
              </div>

              {/* Two-Column Telemetry: Incidents & Audit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-Time Proctor Incidents */}
                <div className="p-5 rounded-2xl bg-[#101923] border border-[#263440] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
                    <div className="flex items-center gap-2">
                      <ScanEye className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-mono uppercase font-bold text-white">
                        Live Exam Telemetry Feed
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('proctor')}
                      className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1"
                    >
                      <span>Manage Queue ({incidents.length})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {incidents.slice(0, 4).map((inc) => (
                      <div
                        key={inc.id}
                        className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <div className="text-white font-semibold">{inc.cadetName}</div>
                          <div className="text-[11px] text-rose-400 mt-0.5">{inc.event} (Strike {inc.strikes}/3)</div>
                          <div className="text-[10px] text-[#94A3B8] mt-0.5">{inc.exam}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[10px] text-[#94A3B8]">{inc.at}</span>
                          <button
                            onClick={() => handlePardonIncident(inc.id)}
                            className="px-2.5 py-1 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 text-[10px] font-bold"
                          >
                            Pardon
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="p-5 rounded-2xl bg-[#101923] border border-[#263440] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
                    <div className="flex items-center gap-2">
                      <ScrollText className="w-4 h-4 text-[#35E6B5]" />
                      <span className="text-xs font-mono uppercase font-bold text-white">
                        Immutable Security Audit Trail
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('audit')}
                      className="text-xs font-mono text-[#65F58A] hover:underline flex items-center gap-1"
                    >
                      <span>Full Trail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {auditLogs.slice(0, 4).map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <div className="text-white font-semibold">{log.action}</div>
                          <div className="text-[11px] text-[#94A3B8] mt-0.5">Target: {log.target}</div>
                          <div className="text-[10px] text-[#35E6B5]">Actor: {log.actor}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] text-[#94A3B8]">{log.at}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-[#94A3B8]">
                            {log.hash}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CURRICULUM STUDIO */}
          {activeTab === 'curriculum' && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CurriculumStudioTree
                onSave={(paths) => {
                  setAuditLogs((prev) => [
                    {
                      id: `aud-${Date.now()}`,
                      at: new Date().toLocaleTimeString() + ' UTC',
                      actor: 'super.admin',
                      action: 'Updated Curriculum Hierarchy & Video Sequencer',
                      target: `${paths.length} Paths Synced`,
                      severity: 'info',
                      hash: '0x' + Math.random().toString(16).slice(2, 6) + '…'
                    },
                    ...prev
                  ]);
                }}
              />
            </motion.div>
          )}

          {/* TAB 3: CADET CRM */}
          {activeTab === 'cadets' && (
            <motion.div
              key="cadets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {['ALL', 'Enrolled', 'In-Exam', 'Certified', 'Flagged'].map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setCadetFilter(flt)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                        cadetFilter === flt
                          ? 'bg-[#65F58A] text-[#071018] font-bold'
                          : 'bg-[#101923] text-[#94A3B8] hover:text-white border border-[#263440]'
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-[#94A3B8]">
                  Showing {filteredCadets.length} of {cadets.length} registered cadets
                </span>
              </div>

              {/* Cadets Table */}
              <div className="rounded-2xl border border-[#263440] bg-[#101923] overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#071018] border-b border-[#263440] text-[#94A3B8] uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Cadet / Callsign</th>
                      <th className="py-3 px-4">Track / Path</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Progress</th>
                      <th className="py-3 px-4">Token Balance</th>
                      <th className="py-3 px-4">Strikes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#263440]/60">
                    {filteredCadets.map((cadet) => (
                      <tr key={cadet.id} className="hover:bg-[#131D27] transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{cadet.name}</div>
                          <div className="text-[10px] text-[#65F58A]">{cadet.callsign} · {cadet.email}</div>
                        </td>
                        <td className="py-3 px-4 text-[#94A3B8]">{cadet.path}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              cadet.status === 'Certified'
                                ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                                : cadet.status === 'In-Exam'
                                ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                                : cadet.status === 'Flagged'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-[#35E6B5]/10 text-[#35E6B5] border-[#35E6B5]/30'
                            }`}
                          >
                            {cadet.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#071018] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#65F58A]"
                                style={{ width: `${cadet.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-[#94A3B8]">{cadet.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#35E6B5] font-bold">{cadet.tokens} RK</td>
                        <td className="py-3 px-4">
                          <span className={cadet.strikes > 0 ? 'text-rose-400 font-bold' : 'text-[#94A3B8]'}>
                            {cadet.strikes}/3
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedCadet(cadet);
                                setTokenGrantModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30 text-[10px] font-bold hover:bg-[#35E6B5]/20"
                            >
                              + Tokens
                            </button>
                            {cadet.status !== 'Certified' && (
                              <button
                                onClick={() => handleIssueCert(cadet.id)}
                                className="px-2.5 py-1 rounded-lg bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 text-[10px] font-bold hover:bg-[#65F58A]/20"
                              >
                                Mint Cert
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Token Grant Modal */}
              {tokenGrantModalOpen && selectedCadet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                  <div className="bg-[#101923] border border-[#263440] p-6 rounded-2xl max-w-sm w-full space-y-4">
                    <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#35E6B5]" />
                      <span>Grant Academic Tokens: {selectedCadet.callsign}</span>
                    </h3>
                    <p className="text-xs font-mono text-[#94A3B8]">
                      Award non-monetary academic tokens for lab completion and exemplary research contributions.
                    </p>
                    <div className="flex gap-2">
                      {[50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTokenAmount(amt)}
                          className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold border transition-colors ${
                            tokenAmount === amt
                              ? 'bg-[#35E6B5] text-[#071018] border-[#35E6B5]'
                              : 'bg-[#071018] text-[#94A3B8] border-[#263440]'
                          }`}
                        >
                          +{amt}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setTokenGrantModalOpen(false)}
                        className="px-3 py-1.5 text-xs font-mono text-[#94A3B8]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleGrantTokens(selectedCadet.id)}
                        className="px-4 py-1.5 rounded-xl bg-[#65F58A] text-[#071018] font-mono text-xs font-bold"
                      >
                        Confirm Grant
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: PROCTOR QUEUE */}
          {activeTab === 'proctor' && (
            <motion.div
              key="proctor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
                <div>
                  <h2 className="text-base font-mono font-bold text-white flex items-center gap-2">
                    <ScanEye className="w-5 h-5 text-rose-400" />
                    <span>Active Proctoring Incident Telemetry Queue</span>
                  </h2>
                  <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                    Automated anti-cheat telemetry flagged by web worker proctor engine. Strike 3 initiates security lockout.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
                  {incidents.length} Unresolved Incidents
                </span>
              </div>

              {incidents.length === 0 ? (
                <div className="p-16 rounded-2xl bg-[#101923] border border-[#263440] text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-[#65F58A] mx-auto" />
                  <p className="text-sm font-mono font-bold text-white">Proctor Telemetry Nominal</p>
                  <p className="text-xs font-mono text-[#94A3B8]">
                    No active student violations recorded. All ongoing exam sessions are clean.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {incidents.map((inc) => (
                    <div
                      key={inc.id}
                      className="p-5 rounded-2xl bg-[#101923] border border-[#263440] space-y-3 relative group hover:border-rose-400/40 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-white font-mono font-bold text-sm">{inc.cadetName}</span>
                          <p className="text-xs font-mono text-rose-400 mt-0.5">{inc.event}</p>
                          <p className="text-[10px] font-mono text-[#94A3B8]">{inc.exam}</p>
                        </div>
                        {/* Strike Badge */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <span
                              key={s}
                              className={`w-2.5 h-2.5 rounded-full ${
                                s <= inc.strikes ? 'bg-rose-500 animate-pulse' : 'bg-[#263440]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                          <span>Detection Confidence</span>
                          <span className="text-[#65F58A] font-bold">{inc.confidence}%</span>
                        </div>
                        <div className="w-full h-1 bg-[#071018] rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500" style={{ width: `${inc.confidence}%` }} />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handlePardonIncident(inc.id)}
                          className="flex-1 py-1.5 rounded-xl bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 text-xs font-mono font-bold hover:bg-[#65F58A]/20 transition-colors"
                        >
                          Pardon
                        </button>
                        <button
                          onClick={() => handleDisqualifyIncident(inc.id)}
                          className="flex-1 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold hover:bg-rose-500/20 transition-colors"
                        >
                          Disqualify
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
                <div>
                  <h2 className="text-base font-mono font-bold text-white flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-[#35E6B5]" />
                    <span>Cryptographic Audit Trail (Append-Only)</span>
                  </h2>
                  <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                    Immutable security log recording all admin interventions, credential mints, and strike pardons.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#65F58A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hash Chain Intact</span>
                </span>
              </div>

              <div className="rounded-2xl border border-[#263440] bg-[#101923] overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#071018] border-b border-[#263440] text-[#94A3B8] uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Operator / Actor</th>
                      <th className="py-3 px-4">Operation</th>
                      <th className="py-3 px-4">Target Entity</th>
                      <th className="py-3 px-4">Severity</th>
                      <th className="py-3 px-4 text-right">Block Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#263440]/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#131D27] transition-colors">
                        <td className="py-3 px-4 text-[#94A3B8]">{log.at}</td>
                        <td className="py-3 px-4 text-[#35E6B5] font-bold">{log.actor}</td>
                        <td className="py-3 px-4 text-white font-semibold">{log.action}</td>
                        <td className="py-3 px-4 text-[#94A3B8]">{log.target}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              log.severity === 'critical'
                                ? 'bg-rose-500/20 text-rose-400'
                                : log.severity === 'warn'
                                ? 'bg-amber-400/20 text-amber-400'
                                : 'bg-[#65F58A]/20 text-[#65F58A]'
                            }`}
                          >
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-[10px] text-[#94A3B8]">{log.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
