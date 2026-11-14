import React, { useEffect, useState } from 'react';
import { Modal, Button, Field, Input, Select, CoursePicker, CopyButton, Badge, useConsole, useAction, downloadCsv, toInputDate, useResource } from './ui';

const EMPTY = {
  kind: 'CODE',
  mode: 'single', // single | bulk
  code: '',
  prefix: '',
  quantity: 20,
  label: '',
  benefit: 'FREE', // FREE | PERCENT
  discount_percent: 20,
  course_scope: 'SELECTED',
  course_ids: [],
  cohort_id: '',
  max_redemptions: '',
  starts_at: '',
  expires_at: '',
};

/**
 * Create or edit a code / registration link.
 *  - `cohort` presets and locks the batch (used from the batch page)
 *  - `existing` switches to edit mode (what a used code grants is read-only)
 */
export default function CodeForm({ open, onClose, onSaved, cohort = null, existing = null, defaultKind = 'CODE' }) {
  const { courses } = useConsole();
  const run = useAction();
  const cohorts = useResource('cohorts', { status: 'ACTIVE' }, { skip: !open || Boolean(cohort) });
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setCreated(null);
    if (existing) {
      setF({
        ...EMPTY,
        kind: existing.kind,
        label: existing.label || '',
        benefit: existing.discount_percent === 100 ? 'FREE' : 'PERCENT',
        discount_percent: existing.discount_percent,
        course_scope: existing.course_scope,
        course_ids: (existing.courses || []).map((c) => c.id),
        cohort_id: existing.cohort_id || '',
        max_redemptions: existing.max_redemptions ?? '',
        starts_at: toInputDate(existing.starts_at),
        expires_at: toInputDate(existing.expires_at),
      });
    } else {
      setF({
        ...EMPTY,
        kind: defaultKind,
        cohort_id: cohort?.id || '',
        course_scope: cohort ? 'COHORT' : 'SELECTED',
      });
    }
  }, [open, existing, cohort, defaultKind]);

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e?.target ? e.target.value : e }));
  const used = existing?.redemption_count > 0;
  const isLink = f.kind === 'LINK';

  const submit = async () => {
    setBusy(true);
    const payload = {
      label: f.label,
      discount_percent: f.benefit === 'FREE' ? 100 : Number(f.discount_percent),
      course_scope: f.course_scope,
      course_ids: f.course_scope === 'SELECTED' ? f.course_ids : undefined,
      cohort_id: f.cohort_id || null,
      max_redemptions: f.max_redemptions === '' ? null : Number(f.max_redemptions),
      starts_at: f.starts_at ? new Date(f.starts_at).toISOString() : null,
      expires_at: f.expires_at ? new Date(f.expires_at).toISOString() : null,
    };
    let res;
    if (existing) {
      res = await run('code_update', { id: existing.id, ...payload }, { success: 'Code updated' });
    } else {
      res = await run('code_create', {
        ...payload,
        kind: f.kind,
        code: !isLink && f.mode === 'single' ? f.code : '',
        prefix: !isLink && f.mode === 'bulk' ? f.prefix : '',
        quantity: !isLink && f.mode === 'bulk' ? Number(f.quantity) : 1,
      });
    }
    setBusy(false);
    if (!res.ok) {
      setErrors(res.data?.fields || {});
      return;
    }
    onSaved?.();
    if (existing) onClose();
    else setCreated(res.data.codes);
  };

  const title = existing ? `Edit ${existing.kind === 'LINK' ? 'registration link' : `code ${existing.code}`}` : 'New code or registration link';

  if (created) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title={created.length > 1 ? `${created.length} codes created` : isLink ? 'Registration link created' : 'Code created'}
        footer={
          <>
            {created.length > 1 && (
              <Button onClick={() => downloadCsv('new-codes.csv', created, [['Code', 'code'], ['Label', 'label'], ['Expires', 'expires_at']])}>
                Download CSV
              </Button>
            )}
            <Button variant="primary" onClick={onClose}>
              Done
            </Button>
          </>
        }
      >
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {created.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="font-mono text-sm text-white break-all">{c.link || c.code}</span>
              <CopyButton text={c.link || c.code} />
            </div>
          ))}
        </div>
        {isLink && (
          <p className="text-xs text-slate-400 mt-3">
            Share this link with the batch. Students sign in, the academy checks they are eligible, adds them to the batch and enrols
            them in every bundle course.
          </p>
        )}
      </Modal>
    );
  }

  const batchList = cohort ? [cohort] : cohorts.data?.cohorts || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      wide
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" busy={busy} onClick={submit}>
            {existing ? 'Save changes' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {used && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            Used {existing.redemption_count} times. Its benefit and batch are fixed; you can change the label, limits, dates and
            add courses. Create a new code to grant something different.
          </div>
        )}

        {!existing && (
          <Field label="Type">
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                ['CODE', 'Typed code', 'Students enter it on a course page or at /join.'],
                ['LINK', 'Registration link', 'One link for a whole batch; opening it enrols them.'],
              ].map(([k, t, d]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setF((x) => ({ ...x, kind: k, ...(k === 'LINK' && !x.cohort_id ? {} : {}) }))}
                  className={`text-left rounded-lg border px-3 py-2.5 cursor-pointer ${f.kind === k ? 'border-[#FF7A00] bg-[#FF7A00]/10' : 'border-white/15 hover:bg-white/5'}`}
                >
                  <div className="text-sm text-white">{t}</div>
                  <div className="text-xs text-slate-400">{d}</div>
                </button>
              ))}
            </div>
          </Field>
        )}

        {!existing && !isLink && (
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="How many">
              <Select value={f.mode} onChange={set('mode')}>
                <option value="single">One shared code</option>
                <option value="bulk">Many single-use codes</option>
              </Select>
            </Field>
            {f.mode === 'single' ? (
              <Field label="Code (optional)" hint="Leave blank to generate one" error={errors.code} className="sm:col-span-2">
                <Input value={f.code} onChange={set('code')} placeholder="e.g. SRM-DEC26" className="font-mono uppercase" maxLength={40} />
              </Field>
            ) : (
              <>
                <Field label="Number of codes" error={errors.quantity}>
                  <Input type="number" min={2} max={500} value={f.quantity} onChange={set('quantity')} />
                </Field>
                <Field label="Prefix (optional)" hint="e.g. SRM → SRM-7KQ2M9XA">
                  <Input value={f.prefix} onChange={set('prefix')} className="font-mono uppercase" maxLength={12} />
                </Field>
              </>
            )}
          </div>
        )}

        <Field label="Offer name (optional)" hint="Students see this when they open the code or link">
          <Input value={f.label} onChange={set('label')} placeholder="e.g. SRM College – December intake" maxLength={160} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Benefit" error={errors.discount_percent}>
            <div className="flex gap-2">
              <Select value={f.benefit} onChange={set('benefit')} disabled={used}>
                <option value="FREE">Free (100% off)</option>
                <option value="PERCENT">Percentage discount</option>
              </Select>
              {f.benefit === 'PERCENT' && (
                <div className="relative w-28 shrink-0">
                  <Input type="number" min={1} max={99} value={f.discount_percent} onChange={set('discount_percent')} disabled={used} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                </div>
              )}
            </div>
          </Field>
          <Field
            label="Batch"
            hint={f.cohort_id ? 'Only people eligible for this batch can use it, and using it adds them to the batch.' : 'Optional: restrict to a batch'}
            error={errors.cohort_id}
          >
            <Select value={f.cohort_id} onChange={set('cohort_id')} disabled={Boolean(cohort) || used}>
              {!cohort && <option value="">Anyone (no batch)</option>}
              {batchList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {f.benefit === 'PERCENT' && (
          <p className="text-xs text-amber-300/90 -mt-2">
            Online payment is not live yet: students see the discounted price, but only free (100%) codes unlock courses today.
          </p>
        )}

        <Field label="Applies to" error={errors.course_scope}>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              ['SELECTED', 'Selected courses'],
              ['ALL', 'All courses'],
              ['COHORT', 'Batch bundle'],
            ].map(([k, t]) => (
              <button
                key={k}
                type="button"
                disabled={used || (k === 'COHORT' && !f.cohort_id)}
                onClick={() => setF((x) => ({ ...x, course_scope: k }))}
                className={`rounded-lg border px-3 py-2 text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  f.course_scope === k ? 'border-[#FF7A00] bg-[#FF7A00]/10 text-white' : 'border-white/15 text-slate-300 hover:bg-white/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {f.course_scope === 'COHORT' && (
            <span className="block text-xs text-slate-500 mt-1">Unlocks every course in the batch bundle, including courses you add to it later.</span>
          )}
        </Field>

        {f.course_scope === 'SELECTED' && (
          <Field label="Courses" error={errors.course_ids}>
            <CoursePicker value={f.course_ids} onChange={set('course_ids')} courses={courses} />
          </Field>
        )}

        <div className="grid sm:grid-cols-3 gap-3">
          <Field
            label="Usage limit"
            hint={!existing && f.mode === 'bulk' && !isLink ? 'Each generated code is single-use' : 'Total uses; blank = unlimited'}
            error={errors.max_redemptions}
          >
            <Input
              type="number"
              min={1}
              value={!existing && f.mode === 'bulk' && !isLink ? 1 : f.max_redemptions}
              disabled={!existing && f.mode === 'bulk' && !isLink}
              onChange={set('max_redemptions')}
              placeholder="Unlimited"
            />
          </Field>
          <Field label="Starts" hint="Blank = immediately" error={errors.starts_at}>
            <Input type="datetime-local" value={f.starts_at} onChange={set('starts_at')} />
          </Field>
          <Field label="Expires" hint="Blank = never" error={errors.expires_at}>
            <Input type="datetime-local" value={f.expires_at} onChange={set('expires_at')} />
          </Field>
        </div>

        {existing && (
          <div className="text-xs text-slate-500">
            Status: <Badge color={existing.is_active ? 'green' : 'gray'}>{existing.is_active ? 'On' : 'Off'}</Badge> — use the switch in the
            list to turn it on or off.
          </div>
        )}
      </div>
    </Modal>
  );
}
