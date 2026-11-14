import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  Card,
  Table,
  Button,
  Badge,
  SearchBox,
  Select,
  Pager,
  Loading,
  ErrorBox,
  Modal,
  Field,
  Textarea,
  Avatar,
  useResource,
  useAction,
  fmtDate,
} from './ui';

const KIND = {
  phone: ['red', 'Phone'],
  multiple_faces: ['red', 'Another person'],
  looking_away: ['amber', 'Looking away'],
  face_absent: ['amber', 'Left camera'],
  focus: ['amber', 'Tab / fullscreen'],
  periodic: ['gray', 'Routine check'],
};

function KindBadge({ kind }) {
  const [c, t] = KIND[kind] || ['gray', kind];
  return <Badge color={c}>{t}</Badge>;
}

function FlagSummary({ s }) {
  const parts = ['phone', 'multiple_faces', 'looking_away', 'face_absent', 'focus'].filter((k) => s[k] > 0);
  if (!parts.length) return <span className="text-xs text-slate-500">No flags</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {parts.map((k) => (
        <span key={k} className="inline-flex items-center gap-1">
          <KindBadge kind={k} />
          <span className="text-xs text-slate-400 tabular-nums">×{s[k]}</span>
        </span>
      ))}
    </div>
  );
}

function SessionReview({ id, onClose, onDecided }) {
  const { data, loading, error, reload } = useResource('proctor_session', { id }, { skip: !id });
  const run = useAction();
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [showRoutine, setShowRoutine] = useState(false);
  if (!id) return null;
  const s = data?.session;
  const events = (data?.events || []).filter((e) => showRoutine || e.kind !== 'periodic');
  const routineCount = (data?.events || []).filter((e) => e.kind === 'periodic').length;

  const decide = async (decision) => {
    setBusy(decision);
    const res = await run('proctor_review', { session_id: id, decision, note }, { success: decision === 'VOIDED' ? 'Attempt voided' : 'Attempt cleared' });
    setBusy(null);
    if (res.ok) {
      onDecided?.();
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose} title="Exam proctoring review" wide>
      {(loading || !data) && !error ? (
        <Loading />
      ) : error ? (
        <ErrorBox error={error} onRetry={reload} />
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={s.avatar} name={s.full_name} size={40} />
              <div>
                <Link to={`/admin/students/${s.user_id}`} className="text-white hover:underline">
                  {s.full_name}
                </Link>
                <div className="text-xs text-slate-500">
                  {s.email} · {s.cadet_id}
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-300 sm:text-right">
              <div>
                {s.course_title} · {s.kind === 'final' ? 'Final exam' : 'Module quiz'}
              </div>
              <div className="text-xs text-slate-500">
                {fmtDate(s.started_at, true)} · {s.status}
                {s.score_percentage != null && ` · ${s.score_percentage}% ${s.is_passed ? '(passed)' : '(failed)'}`}
              </div>
              <div className="text-xs text-slate-500 font-mono">Watermark code {String(s.id).replace(/^as_/, '').slice(-8).toUpperCase()}</div>
            </div>
          </div>

          {s.review_status && (
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              Reviewed: <b>{s.review_status === 'VOIDED' ? 'Voided' : 'Cleared'}</b> on {fmtDate(s.reviewed_at, true)}
              {s.review_note ? ` — ${s.review_note}` : ''}
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Evidence ({events.length})</h3>
            {routineCount > 0 && (
              <label className="text-xs text-slate-400 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showRoutine} onChange={(e) => setShowRoutine(e.target.checked)} className="accent-[#FF7A00]" />
                Show {routineCount} routine snapshots
              </label>
            )}
          </div>
          {events.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {events.map((e) => (
                <div key={e.id} className="rounded-lg border border-white/10 bg-black/30 overflow-hidden">
                  {e.snapshot ? (
                    <button type="button" onClick={() => setZoom(e)} className="block w-full cursor-zoom-in">
                      <img src={e.snapshot} alt={`${e.kind} at ${fmtDate(e.created_at, true)}`} className="w-full aspect-[4/3] object-cover" />
                    </button>
                  ) : (
                    <div className="w-full aspect-[4/3] flex items-center justify-center text-xs text-slate-600">No image</div>
                  )}
                  <div className="p-2 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <KindBadge kind={e.kind} />
                      <span className="text-[11px] text-slate-500">{new Date(e.created_at).toLocaleTimeString('en-IN')}</span>
                    </div>
                    {e.detail && <div className="text-[11px] text-slate-400 leading-snug">{e.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No flagged events.</p>
          )}

          {!s.review_status && (
            <div className="space-y-3 border-t border-white/10 pt-4">
              <Field label="Note (kept in the audit log)">
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} className="min-h-[60px]" maxLength={500} />
              </Field>
              <div className="flex flex-wrap gap-2 justify-end">
                <Button busy={busy === 'CLEARED'} onClick={() => decide('CLEARED')}>
                  Clear (no cheating)
                </Button>
                <Button variant="danger" busy={busy === 'VOIDED'} onClick={() => decide('VOIDED')}>
                  Void attempt{s.kind === 'final' ? ' & revoke certificate' : ''}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {zoom && (
        <div className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4" onClick={() => setZoom(null)}>
          <img src={zoom.snapshot} alt="" className="max-w-full max-h-[85vh] rounded-lg" />
        </div>
      )}
    </Modal>
  );
}

export default function ProctoringPage() {
  const [filter, setFilter] = useState('flagged');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(null);
  const { data, loading, error, reload } = useResource('proctor_sessions', { filter, q, page });

  return (
    <div>
      <PageHeader
        title="Exam proctoring"
        subtitle="Attempts flagged by the on-device checks (phone in view, another person, looking away, leaving the camera, tab switches). Review the snapshots, then clear or void."
      />
      <Card>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <SearchBox value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Student name, email or session id" />
          <Select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} className="sm:w-52">
            <option value="flagged">Needs review</option>
            <option value="reviewed">Reviewed</option>
            <option value="all">All attempts</option>
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <>
            <Table
              onRowClick={(s) => setOpen(s.id)}
              empty={filter === 'flagged' ? 'Nothing to review.' : 'No attempts.'}
              columns={[
                {
                  key: 'who',
                  label: 'Student',
                  render: (s) => (
                    <div className="flex items-center gap-2">
                      <Avatar src={s.avatar} name={s.full_name} size={28} />
                      <span>
                        <span className="block text-white">{s.full_name}</span>
                        <span className="block text-xs text-slate-500">{s.email}</span>
                      </span>
                    </div>
                  ),
                },
                {
                  key: 'exam',
                  label: 'Exam',
                  render: (s) => (
                    <span className="text-xs">
                      <span className="block text-slate-200">{s.course_title}</span>
                      <span className="block text-slate-500">{s.kind === 'final' ? 'Final' : s.quiz_id}</span>
                    </span>
                  ),
                },
                { key: 'flags', label: 'Flags', render: (s) => <FlagSummary s={s} /> },
                {
                  key: 'result',
                  label: 'Result',
                  render: (s) =>
                    s.score_percentage == null ? (
                      <span className="text-xs text-slate-500">{s.status}</span>
                    ) : (
                      <Badge color={s.is_passed ? 'green' : 'gray'}>{s.score_percentage}%</Badge>
                    ),
                },
                {
                  key: 'review',
                  label: 'Review',
                  render: (s) =>
                    s.review_status ? (
                      <Badge color={s.review_status === 'VOIDED' ? 'red' : 'green'}>{s.review_status === 'VOIDED' ? 'Voided' : 'Cleared'}</Badge>
                    ) : (
                      <Badge color={s.high > 0 ? 'red' : 'amber'}>Pending</Badge>
                    ),
                },
                { key: 'started_at', label: 'When', render: (s) => <span className="text-xs">{fmtDate(s.started_at, true)}</span> },
              ]}
              rows={data.sessions}
            />
            <Pager page={data.page} total={data.total} pageSize={data.page_size} onPage={setPage} />
          </>
        )}
      </Card>
      <SessionReview id={open} onClose={() => setOpen(null)} onDecided={reload} />
    </div>
  );
}
