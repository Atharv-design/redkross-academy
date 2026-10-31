import React, { useState, useEffect } from 'react';
import {
  Settings, Save, Globe, Database, Bell, Shield,
  CheckCircle2, AlertTriangle, Eye, EyeOff, Radio, Lock
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { socketClient } from '../../services/socket/socketClient';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platform_name: 'RedKross Defensive Cyber Academy',
    support_email: 'support@redkross.org.in',
    catalog_embargo: true,
    storage_provider: 'Cloudflare R2',
    storage_bucket: 'redkross-academy-media-prod',
    storage_cdn_url: 'https://cdn.redkross.org.in',
    slack_webhook_url: 'https://hooks.slack.com/services/T00/B00/XXXXX',
    enable_slack_alerts: true,
    enforce_proctoring: true,
    session_timeout_mins: 60
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const db = mockEngine.getDb();
      if (db) {
        setSettings((prev) => ({
          ...prev,
          ...(db.system_settings || {}),
          catalog_embargo: db.public_catalog_enabled === false
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      const db = mockEngine.getDb();
      db.system_settings = settings;
      db.public_catalog_enabled = !settings.catalog_embargo;
      mockEngine.saveDb(db, {
        type: 'SETTINGS_UPDATED',
        payload: { system_settings: settings, public_catalog_enabled: !settings.catalog_embargo }
      });

      // Synchronize with PostgreSQL & WebSocket Bus
      apiClient.toggleCatalogVisibility(!settings.catalog_embargo).catch(console.warn);
      socketClient.emit('catalog:visibility', { enabled: !settings.catalog_embargo });

      mockEngine.logAction({
        action: 'SYSTEM_SETTINGS_UPDATE',
        category: 'SYSTEM_CONFIG',
        details: 'Admin updated platform infrastructure and security parameters.',
        severity: 'INFO'
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleEmbargo = () => {
    const nextEmbargo = !settings.catalog_embargo;
    const updated = { ...settings, catalog_embargo: nextEmbargo };
    setSettings(updated);

    try {
      const db = mockEngine.getDb();
      db.system_settings = updated;
      db.public_catalog_enabled = !nextEmbargo;
      mockEngine.saveDb(db, {
        type: 'CATALOG_EMBARGO_MUTATED',
        payload: { public_catalog_enabled: !nextEmbargo, embargo: nextEmbargo }
      });

      // Synchronize with PostgreSQL & WebSocket Bus
      apiClient.toggleCatalogVisibility(!nextEmbargo).catch(console.warn);
      socketClient.emit('catalog:visibility', { enabled: !nextEmbargo });

      mockEngine.logAction({
        action: nextEmbargo ? 'CATALOG_EMBARGO_ENABLED' : 'CATALOG_EMBARGO_RELEASED',
        category: 'SYSTEM_CONFIG',
        details: nextEmbargo
          ? 'Catalog embargo enabled. Public sees "Courses will be out soon".'
          : 'Catalog embargo released. Published courses are live to all public visitors.',
        severity: 'WARN'
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl animate-slide-left">
      {/* Top Banner */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-white font-lora">
            Platform Infrastructure & Global Policies
          </h3>
          <p className="text-xs text-[#8BA2B5]">
            Configure CDN endpoints, public release embargo, and webhooks.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-[#65F58A]/10 border border-[#65F58A]/30 rounded-xl flex items-center space-x-2 text-xs text-[#65F58A] font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuration saved successfully. All changes are active.</span>
        </div>
      )}

      {/* Catalog Embargo Master Card */}
      <div className="p-5 cyber-glass-panel rounded-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${
                settings.catalog_embargo ? 'bg-[#F59E0B]' : 'bg-[#65F58A]'
              }`}
            />
            <span className="text-xs font-mono font-bold text-white">
              PUBLIC CATALOG EMBARGO GATEWAY
            </span>
          </div>
          <p className="text-xs text-[#8BA2B5] max-w-xl leading-relaxed">
            {settings.catalog_embargo
              ? 'ACTIVE: Public visitors see "Courses will be out soon" on learning tracks. Only authenticated super admins can access curriculum.'
              : 'RELEASED: Public visitors can view the full published course directory and syllabus.'}
          </p>
        </div>

        {/* Interactive Tactical Toggle Button */}
        <button
          type="button"
          role="switch"
          aria-checked={!settings.catalog_embargo}
          onClick={handleToggleEmbargo}
          className={`group relative inline-flex items-center justify-between w-36 h-11 px-3 rounded-full transition-all duration-300 font-mono text-xs font-black cursor-pointer select-none ${
            !settings.catalog_embargo
              ? 'bg-[#06180E] border-2 border-[#65F58A] shadow-[0_0_25px_rgba(101,245,138,0.55),0_0_50px_rgba(101,245,138,0.25),inset_0_0_15px_rgba(101,245,138,0.2)]'
              : 'bg-[#121820] border-2 border-amber-500/40 hover:border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
          }`}
        >
          {/* Green radiant ring/lights around button when ON */}
          {!settings.catalog_embargo && (
            <>
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#65F58A]/40 via-[#35E6B5]/30 to-[#65F58A]/40 blur-md pointer-events-none animate-pulse" />
              <span className="absolute -inset-2.5 rounded-full bg-[#65F58A]/15 blur-lg pointer-events-none" />
            </>
          )}

          {!settings.catalog_embargo ? (
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="flex items-center gap-1.5 pl-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65F58A] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#65F58A] shadow-[0_0_8px_#65F58A]" />
                </span>
                <span className="tracking-widest text-[#65F58A] font-extrabold text-[13px] drop-shadow-[0_0_8px_rgba(101,245,138,0.9)]">
                  LIVE
                </span>
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#65F58A] to-[#35E6B5] text-[#071018] flex items-center justify-center shadow-[0_0_15px_#65F58A] transition-transform duration-300">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </span>
            </div>
          ) : (
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center transition-transform duration-300">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <span className="flex items-center gap-1.5 pr-2 text-amber-400/90 font-mono text-[12px] font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                <span>HOLD</span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Cloud Storage & Media Delivery */}
      <div className="p-5 cyber-glass-panel rounded-xl space-y-4">
        <div className="flex items-center space-x-2 text-white font-lora font-bold text-sm">
          <Database className="w-4 h-4 text-[#65F58A]" />
          <span>Cloud Storage & Video Delivery Network</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
              Storage Provider
            </label>
            <input
              type="text"
              value={settings.storage_provider}
              onChange={(e) => setSettings({ ...settings, storage_provider: e.target.value })}
              className="w-full cyber-glass-card rounded p-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
              Primary Bucket Name
            </label>
            <input
              type="text"
              value={settings.storage_bucket}
              onChange={(e) => setSettings({ ...settings, storage_bucket: e.target.value })}
              className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
            Media CDN Delivery Origin URL
          </label>
          <input
            type="text"
            value={settings.storage_cdn_url}
            onChange={(e) => setSettings({ ...settings, storage_cdn_url: e.target.value })}
            className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
          />
        </div>
      </div>

      {/* Webhook & Notification Triggers */}
      <div className="p-5 cyber-glass-panel rounded-xl space-y-4">
        <div className="flex items-center space-x-2 text-white font-lora font-bold text-sm">
          <Bell className="w-4 h-4 text-[#A855F7]" />
          <span>Incident & Proctoring Alert Webhooks</span>
        </div>

        <div>
          <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
            Slack / Discord Dispatch Webhook URL
          </label>
          <input
            type="text"
            value={settings.slack_webhook_url}
            onChange={(e) => setSettings({ ...settings, slack_webhook_url: e.target.value })}
            className="w-full cyber-glass-card rounded p-2 text-xs text-white font-mono"
          />
          <span className="text-[10px] text-[#8BA2B5] mt-1 block">
            Automated alerts are dispatched when 2+ tab switches occur during final certification exams.
          </span>
        </div>
      </div>
    </form>
  );
}

