import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, AlertTriangle, LifeBuoy } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function SupportTicketModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('Exam Reset Appeal');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await apiClient.createSupportTicket({
        user_id: currentUser?.id,
        user_email: currentUser?.email || 'student@redkross.org.in',
        category,
        subject,
        description,
        priority
      });
      setSubmittedTicket(res.ticket);
    } catch (err) {
      console.error('Failed to submit ticket:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setSubject('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-card border border-surface-border shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-surface-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedTicket ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Ticket Submitted Successfully</h3>
            <div className="p-3 bg-surface-100 rounded-lg text-xs font-mono text-slate-300">
              Ticket ID: <span className="text-redkross-400 font-bold">{submittedTicket.id}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your inquiry has been escalated to our Academy Operations Desk. You will receive an email update within 4 business hours.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-redkross-600 hover:bg-redkross-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-redkross-600/10 border border-redkross-600/30 flex items-center justify-center text-redkross-500">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white font-mono">Academy Support Desk</h2>
                <p className="text-xs text-slate-400">PRD §15.2 Inquiries & Exam Appeals</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-100 border border-surface-border rounded-lg text-xs text-white focus:outline-none focus:border-redkross-500"
              >
                <option value="Exam Reset Appeal">Exam Reset Appeal (Strike 3 / 24h Lockout)</option>
                <option value="Certificate Verification">Certificate Verification Inquiry</option>
                <option value="Content Typo / Bug">Course Content / Lab Bug Report</option>
                <option value="Payment & Token Query">Token Rewards & Payment Assistance</option>
                <option value="Other">Other Operational Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Subject / Summary</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Browser crash during SOC 1.2 Final Exam"
                className="w-full px-3 py-2 bg-surface-100 border border-surface-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-redkross-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Detailed Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what happened, including any error messages or context..."
                className="w-full px-3 py-2 bg-surface-100 border border-surface-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-redkross-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">Email: {currentUser?.email || 'Logged-in Account'}</span>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg bg-redkross-600 hover:bg-redkross-700 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-md hover:cyber-glow-red"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
