import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ArrowUpRight, ArrowDownLeft, Shield, Sparkles, Award, Lock, CheckCircle2, ChevronLeft, Gift } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { mockEngine } from '../../services/db/mockEngine';

export default function TokenWalletPage() {
  const { currentUser, tokenBalance, refreshBalance } = useAuth();
  const [redemptionSuccess, setRedemptionSuccess] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    if (!currentUser) return;
    const txs = mockEngine.getTokenTransactions(currentUser.id);
    setTransactions(txs);
  };

  useEffect(() => {
    loadTransactions();

    const unsubscribe = mockEngine.subscribe((event) => {
      if (event.type === 'TOKEN_MUTATED' || event.type === 'DB_MUTATED') {
        loadTransactions();
      }
    });

    return () => unsubscribe();
  }, [currentUser?.id]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Please Sign In</h2>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#071018] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <Link
            to="/student"
            className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-[#071018] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <div className="text-xs font-mono text-slate-400">
            Account: <span className="text-white font-semibold">{currentUser.full_name}</span>
          </div>
        </div>

        {/* Wallet Overview Hero */}
        <div className="ultra-glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden shimmer-lr animate-slide-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#65F58A]">
                <Coins className="w-4 h-4 animate-pulse" />
                <span>NON-MONETARY REWARDS LEDGER (PRD SECTION 8)</span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight tabular-nums flex items-baseline space-x-3">
                <span>{tokenBalance}</span>
                <span className="text-lg text-[#65F58A] font-sans font-bold">RedKross Tokens</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md">
                Tokens are earned strictly through continuous study, milestone progress, and passing evaluations. They cannot be transferred, sold, or converted into real currency.
              </p>
            </div>

            {/* Metrics */}
            <div className="flex sm:flex-col gap-3 min-w-[180px]">
              <div className="p-3 rounded-xl ultra-glass-card text-xs font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Total Earned</div>
                <div className="text-sm font-bold text-emerald-400">+{totalEarned} Tokens</div>
              </div>
              <div className="p-3 rounded-xl ultra-glass-card text-xs font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Proctoring Penalties</div>
                <div className="text-sm font-bold text-rose-400">-{totalPenalties} Tokens</div>
              </div>
            </div>
          </div>
        </div>

        {redemptionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-slide-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{redemptionSuccess}</span>
          </div>
        )}

        {/* Two-Column Grid: Transaction Ledger & Redemption Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-left stagger-1">
          {/* Transaction Ledger (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Coins className="w-4 h-4 text-[#65F58A]" />
                <span>Append-Only Ledger History</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">{transactions.length} Records</span>
            </div>

            <div className="ultra-glass-panel rounded-2xl overflow-hidden shadow-lg">
              <div className="divide-y divide-[#263440]/60">
                {transactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <div key={tx.id} className="p-4 flex items-center justify-between text-xs hover:bg-white/[0.02] transition-colors">
                      <div className="space-y-1 max-w-sm sm:max-w-md">
                        <div className="font-semibold text-white flex items-center space-x-2">
                          <span>{tx.description}</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-2 truncate">
                          <span>{new Date(tx.created_at).toLocaleString()}</span>
                          <span>•</span>
                          <span className="text-slate-500 truncate">{tx.idempotency_key}</span>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span
                          className={`text-sm font-bold font-mono tabular-nums ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? `+${tx.amount}` : tx.amount} Tokens
                        </span>
                      </div>
                    </div>
                  );
                })}

                {transactions.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-400">No token transactions recorded yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Redemption Shop (Right Column) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Gift className="w-4 h-4 text-[#65F58A]" />
              <span>Token Rewards Shop</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>50% Certification Voucher</span>
                  <span className="text-[#65F58A] font-mono">200 Tokens</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Apply a 50% discount towards any verified certification final exam.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('50% Certification Discount Voucher', 200)}
                  disabled={tokenBalance < 200}
                  className="w-full py-2 rounded-lg bg-surface-100 hover:bg-[#65F58A] hover:text-[#071018] disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Redeem Voucher
                </button>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Advanced Threat Lab Manual</span>
                  <span className="text-[#65F58A] font-mono">150 Tokens</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Unlock the 80-page deep-dive incident responder malware analysis runbook.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('Advanced Threat Lab Manual (PDF)', 150)}
                  disabled={tokenBalance < 150}
                  className="w-full py-2 rounded-lg bg-surface-100 hover:bg-[#65F58A] hover:text-[#071018] disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Unlock Runbook
                </button>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>RedKross Verified Badge Flair</span>
                  <span className="text-[#65F58A] font-mono">100 Tokens</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Display an illuminated gold defender shield badge on your public student profile.
                </p>
                <button
                  onClick={() => handleRedeemVoucher('Verified Badge Flair', 100)}
                  disabled={tokenBalance < 100}
                  className="w-full py-2 rounded-lg bg-surface-100 hover:bg-[#65F58A] hover:text-[#071018] disabled:opacity-40 text-xs font-semibold text-slate-300 transition-colors"
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
