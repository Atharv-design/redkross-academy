import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { apiClient } from '../../../services/apiClient';
import { PageHeader, Card, Table, Button, Badge, SearchBox, Select, Pager, Loading, ErrorBox, Avatar, useResource, useToast, fmtDate } from './ui';

export default function StudentsPage() {
  const [q, setQ] = useState('');
  const [cohort, setCohort] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const cohorts = useResource('cohorts', { status: '' });
  const { data, loading, error, reload } = useResource('students', { q, cohort_id: cohort, status, page, role: 'student' });

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Search, open a student to see their progress, unlock courses, reset assessment locks or suspend an account."
        actions={
          <Button onClick={() => apiClient.adminDownload('students').catch(() => toast('Export failed', 'error'))}>
            <Download className="w-4 h-4" /> Export all
          </Button>
        }
      />
      <Card>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <SearchBox value={q} onChange={(v) => { setQ(v); setPage(0); }} placeholder="Name, email, college or cadet ID" />
          <Select value={cohort} onChange={(e) => { setCohort(e.target.value); setPage(0); }} className="sm:w-56">
            <option value="">All batches</option>
            {(cohorts.data?.cohorts || []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }} className="sm:w-40">
            <option value="">Any status</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </Select>
        </div>
        {error ? (
          <ErrorBox error={error} onRetry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : (
          <>
            <Table
              onRowClick={(s) => navigate(`/admin/students/${s.id}`)}
              empty="No students match."
              columns={[
                {
                  key: 'name',
                  label: 'Student',
                  render: (s) => (
                    <div className="flex items-center gap-2.5">
                      <Avatar src={s.avatar} name={s.full_name} />
                      <div className="min-w-0">
                        <div className="text-white truncate">{s.full_name}</div>
                        <div className="text-xs text-slate-500 truncate">{s.email}</div>
                      </div>
                    </div>
                  ),
                },
                { key: 'college', label: 'College', render: (s) => <span className="text-xs">{s.college || '—'}</span> },
                { key: 'cohorts', label: 'Batches', render: (s) => <span className="text-xs">{s.cohorts || '—'}</span> },
                { key: 'enrolments', label: 'Courses', className: 'tabular-nums' },
                { key: 'certificates', label: 'Certs', className: 'tabular-nums' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (s) =>
                    String(s.status || 'ACTIVE').toUpperCase() === 'SUSPENDED' ? <Badge color="red">Suspended</Badge> : <Badge color="green">Active</Badge>,
                },
                { key: 'created_at', label: 'Joined', render: (s) => fmtDate(s.created_at) },
              ]}
              rows={data.students}
            />
            <Pager page={data.page} total={data.total} pageSize={data.page_size} onPage={setPage} />
          </>
        )}
      </Card>
    </div>
  );
}
