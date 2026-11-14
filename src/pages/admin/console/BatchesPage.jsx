import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageHeader, Card, Table, Button, Badge, Select, Loading, ErrorBox, Modal, Field, Input, Textarea, CoursePicker, useResource, useAction, useConsole, fmtDate } from './ui';

/** Create / edit a batch. Used by the list (create) and the detail page (edit). */
export function BatchForm({ open, onClose, onSaved, existing = null }) {
  const { courses } = useConsole();
  const run = useAction();
  const [f, setF] = useState({});
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setF(
      existing
        ? {
            name: existing.cohort.name,
            organisation: existing.cohort.organisation || '',
            description: existing.cohort.description || '',
            allowed_domains: existing.cohort.allowed_domains.join(', '),
            course_ids: existing.courses.map((c) => c.id),
            allowed_emails: '',
          }
        : { name: '', organisation: '', description: '', allowed_domains: '', course_ids: [], allowed_emails: '' }
    );
  }, [open, existing]);

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? e.target.value : e }));

  const submit = async () => {
    setBusy(true);
    const res = await run(
      'cohort_save',
      {
        id: existing?.cohort.id,
        name: f.name,
        organisation: f.organisation,
        description: f.description,
        allowed_domains: f.allowed_domains,
        course_ids: f.course_ids,
        ...(f.allowed_emails.trim() ? { allowed_emails: f.allowed_emails } : {}),
      },
      { success: existing ? 'Batch saved' : 'Batch created' }
    );
    setBusy(false);
    if (!res.ok) return setErrors(res.data?.fields || {});
    onSaved?.(res.data.id);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      wide
      title={existing ? 'Edit batch' : 'New batch'}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" busy={busy} onClick={submit}>
            {existing ? 'Save' : 'Create batch'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Batch name" error={errors.name}>
            <Input value={f.name || ''} onChange={set('name')} placeholder="e.g. SRM College – Dec 2026" maxLength={160} />
          </Field>
          <Field label="College / organisation">
            <Input value={f.organisation || ''} onChange={set('organisation')} placeholder="e.g. SRM Institute of Science and Technology" maxLength={160} />
          </Field>
        </div>
        <Field label="Notes (admins only)">
          <Textarea value={f.description || ''} onChange={set('description')} maxLength={1000} className="min-h-[60px]" />
        </Field>
        <div className="rounded-xl border border-white/10 p-4 space-y-3">
          <div>
            <div className="text-sm font-semibold text-white">Who can join</div>
            <p className="text-xs text-slate-400">
              Anyone signed in with a <b>verified</b> email from these domains, or on the email list. Leave both empty to let anyone with the
              batch link or code join.
            </p>
          </div>
          <Field label="College email domains" hint="Comma separated, e.g. srmist.edu.in (sub-domains like cs.srmist.edu.in also match)">
            <Input value={f.allowed_domains || ''} onChange={set('allowed_domains')} placeholder="srmist.edu.in" />
          </Field>
          <Field
            label={existing ? 'Add emails to the list' : 'Email list'}
            hint="Paste emails separated by commas, spaces or new lines (e.g. from a spreadsheet). Use this for students with personal Gmail addresses."
          >
            <Textarea value={f.allowed_emails || ''} onChange={set('allowed_emails')} placeholder={'student1@gmail.com\nstudent2@gmail.com'} />
          </Field>
        </div>
        <Field label="Course bundle" hint="Batch members get these courses free. Courses added later unlock for existing members automatically. Hidden courses work as private courses for the batch.">
          <CoursePicker value={f.course_ids || []} onChange={set('course_ids')} courses={courses} />
        </Field>
      </div>
    </Modal>
  );
}

export default function BatchesPage() {
  const [status, setStatus] = useState('ACTIVE');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error, reload } = useResource('cohorts', { status });

  return (
    <div>
      <PageHeader
        title="Batches"
        subtitle="College or cohort groups. Each batch has a free course bundle, an eligibility rule and its own codes or registration link."
        actions={
          <Button variant="primary" onClick={() => setCreating(true)}>
            <Plus className="w-4 h-4" /> New batch
          </Button>
        }
      />
      <Card>
        <div className="mb-4 sm:w-48">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
            <option value="">All</option>
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <Table
            onRowClick={(c) => navigate(`/admin/batches/${c.id}`)}
            empty="No batches yet. Create one for a college intake."
            columns={[
              {
                key: 'name',
                label: 'Batch',
                render: (c) => (
                  <div>
                    <div className="text-white">{c.name}</div>
                    {c.organisation && <div className="text-xs text-slate-500">{c.organisation}</div>}
                  </div>
                ),
              },
              {
                key: 'rule',
                label: 'Who can join',
                render: (c) => {
                  const d = (c.allowed_domains || '').split(',').filter(Boolean);
                  if (!d.length && !c.allowed_emails) return <Badge color="amber">Anyone with the link</Badge>;
                  return (
                    <div className="text-xs text-slate-300">
                      {d.length > 0 && <div>@{d.join(', @')}</div>}
                      {c.allowed_emails > 0 && <div>{c.allowed_emails} listed emails</div>}
                    </div>
                  );
                },
              },
              { key: 'members', label: 'Members', className: 'tabular-nums' },
              { key: 'courses', label: 'Courses', className: 'tabular-nums' },
              { key: 'codes', label: 'Codes/links', className: 'tabular-nums' },
              { key: 'status', label: 'Status', render: (c) => <Badge color={c.status === 'ACTIVE' ? 'green' : 'gray'}>{c.status === 'ACTIVE' ? 'Active' : 'Archived'}</Badge> },
              { key: 'created_at', label: 'Created', render: (c) => fmtDate(c.created_at) },
            ]}
            rows={data.cohorts}
          />
        )}
      </Card>
      <BatchForm open={creating} onClose={() => setCreating(false)} onSaved={(id) => navigate(`/admin/batches/${id}`)} />
    </div>
  );
}
