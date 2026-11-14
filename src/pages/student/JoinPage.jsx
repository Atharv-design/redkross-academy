import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2, Ticket, CheckCircle2, AlertTriangle, UsersRound, BookOpen } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

/**
 * /join/:code - batch registration links; /join - enter an access code.
 * Sign-in happens inline so the link is never lost on the way through the login page.
 */
export default function JoinPage() {
  const { code: linkCode } = useParams();
  const navigate = useNavigate();
  const { currentUser, isLoading, loginWithGoogle, logout } = useAuth();
  const [code, setCode] = useState(linkCode || '');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null); // { message, reason }
  const [busy, setBusy] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [done, setDone] = useState(null);
  const isLink = Boolean(linkCode);

  const check = async (value) => {
    if (!value) return;
    setBusy(true);
    setError(null);
    setPreview(null);
    const res = await apiClient.previewCode(value.trim());
    setBusy(false);
    if (res.ok) setPreview(res.data);
    else setError({ message: res.data?.error || 'This code cannot be used.', reason: res.data?.reason, details: res.data?.details });
  };

  useEffect(() => {
    if (linkCode && currentUser && !isLoading) check(linkCode);
  }, [linkCode, currentUser?.id, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const redeem = async () => {
    setBusy(true);
    setError(null);
    const res = await apiClient.redeemCode(code.trim(), { via: isLink ? 'LINK' : 'CODE' });
    setBusy(false);
    apiClient.clearCatalogCache();
    if (res.ok) setDone(res.data);
    else setError({ message: res.data?.error || 'This code cannot be used.', reason: res.data?.reason });
  };

  const signIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user') setError({ message: 'Sign-in failed. Allow pop-ups and try again.' });
    }
    setSigningIn(false);
  };

  const card = 'max-w-lg mx-auto rounded-2xl border border-white/10 bg-[#070b10]/90 backdrop-blur p-6 sm:p-8';

  if (isLoading) {
    return (
      <div className="flex justify-center py-24 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (done) {
    const d = done.details;
    return (
      <div className="px-4 pb-16">
        <div className={`${card} text-center space-y-4`}>
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h1 className="text-xl font-semibold text-white">{d.cohort ? `Welcome to ${d.cohort.name}` : 'Access unlocked'}</h1>
          <p className="text-sm text-slate-300">
            {done.enrolled_course_ids.length
              ? `You're enrolled in ${done.enrolled_course_ids.length} course${done.enrolled_course_ids.length > 1 ? 's' : ''}.`
              : 'These courses are now free for you. Enrol from any course page.'}
          </p>
          <ul className="text-left space-y-2">
            {d.courses.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                <span className="text-sm text-slate-200">{c.title}</span>
                {done.enrolled_course_ids.includes(c.id) && (
                  <Link to={`/student/course/${c.id}`} className="text-xs text-[#FFA439] hover:underline whitespace-nowrap">
                    Start →
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button type="button" onClick={() => navigate('/academy/cybersecurity/student')} className="px-5 py-2.5 rounded-lg bg-[#FF7A00] text-black font-semibold text-sm cursor-pointer">
              Go to my dashboard
            </button>
            <Link to="/student/profile" className="px-5 py-2.5 rounded-lg border border-white/15 text-slate-200 text-sm hover:bg-white/5">
              Complete my profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16">
      <div className={`${card} space-y-5`}>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#FF7A00]/15 flex items-center justify-center mx-auto">
            {isLink ? <UsersRound className="w-6 h-6 text-[#FFA439]" /> : <Ticket className="w-6 h-6 text-[#FFA439]" />}
          </div>
          <h1 className="text-xl font-semibold text-white">{isLink ? 'Join your batch' : 'Redeem an access code'}</h1>
          <p className="text-sm text-slate-400">
            {isLink
              ? 'Your college or programme has invited you to RedKross Academy.'
              : 'Enter the code you received from RedKross Academy or your college.'}
          </p>
        </div>

        {!currentUser ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-300 text-center">
              Sign in first. {isLink && 'If your batch is for a college, use your college Google account.'}
            </p>
            <button
              type="button"
              onClick={signIn}
              disabled={signingIn}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-100 cursor-pointer disabled:opacity-60"
            >
              {signingIn && <Loader2 className="w-4 h-4 animate-spin" />} Continue with Google
            </button>
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-500 text-center">
              Signed in as <span className="text-slate-300">{currentUser.email}</span> ·{' '}
              <button type="button" onClick={logout} className="underline cursor-pointer">
                use another account
              </button>
            </div>

            {!isLink && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  check(code);
                }}
                className="flex gap-2"
              >
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setPreview(null);
                    setError(null);
                  }}
                  placeholder="ENTER-CODE"
                  maxLength={64}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 min-w-0 rounded-lg bg-black/50 border border-white/15 px-3 py-2.5 text-sm text-white font-mono tracking-wider focus:outline-none focus:border-[#FF7A00]/70"
                  aria-label="Access code"
                />
                <button type="submit" disabled={!code.trim() || busy} className="px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 disabled:opacity-50 cursor-pointer">
                  Check
                </button>
              </form>
            )}

            {busy && !preview && (
              <div className="flex justify-center py-4 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {error.message}
                  {(error.reason === 'NOT_ELIGIBLE' || error.reason === 'EMAIL_NOT_VERIFIED') && (
                    <div className="mt-1 text-xs text-rose-200/80">
                      You are signed in as {currentUser.email}.{' '}
                      <button type="button" onClick={logout} className="underline cursor-pointer">
                        Sign in with a different account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {preview && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#FF7A00]/30 bg-[#FF7A00]/5 p-4 space-y-3">
                  {preview.details.cohort && (
                    <div className="text-sm">
                      <span className="text-slate-400">Batch: </span>
                      <span className="text-white font-medium">{preview.details.cohort.name}</span>
                    </div>
                  )}
                  {preview.details.label && <div className="text-sm text-slate-300">{preview.details.label}</div>}
                  <div className="text-sm font-semibold text-emerald-300">
                    {preview.details.free ? 'Free access' : `${preview.details.discount_percent}% discount`}
                    {preview.details.course_scope === 'ALL' ? ' to all courses' : ''}
                  </div>
                  {preview.details.course_scope !== 'ALL' && (
                    <ul className="space-y-1.5">
                      {preview.details.courses.map((c) => (
                        <li key={c.id} className="flex items-center gap-2 text-sm text-slate-200">
                          <BookOpen className="w-3.5 h-3.5 text-[#FFA439] shrink-0" /> {c.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  {preview.details.expires_at && (
                    <div className="text-xs text-slate-500">Valid until {new Date(preview.details.expires_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  )}
                </div>
                {preview.details.free ? (
                  <button
                    type="button"
                    onClick={redeem}
                    disabled={busy}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FF7A00] text-black font-semibold text-sm hover:brightness-110 disabled:opacity-60 cursor-pointer"
                  >
                    {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                    {preview.already_redeemed ? 'Open my courses' : preview.details.cohort ? 'Join batch and unlock courses' : 'Unlock courses'}
                  </button>
                ) : (
                  <p className="text-sm text-amber-200 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                    This discount will apply at checkout. Online payment is not open yet; contact the academy to enrol with this discount.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
