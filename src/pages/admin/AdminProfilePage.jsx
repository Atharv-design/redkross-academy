import React, { useState } from 'react';
import {
  UserCheck, Shield, KeyRound, Smartphone, LogOut,
  CheckCircle2, AlertTriangle, Lock, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function AdminProfilePage() {
  const { currentUser, logout } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    mockEngine.logAction({
      action: 'ADMIN_PASSWORD_ROTATED',
      category: 'AUTH',
      details: 'Super Admin rotated operator master password credentials.',
      severity: 'WARN'
    });

    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleTerminateOtherSessions = () => {
    mockEngine.logAction({
      action: 'ALL_OTHER_SESSIONS_REVOKED',
      category: 'AUTH',
      details: 'Super Admin terminated all concurrent active sessions.',
      severity: 'INFO'
    });
    alert('All concurrent sessions terminated successfully. Current session remains active.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-[#0F1720] border border-[#1B2530] p-5 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#1B2530] border border-[#65F58A] flex items-center justify-center font-bold text-xl text-white">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white font-lora">
                {currentUser?.name || 'Super Admin Operations'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/40 font-bold">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-xs text-[#8BA2B5] font-mono mt-0.5">
              {currentUser?.email || 'admin@redkross.org.in'} • Workstation Node #01
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1B2530] text-[#EF4444] hover:bg-[#EF4444]/20 border border-[#263440] rounded-lg text-xs font-mono font-bold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Two-Factor Authentication Status */}
      <div className="p-5 bg-[#0F1720] border border-[#1B2530] rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-[#65F58A]" />
            <div>
              <h4 className="text-sm font-bold text-white font-lora">
                Hardware & TOTP Two-Factor Authentication
              </h4>
              <p className="text-xs text-[#8BA2B5]">
                Enforces time-based one-time password (TOTP) verification on every admin login.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
            ENFORCED & ACTIVE
          </span>
        </div>
      </div>

      {/* Change Password Form */}
      <form
        onSubmit={handlePasswordChange}
        className="p-5 bg-[#0F1720] border border-[#1B2530] rounded-xl space-y-4"
      >
        <div className="flex items-center space-x-2 text-white font-lora font-bold text-sm">
          <KeyRound className="w-4 h-4 text-[#38BDF8]" />
          <span>Rotate Operator Master Credentials</span>
        </div>

        {passwordSuccess && (
          <div className="p-3 bg-[#65F58A]/10 border border-[#65F58A]/30 rounded text-xs text-[#65F58A] font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Master password updated successfully.</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full bg-[#071018] border border-[#1B2530] rounded p-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674]"
          >
            Update Credentials
          </button>
        </div>
      </form>

      {/* Active Sessions Telemetry */}
      <div className="p-5 bg-[#0F1720] border border-[#1B2530] rounded-xl space-y-3">
        <h4 className="text-sm font-bold text-white font-lora">Active Workstation Sessions</h4>
        <div className="p-3 bg-[#071018] border border-[#1B2530] rounded-lg flex items-center justify-between text-xs font-mono">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold">Chrome 130 on Windows (This Machine)</span>
              <span className="text-[10px] bg-[#65F58A]/10 text-[#65F58A] px-1.5 rounded">CURRENT</span>
            </div>
            <span className="text-[10px] text-[#8BA2B5]">IP: 103.21.244.12 • Signed in 42 mins ago</span>
          </div>

          <button
            onClick={handleTerminateOtherSessions}
            className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] hover:text-[#EF4444] border border-[#263440] rounded text-[11px]"
          >
            Terminate All Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
