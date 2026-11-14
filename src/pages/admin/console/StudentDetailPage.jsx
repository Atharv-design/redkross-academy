import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import { LinkedinIcon as Linkedin, GithubIcon as Github } from '../../../components/icons/BrandIcons';
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
  Input,
  Select,
  Confirm,
  Avatar,
  CoursePicker,
  useResource,
  useAction,
  useConsole,
  fmtDate,
} from './ui';

export default function StudentDetailPage() {
  const { id } = useParams();
  const { me, courses } = useConsole();
  const { data, loading, error, reload } = useResource('student', { id });
  const run = useAction();
  const cohorts = useResource('cohorts', { status: 'ACTIVE' });
  const [granting, setGranting] = useState(false);
  const [grantIds, setGrantIds] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [confirm, setConfirm] = useState(null);
  const [batchId, setBatchId] = useState('');
  const [busy, setBusy] = useState(false);

  if (loading && !data) return <Loading />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const p = data.profile;
  const suspended = String(p.status).toUpperCase() === 'SUSPENDED';
  const activeGrants = data.grants.filter((g) => !g.revoked_at);
  const activeCohorts = data.cohorts.filter((c) => !c.removed_at);
  const isSelf = me?.user?.id === p.id;

  const act = async (action, payload, success) => {
    const res = await run(action, payload, { success });
    if (res.ok) reload();
    return res;
  };

  const links = [
    [p.linkedin_url, Linkedin, 'LinkedIn'],
    [p.github_url, Github, 'GitHub'],
    [p.portfolio_url, Globe, 'Website'],
  ].filter(([u]) => u);

  return (
    <div className="space-y-5">
      <Link to="/admin/students" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Students
      </Link>

      <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
        <div className="flex items-start gap-4">
          <Avatar src={p.avatar} name={p.full_name} size={64} />
          <div>
            <h1 className="text-xl font-semibold text-white flex items-center gap-2 flex-wrap">
              {p.full_name}
              {suspended && <Badge color="red">Suspended</Badge>}
              {p.role !== 'student' && <Badge color="orange">{p.role.replace('_', ' ')}</Badge>}
            </h1>
            <div className="text-sm text-slate-400">{p.email}</div>
            <div className="text-xs text-slate-500 mt-1">
              {p.cadet_id} · joined {fmtDate(p.created_at)} · last seen {fmtDate(p.last_seen_at, true)}
            </div>
            {p.headline && <div className="text-sm text-slate-300 mt-2">{p.headline}</div>}
            <div className="text-sm text-slate-300 mt-1">
              {[p.degree, p.college, p.graduation_year && `Class of ${p.graduation_year}`, p.city].filter(Boolean).join(' · ') || (
                <span className="text-slate-500">Profile not filled in yet</span>
              )}
            </div>
            {links.length > 0 && (
              <div className="flex gap-3 mt-2">
                {links.map(([u, Icon, label]) => (
                  <a key={label} href={u} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-xs text-[#FFA439] hover:underline">
                    <Icon className="w-3.5 h-3.5" /> {label} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setForm({ full_name: p.full_name, college: p.college || '' });
              setEditing(true);
            }}
          >
            Correct name/college
          </Button>
          <Button onClick={() => setGranting(true)}>Unlock courses</Button>
          {!isSelf && (
            <Button variant={suspended ? 'primary' : 'danger'} onClick={() => setConfirm({ kind: 'status' })}>
              {suspended ? 'Reactivate' : 'Suspend'}
            </Button>
          )}
        </div>
      </div>

      <Card title={`Courses (${data.enrolments.length})`}>
        <Table
          empty="Not enrolled in any course."
          columns={[
            { key: 'title', label: 'Course' },
            { key: 'lessons_completed', label: 'Lessons done', className: 'tabular-nums' },
            { key: 'q', label: 'Quizzes passed', render: (e) => <span className="tabular-nums">{e.assessments_passed}{e.modules ? ` / ${e.modules + 1}` : ''}</span> },
            { key: 'enrolled_at', label: 'Enrolled', render: (e) => fmtDate(e.enrolled_at) },
          ]}
          rows={data.enrolments}
        />
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Batches">
          {activeCohorts.length ? (
            <ul className="space-y-2">
              {activeCohorts.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2 text-sm">
                  <Link to={`/admin/batches/${c.id}`} className="text-[#FFA439] hover:underline">
                    {c.name}
                  </Link>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">since {fmtDate(c.joined_at)}</span>
                    <Button size="sm" variant="ghost" onClick={() => setConfirm({ kind: 'removeBatch', cohort: c })}>
                      Remove
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Not in a batch.</p>
          )}
          <div className="flex gap-2 mt-4">
            <Select value={batchId} onChange={(e) => setBatchId(e.target.value)}>
              <option value="">Add to batch…</option>
              {(cohorts.data?.cohorts || [])
                .filter((c) => !activeCohorts.some((a) => a.id === c.id))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </Select>
            <Button
              disabled={!batchId}
              busy={busy}
              onClick={async () => {
                setBusy(true);
                await act('cohort_add_members', { cohort_id: batchId, emails: p.email }, 'Added to batch');
                setBusy(false);
                setBatchId('');
              }}
            >
              Add
            </Button>
          </div>
        </Card>

        <Card title="Unlocked individually">
          <Table
            rowKey="course_id"
            empty="No individual unlocks (batch bundles are listed under Batches)."
            columns={[
              { key: 'title', label: 'Course' },
              { key: 'source', label: 'How', render: (g) => <Badge>{g.source === 'ADMIN' ? 'By admin' : g.source === 'CODE' ? 'Code' : g.source}</Badge> },
              { key: 'granted_at', label: 'When', render: (g) => fmtDate(g.granted_at) },
              {
                key: 'x',
                label: '',
                render: (g) => (
                  <Button size="sm" variant="ghost" onClick={() => setConfirm({ kind: 'revoke', grant: g })}>
                    Revoke
                  </Button>
                ),
              },
            ]}
            rows={activeGrants}
          />
        </Card>

        <Card title="Assessment attempts and locks">
          <Table
            rowKey="quiz_id"
            empty="No failed attempts."
            columns={[
              { key: 'title', label: 'Course' },
              { key: 'quiz_id', label: 'Assessment', render: (l) => <span className="font-mono text-xs">{l.quiz_id}</span> },
              { key: 'attempts_used', label: 'Attempts', className: 'tabular-nums' },
              {
                key: 'locked_until',
                label: 'Locked until',
                render: (l) => (l.locked_until && new Date(l.locked_until) > new Date() ? <Badge color="red">{fmtDate(l.locked_until, true)}</Badge> : '—'),
              },
              {
                key: 'x',
                label: '',
                render: (l) => (
                  <Button size="sm" onClick={() => setConfirm({ kind: 'reset', lock: l })}>
                    Reset
                  </Button>
                ),
              },
            ]}
            rows={data.locks}
          />
        </Card>

        <Card title="Certificates">
          <Table
            rowKey="verification_id"
            empty="No certificates yet."
            columns={[
              { key: 'course_title', label: 'Course' },
              {
                key: 'verification_id',
                label: 'ID',
                render: (c) => (
                  <a href={`/verify/${c.verification_id}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#FFA439] hover:underline">
                    {c.verification_id}
                  </a>
                ),
              },
              { key: 'status', label: 'Status', render: (c) => <Badge color={c.status === 'Active' ? 'green' : 'red'}>{c.status}</Badge> },
              { key: 'issue_date', label: 'Issued', render: (c) => fmtDate(c.issue_date) },
            ]}
            rows={data.certificates}
          />
        </Card>
      </div>

      <Modal
        open={granting}
        onClose={() => setGranting(false)}
        title="Unlock courses for this student"
        wide
        footer={
          <>
            <Button onClick={() => setGranting(false)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!grantIds.length}
              busy={busy}
              onClick={async () => {
                setBusy(true);
                const res = await act('grant_access', { user_id: p.id, course_ids: grantIds }, 'Courses unlocked');
                setBusy(false);
                if (res.ok) {
                  setGranting(false);
                  setGrantIds([]);
                }
              }}
            >
              Unlock {grantIds.length || ''}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-400 mb-3">Unlocked courses are free for this student, including paid or hidden ones. They enrol from the course page.</p>
        <CoursePicker value={grantIds} onChange={setGrantIds} courses={courses} />
      </Modal>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Correct name or college"
        footer={
          <>
            <Button onClick={() => setEditing(false)}>Cancel</Button>
            <Button
              variant="primary"
              busy={busy}
              onClick={async () => {
                setBusy(true);
                const res = await act('update_student_profile', { user_id: p.id, ...form }, 'Profile updated');
                setBusy(false);
                if (res.ok) setEditing(false);
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Field label="Full name" hint="Certificates already issued keep the old name. Use Name requests to approve and reissue.">
            <Input value={form.full_name || ''} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} maxLength={80} />
          </Field>
          <Field label="College">
            <Input value={form.college || ''} onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))} maxLength={160} />
          </Field>
        </div>
      </Modal>

      <Confirm
        open={confirm?.kind === 'status'}
        title={suspended ? 'Reactivate account' : 'Suspend account'}
        message={suspended ? `Let ${p.full_name} sign in and learn again?` : `Suspend ${p.full_name}? They will be blocked from the classroom, assessments and their profile until reactivated.`}
        confirmLabel={suspended ? 'Reactivate' : 'Suspend'}
        danger={!suspended}
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await act('set_status', { user_id: p.id, status: suspended ? 'ACTIVE' : 'SUSPENDED' }, suspended ? 'Account reactivated' : 'Account suspended');
          setConfirm(null);
        }}
      />
      <Confirm
        open={confirm?.kind === 'revoke'}
        title="Revoke course"
        message={`Revoke ${confirm?.grant?.title}? The student is also un-enrolled (their past progress is kept and returns if you unlock it again).`}
        confirmLabel="Revoke"
        danger
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await act('revoke_access', { user_id: p.id, course_id: confirm.grant.course_id, remove_enrolment: true }, 'Access revoked');
          setConfirm(null);
        }}
      />
      <Confirm
        open={confirm?.kind === 'reset'}
        title="Reset assessment attempts"
        message={`Give ${p.full_name} a fresh set of 3 attempts for ${confirm?.lock?.quiz_id} and lift any 24-hour lock?`}
        confirmLabel="Reset"
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await act('reset_lock', { user_id: p.id, course_id: confirm.lock.course_id, quiz_id: confirm.lock.quiz_id }, 'Attempts reset');
          setConfirm(null);
        }}
      />
      <Confirm
        open={confirm?.kind === 'removeBatch'}
        title="Remove from batch"
        message={`Remove ${p.full_name} from ${confirm?.cohort?.name}? They cannot re-join through the batch link.`}
        confirmLabel="Remove"
        danger
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          await act('cohort_remove_member', { cohort_id: confirm.cohort.id, user_id: p.id, remove_from_allow_list: true }, 'Removed from batch');
          setConfirm(null);
        }}
      />
    </div>
  );
}
