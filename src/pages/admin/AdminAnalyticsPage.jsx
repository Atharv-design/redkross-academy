import React, { useState } from 'react';
import {
  LineChart, TrendingUp, Users, Award, BookOpen, Clock,
  Download, Filter, Sparkles, BarChart2, Activity
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30D');

  const funnelData = [
    { stage: 'Course Enrolled', count: 1240, drop: '0%' },
    { stage: 'Module 1 Completed', count: 1080, drop: '-12.9%' },
    { stage: 'Module 2 Completed', count: 890, drop: '-17.5%' },
    { stage: 'Midterm Lab Hands-On', count: 740, drop: '-16.8%' },
    { stage: 'Proctored Final Exam', count: 620, drop: '-16.2%' },
    { stage: 'Issued Credential', count: 590, drop: '-4.8%' }
  ];

  const scoreBuckets = [
    { label: '90 - 100% (High Honors)', count: 320, color: '#65F58A' },
    { label: '80 - 89% (Passed)', count: 190, color: '#35E6B5' },
    { label: '70 - 79% (Borderline)', count: 80, color: '#F59E0B' },
    { label: '< 70% (Remediation)', count: 30, color: '#EF4444' }
  ];

  const handleExportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Stage,Learners,DropoffRate\n' +
      funnelData.map((e) => `"${e.stage}",${e.count},"${e.drop}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'redkross_funnel_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Bar */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-white font-lora">
            Executive Academic Telemetry & Retention
          </h3>
          <p className="text-xs text-[#8BA2B5]">
            Telemetry funnels, score distributions, and learner retention models.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 cyber-glass-card p-1 rounded-lg">
            {['7D', '30D', '90D', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  dateRange === range
                    ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                    : 'text-[#8BA2B5] hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 cyber-glass-panel rounded-xl">
          <span className="text-[10px] font-mono text-[#8BA2B5] block">AGGREGATE COMPLETION RATE</span>
          <span className="text-2xl font-bold font-mono text-[#65F58A] mt-1 block">47.6%</span>
          <span className="text-[10px] text-[#8BA2B5] mt-1 block">+8.2% vs industry standard</span>
        </div>

        <div className="p-4 cyber-glass-panel rounded-xl">
          <span className="text-[10px] font-mono text-[#8BA2B5] block">MEDIAN TIME TO CERTIFICATION</span>
          <span className="text-2xl font-bold font-mono text-[#35E6B5] mt-1 block">22.4 Days</span>
          <span className="text-[10px] text-[#8BA2B5] mt-1 block">Across all active tracks</span>
        </div>

        <div className="p-4 cyber-glass-panel rounded-xl">
          <span className="text-[10px] font-mono text-[#8BA2B5] block">EXAM FIRST-ATTEMPT PASS</span>
          <span className="text-2xl font-bold font-mono text-[#F59E0B] mt-1 block">82.1%</span>
          <span className="text-[10px] text-[#8BA2B5] mt-1 block">Passing threshold ≥ 75%</span>
        </div>

        <div className="p-4 cyber-glass-panel rounded-xl">
          <span className="text-[10px] font-mono text-[#8BA2B5] block">TOKEN CIRCULATION VELOCITY</span>
          <span className="text-2xl font-bold font-mono text-[#A855F7] mt-1 block">4,280 ⚡</span>
          <span className="text-[10px] text-[#8BA2B5] mt-1 block">Bounties awarded this cycle</span>
        </div>
      </div>

      {/* Retention Waterfall Funnel */}
      <div className="p-6 cyber-glass-panel rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white font-lora">
              Curriculum Drop-off Waterfall Funnel
            </h4>
            <p className="text-xs text-[#8BA2B5]">
              Identifies bottlenecks across sequential curriculum progression.
            </p>
          </div>
          <span className="text-xs font-mono text-[#65F58A]">
            Conversion to Credential: 47.6%
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {funnelData.map((step, idx) => {
            const widthPct = (step.count / 1240) * 100;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-medium">{step.stage}</span>
                  <div className="space-x-3">
                    <span className="text-white font-bold">{step.count} students</span>
                    <span className={step.drop.startsWith('-') ? 'text-[#EF4444]' : 'text-[#8BA2B5]'}>
                      {step.drop}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#071018] h-3 rounded-full overflow-hidden border border-[#1B2530]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#65F58A] to-[#35E6B5] transition-all"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Histograms & Assessment Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-5 cyber-glass-panel rounded-xl space-y-4">
          <h4 className="text-sm font-bold text-white font-lora">
            Final Exam Score Distribution
          </h4>
          <div className="space-y-3">
            {scoreBuckets.map((bucket, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8BA2B5]">{bucket.label}</span>
                  <span className="text-white font-bold">{bucket.count} candidates</span>
                </div>
                <div className="w-full bg-[#071018] h-2.5 rounded-full overflow-hidden border border-[#1B2530]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(bucket.count / 320) * 100}%`,
                      backgroundColor: bucket.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 cyber-glass-panel rounded-xl space-y-4">
          <h4 className="text-sm font-bold text-white font-lora">
            Proctoring Integrity Audit Telemetry
          </h4>
          <div className="p-4 cyber-glass-card rounded-lg space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Total Exams Administered</span>
              <span className="text-white font-bold">620 Sessions</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Clean Sessions (0 Flags)</span>
              <span className="text-[#65F58A] font-bold">598 (96.4%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1B2530]">
              <span className="text-[#8BA2B5]">Tab Switch Flags</span>
              <span className="text-[#F59E0B] font-bold">18 Incidents</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#8BA2B5]">Confirmed Violations Revoked</span>
              <span className="text-[#EF4444] font-bold">4 Credentials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

