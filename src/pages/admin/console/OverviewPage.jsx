import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, Stat, Table, Loading, ErrorBox, Avatar, Badge, fmtDate, useResource, benefitText } from './ui';

export default function OverviewPage() {
  const { data, loading, error, reload } = useResource('overview');
  if (loading && !data) return <Loading />;
  if (error) return <ErrorBox error={error} onRetry={reload} />;
  const c = data.counts;

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" subtitle="Live numbers from the academy database." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Students" value={c.students} hint={`+${c.new_students_7d} this week`} to="/admin/students" />
        <Stat label="Active learners (7 days)" value={c.active_learners_7d} />
        <Stat label="Enrolments" value={c.enrolments} />
        <Stat label="Certificates issued" value={c.certificates} to="/admin/certificates" />
        <Stat label="Active batches" value={c.active_cohorts} to="/admin/batches" />
        <Stat label="Active codes & links" value={c.active_codes} hint={`${c.redemptions} uses · ${c.redemptions_7d} this week`} to="/admin/codes" />
        <Stat label="Exams flagged" value={c.proctor_flags} hint={`${c.pending_name_requests} name request${c.pending_name_requests === 1 ? '' : 's'} waiting`} to="/admin/proctoring" />
        <Stat label="Open tickets" value={c.open_tickets} hint={`${c.locked_assessments} assessment${c.locked_assessments === 1 ? "" : "s"} locked now`} to="/admin/tickets" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="New students" actions={<Link to="/admin/students" className="text-xs text-[#FFA439]">All students</Link>}>
          {data.recent_students.length ? (
            <ul className="space-y-3">
              {data.recent_students.map((s) => (
                <li key={s.id}>
                  <Link to={`/admin/students/${s.id}`} className="flex items-center gap-3 hover:bg-white/5 rounded-lg -mx-2 px-2 py-1">
                    <Avatar src={s.avatar} name={s.full_name} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white truncate">{s.full_name}</div>
                      <div className="text-xs text-slate-500 truncate">{s.college || s.email}</div>
                    </div>
                    <div className="text-xs text-slate-500">{fmtDate(s.created_at)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No students yet.</p>
          )}
        </Card>

        <Card title="Recent code & link use">
          <Table
            rowKey="redeemed_at"
            empty="No codes used yet."
            columns={[
              { key: 'who', label: 'Student', render: (r) => <span className="truncate">{r.full_name}</span> },
              { key: 'code', label: 'Code', render: (r) => <span className="font-mono text-xs">{r.kind === 'LINK' ? 'Registration link' : r.code}</span> },
              { key: 'b', label: 'Benefit', render: (r) => <Badge color={r.discount_percent === 100 ? 'green' : 'amber'}>{benefitText(r)}</Badge> },
              { key: 'cohort_name', label: 'Batch', render: (r) => r.cohort_name || '—' },
              { key: 'when', label: 'When', render: (r) => fmtDate(r.redeemed_at, true) },
            ]}
            rows={data.recent_redemptions}
          />
        </Card>

        <Card title="Enrolments by course">
          <Table
            rowKey="course_id"
            empty="No enrolments yet."
            columns={[
              { key: 'title', label: 'Course' },
              { key: 'enrolments', label: 'Enrolled', className: 'text-right tabular-nums' },
              { key: 'certificates', label: 'Certified', className: 'text-right tabular-nums' },
            ]}
            rows={data.top_courses}
          />
        </Card>

        <Card title="Latest certificates" actions={<Link to="/admin/certificates" className="text-xs text-[#FFA439]">All certificates</Link>}>
          <Table
            rowKey="verification_id"
            empty="No certificates yet."
            columns={[
              { key: 'student_name', label: 'Student' },
              { key: 'course_title', label: 'Course' },
              { key: 'issue_date', label: 'Issued', render: (r) => fmtDate(r.issue_date) },
            ]}
            rows={data.recent_certificates}
          />
        </Card>
      </div>
    </div>
  );
}
