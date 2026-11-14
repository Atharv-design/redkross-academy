import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Loader2, Globe, Award, Share2, ExternalLink, Lock, Ticket, UsersRound, Trash2, Copy, Check } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '../../components/icons/BrandIcons';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { addToProfileUrl, shareUrl, verifyUrl } from '../../utils/linkedin';

const input =
  'w-full rounded-lg bg-black/50 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF7A00]/70 focus:ring-1 focus:ring-[#FF7A00]/40 disabled:opacity-60';

function Field({ label, error, hint, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span>
      {children}
      {error ? <span className="block text-xs text-rose-400 mt-1">{error}</span> : hint ? <span className="block text-xs text-slate-500 mt-1">{hint}</span> : null}
    </label>
  );
}

function Section({ title, children, actions }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#070b10]/85 backdrop-blur p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

/** Center-crops and resizes an image file to a 256px JPEG data URL in the browser. */
function resizeImage(file, size = 256) {
  return new Promise((resolve, reject) => {
    if (!/^image\/(jpeg|png|webp|gif|heic|heif)$/i.test(file.type) && !/\.(jpe?g|png|webp)$/i.test(file.name)) {
      reject(new Error('Choose a JPEG, PNG or WebP image'));
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      reject(new Error('Image is larger than 15 MB'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That file could not be read as an image'));
    };
    img.src = url;
  });
}

function CopyLink({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          window.prompt('Copy this link:', text);
        }
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/15 text-slate-200 hover:bg-white/10 cursor-pointer"
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {done ? 'Copied' : 'Copy verify link'}
    </button>
  );
}

const FIELDS = ['full_name', 'headline', 'college', 'degree', 'graduation_year', 'city', 'bio', 'linkedin_url', 'github_url', 'portfolio_url'];

export default function ProfilePage() {
  const { setCurrentUser } = useAuth();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [nameReq, setNameReq] = useState(null); // { name, reason }
  const [nameReqError, setNameReqError] = useState('');
  const fileRef = useRef(null);

  const apply = (d) => {
    setData(d);
    setForm(Object.fromEntries(FIELDS.map((k) => [k, d.profile[k] ?? ''])));
    // keep the navbar (name/photo) in sync
    setCurrentUser?.((prev) => (prev ? { ...prev, full_name: d.profile.full_name, avatar: d.profile.avatar } : prev));
  };

  const load = async () => {
    setLoadError('');
    const res = await apiClient.getProfile();
    if (res.ok) apply(res.data);
    else setLoadError(res.data?.error || 'Could not load your profile.');
  };
  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    const payload = { ...form };
    if (data.name_locked) delete payload.full_name;
    const res = await apiClient.updateProfile(payload);
    setSaving(false);
    if (res.ok) {
      apply(res.data);
      setSaved(true);
    } else setErrors(res.data?.fields || { _: res.data?.error || 'Could not save' });
  };

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setPhotoError('');
    setPhotoBusy(true);
    try {
      const dataUrl = await resizeImage(file);
      const res = await apiClient.uploadAvatar(dataUrl);
      if (res.ok) apply(res.data);
      else setPhotoError(res.data?.error || 'Upload failed');
    } catch (err) {
      setPhotoError(err.message);
    }
    setPhotoBusy(false);
  };

  const removePhoto = async () => {
    setPhotoBusy(true);
    const res = await apiClient.removeAvatar();
    if (res.ok) apply(res.data);
    setPhotoBusy(false);
  };

  const submitNameRequest = async () => {
    setNameReqError('');
    const res = await apiClient.requestNameChange(nameReq.name, nameReq.reason);
    if (res.ok) {
      apply(res.data);
      setNameReq(null);
    } else setNameReqError(res.data?.error || 'Could not send the request');
  };

  if (loadError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-rose-300 mb-4">{loadError}</p>
        <button type="button" onClick={load} className="px-4 py-2 rounded-lg bg-white/10 text-white cursor-pointer">
          Try again
        </button>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400 gap-2 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading your profile…
      </div>
    );
  }

  const p = data.profile;
  const initials = (p.full_name || '?').split(/\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-5">
      {/* identity header */}
      <section className="rounded-2xl border border-white/10 bg-[#070b10]/85 backdrop-blur p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-center">
        <div className="relative w-24 h-24 shrink-0">
          {p.avatar ? (
            <img src={p.avatar} alt="Profile" referrerPolicy="no-referrer" className="w-24 h-24 rounded-full object-cover border-2 border-[#FF7A00]/50" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#FF7A00]/20 text-[#FFA439] text-2xl font-semibold flex items-center justify-center border-2 border-[#FF7A00]/40">
              {initials}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={photoBusy}
            className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#FF7A00] text-black flex items-center justify-center shadow-lg hover:brightness-110 cursor-pointer disabled:opacity-60"
            aria-label="Change photo"
          >
            {photoBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPhoto} />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-white break-words">{p.full_name}</h1>
          {p.headline && <p className="text-sm text-slate-300 mt-0.5">{p.headline}</p>}
          <p className="text-sm text-slate-400 mt-1 break-all">{p.email}</p>
          <p className="text-xs text-slate-500 mt-1 font-mono">{p.cadet_id}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {data.cohorts.map((c) => (
              <span key={c.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#FF7A00]/15 text-[#FFA439] border border-[#FF7A00]/30">
                <UsersRound className="w-3 h-3" /> {c.name}
              </span>
            ))}
          </div>
          {photoError && <p className="text-xs text-rose-400 mt-2">{photoError}</p>}
          {p.avatar && !photoBusy && (
            <button type="button" onClick={removePhoto} className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-300 cursor-pointer">
              <Trash2 className="w-3 h-3" /> Remove photo
            </button>
          )}
        </div>
      </section>

      {/* certificates */}
      <Section title={`My certificates (${data.certificates.length})`}>
        {data.certificates.length ? (
          <ul className="space-y-3">
            {data.certificates.map((c) => (
              <li key={c.verification_id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#FFA439] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{c.credential_title}</div>
                    <div className="text-xs text-slate-400">
                      {c.course_title} · {new Date(c.issue_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })} · ID{' '}
                      <span className="font-mono">{c.verification_id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <a
                    href={addToProfileUrl(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0A66C2] text-white hover:brightness-110"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Add to LinkedIn profile
                  </a>
                  <a
                    href={shareUrl(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-[#0A66C2]/60 text-sky-200 hover:bg-[#0A66C2]/20"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share on LinkedIn
                  </a>
                  <Link to={`/verify/${c.verification_id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/15 text-slate-200 hover:bg-white/10">
                    <ExternalLink className="w-3.5 h-3.5" /> View
                  </Link>
                  <CopyLink text={verifyUrl(c)} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Pass a course's final assessment to earn a verifiable certificate. You can then add it to your LinkedIn profile in one click.
          </p>
        )}
      </Section>

      {/* profile form */}
      <Section title="Profile details">
        <form onSubmit={save} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Field
                label="Full name (printed on certificates)"
                error={errors.full_name}
                hint={data.name_locked ? 'Locked because it appears on a certificate.' : 'Use your real name as it should appear on certificates.'}
              >
                <div className="relative">
                  <input className={input} value={form.full_name} onChange={set('full_name')} disabled={data.name_locked} maxLength={80} autoComplete="name" />
                  {data.name_locked && <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />}
                </div>
              </Field>
              {data.name_locked && !data.pending_name_request && (
                <button type="button" onClick={() => setNameReq({ name: p.full_name, reason: '' })} className="mt-1.5 text-xs text-[#FFA439] hover:underline cursor-pointer">
                  Request a name change
                </button>
              )}
              {data.pending_name_request && (
                <div className="mt-2 text-xs text-amber-200 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                  Name change to <b>{data.pending_name_request.requested_name}</b> is waiting for review.{' '}
                  <button
                    type="button"
                    className="underline cursor-pointer"
                    onClick={async () => {
                      const res = await apiClient.withdrawNameChange();
                      if (res.ok) apply(res.data);
                    }}
                  >
                    Withdraw
                  </button>
                </div>
              )}
              {!data.pending_name_request && data.last_name_decision?.status === 'REJECTED' && (
                <div className="mt-2 text-xs text-rose-200 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2">
                  Your request to change your name to "{data.last_name_decision.requested_name}" was not approved
                  {data.last_name_decision.review_note ? `: ${data.last_name_decision.review_note}` : '.'}
                </div>
              )}
            </div>
            <Field label="Headline" error={errors.headline} hint="e.g. Aspiring SOC Analyst | B.Tech CSE">
              <input className={input} value={form.headline} onChange={set('headline')} maxLength={140} />
            </Field>
            <Field label="College / organisation" error={errors.college}>
              <input className={input} value={form.college} onChange={set('college')} maxLength={160} autoComplete="organization" />
            </Field>
            <Field label="Degree / programme" error={errors.degree}>
              <input className={input} value={form.degree} onChange={set('degree')} maxLength={120} placeholder="e.g. B.Tech Computer Science" />
            </Field>
            <Field label="Graduation year" error={errors.graduation_year}>
              <input className={input} value={form.graduation_year} onChange={set('graduation_year')} inputMode="numeric" maxLength={4} placeholder="2027" />
            </Field>
            <Field label="City" error={errors.city}>
              <input className={input} value={form.city} onChange={set('city')} maxLength={80} autoComplete="address-level2" />
            </Field>
          </div>
          <Field label="About you" error={errors.bio}>
            <textarea className={`${input} min-h-[90px]`} value={form.bio} onChange={set('bio')} maxLength={600} />
          </Field>

          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white mb-3">Links</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label={<span className="inline-flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" /> LinkedIn profile</span>} error={errors.linkedin_url}>
                <input className={input} value={form.linkedin_url} onChange={set('linkedin_url')} placeholder="linkedin.com/in/your-name" inputMode="url" />
              </Field>
              <Field label={<span className="inline-flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</span>} error={errors.github_url}>
                <input className={input} value={form.github_url} onChange={set('github_url')} placeholder="github.com/username" inputMode="url" />
              </Field>
              <Field label={<span className="inline-flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Website / portfolio</span>} error={errors.portfolio_url}>
                <input className={input} value={form.portfolio_url} onChange={set('portfolio_url')} placeholder="https://…" inputMode="url" />
              </Field>
            </div>
          </div>

          {errors._ && <p className="text-sm text-rose-400">{errors._}</p>}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF7A00] text-black font-semibold text-sm hover:brightness-110 disabled:opacity-60 cursor-pointer"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save profile
            </button>
            {saved && <span className="text-sm text-emerald-400">Saved</span>}
          </div>
        </form>
      </Section>

      {/* access */}
      <Section
        title="Batches and unlocked courses"
        actions={
          <Link to="/join" className="inline-flex items-center gap-1.5 text-xs text-[#FFA439] hover:underline">
            <Ticket className="w-3.5 h-3.5" /> Have a code?
          </Link>
        }
      >
        {data.unlocked_courses.length ? (
          <ul className="grid sm:grid-cols-2 gap-2">
            {data.unlocked_courses.map((c) => (
              <li key={c.id} className="text-sm text-slate-200 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                {c.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No special access yet. If your college gave you a code or link, use it on the join page.</p>
        )}
      </Section>

      {nameReq && (
        <div className="fixed inset-0 z-[90] bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-4" onMouseDown={() => setNameReq(null)}>
          <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0b1118] p-5 space-y-4" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Request a name change">
            <h2 className="text-base font-semibold text-white">Request a name change</h2>
            <p className="text-sm text-slate-400">
              An admin reviews the request. If approved, your certificates can be reissued with the new name.
            </p>
            <Field label="New full name">
              <input className={input} value={nameReq.name} onChange={(e) => setNameReq((x) => ({ ...x, name: e.target.value }))} maxLength={80} />
            </Field>
            <Field label="Reason">
              <textarea className={`${input} min-h-[70px]`} value={nameReq.reason} onChange={(e) => setNameReq((x) => ({ ...x, reason: e.target.value }))} maxLength={500} placeholder="e.g. spelling correction, name as on my college ID" />
            </Field>
            {nameReqError && <p className="text-sm text-rose-400">{nameReqError}</p>}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setNameReq(null)} className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 cursor-pointer">
                Cancel
              </button>
              <button type="button" onClick={submitNameRequest} className="px-4 py-2 rounded-lg text-sm bg-[#FF7A00] text-black font-semibold cursor-pointer">
                Send request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
