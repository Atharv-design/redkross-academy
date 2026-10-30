import React, { useState, useEffect } from 'react';
import {
  Settings, Save, Globe, Database, Bell, Shield,
  CheckCircle2, AlertTriangle, Eye, EyeOff, Radio
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

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
    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
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

        <button
          type="button"
          onClick={handleToggleEmbargo}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
            settings.catalog_embargo
              ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/40 hover:bg-[#65F58A]/20'
              : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/40 hover:bg-[#F59E0B]/20'
          }`}
        >
          {settings.catalog_embargo ? (
            <>
              <Eye className="w-4 h-4" />
              <span>Release Catalog Live</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Engage Embargo</span>
            </>
          )}
        </button>
      </div>

      {/* Cloud Storage & Media Delivery */}
      <div className="p-5 cyber-glass-panel rounded-xl space-y-4">
        <div className="flex items-center space-x-2 text-white font-lora font-bold text-sm">
          <Database className="w-4 h-4 text-[#38BDF8]" />
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

