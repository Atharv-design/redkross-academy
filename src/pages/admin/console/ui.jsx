/**
 * Shared building blocks for the admin console. Everything here talks to the
 * server (/api/manage); nothing is read from or written to browser storage.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { X, Loader2, Copy, Check, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../../services/apiClient';

// ------------------------------------------------------------------ data hooks

export function useResource(resource, query = {}, { skip = false } = {}) {
  const key = JSON.stringify(query);
  const [state, setState] = useState({ data: null, loading: !skip, error: null });
  const seq = useRef(0);
  const load = useCallback(async () => {
    if (skip) return;
    const n = ++seq.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    const res = await apiClient.adminRead(resource, JSON.parse(key));
    if (n !== seq.current) return;
    if (res.ok) setState({ data: res.data, loading: false, error: null });
    else setState({ data: null, loading: false, error: res.data?.error || `Request failed (${res.status})` });
  }, [resource, key, skip]);
  useEffect(() => {
    load();
  }, [load]);
  return { ...state, reload: load };
}

/** Runs an admin action with toast feedback. Returns the response. */
export function useAction() {
  const toast = useToast();
  return useCallback(
    async (action, payload, { success, silent } = {}) => {
      const res = await apiClient.adminAction(action, payload);
      if (res.ok) {
        if (success) toast(success, 'ok');
      } else if (!silent) {
        toast(res.data?.error || `Failed (${res.status})`, 'error');
      }
      return res;
    },
    [toast]
  );
}

// ------------------------------------------------------------------ console context (courses, me)

const ConsoleContext = createContext({ courses: [], me: null, reloadCourses: () => {} });
export function ConsoleProvider({ me, children }) {
  const courses = useResource('courses');
  const value = useMemo(
    () => ({ me, courses: courses.data?.courses || [], reloadCourses: courses.reload }),
    [me, courses.data, courses.reload]
  );
  return <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>;
}
export const useConsole = () => useContext(ConsoleContext);

// ------------------------------------------------------------------ toasts

const ToastContext = createContext(() => {});
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((text, kind = 'ok') => {
    const id = Math.random().toString(36).slice(2);
    setItems((x) => [...x, { id, text, kind }]);
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 4500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[100] space-y-2 sm:w-96" aria-live="polite">
        {items.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl px-4 py-3 text-sm shadow-xl border ${
              t.kind === 'error'
                ? 'bg-rose-950/95 border-rose-500/40 text-rose-100'
                : 'bg-emerald-950/95 border-emerald-500/40 text-emerald-100'
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export const useToast = () => useContext(ToastContext);

// ------------------------------------------------------------------ primitives

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = '', title, actions }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10">
          {title && <h2 className="text-sm font-semibold text-slate-200">{title}</h2>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

const BTN = {
  primary: 'bg-[#FF7A00] text-black hover:bg-[#ff8c1f] font-semibold',
  secondary: 'bg-white/5 text-slate-200 border border-white/15 hover:bg-white/10',
  danger: 'bg-rose-600/90 text-white hover:bg-rose-600',
  ghost: 'text-slate-300 hover:bg-white/5',
};
export function Button({ variant = 'secondary', size = 'md', busy, children, className = '', ...props }) {
  const sz = size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm';
  return (
    <button
      type="button"
      {...props}
      disabled={busy || props.disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sz} ${BTN[variant]} ${className}`}
    >
      {busy && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

const BADGE = {
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  red: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  gray: 'bg-white/5 text-slate-300 border-white/15',
  orange: 'bg-[#FF7A00]/15 text-[#FFA439] border-[#FF7A00]/30',
};
export function Badge({ color = 'gray', children }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border whitespace-nowrap ${BADGE[color]}`}>
      {children}
    </span>
  );
}

export const CODE_STATE = {
  VALID: ['green', 'Active'],
  INACTIVE: ['gray', 'Off'],
  NOT_STARTED: ['blue', 'Scheduled'],
  EXPIRED: ['red', 'Expired'],
  USED_UP: ['amber', 'Used up'],
};
export function CodeStateBadge({ state }) {
  const [c, t] = CODE_STATE[state] || ['gray', state];
  return <Badge color={c}>{t}</Badge>;
}

export function Field({ label, hint, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span>}
      {children}
      {error ? <span className="block text-xs text-rose-400 mt-1">{error}</span> : hint ? <span className="block text-xs text-slate-500 mt-1">{hint}</span> : null}
    </label>
  );
}

export const inputCls =
  'w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF7A00]/70 focus:ring-1 focus:ring-[#FF7A00]/40';

export function Input(props) {
  return <input {...props} className={`${inputCls} ${props.className || ''}`} />;
}
export function Textarea(props) {
  return <textarea {...props} className={`${inputCls} min-h-[90px] ${props.className || ''}`} />;
}
export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${inputCls} ${props.className || ''}`}>
      {children}
    </select>
  );
}

export function SearchBox({ value, onChange, placeholder = 'Search…' }) {
  const [v, setV] = useState(value || '');
  useEffect(() => {
    const t = setTimeout(() => onChange(v), 300);
    return () => clearTimeout(t);
  }, [v]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="relative w-full sm:w-72">
      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} className={`${inputCls} pl-9`} />
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer, wide }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    // No close-on-backdrop: a stray click must never discard a half-filled form (✕, Cancel and Esc close it).
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'} max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0b1118] shadow-2xl`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="p-1 rounded hover:bg-white/10 text-slate-400 cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-white/10 flex flex-wrap justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export function Confirm({ open, title, message, confirmLabel = 'Confirm', danger, onConfirm, onClose, children }) {
  const [busy, setBusy] = useState(false);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            busy={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onConfirm();
              } finally {
                setBusy(false);
              }
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-slate-300">{message}</p>
      {children}
    </Modal>
  );
}

export function Table({ columns, rows, empty = 'Nothing here yet.', onRowClick, rowKey = 'id' }) {
  if (!rows?.length) return <EmptyState text={empty} />;
  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-5">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-white/10">
            {columns.map((c) => (
              <th key={c.key} className={`px-4 sm:px-5 py-2.5 font-medium ${c.className || ''}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r[rowKey] ?? i}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
              className={`border-b border-white/5 ${onRowClick ? 'cursor-pointer hover:bg-white/[0.04]' : ''}`}
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-4 sm:px-5 py-3 align-top text-slate-200 ${c.className || ''}`}>
                  {c.render ? c.render(r) : r[c.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pager({ page, total, pageSize, onPage }) {
  const pages = Math.max(1, Math.ceil((total || 0) / (pageSize || 50)));
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 pt-4 text-sm text-slate-400">
      <span>
        Page {page + 1} of {pages} · {total} total
      </span>
      <Button size="sm" disabled={page <= 0} onClick={() => onPage(page - 1)} aria-label="Previous page">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button size="sm" disabled={page + 1 >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function EmptyState({ text }) {
  return <div className="text-sm text-slate-500 text-center py-10">{text}</div>;
}

export function Loading() {
  return (
    <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-2">
      <Loader2 className="w-4 h-4 animate-spin" /> Loading…
    </div>
  );
}

export function ErrorBox({ error, onRetry }) {
  return (
    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 flex items-center justify-between gap-3">
      <span>{error}</span>
      {onRetry && (
        <Button size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export function CopyButton({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      size="sm"
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          window.prompt('Copy this:', text);
        }
      }}
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {done ? 'Copied' : label}
    </Button>
  );
}

export function Avatar({ src, name, size = 32 }) {
  const initials = String(name || '?')
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const [broken, setBroken] = useState(false);
  if (src && !broken) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        onError={() => setBroken(true)}
        referrerPolicy="no-referrer"
        className="rounded-full object-cover shrink-0 bg-white/10"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="rounded-full bg-[#FF7A00]/20 text-[#FFA439] text-xs font-semibold inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function Stat({ label, value, hint, to }) {
  const body = (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 h-full hover:border-white/20 transition-colors">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1 tabular-nums">{value ?? '—'}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
}

// ------------------------------------------------------------------ formatting

export function fmtDate(v, withTime = false) {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-IN', withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' });
}

export function toInputDate(v) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function inr(n) {
  return Number(n) > 0 ? `₹${Number(n).toLocaleString('en-IN')}` : 'Free';
}

export function benefitText(c) {
  return c.discount_percent === 100 ? 'Free access' : `${c.discount_percent}% off`;
}

export function scopeText(c, courses = []) {
  if (c.course_scope === 'ALL') return 'All courses';
  if (c.course_scope === 'COHORT') return 'Batch bundle';
  const n = c.courses?.length;
  if (n === 1) return c.courses[0].title;
  return n ? `${n} courses` : 'Selected courses';
}

export function downloadCsv(filename, rows, columns) {
  const cell = (v) => {
    let s = v === null || v === undefined ? '' : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [columns.map((c) => cell(c[0])).join(','), ...rows.map((r) => columns.map((c) => cell(r[c[1]])).join(','))].join('\r\n');
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ------------------------------------------------------------------ course picker

export function CoursePicker({ value = [], onChange, courses, includeComingSoon = false }) {
  const [q, setQ] = useState('');
  const list = courses.filter(
    (c) => (includeComingSoon || c.visibility !== 'COMING_SOON') && (`${c.code} ${c.title}`.toLowerCase().includes(q.toLowerCase()))
  );
  const set = new Set(value);
  const toggle = (id) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  };
  return (
    <div className="rounded-lg border border-white/15 bg-black/30">
      <div className="flex items-center gap-2 p-2 border-b border-white/10">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter courses" className={`${inputCls} py-1.5`} />
        <Button size="sm" onClick={() => onChange([...new Set([...value, ...list.map((c) => c.id)])])}>
          All
        </Button>
        <Button size="sm" onClick={() => onChange([])}>
          None
        </Button>
      </div>
      <div className="max-h-56 overflow-y-auto p-1">
        {list.map((c) => (
          <label key={c.id} className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm">
            <input type="checkbox" checked={set.has(c.id)} onChange={() => toggle(c.id)} className="mt-1 accent-[#FF7A00]" />
            <span className="text-slate-200">
              {c.code && <span className="text-slate-500 mr-1.5">{c.code}</span>}
              {c.title}
              {c.visibility === 'HIDDEN' && <span className="ml-2 text-xs text-slate-500">(hidden)</span>}
              {c.price_inr > 0 && <span className="ml-2 text-xs text-amber-400">{inr(c.price_inr)}</span>}
            </span>
          </label>
        ))}
      </div>
      <div className="px-3 py-1.5 text-xs text-slate-500 border-t border-white/10">{value.length} selected</div>
    </div>
  );
}
