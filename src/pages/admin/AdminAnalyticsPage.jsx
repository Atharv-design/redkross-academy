import React, { useState, useEffect } from 'react';
import {
  LineChart, TrendingUp, Users, Award, BookOpen, Clock,
  Download, Filter, Sparkles, BarChart2, Activity, ShieldCheck,
  ShieldAlert, RefreshCw, Layers, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { socketClient } from '../../services/socket/socketClient';
import { RedKrossDonutChart } from '../../components/application/charts/PieChart';

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30D');
  const [analytics, setAnalytics] = useState(() => mockEngine.getLearningAnalytics('30D'));
  const [refreshing, setRefreshing] = useState(false);
  const [lastSocketEvent, setLastSocketEvent] = useState(null);

  // Live Database & Socket.io Real-Time Telemetry Synchronization
  useEffect(() => {
    // Immediate load for selected date range
    setAnalytics(mockEngine.getLearningAnalytics(dateRange));

    // Listen to real-time events broadcast via Socket.io & BroadcastChannel bus
    const handleSocketEvent = (data) => {
      const eventName = typeof data === 'object' && data?.event ? data.event : 'TELEMETRY_SYNC';
      setLastSocketEvent({
        event: eventName,
        time: new Date().toLocaleTimeString()
      });
      setAnalytics(mockEngine.getLearningAnalytics(dateRange));
    };

    const unsubSocket = socketClient.on('*', handleSocketEvent);
    const unsubDb = mockEngine.subscribe(() => {
      setAnalytics(mockEngine.getLearningAnalytics(dateRange));
    });

    return () => {
      if (typeof unsubSocket === 'function') unsubSocket();
      if (typeof unsubDb === 'function') unsubDb();
    };
  }, [dateRange]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setAnalytics(mockEngine.getLearningAnalytics(dateRange));
    setTimeout(() => setRefreshing(false), 400);
  };

  // Export Real Telemetry CSV
  const handleExportReport = () => {
    if (!analytics) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += '--- REDKROSS ACADEMY EXECUTIVE TELEMETRY REPORT ---\n';
    csvContent += `Generated At,"${new Date().toISOString()}"\n`;
    csvContent += `Filter Range,"${dateRange}"\n`;
    csvContent += `Aggregate Completion Rate,"${analytics.completionRate}"\n`;
    csvContent += `First Attempt Pass Rate,"${analytics.firstAttemptPass}"\n`;
    csvContent += `Total Enrolled Learners,${analytics.totalEnrolled}\n`;
    csvContent += `Issued Credentials,${analytics.issuedCredentialCount}\n\n`;

    csvContent += '--- CURRICULUM PROGRESSION FUNNEL ---\n';
    csvContent += 'Curriculum Stage,Learners,DropoffRate\n';
    (analytics.rawFunnelStages || []).forEach((stage) => {
      csvContent += `"${stage.stage}",${stage.count},"${stage.drop}"\n`;
    });

    csvContent += '\n--- FINAL EXAM SCORE PERFORMANCE DISTRIBUTION ---\n';
    csvContent += 'Score Tier,Candidate Count,Accreditation Standard\n';
    (analytics.scoreDistributionData || []).forEach((bucket) => {
      csvContent += `"${bucket.name}",${bucket.value},"${bucket.threshold || 'Standard'}"\n`;
    });

    csvContent += '\n--- PROCTORING INTEGRITY AUDIT TELEMETRY ---\n';
    csvContent += `Total Exams Administered,${analytics.proctoring?.totalExams || 0}\n`;
    csvContent += `Clean Sessions (0 Flags),${analytics.proctoring?.cleanSessions || 0} (${analytics.proctoring?.cleanSessionsPct || '100%'})\n`;
    csvContent += `Tab Switch Incidents,${analytics.proctoring?.tabSwitchCount || 0}\n`;
    csvContent += `Confirmed Violations Revoked,${analytics.proctoring?.revokedCount || 0}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `redkross_academy_telemetry_${dateRange.toLowerCase()}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-slide-left select-none">
      {/* ================= TOP TELEMETRY BAR ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 cyber-glass-panel p-4 rounded-xl border border-[#65F58A]/20">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#65F58A] animate-pulse" />
            <h3 className="text-sm font-bold text-white font-lora tracking-wide">
              Executive Academic Telemetry & Real-Time Analytics
            </h3>
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#092218] border border-[#65F58A]/30 text-[10px] font-mono text-[#65F58A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-ping" />
              <span>Socket.io Live Sync</span>
            </span>
          </div>
          <p className="text-xs text-[#8BA2B5] mt-0.5 font-mono">
            {lastSocketEvent
              ? `Real-Time Socket Event: ${lastSocketEvent.event} synchronized at ${lastSocketEvent.time}`
              : 'Real platform database telemetry, progression donuts, score distributions, and proctoring telemetry.'}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-1 cyber-glass-card p-1 rounded-lg border border-[#65F58A]/20">
            {['7D', '30D', '90D', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  dateRange === range
                    ? 'bg-[#092218] text-[#65F58A] font-bold border border-[#65F58A]/40 shadow-[0_0_10px_rgba(101,245,138,0.2)]'
                    : 'text-[#8BA2B5] hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleManualRefresh}
            className="p-1.5 rounded-lg border border-[#65F58A]/30 text-[#65F58A] hover:bg-[#65F58A]/10 transition-colors"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Report */}
          <button
            onClick={handleExportReport}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#65F58A] text-[#071018] font-bold text-xs font-mono rounded-lg hover:bg-[#35E6B5] transition-all shadow-[0_0_12px_rgba(101,245,138,0.3)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* ================= TOP 4 REAL KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 cyber-glass-panel rounded-xl border border-[#65F58A]/20 relative overflow-hidden group hover:border-[#65F58A]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8BA2B5] uppercase tracking-wider">
              Aggregate Completion Rate
            </span>
            <Award className="w-4 h-4 text-[#65F58A] opacity-70" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#65F58A] mt-2 block tracking-tight">
            {analytics.completionRate}
          </span>
          <span className="text-[10px] text-[#72A88E] font-mono mt-1 block">
            {analytics.issuedCredentialCount} of {analytics.totalEnrolled} learners certified
          </span>
        </div>

        {/* KPI 2 */}
        <div className="p-4 cyber-glass-panel rounded-xl border border-[#35E6B5]/20 relative overflow-hidden group hover:border-[#35E6B5]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8BA2B5] uppercase tracking-wider">
              Median Time To Certification
            </span>
            <Clock className="w-4 h-4 text-[#35E6B5] opacity-70" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#35E6B5] mt-2 block tracking-tight">
            {analytics.medianTimeToCert}
          </span>
          <span className="text-[10px] text-[#72A88E] font-mono mt-1 block">
            Across active institutional cohorts
          </span>
        </div>

        {/* KPI 3 */}
        <div className="p-4 cyber-glass-panel rounded-xl border border-[#F59E0B]/20 relative overflow-hidden group hover:border-[#F59E0B]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8BA2B5] uppercase tracking-wider">
              Exam First-Attempt Pass
            </span>
            <ShieldCheck className="w-4 h-4 text-[#F59E0B] opacity-70" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#F59E0B] mt-2 block tracking-tight">
            {analytics.firstAttemptPass}
          </span>
          <span className="text-[10px] text-[#72A88E] font-mono mt-1 block">
            Strict passing threshold &ge; 80%
          </span>
        </div>

        {/* KPI 4 */}
        <div className="p-4 cyber-glass-panel rounded-xl border border-[#00FFA3]/20 relative overflow-hidden group hover:border-[#00FFA3]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8BA2B5] uppercase tracking-wider">
              Token Circulation Velocity
            </span>
            <Zap className="w-4 h-4 text-[#00FFA3] opacity-70" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#00FFA3] mt-2 block tracking-tight flex items-center gap-1">
            <span>{analytics.tokenCirculationVelocity}</span>
            <span className="text-sm font-normal text-[#65F58A]">&#9889;</span>
          </span>
          <span className="text-[10px] text-[#72A88E] font-mono mt-1 block">
            Bounties in active cadet circulation
          </span>
        </div>
      </div>

      {/* ================= SECTION 1: CURRICULUM PROGRESSION PIE / DONUT (REPLACES FIRST BAR DIAGRAM) ================= */}
      <div className="p-6 cyber-glass-panel rounded-xl border border-[#65F58A]/25 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#65F58A]/15 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#65F58A]" />
              <h4 className="text-base font-bold text-white font-lora">
                Curriculum Progression & Retention Distribution
              </h4>
            </div>
            <p className="text-xs text-[#8BA2B5] mt-1 font-mono">
              Live distribution of active students across sequential curriculum milestones (Replaces legacy bar chart).
            </p>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-[#8BA2B5]">Conversion Rate:</span>
            <span className="px-2.5 py-1 rounded-md bg-[#092218] border border-[#65F58A]/30 text-[#65F58A] font-bold">
              {analytics.completionRate}
            </span>
          </div>
        </div>

        {/* Two-Column Layout: Left Donut Chart, Right Milestone Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Interactive Theme Donut Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-2 rounded-xl bg-[#061510]/50 border border-[#65F58A]/15">
            <RedKrossDonutChart
              data={analytics.progressionData}
              height={260}
              innerRadius={58}
              outerRadius={92}
              centerMetric={analytics.completionRate}
              centerLabel="Certified"
              showLegend={false}
            />
            <span className="text-[11px] font-mono text-[#72A88E] mt-1 text-center">
              Hover slices to inspect student headcounts & drop-off deltas
            </span>
          </div>

          {/* Right: Detailed Live Milestone Table */}
          <div className="lg:col-span-7 space-y-2.5">
            {(analytics.rawFunnelStages || []).map((step, idx) => {
              const matchedData = analytics.progressionData.find((p) => p.name.includes(step.stage.split(' ')[0]));
              const sliceColor = matchedData?.color || '#65F58A';

              return (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#061510] border border-white/5 hover:border-[#65F58A]/30 transition-all flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: sliceColor }}
                    />
                    <span className="text-[#C9EFE0] font-medium truncate">
                      {step.stage}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 flex-shrink-0 text-right">
                    <span className="text-white font-bold tabular-nums">
                      {step.count} students
                    </span>
                    <span
                      className={`text-[11px] tabular-nums font-semibold px-2 py-0.5 rounded ${
                        step.drop.startsWith('-')
                          ? 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
                          : 'bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/20'
                      }`}
                    >
                      {step.drop}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: EXAM SCORES DONUT & PROCTORING AUDIT (REPLACES SECOND BAR DIAGRAM) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Final Exam Score Distribution Donut Chart */}
        <div className="p-5 cyber-glass-panel rounded-xl border border-[#65F58A]/25 space-y-4">
          <div className="flex items-center justify-between border-b border-[#65F58A]/15 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white font-lora">
                Final Exam Score Performance Distribution
              </h4>
              <p className="text-[11px] text-[#8BA2B5] font-mono mt-0.5">
                Evaluations across academic honors tiers (Replaces legacy bar chart).
              </p>
            </div>
            <span className="text-xs font-mono text-[#35E6B5] font-bold">
              Pass Rate: {analytics.firstAttemptPass}
            </span>
          </div>

          {/* Donut Chart with Center Metric */}
          <div className="flex flex-col items-center">
            <RedKrossDonutChart
              data={analytics.scoreDistributionData}
              height={230}
              innerRadius={52}
              outerRadius={84}
              centerMetric={analytics.firstAttemptPass}
              centerLabel="Pass Rate"
              showLegend={false}
            />
          </div>

          {/* Score Legend Breakdown */}
          <div className="space-y-2 pt-1 font-mono text-xs">
            {(analytics.scoreDistributionData || []).map((bucket, idx) => {
              const totalScores = analytics.scoreDistributionData.reduce((acc, b) => acc + (b.value || 0), 0);
              const pct = totalScores > 0 ? ((bucket.value / totalScores) * 100).toFixed(1) : '0.0';

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#061510] border border-white/5 hover:border-[#65F58A]/20 transition-all text-xs"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: bucket.color }}
                    />
                    <span className="text-[#C9EFE0] truncate font-medium">
                      {bucket.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-white font-bold tabular-nums">
                      {bucket.value} candidates
                    </span>
                    <span className="text-[#72A88E] text-[11px] tabular-nums">
                      ({pct}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Proctoring Integrity Audit Telemetry */}
        <div className="p-5 cyber-glass-panel rounded-xl border border-[#65F58A]/25 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#65F58A]/15 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                <h4 className="text-sm font-bold text-white font-lora">
                  Proctoring Integrity Audit Telemetry
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#65F58A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A] animate-ping" />
                <span>Live Anti-Cheat Active</span>
              </span>
            </div>
            <p className="text-[11px] text-[#8BA2B5] font-mono mt-2">
              Automated WebRTC peripheral integrity tracking, tab-focus violation captures, and lockout logs.
            </p>
          </div>

          <div className="p-4 cyber-glass-card rounded-xl border border-[#65F58A]/20 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Total Exams Administered</span>
              <span className="text-white font-bold tabular-nums">
                {analytics.proctoring?.totalExams || 0} Sessions
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Clean Sessions (0 Flags)</span>
              <span className="text-[#65F58A] font-bold tabular-nums flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{analytics.proctoring?.cleanSessions || 0} ({analytics.proctoring?.cleanSessionsPct || '100%'})</span>
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Tab Switch & Blur Flags</span>
              <span className="text-[#F59E0B] font-bold tabular-nums">
                {analytics.proctoring?.tabSwitchCount || 0} Incidents
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-[#8BA2B5]">Confirmed Violations Revoked</span>
              <span className="text-[#EF4444] font-bold tabular-nums">
                {analytics.proctoring?.revokedCount || 0} Credentials
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#061510] border border-[#65F58A]/20 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#72A88E]">Enforcement Protocol:</span>
            <span className="text-white font-bold">24-Hour Automated Lockout Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
