import React from 'react';
import { ShieldAlert, RefreshCw, Home, Terminal, Zap } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  handleResetSession = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
      localStorage.removeItem('redkross_academy_dev_admin');
      localStorage.removeItem('redkross_academy_dev_cadet');
      localStorage.removeItem('redkross_academy_active_user');
      localStorage.removeItem('redkross_academy_auth_token');
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#071018] px-4 py-16 text-center text-[#F1F5F9]">
          <div className="max-w-lg w-full liquid-glass-panel rounded-2xl p-8 border border-red-500/30 space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>

            <div className="space-y-2">
              <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-mono uppercase tracking-wider inline-block">
                TERMINAL RECOVERY PROTOCOL
              </div>
              <h2 className="font-royal text-2xl font-bold text-white">Interface Encountered an Interruption</h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                The terminal session encountered an unexpected interface state. You can reload the terminal or return to Academy Home.
              </p>
            </div>

            {/* Diagnostic Information */}
            {this.state.error && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-left overflow-auto max-h-40 font-mono text-[11px] text-red-300">
                <div className="font-bold flex items-center gap-1.5 text-red-400 mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{this.state.error.name}: {this.state.error.message}</span>
                </div>
                {this.state.error.stack && (
                  <pre className="text-[10px] text-red-400/80 whitespace-pre-wrap leading-tight">
                    {this.state.error.stack.split('\n').slice(0, 4).join('\n')}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 rounded-xl liquid-glass-button bg-gradient-to-r from-[#65F58A]/20 to-[#35E6B5]/20 hover:from-[#65F58A]/30 hover:to-[#35E6B5]/30 border border-[#65F58A]/40 text-[#65F58A] font-royal font-bold text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Terminal</span>
              </button>
              <button
                onClick={this.handleResetSession}
                className="flex-1 py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-xs font-mono text-white transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reset & Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
