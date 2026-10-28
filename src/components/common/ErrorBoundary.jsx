import React from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#071018] px-4 py-16 text-center text-[#F1F5F9]">
          <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-red-500/30 space-y-6">
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 rounded-xl glass-button-primary font-royal font-bold text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Terminal</span>
              </button>
              <a
                href="/"
                className="flex-1 py-2.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] text-xs font-mono text-white transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Academy Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
