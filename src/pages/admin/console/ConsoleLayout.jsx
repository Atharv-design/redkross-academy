import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UsersRound,
  Ticket,
  BookOpen,
  UserPen,
  Award,
  LifeBuoy,
  ScrollText,
  ShieldCheck,
  Menu,
  ScanEye,
  X,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../../services/auth/authContext';
import { ConsoleProvider, ToastProvider, Avatar } from './ui';

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/batches', label: 'Batches', icon: UsersRound },
  { to: '/admin/codes', label: 'Codes & links', icon: Ticket },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/proctoring', label: 'Exam proctoring', icon: ScanEye },
  { to: '/admin/name-requests', label: 'Name requests', icon: UserPen },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/tickets', label: 'Support tickets', icon: LifeBuoy },
  { to: '/admin/audit', label: 'Audit log', icon: ScrollText },
  { to: '/admin/admins', label: 'Admins', icon: ShieldCheck },
];

function SideNav({ onNavigate }) {
  return (
    <nav className="space-y-0.5" aria-label="Admin sections">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive ? 'bg-[#FF7A00]/15 text-[#FFA439]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon className="w-4 h-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function ConsoleLayout({ me }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  const user = me?.user || {};
  const footer = (
    <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
      <div className="flex items-center gap-2 px-2">
        <Avatar src={user.avatar} name={user.full_name} size={28} />
        <div className="min-w-0">
          <div className="text-sm text-white truncate">{user.full_name}</div>
          <div className="text-[11px] text-slate-500">{me?.is_super_admin ? 'Super admin' : 'Admin'}</div>
        </div>
      </div>
      <Link to="/" className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-white">
        <ExternalLink className="w-3.5 h-3.5" /> Open academy
      </Link>
      <button type="button" onClick={logout} className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-300 cursor-pointer">
        <LogOut className="w-3.5 h-3.5" /> Sign out
      </button>
    </div>
  );

  return (
    <ToastProvider>
      <ConsoleProvider me={me}>
        <div className="min-h-screen bg-[#05080c] text-slate-100">
          {/* desktop sidebar */}
          <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-white/10 bg-[#070b10] p-4">
            <Link to="/admin" className="flex items-center gap-2 px-2 mb-6">
              <span className="w-8 h-8 rounded-lg bg-[#FF7A00] text-black font-bold flex items-center justify-center text-sm">RK</span>
              <span>
                <span className="block text-sm font-semibold text-white leading-tight">RedKross Academy</span>
                <span className="block text-[11px] text-slate-500">Admin console</span>
              </span>
            </Link>
            <div className="flex-1 overflow-y-auto">
              <SideNav />
            </div>
            {footer}
          </aside>

          {/* mobile top bar + drawer */}
          <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/10 bg-[#070b10]/95 backdrop-blur">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-[#FF7A00] text-black font-bold flex items-center justify-center text-xs">RK</span>
              <span className="text-sm font-semibold">Admin console</span>
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="p-2 rounded hover:bg-white/10 cursor-pointer" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
          </header>
          {open && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setOpen(false)}>
              <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[#070b10] border-r border-white/10 p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end mb-2">
                  <button type="button" onClick={() => setOpen(false)} className="p-2 rounded hover:bg-white/10 cursor-pointer" aria-label="Close menu">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <SideNav onNavigate={() => setOpen(false)} />
                </div>
                {footer}
              </div>
            </div>
          )}

          <main className="lg:pl-60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </ConsoleProvider>
    </ToastProvider>
  );
}
