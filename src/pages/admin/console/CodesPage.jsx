import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { apiClient } from '../../../services/apiClient';
import {
  PageHeader,
  Card,
  Table,
  Button,
  Badge,
  CodeStateBadge,
  SearchBox,
  Select,
  Pager,
  Loading,
  ErrorBox,
  Modal,
  CopyButton,
  Confirm,
  useResource,
  useAction,
  useToast,
  fmtDate,
  benefitText,
  scopeText,
} from './ui';
import CodeForm from './CodeForm';

export function CodeToggle({ code, onChanged }) {
  const run = useAction();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={code.is_active}
      aria-label={code.is_active ? 'Turn code off' : 'Turn code on'}
      disabled={busy}
      onClick={async (e) => {
        e.stopPropagation();
        setBusy(true);
        await run('code_set_active', { id: code.id, active: !code.is_active }, { success: code.is_active ? 'Code turned off' : 'Code turned on' });
        setBusy(false);
        onChanged?.();
      }}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer disabled:opacity-50 ${code.is_active ? 'bg-emerald-500' : 'bg-white/20'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${code.is_active ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

export function codeColumns(onChanged) {
  return [
    {
      key: 'code',
      label: 'Code',
      render: (c) => (
        <div className="min-w-0">
          <div className="font-mono text-xs text-white break-all">{c.kind === 'LINK' ? 'Registration link' : c.code}</div>
          {c.label && <div className="text-xs text-slate-500 truncate max-w-[220px]">{c.label}</div>}
        </div>
      ),
    },
    { key: 'benefit', label: 'Benefit', render: (c) => <Badge color={c.discount_percent === 100 ? 'green' : 'amber'}>{benefitText(c)}</Badge> },
    {
      key: 'scope',
      label: 'Applies to',
      render: (c) => (
        <div className="text-xs">
          <div className="text-slate-200 truncate max-w-[200px]">{scopeText(c)}</div>
          {c.cohort_name && <div className="text-slate-500">Batch: {c.cohort_name}</div>}
        </div>
      ),
    },
    { key: 'used', label: 'Used', render: (c) => <span className="tabular-nums">{c.redemption_count}{c.max_redemptions ? ` / ${c.max_redemptions}` : ''}</span> },
    { key: 'expires', label: 'Expires', render: (c) => <span className="text-xs">{c.expires_at ? fmtDate(c.expires_at) : 'Never'}</span> },
    { key: 'state', label: 'Status', render: (c) => <CodeStateBadge state={c.state} /> },
    { key: 'on', label: 'On', render: (c) => <CodeToggle code={c} onChanged={onChanged} /> },
  ];
}

export function CodeDetail({ id, onClose, onChanged }) {
  const { data, loading, error, reload } = useResource('code', { id }, { skip: !id });
  const run = useAction();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const code = data?.code;
  if (!id) return null;
  return (
    <Modal open onClose={onClose} title={code ? (code.kind === 'LINK' ? 'Registration link' : code.code) : 'Code'} wide>
      {(loading || !data) && !error ? (
        <Loading />
      ) : error ? (
        <ErrorBox error={error} onRetry={reload} />
      ) : (
        <div className="space-y-5">
          {code.link && (
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="font-mono text-xs text-white break-all flex-1">{code.link}</span>
              <CopyButton text={code.link} label="Copy link" />
            </div>
          )}
          {!code.link && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg text-white">{code.code}</span>
              <CopyButton text={code.code} />
            </div>
          )}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              ['Benefit', benefitText(code)],
              ['Batch', code.cohort_name || '—'],
              ['Used', `${code.redemption_count}${code.max_redemptions ? ` of ${code.max_redemptions}` : ''}`],
              ['Starts', code.starts_at ? fmtDate(code.starts_at, true) : 'Immediately'],
              ['Expires', code.expires_at ? fmtDate(code.expires_at, true) : 'Never'],
              ['Created', fmtDate(code.created_at)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-slate-500">{k}</dt>
                <dd className="text-slate-200">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <div className="text-xs text-slate-500 mb-1">Courses ({code.course_scope === 'ALL' ? 'all courses' : code.course_scope === 'COHORT' ? 'batch bundle' : 'selected'})</div>
            <div className="flex flex-wrap gap-1.5">
              {code.courses.length ? code.courses.map((c) => <Badge key={c.id}>{c.title}</Badge>) : <span className="text-sm text-slate-500">None</span>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setEditing(true)}>Edit</Button>
            <Button onClick={() => apiClient.adminDownload('code_redemptions', code.id).catch(() => toast('Export failed', 'error'))}>
              <Download className="w-4 h-4" /> Export uses
            </Button>
            {code.redemption_count === 0 && (
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Used by ({data.redemptions.length})</h3>
            <Table
              rowKey="user_id"
              empty="Nobody has used this yet."
              columns={[
                { key: 'full_name', label: 'Student', render: (r) => <Link to={`/admin/students/${r.user_id}`} className="text-[#FFA439] hover:underline">{r.full_name}</Link> },
                { key: 'email', label: 'Email' },
                { key: 'college', label: 'College', render: (r) => r.college || '—' },
                { key: 'redeemed_at', label: 'When', render: (r) => fmtDate(r.redeemed_at, true) },
              ]}
              rows={data.redemptions}
            />
          </div>
        </div>
      )}
      <CodeForm
        open={editing}
        existing={code}
        onClose={() => setEditing(false)}
        onSaved={() => {
          reload();
          onChanged?.();
        }}
      />
      <Confirm
        open={confirmDelete}
        title="Delete code"
        message="Delete this unused code permanently?"
        confirmLabel="Delete"
        danger
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          const res = await run('code_delete', { id: code.id }, { success: 'Code deleted' });
          setConfirmDelete(false);
          if (res.ok) {
            onChanged?.();
            onClose();
          }
        }}
      />
    </Modal>
  );
}

export default function CodesPage() {
  const [q, setQ] = useState('');
  const [kind, setKind] = useState('');
  const [page, setPage] = useState(0);
  const [creating, setCreating] = useState(false);
  const [openId, setOpenId] = useState(null);
  const toast = useToast();
  const { data, loading, error, reload } = useResource('codes', { q, kind, page });

  return (
    <div>
      <PageHeader
        title="Codes & registration links"
        subtitle="Free or discounted access to chosen courses. Turn any code on or off at any time; students who already used it keep their access."
        actions={
          <>
            <Button onClick={() => apiClient.adminDownload('codes').catch(() => toast('Export failed', 'error'))}>
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button variant="primary" onClick={() => setCreating(true)}>
              <Plus className="w-4 h-4" /> New code or link
            </Button>
          </>
        }
      />
      <Card>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <SearchBox value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Search code, label or batch" />
          <Select value={kind} onChange={(e) => { setKind(e.target.value); setPage(0); }} className="sm:w-48">
            <option value="">Codes and links</option>
            <option value="CODE">Typed codes</option>
            <option value="LINK">Registration links</option>
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <>
            <Table columns={codeColumns(reload)} rows={data.codes} onRowClick={(c) => setOpenId(c.id)} empty="No codes yet. Create one to give free or discounted access." />
            <Pager page={data.page} total={data.total} pageSize={data.page_size} onPage={setPage} />
          </>
        )}
      </Card>
      <CodeForm open={creating} onClose={() => setCreating(false)} onSaved={reload} />
      <CodeDetail id={openId} onClose={() => setOpenId(null)} onChanged={reload} />
    </div>
  );
}
