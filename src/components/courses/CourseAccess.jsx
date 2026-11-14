import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Loader2, Lock, Clock } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

/**
 * Course availability from the server: visibility, price and whether the signed-in
 * student has it unlocked (batch bundle, code or admin grant).
 */
export function useCourseAvailability(courseId) {
  const { currentUser } = useAuth();
  const [state, setState] = useState({ loading: true, visibility: 'PUBLISHED', price_inr: 0, unlocked: false });
  useEffect(() => {
    if (!courseId) return undefined;
    let alive = true;
    apiClient.getCatalogAccess({ fresh: true }).then((d) => {
      if (!alive) return;
      const s = d.settings?.[courseId] || { visibility: 'PUBLISHED', price_inr: 0 };
      const unlocked = Boolean(d.is_admin) || (d.unlocked_course_ids || []).includes(courseId);
      setState({ loading: false, ...s, unlocked });
    });
    return () => {
      alive = false;
    };
  }, [courseId, currentUser?.id]);

  const comingSoon = state.visibility === 'COMING_SOON' && !state.unlocked;
  const needsCode = !state.unlocked && !comingSoon && (state.price_inr > 0 || state.visibility === 'HIDDEN');
  return { ...state, comingSoon, needsCode, free: state.price_inr === 0 };
}

/** Price / status line for course cards and headers. */
export function priceLabel(a) {
  if (a.comingSoon) return 'Coming soon';
  if (a.unlocked) return 'Unlocked for you';
  if (a.price_inr > 0) return `₹${Number(a.price_inr).toLocaleString('en-IN')}`;
  return 'Free';
}

/**
 * Server-backed access-code dialog for a course page. Free (100%) codes unlock and
 * enrol immediately; percentage codes show the discounted price.
 */
export function AccessCodeModal({ open, onClose, course, priceInr = 0, onUnlocked }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { kind: 'error'|'ok'|'info', text }

  useEffect(() => {
    if (open) {
      setCode('');
      setMsg(null);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    if (!code.trim()) return;
    setBusy(true);
    setMsg(null);
    const res = await apiClient.redeemCode(code.trim(), { courseId: course.id });
    setBusy(false);
    apiClient.clearCatalogCache();
    if (res.ok) {
      setMsg({ kind: 'ok', text: res.data.details?.cohort ? `Welcome to ${res.data.details.cohort.name}! Opening your course…` : 'Code accepted! Opening your course…' });
      await apiClient.enrol(currentUser.id, course.id).catch(() => null);
      onUnlocked?.();
      setTimeout(() => navigate(`/student/course/${course.id}`), 900);
    } else if (res.data?.reason === 'PAYMENT_NOT_AVAILABLE') {
      const pct = res.data.discount_percent;
      const discounted = priceInr > 0 ? Math.round((priceInr * (100 - pct)) / 100) : null;
      setMsg({
        kind: 'info',
        text: `Valid ${pct}% discount${discounted !== null ? ` (₹${discounted.toLocaleString('en-IN')} instead of ₹${priceInr.toLocaleString('en-IN')})` : ''}. Online payment is not open yet; contact the academy to enrol with this discount.`,
      });
    } else {
      setMsg({ kind: 'error', text: res.data?.error || 'This code cannot be used.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Apply an access code"
        onMouseDown={(e) => e.stopPropagation()}
        className="p-6 sm:p-8 rounded-t-2xl sm:rounded-2xl bg-[#0E0C09]/95 border border-[#FF7A00]/50 shadow-[0_0_40px_rgba(255,122,0,0.25)] max-w-md w-full space-y-4"
      >
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#FF7A00]" />
          <span>Apply an access code</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Enter the scholarship, batch or discount code you received from RedKross Academy or your college.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="ENTER-CODE"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={64}
            autoComplete="off"
            spellCheck={false}
            aria-label="Access code"
            className="w-full px-4 py-2.5 rounded-xl bg-black border border-[#FF7A00]/40 text-sm text-white font-mono tracking-wider focus:outline-none focus:border-[#FFA439]"
          />
          {msg && (
            <div
              className={`text-sm rounded-lg px-3 py-2 border ${
                msg.kind === 'error'
                  ? 'text-rose-200 border-rose-500/30 bg-rose-500/10'
                  : msg.kind === 'ok'
                  ? 'text-emerald-200 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-amber-200 border-amber-500/30 bg-amber-500/10'
              }`}
            >
              {msg.text}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-black text-sm text-slate-300 border border-white/20 hover:text-white cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy || !code.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black font-bold text-sm cursor-pointer hover:brightness-110 disabled:opacity-50"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentUser ? 'Apply' : 'Sign in to apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Banner shown on a course page when the course cannot be joined directly. */
export function AccessNotice({ availability }) {
  if (availability.loading || availability.unlocked) return null;
  if (availability.comingSoon) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2.5 text-sm text-sky-100">
        <Clock className="w-4 h-4 mt-0.5 shrink-0" /> This course is coming soon. Enrolment opens when it launches.
      </div>
    );
  }
  if (availability.needsCode) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-100">
        <Lock className="w-4 h-4 mt-0.5 shrink-0" />
        {availability.price_inr > 0
          ? 'This course needs an access code from the academy or your college (online payment opens soon).'
          : 'This course is available to invited batches. Use the access code or link you received.'}
      </div>
    );
  }
  return null;
}
