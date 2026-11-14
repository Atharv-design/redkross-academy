import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../services/auth/authContext';
import { apiClient } from '../../services/apiClient';

/**
 * Admin console guard. The server is the authority: every /api/manage call checks
 * the verified token and the admin role. This guard only asks the server who the
 * caller is, so students never see the console shell.
 */
export default function AdminRoute({ children }) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const [state, setState] = useState({ status: 'checking', me: null });

  useEffect(() => {
    if (isLoading || !currentUser) return undefined;
    let alive = true;
    apiClient.adminRead('me').then((res) => {
      if (!alive) return;
      if (res.ok) setState({ status: 'ok', me: res.data });
      else setState({ status: res.status === 401 ? 'signin' : 'denied', me: null });
    });
    return () => {
      alive = false;
    };
  }, [isLoading, currentUser?.id]);

  if (!isLoading && !currentUser) return <Navigate to="/login" state={{ from: location }} replace />;

  if (isLoading || state.status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080c] text-slate-400 text-sm">
        Checking admin access…
      </div>
    );
  }

  if (state.status !== 'ok') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05080c] px-4">
        <div className="max-w-sm w-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-[#FF7A00] mx-auto" />
          <h1 className="text-lg font-semibold text-white">Admins only</h1>
          <p className="text-sm text-slate-400">
            {state.status === 'signin'
              ? 'Your session has expired. Sign in again.'
              : 'This account does not have access to the admin console.'}
          </p>
          <a href="/" className="inline-block text-sm text-[#FFA439] hover:underline">
            Back to the academy
          </a>
        </div>
      </div>
    );
  }

  return typeof children === 'function' ? children(state.me) : React.cloneElement(children, { me: state.me });
}
