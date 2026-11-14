import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Link2, Plus, UserPlus } from 'lucide-react';
import { apiClient } from '../../../services/apiClient';
import {
  Card,
  Table,
  Button,
  Badge,
  Loading,
  ErrorBox,
  Modal,
  Field,
  Textarea,
  Confirm,
  Avatar,
  CopyButton,
  useResource,
  useAction,
  useToast,
  fmtDate,
} from './ui';
import { BatchForm } from './BatchesPage';
import CodeForm from './CodeForm';
import { codeColumns, CodeDetail } from './CodesPage';

export default function BatchDetailPage() {
  const { id } = useParams();
  const { data, loading, error, reload } = useResource('cohort', { id });
  const run = useAction();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [newCode, setNewCode] = useState(null); // 'LINK' | 'CODE'
  const [adding, setAdding] = useState(false);
  const [emails, setEmails] = useState('');
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [archiving, setArchiving] = useState(false);
  const [openCode, setOpenCode] = useState(null);
  const [tab, setTab] = useState('members');

  if (loading && !data) return <Loading />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const { cohort, courses, members, allowed_emails: allowed, codes } = data;
  const archived = cohort.status !== 'ACTIVE';
  const links = codes.filter((c) => c.kind === 'LINK');
  const waiting = allowed.filter((a) => !a.joined);

  const addMembers = async () => {
    setBusy(true);
    const res = await run('cohort_add_members', { cohort_id: cohort.id, emails });
    setBusy(false);
    if (res.ok) {
      toast(`${res.data.added_now} added now · ${res.data.waiting_for_signup} will join when they sign up with the batch link`);
      setEmails('');
      setAdding(false);
      reload();
    }
  };

  return (
    <div className="space-y-5">
      <Link to="/admin/batches" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Batches
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2 flex-wrap">
            {cohort.name} {archived && <Badge>Archived</Badge>}
          </h1>
          {cohort.organisation && <p className="text-sm text-slate-400">{cohort.organisation}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setEditing(true)}>Edit batch</Button>
          <Button onClick={() => apiClient.adminDownload('cohort_members', cohort.id).catch(() => toast('Export failed', 'error'))}>
            <Download className="w-4 h-4" /> Export progress
          </Button>
          <Button variant={archived ? 'primary' : 'secondary'} onClick={() => setArchiving(true)}>
            {archived ? 'Restore' : 'Archive'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Who can join">
          {cohort.allowed_domains.length === 0 && allowed.length === 0 ? (
            <p className="text-sm text-amber-300">Anyone with the batch link or code.</p>
          ) : (
            <div className="space-y-2 text-sm">
              {cohort.allowed_domains.map((d) => (
                <div key={d} className="font-mono text-slate-200">@{d}</div>
              ))}
              {allowed.length > 0 && (
                <div className="text-slate-300">
                  {allowed.length} listed emails <span className="text-slate-500">({waiting.length} not joined yet)</span>
                </div>
              )}
              <p className="text-xs text-slate-500">Verified sign-in email required.</p>
            </div>
          )}
        </Card>
        <Card title={`Course bundle (${courses.length})`} className="md:col-span-2">
          {courses.length ? (
            <div className="flex flex-wrap gap-1.5">
              {courses.map((c) => (
                <Badge key={c.id} color="orange">
                  {c.title}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No courses yet. Edit the batch to choose its free courses.</p>
          )}
        </Card>
      </div>

      <Card
        title="Registration link"
        actions={
          <Button size="sm" variant="primary" disabled={archived} onClick={() => setNewCode('LINK')}>
            <Link2 className="w-3.5 h-3.5" /> {links.length ? 'Another link' : 'Create link'}
          </Button>
        }
      >
        {links.length ? (
          <div className="space-y-2">
            {links.map((l) => (
              <div key={l.id} className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                <span className="font-mono text-xs text-white break-all flex-1">{l.link}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 tabular-nums">{l.redemption_count} joined</span>
                  <Badge color={l.state === 'VALID' ? 'green' : 'gray'}>{l.state === 'VALID' ? 'Active' : 'Off'}</Badge>
                  <CopyButton text={l.link} />
                  <Button size="sm" onClick={() => setOpenCode(l.id)}>
                    Manage
                  </Button>
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-500">
              Students open the link, sign in with Google, and are added to the batch and enrolled in the whole bundle.
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Create a link to share with this batch (WhatsApp, email, LMS…).</p>
        )}
      </Card>

      <div className="flex gap-1 border-b border-white/10 overflow-x-auto">
        {[
          ['members', `Members (${members.length})`],
          ['list', `Email list (${allowed.length})`],
          ['codes', `Codes (${codes.length - links.length})`],
        ].map(([k, t]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`px-3 py-2 text-sm border-b-2 -mb-px whitespace-nowrap cursor-pointer ${tab === k ? 'border-[#FF7A00] text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'members' && (
        <Card
          actions={
            <Button size="sm" disabled={archived} onClick={() => setAdding(true)}>
              <UserPlus className="w-3.5 h-3.5" /> Add by email
            </Button>
          }
          title="Members and progress"
        >
          <Table
            empty="No members yet. Share the registration link or add students by email."
            columns={[
              {
                key: 'name',
                label: 'Student',
                render: (m) => (
                  <Link to={`/admin/students/${m.id}`} className="flex items-center gap-2 hover:underline">
                    <Avatar src={m.avatar} name={m.full_name} size={28} />
                    <span>
                      <span className="block text-white">{m.full_name}</span>
                      <span className="block text-xs text-slate-500">{m.email}</span>
                    </span>
                  </Link>
                ),
              },
              { key: 'via', label: 'Joined via', render: (m) => <Badge>{{ LINK: 'Link', CODE: 'Code', ADMIN: 'Admin' }[m.joined_via] || m.joined_via}</Badge> },
              { key: 'lessons_completed', label: 'Lessons done', className: 'tabular-nums' },
              { key: 'assessments_passed', label: 'Quizzes passed', className: 'tabular-nums' },
              { key: 'certificates', label: 'Certificates', className: 'tabular-nums' },
              { key: 'joined_at', label: 'Joined', render: (m) => fmtDate(m.joined_at) },
              {
                key: 'x',
                label: '',
                render: (m) => (
                  <Button size="sm" variant="ghost" onClick={() => setRemoving(m)}>
                    Remove
                  </Button>
                ),
              },
            ]}
            rows={members}
          />
        </Card>
      )}

      {tab === 'list' && (
        <Card
          title="Email list"
          actions={
            <Button size="sm" disabled={archived} onClick={() => setAdding(true)}>
              <Plus className="w-3.5 h-3.5" /> Add emails
            </Button>
          }
        >
          <Table
            rowKey="email"
            empty="No listed emails. Domain rules (if any) still apply."
            columns={[
              { key: 'email', label: 'Email' },
              { key: 'joined', label: 'Status', render: (a) => (a.joined ? <Badge color="green">Joined</Badge> : <Badge color="amber">Not joined yet</Badge>) },
              {
                key: 'x',
                label: '',
                render: (a) => (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      const res = await run('cohort_remove_allowed_email', { cohort_id: cohort.id, email: a.email }, { success: 'Removed from the list' });
                      if (res.ok) reload();
                    }}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
            rows={allowed}
          />
        </Card>
      )}

      {tab === 'codes' && (
        <Card
          title="Batch codes"
          actions={
            <Button size="sm" disabled={archived} onClick={() => setNewCode('CODE')}>
              <Plus className="w-3.5 h-3.5" /> New batch code
            </Button>
          }
        >
          <p className="text-xs text-slate-400 mb-3">
            Codes tied to this batch can only be used by people eligible for it, and using one adds them to the batch. Use "many single-use
            codes" to hand out one code per student.
          </p>
          <Table columns={codeColumns(reload)} rows={codes.filter((c) => c.kind === 'CODE')} onRowClick={(c) => setOpenCode(c.id)} empty="No typed codes for this batch." />
        </Card>
      )}

      <BatchForm open={editing} existing={data} onClose={() => setEditing(false)} onSaved={reload} />
      <CodeForm open={Boolean(newCode)} defaultKind={newCode || 'CODE'} cohort={{ id: cohort.id, name: cohort.name }} onClose={() => setNewCode(null)} onSaved={reload} />
      <CodeDetail id={openCode} onClose={() => setOpenCode(null)} onChanged={reload} />

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add students by email"
        footer={
          <>
            <Button onClick={() => setAdding(false)}>Cancel</Button>
            <Button variant="primary" busy={busy} onClick={addMembers}>
              Add
            </Button>
          </>
        }
      >
        <Field hint="Students who already have an account join immediately. Everyone is added to the email list, so new students join when they sign up through the batch link.">
          <Textarea value={emails} onChange={(e) => setEmails(e.target.value)} placeholder={'a@college.edu\nb@gmail.com'} className="min-h-[160px]" />
        </Field>
      </Modal>

      <Confirm
        open={Boolean(removing)}
        title="Remove from batch"
        message={`Remove ${removing?.full_name} from ${cohort.name}? They lose the bundle for courses they have not started, and cannot re-join with the link. Courses they are already enrolled in stay open.`}
        confirmLabel="Remove"
        danger
        onClose={() => setRemoving(null)}
        onConfirm={async () => {
          const res = await run('cohort_remove_member', { cohort_id: cohort.id, user_id: removing.id, remove_from_allow_list: true }, { success: 'Removed' });
          setRemoving(null);
          if (res.ok) reload();
        }}
      />
      <Confirm
        open={archiving}
        title={archived ? 'Restore batch' : 'Archive batch'}
        message={
          archived
            ? 'Restore this batch? Its links and codes work again and members regain the bundle.'
            : 'Archive this batch? Nobody can join, and members lose the bundle for courses they have not started. You can restore it later.'
        }
        confirmLabel={archived ? 'Restore' : 'Archive'}
        danger={!archived}
        onClose={() => setArchiving(false)}
        onConfirm={async () => {
          const res = await run('cohort_set_status', { id: cohort.id, archived: !archived }, { success: archived ? 'Batch restored' : 'Batch archived' });
          setArchiving(false);
          if (res.ok) reload();
        }}
      />
    </div>
  );
}
