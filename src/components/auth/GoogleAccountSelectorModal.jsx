import React, { useState } from 'react';
import { Check, UserPlus, X, Shield, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Google Account Chooser Dialog
 * Provides an authentic Google Account Selection experience.
 * Does NOT auto-login: user must select an account and click "Continue".
 */
export default function GoogleAccountSelectorModal({
  isOpen,
  onClose,
  onSelectAccount,
  onLivePopup,
  isLoggingIn = false
}) {
  const defaultAccounts = [
    {
      id: 'acc_atharv',
      name: 'Atharv Gupta',
      email: 'atharvgupta9393@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Atharv+Gupta&background=101923&color=65F58A&bold=true',
      badge: 'Institutional Lead • Verified',
      isPrimary: true
    },
    {
      id: 'acc_cadet',
      name: 'Cadet Operator',
      email: 'cadet.operator@redkross.org.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      badge: 'Defensive Cyber Cadet',
      isPrimary: false
    }
  ];

  const [selectedId, setSelectedId] = useState('acc_atharv');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const currentSelectedAccount = isCustomMode
    ? {
        id: 'acc_custom',
        name: customName.trim() || 'Google User',
        email: customEmail.trim() || 'user@gmail.com',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customName.trim() || 'U')}&background=101923&color=35E6B5&bold=true`,
        badge: 'Custom Google Identity'
      }
    : defaultAccounts.find((a) => a.id === selectedId) || defaultAccounts[0];

  const handleConfirm = () => {
    if (isCustomMode && (!customEmail.trim() || !customEmail.includes('@'))) {
      return;
    }
    onSelectAccount(currentSelectedAccount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#101923] border border-[#263440] rounded-2xl shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="google-auth-dialog-title"
      >
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-[#263440]/80 relative">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingIn}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1B2530] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-2">
            {/* Google Multicolor G Logo */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mb-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <h2 id="google-auth-dialog-title" className="font-royal text-xl font-bold text-white tracking-tight">
              Choose an account
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono">
              to continue to <span className="text-[#65F58A] font-semibold">RedKross Academy</span>
            </p>
          </div>
        </div>

        {/* Account List */}
        <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
          {defaultAccounts.map((account) => {
            const isSelected = !isCustomMode && selectedId === account.id;
            return (
              <div
                key={account.id}
                onClick={() => {
                  setIsCustomMode(false);
                  setSelectedId(account.id);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1B2530] border-[#65F58A] shadow-[0_0_15px_rgba(101,245,138,0.15)] ring-1 ring-[#65F58A]'
                    : 'bg-[#14202C]/60 hover:bg-[#1B2530]/80 border-[#263440] hover:border-[#35E6B5]/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-10 h-10 rounded-full border border-[#263440] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">
                        {account.name}
                      </span>
                    </div>
                    <div className="text-xs text-[#94A3B8] font-mono truncate">
                      {account.email}
                    </div>
                    <div className="text-[10px] text-[#35E6B5] font-mono mt-0.5">
                      {account.badge}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#65F58A] bg-[#65F58A] text-black'
                        : 'border-[#64748B] bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Option: Use Another Account */}
          <div
            onClick={() => setIsCustomMode(true)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              isCustomMode
                ? 'bg-[#1B2530] border-[#35E6B5] shadow-[0_0_15px_rgba(53,230,181,0.15)] ring-1 ring-[#35E6B5]'
                : 'bg-[#14202C]/60 hover:bg-[#1B2530]/80 border-[#263440] hover:border-[#35E6B5]/60'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#071018] border border-[#263440] flex items-center justify-center text-[#35E6B5] flex-shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">
                    Use another Google account
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">
                    Enter any institutional or personal Google email
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                  isCustomMode
                    ? 'border-[#35E6B5] bg-[#35E6B5] text-black'
                    : 'border-[#64748B] bg-transparent'
                }`}
              >
                {isCustomMode && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {isCustomMode && (
              <div className="mt-3.5 pt-3.5 border-t border-[#263440] space-y-2.5">
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Atharv Gupta"
                    className="w-full px-3 py-2 rounded-lg bg-[#071018] border border-[#263440] text-white text-xs font-mono focus:outline-none focus:border-[#35E6B5]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                    Google Email:
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="e.g. operator@gmail.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#071018] border border-[#263440] text-white text-xs font-mono focus:outline-none focus:border-[#35E6B5]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security / Consent Disclaimer */}
        <div className="px-6 py-2 text-[10px] text-[#64748B] font-mono leading-relaxed border-t border-[#263440]/60 flex items-center justify-between gap-2">
          <span>To continue, Google will share your name, email, and avatar with RedKross Academy.</span>
          {onLivePopup && (
            <button
              type="button"
              onClick={onLivePopup}
              disabled={isLoggingIn}
              className="text-[#35E6B5] hover:text-[#65F58A] underline flex-shrink-0 text-[10px]"
            >
              Live Popup ↗
            </button>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 pt-3 flex items-center gap-3 bg-[#0B121B]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingIn}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-[#94A3B8] hover:text-white font-mono text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoggingIn || (isCustomMode && !customEmail.includes('@'))}
            className="flex-[2] py-3 px-4 rounded-xl bg-[#65F58A] hover:bg-[#00FFA3] active:scale-[0.99] text-black font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(101,245,138,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Continue as {currentSelectedAccount.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
