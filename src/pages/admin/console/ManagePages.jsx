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
  Input,
  Textarea,
  Confirm,
  Avatar,
  useResource,
  useAction,
  useConsole,
  fmtDate,
  inr,
} from './ui';

// ====================================================================== courses

const VIS = {
  PUBLISHED: ['green', 'Published'],
  HIDDEN: ['gray', 'Hidden'],
  COMING_SOON: ['blue', 'Coming soon'],
};

export function CoursesPage() {
  const { courses, reloadCourses } = useConsole();
  const run = useAction();
  const [edit, setEdit] = useState(null);
  const [busy, setBusy] = useState(false);
  const [division, setDivision] = useState('');
  const rows = courses.filter((c) => !division || c.division === division);

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Control what is visible in the catalog and what it costs. Course content itself is managed in the course library."
      />
      <Card>
        <div className="mb-4 sm:w-56">
          <Select value={division} onChange={(e) => setDivision(e.target.value)}>
            <option value="">All divisions</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="psychology">Psychology</option>
          </Select>
        </div>
        <Table
          onRowClick={(c) => setEdit({ ...c })}
          columns={[
            {
              key: 'title',
              label: 'Course',
              render: (c) => (
                <span>
                  {c.code && <span className="text-slate-500 mr-1.5">{c.code}</span>}
                  {c.title}
                </span>
              ),
            },
            { key: 'visibility', label: 'Catalog', render: (c) => <Badge color={VIS[c.visibility][0]}>{VIS[c.visibility][1]}</Badge> },
            { key: 'price_inr', label: 'Price', render: (c) => inr(c.price_inr) },
            { key: 'enrolments', label: 'Enrolled', className: 'tabular-nums' },
            { key: 'certificates', label: 'Certified', className: 'tabular-nums' },
          ]}
          rows={rows}
        />
      </Card>
      <Modal
        open={Boolean(edit)}
        onClose={() => setEdit(null)}
        title={edit?.title}
        footer={
          <>
            <Button onClick={() => setEdit(null)}>Cancel</Button>
            <Button
              variant="primary"
              busy={busy}
              onClick={async () => {
                setBusy(true);
                const res = await run('course_update', { course_id: edit.id, visibility: edit.visibility, price_inr: Number(edit.price_inr) || 0 }, { success: 'Course saved' });
                setBusy(false);
                if (res.ok) {
                  setEdit(null);
                  reloadCourses();
                }
              }}
            >
              Save
            </Button>
          </>
        }
      >
        {edit && (
          <div className="space-y-4">
            <Field label="Catalog visibility">
              <div className="space-y-2">
                {[
                  ['PUBLISHED', 'Published', 'Listed in the catalog; anyone can enrol (if free) or use a code.'],
                  ['HIDDEN', 'Hidden / private', 'Not listed. Only students unlocked by a batch, code or admin can enrol. Use for college-only courses.'],
                  ['COMING_SOON', 'Coming soon', 'Listed with a "Coming soon" badge; nobody can enrol.'],
                ].map(([k, t, d]) => (
                  <label key={k} className={`flex gap-3 rounded-lg border px-3 py-2 cursor-pointer ${edit.visibility === k ? 'border-[#FF7A00] bg-[#FF7A00]/10' : 'border-white/15'}`}>
                    <input type="radio" name="vis" checked={edit.visibility === k} onChange={() => setEdit((x) => ({ ...x, visibility: k }))} className="mt-1 accent-[#FF7A00]" />
                    <span>
                      <span className="block text-sm text-white">{t}</span>
                      <span className="block text-xs text-slate-400">{d}</span>
                    </span>
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Price (₹)" hint="0 = free. A priced course is locked until a free code, a batch or an admin unlocks it (online payment is not live yet). Enrolled students keep access.">
              <Input type="number" min={0} value={edit.price_inr} onChange={(e) => setEdit((x) => ({ ...x, price_inr: e.target.value }))} />
            </Field>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ====================================================================== name requests

export function NameRequestsPage() {
  const [status, setStatus] = useState('PENDING');
  const { data, loading, error, reload } = useResource('name_requests', { status });
  const run = useAction();
  const [decide, setDecide] = useState(null);
  const [note, setNote] = useState('');
  const [reissue, setReissue] = useState(true);

  return (
    <div>
      <PageHeader
        title="Name change requests"
        subtitle="Students can edit their name freely until a certificate is issued. After that, a change needs your approval here."
      />
      <Card>
        <div className="mb-4 sm:w-48">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <Table
            empty={status === 'PENDING' ? 'No requests waiting.' : 'Nothing here.'}
            columns={[
              {
                key: 'who',
                label: 'Student',
                render: (r) => (
                  <Link to={`/admin/students/${r.user_id}`} className="hover:underline">
                    <span className="block text-white">{r.name_now}</span>
                    <span className="block text-xs text-slate-500">{r.email}</span>
                  </Link>
                ),
              },
              {
                key: 'change',
                label: 'Change',
                render: (r) => (
                  <span className="text-sm">
                    <span className="text-slate-400 line-through">{r.current_name}</span> → <span className="text-white">{r.requested_name}</span>
                  </span>
                ),
              },
              { key: 'reason', label: 'Reason', render: (r) => <span className="text-xs">{r.reason || '—'}</span> },
              { key: 'certificates', label: 'Certs', className: 'tabular-nums' },
              { key: 'created_at', label: 'Requested', render: (r) => fmtDate(r.created_at) },
              {
                key: 'x',
                label: '',
                render: (r) =>
                  r.status === 'PENDING' ? (
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="primary" onClick={() => { setDecide({ r, approve: true }); setNote(''); setReissue(true); }}>
                        Approve
                      </Button>
                      <Button size="sm" onClick={() => { setDecide({ r, approve: false }); setNote(''); }}>
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge color={r.status === 'APPROVED' ? 'green' : 'red'}>{r.status.toLowerCase()}</Badge>
                  ),
              },
            ]}
            rows={data.requests}
          />
        )}
      </Card>
      <Confirm
        open={Boolean(decide)}
        title={decide?.approve ? 'Approve name change' : 'Reject name change'}
        message={decide?.approve ? `Change the name to "${decide.r.requested_name}"?` : 'Reject this request? The student sees your note.'}
        confirmLabel={decide?.approve ? 'Approve' : 'Reject'}
        danger={!decide?.approve}
        onClose={() => setDecide(null)}
        onConfirm={async () => {
          const res = await run(
            'name_request_decide',
            { id: decide.r.id, approve: decide.approve, note, reissue_certificates: decide.approve && reissue },
            { success: decide.approve ? 'Approved' : 'Rejected' }
          );
          setDecide(null);
          if (res.ok) reload();
        }}
      >
        <div className="mt-4 space-y-3">
          {decide?.approve && decide.r.certificates > 0 && (
            <label className="flex items-start gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={reissue} onChange={(e) => setReissue(e.target.checked)} className="mt-1 accent-[#FF7A00]" />
              <span>
                Reissue their {decide.r.certificates} certificate(s) with the new name. Old certificate IDs are revoked and new IDs are issued (old
                LinkedIn links will show as revoked).
              </span>
            </label>
          )}
          <Field label="Note to the student (optional)">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} className="min-h-[60px]" maxLength={500} />
          </Field>
        </div>
      </Confirm>
    </div>
  );
}

// ====================================================================== certificates

export function CertificatesPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const { data, loading, error, reload } = useResource('certificates', { q, page });
  const run = useAction();
  const [revoking, setRevoking] = useState(null);
  const [reason, setReason] = useState('');

  return (
    <div>
      <PageHeader title="Certificates" subtitle="Every certificate issued by the academy. Revoked certificates show as revoked on the public verify page." />
      <Card>
        <div className="mb-4">
          <SearchBox value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Certificate ID, name, email or course" />
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <>
            <Table
              rowKey="verification_id"
              empty="No certificates found."
              columns={[
                {
                  key: 'verification_id',
                  label: 'ID',
                  render: (c) => (
                    <a href={`/verify/${c.verification_id}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#FFA439] hover:underline">
                      {c.verification_id}
                    </a>
                  ),
                },
                {
                  key: 'student_name',
                  label: 'Student',
                  render: (c) => (
                    <Link to={`/admin/students/${c.user_id}`} className="hover:underline">
                      <span className="block">{c.student_name}</span>
                      <span className="block text-xs text-slate-500">{c.email}</span>
                    </Link>
                  ),
                },
                { key: 'course_title', label: 'Course' },
                { key: 'grade_percentage', label: 'Score', render: (c) => `${c.grade_percentage}%` },
                { key: 'issue_date', label: 'Issued', render: (c) => fmtDate(c.issue_date) },
                { key: 'status', label: 'Status', render: (c) => <Badge color={c.status === 'Active' ? 'green' : 'red'}>{c.status}</Badge> },
                {
                  key: 'x',
                  label: '',
                  render: (c) =>
                    c.status === 'Active' && (
                      <Button size="sm" variant="ghost" onClick={() => { setRevoking(c); setReason(''); }}>
                        Revoke
                      </Button>
                    ),
                },
              ]}
              rows={data.certificates}
            />
            <Pager page={data.page} total={data.total} pageSize={data.page_size} onPage={setPage} />
          </>
        )}
      </Card>
      <Confirm
        open={Boolean(revoking)}
        title="Revoke certificate"
        message={`Revoke ${revoking?.verification_id} (${revoking?.student_name})? Anyone checking it will see it as revoked. This cannot be undone.`}
        confirmLabel="Revoke"
        danger
        onClose={() => setRevoking(null)}
        onConfirm={async () => {
          const res = await run('revoke_credential', { verification_id: revoking.verification_id, reason }, { success: 'Certificate revoked' });
          setRevoking(null);
          if (res.ok) reload();
        }}
      >
        <Field label="Reason (kept in the audit log)" className="mt-3">
          <Input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300} />
        </Field>
      </Confirm>
    </div>
  );
}

// ====================================================================== tickets

const TICKET_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export function TicketsPage() {
  const [status, setStatus] = useState('Open');
  const { data, loading, error, reload } = useResource('tickets', { status });
  const run = useAction();
  const [open, setOpen] = useState(null);

  return (
    <div>
      <PageHeader title="Support tickets" subtitle="Questions sent from the help form. Reply by email, then update the status here." />
      <Card>
        <div className="mb-4 sm:w-48">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            {TICKET_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <Table
            onRowClick={setOpen}
            empty="No tickets."
            columns={[
              { key: 'subject', label: 'Subject', render: (t) => <span className="text-white">{t.subject}</span> },
              { key: 'user_email', label: 'From' },
              { key: 'category', label: 'Category' },
              { key: 'status', label: 'Status', render: (t) => <Badge color={t.status === 'Open' ? 'amber' : t.status === 'In Progress' ? 'blue' : 'green'}>{t.status}</Badge> },
              { key: 'created_at', label: 'Received', render: (t) => fmtDate(t.created_at, true) },
            ]}
            rows={data.tickets}
          />
        )}
      </Card>
      <Modal open={Boolean(open)} onClose={() => setOpen(null)} title={open?.subject} wide>
        {open && (
          <div className="space-y-4">
            <div className="text-sm text-slate-400">
              From{' '}
              <a href={`mailto:${open.user_email}?subject=${encodeURIComponent(`Re: ${open.subject}`)}`} className="text-[#FFA439] hover:underline">
                {open.user_email}
              </a>{' '}
              · {open.category} · {fmtDate(open.created_at, true)}
            </div>
            <div className="whitespace-pre-wrap text-sm text-slate-200 rounded-lg bg-black/30 border border-white/10 p-4">{open.description}</div>
            <div className="flex flex-wrap gap-2">
              {TICKET_STATUSES.map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={open.status === s ? 'primary' : 'secondary'}
                  onClick={async () => {
                    const res = await run('ticket_update', { id: open.id, status: s }, { success: `Marked ${s}` });
                    if (res.ok) {
                      setOpen({ ...open, status: s });
                      reload();
                    }
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ====================================================================== audit log

function prettyDetails(d) {
  if (!d) return '';
  try {
    const o = JSON.parse(d);
    return Object.entries(o)
      .filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && !v.length))
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join(' · ');
  } catch {
    return d;
  }
}

export function AuditPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const { data, loading, error, reload } = useResource('audit', { q, page });
  return (
    <div>
      <PageHeader title="Audit log" subtitle="Every admin action and important student event, recorded on the server. Entries cannot be edited or deleted." />
      <Card>
        <div className="mb-4">
          <SearchBox value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Action, email or ID" />
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <>
            <Table
              empty="No entries."
              columns={[
                { key: 'created_at', label: 'When', render: (e) => <span className="text-xs whitespace-nowrap">{fmtDate(e.created_at, true)}</span> },
                { key: 'actor_email', label: 'Who', render: (e) => <span className="text-xs">{e.actor_email || e.actor_id || 'system'}</span> },
                { key: 'action', label: 'Action', render: (e) => <span className="font-mono text-xs text-white">{e.action}</span> },
                { key: 'details', label: 'Details', render: (e) => <span className="text-xs text-slate-400 break-all">{prettyDetails(e.details)}</span> },
              ]}
              rows={data.entries}
            />
            <Pager page={data.page} total={data.total} pageSize={data.page_size} onPage={setPage} />
          </>
        )}
      </Card>
    </div>
  );
}

// ====================================================================== admins

export function AdminsPage() {
  const { me } = useConsole();
  const { data, loading, error, reload } = useResource('admins');
  const run = useAction();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [busy, setBusy] = useState(false);
  const [demote, setDemote] = useState(null);
  const canEdit = me?.is_super_admin;

  return (
    <div>
      <PageHeader
        title="Admins"
        subtitle="Admins run the console. Super admins can also add or remove admins."
      />
      {canEdit && (
        <Card title="Add an admin" className="mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="their sign-in email" type="email" />
            <Select value={role} onChange={(e) => setRole(e.target.value)} className="sm:w-44">
              <option value="admin">Admin</option>
              <option value="super_admin">Super admin</option>
            </Select>
            <Button
              variant="primary"
              busy={busy}
              disabled={!email.includes('@')}
              onClick={async () => {
                setBusy(true);
                const res = await run('set_role', { email, role }, { success: 'Admin added' });
                setBusy(false);
                if (res.ok) {
                  setEmail('');
                  reload();
                }
              }}
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">The person must have signed in to the academy once.</p>
        </Card>
      )}
      <Card>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <Table
            columns={[
              {
                key: 'name',
                label: 'Name',
                render: (a) => (
                  <div className="flex items-center gap-2">
                    <Avatar src={a.avatar} name={a.full_name} size={28} />
                    <span>
                      <span className="block text-white">{a.full_name}</span>
                      <span className="block text-xs text-slate-500">{a.email}</span>
                    </span>
                  </div>
                ),
              },
              { key: 'role', label: 'Role', render: (a) => <Badge color={a.role === 'super_admin' ? 'orange' : 'blue'}>{a.role === 'super_admin' ? 'Super admin' : 'Admin'}</Badge> },
              { key: 'last_seen_at', label: 'Last seen', render: (a) => fmtDate(a.last_seen_at, true) },
              {
                key: 'x',
                label: '',
                render: (a) =>
                  canEdit && a.id !== me?.user?.id ? (
                    <Button size="sm" variant="ghost" onClick={() => setDemote(a)}>
                      Remove admin
                    </Button>
                  ) : null,
              },
            ]}
            rows={data.admins}
          />
        )}
      </Card>
      <Confirm
        open={Boolean(demote)}
        title="Remove admin access"
        message={`Make ${demote?.full_name} a regular student account?`}
        confirmLabel="Remove access"
        danger
        onClose={() => setDemote(null)}
        onConfirm={async () => {
          const res = await run('set_role', { user_id: demote.id, role: 'student' }, { success: 'Admin access removed' });
          setDemote(null);
          if (res.ok) reload();
        }}
      />
    </div>
  );
}
