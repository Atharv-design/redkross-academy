import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ArrowUpRight, ArrowDownLeft, Shield, Sparkles, Award, Lock, CheckCircle2, ChevronLeft, Gift } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function TokenWalletPage() {
  const { currentUser, tokenBalance, refreshBalance } = useAuth();
  const [redemptionSuccess, setRedemptionSuccess] = useState(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#090D16] py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Please Sign In</h2>
      </div>
    );
  }

  const transactions = mockEngine.getTokenTransactions(currentUser.id);

  // Compute metrics
  const totalEarned = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalPenalties = Math.abs(
    transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0)
  );

  const handleRedeemVoucher = (voucherName, cost) => {
    if (tokenBalance < cost) {
      alert(`Insufficient token balance. You need ${cost} tokens.`);
      return;
    }

    const db = mockEngine.getDb();
    db.reward_ledger.push({
      id: `tx_${Date.now()}_redeem`,
      user_id: currentUser.id,
      amount: -cost,
      type: 'reward_redemption',
      description: `Redeemed: ${voucherName}`,
      idempotency_key: `idemp_redeem_${Date.now()}`,
      created_at: new Date().toISOString(),
    });
    mockEngine.saveDb(db);
    refreshBalance();
    setRedemptionSuccess(`Successfully redeemed ${voucherName}! Check your email for entitlement confirmation.`);
    setTimeout(() => setRedemptionSuccess(null), 4000);
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
          <Link
            to="/student"
            className="flex items-center space-x-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <div className="text-xs font-mono text-[#94A3B8]">
            Account: <span className="text-white font-semibold">{currentUser.full_name}</span>
          </div>
        </div>

        {/* Wallet Overview Hero */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F59E0B]">
                <Coins className="w-4 h-4 animate-pulse-subtle" />
                <span>NON-MONETARY REWARDS LEDGER (PRD SECTION 8)</span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight tabular-nums flex items-baseline space-x-3">
                <span>{tokenBalance}</span>
                <span className="text-lg text-[#F59E0B] font-royal font-bold">RedKross Tokens</span>
              </div>
              <p className="text-xs text-[#94A3B8] max-w-md leading-relaxed">
                Tokens are earned strictly through continuous study, milestone progress, and passing evaluations. They cannot be transferred, sold, or converted into real currency.
              </p>
            </div>

            {/* Metrics */}
            <div className="flex sm:flex-col gap-3 min-w-[180px]">
              <div className="p-3.5 rounded-xl bg-[#101923]/80 backdrop-blur-md border border-[#263440] text-xs font-mono">
                <div className="text-[10px] text-[#94A3B8] uppercase">Total Earned</div>
                <div className="text-sm font-bold text-[#65F58A]">+{totalEarned} Tokens</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#101923]/80 backdrop-blur-md border border-[#263440] text-xs font-mono">
                <div className="text-[10px] text-[#94A3B8] uppercase">Proctoring Penalties</div>
                <div className="text-sm font-bold text-rose-400">-{totalPenalties} Tokens</div>
              </div>
            </div>
          </div>
        </div>

        {redemptionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
            <span>{redemptionSuccess}</span>
          </div>
        )}

        {/* Two-Column Grid: Transaction Ledger & Redemption Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Ledger (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-royal text-lg font-bold text-white flex items-center space-x-2">
                <Coins className="w-4 h-4 text-[#F59E0B]" />
                <span>Append-Only Ledger History</span>
              </h2>
              <span className="text-xs font-mono text-[#94A3B8]">{transactions.length} Records</span>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
              <div className="divide-y divide-[#263440]/60">
                {transactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <div key={tx.id} className="p-4 flex items-center justify-between text-xs hover:bg-[#1B2530]/40 transition-colors">
                      <div className="space-y-1 max-w-sm sm:max-w-md">
                        <div className="font-semibold text-white flex items-center space-x-2">
                          <span>{tx.description}</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#94A3B8] flex items-center space-x-2 truncate">
                          <span>{new Date(tx.created_at).toLocaleString()}</span>
                          <span>•</span>
                          <span className="text-slate-500 truncate">{tx.idempotency_key}</span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span
                          className={`text-sm font-bold font-mono tabular-nums ${
                            isPositive ? 'text-[#65F58A]' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? `+${tx.amount}` : tx.amount} Tokens
                        </span>
                      </div>
                    </div>
                  );
                })}

                {transactions.length === 0 && (
                  <div className="p-8 text-center text-xs text-[#94A3B8]">No token transactions recorded yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Redemption Shop (Right Column) */}
          <div className="space-y-4">
            <h2 className="font-royal text-lg font-bold text-white flex items-center space-x-2">
              <Gift className="w-4 h-4 text-[#F59E0B]" />
              <span>Token Rewards Shop</span>
            </h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl glass-card space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>50% Certification Voucher</span>
                  <span className="text-[#F59E0B] font-mono font-bold">200 Tokens</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-snug">
                  Apply a 50% discount towards any verified certification final exam.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('50% Certification Discount Voucher', 200)}
                  disabled={tokenBalance < 200}
                  className="w-full py-2.5 rounded-xl bg-[#F59E0B]/10 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-black border border-[#F59E0B]/30 disabled:opacity-40 text-xs font-mono font-semibold transition-all shadow-sm"
                >
                  Redeem Voucher
                </button>
              </div>

              <div className="p-5 rounded-2xl glass-card space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Advanced Threat Lab Manual</span>
                  <span className="text-[#F59E0B] font-mono font-bold">150 Tokens</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-snug">
                  Unlock the 80-page deep-dive incident responder malware analysis runbook.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('Advanced Threat Lab Manual (PDF)', 150)}
                  disabled={tokenBalance < 150}
                  className="w-full py-2.5 rounded-xl bg-[#F59E0B]/10 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-black border border-[#F59E0B]/30 disabled:opacity-40 text-xs font-mono font-semibold transition-all shadow-sm"
                >
                  Unlock Runbook
                </button>
              </div>

              <div className="p-5 rounded-2xl glass-card space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>RedKross Verified Badge Flair</span>
                  <span className="text-[#F59E0B] font-mono font-bold">100 Tokens</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-snug">
                  Display an illuminated gold defender shield badge on your public student profile.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('Verified Badge Flair', 100)}
                  disabled={tokenBalance < 100}
                  className="w-full py-2.5 rounded-xl bg-[#F59E0B]/10 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-black border border-[#F59E0B]/30 disabled:opacity-40 text-xs font-mono font-semibold transition-all shadow-sm"
                >
                  Equip Badge Flair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
