import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, AlertTriangle, LifeBuoy, Mail, User } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';

export default function SupportTicketModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('Exam Reset Appeal');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  if (!isOpen) return null;

  const emailToUse = currentUser?.email || guestEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim() || !emailToUse.trim()) return;

    setSubmitting(true);
    try {
      const res = await apiClient.createSupportTicket({
        user_id: currentUser?.id,
        user_email: emailToUse.trim(),
        sender_name: currentUser?.full_name || guestName || 'Cadet Operator',
        category,
        subject,
        description,
        priority
      });
      setSubmittedTicket(res.ticket || { id: `tkt_${Date.now()}` });
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
    setGuestEmail('');
    setGuestName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl glass-modal p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1B2530] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedTicket ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(101,245,138,0.25)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-royal text-xl font-bold text-white">Ticket Dispatched Successfully</h3>
            <div className="p-3 bg-[#101923]/70 backdrop-blur-md border border-[#263440] rounded-xl text-xs font-mono text-[#94A3B8]">
              Ticket Reference: <span className="text-[#65F58A] font-bold">{submittedTicket.id}</span>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
              Your inquiry has been escalated directly via Resend to the Academy Operations Desk. An operational officer will respond to <span className="text-white font-mono">{emailToUse}</span> within 4 business hours.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full glass-button-primary font-royal font-bold text-xs"
            >
              Acknowledge & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center text-[#65F58A] shadow-[0_0_12px_rgba(101,245,138,0.25)]">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-royal text-base sm:text-lg font-bold text-white">Academy Operations Support</h2>
                <p className="text-xs text-[#94A3B8] font-mono">Direct Resend Dispatch to Operations Desk</p>
              </div>
            </div>

            {!currentUser && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Operator Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="operator@domain.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white font-mono focus:outline-none"
                >
                  <option value="Exam Reset Appeal" className="bg-[#101923] text-white">Exam Reset Appeal</option>
                  <option value="Certificate Verification" className="bg-[#101923] text-white">Credential Verification</option>
                  <option value="Course Inquiry" className="bg-[#101923] text-white">Course & Curriculum Query</option>
                  <option value="Payment & Tokens" className="bg-[#101923] text-white">Token Rewards & Payment</option>
                  <option value="General Inquiry" className="bg-[#101923] text-white">General Operational Support</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white font-mono focus:outline-none"
                >
                  <option value="Low" className="bg-[#101923] text-white">Low</option>
                  <option value="Medium" className="bg-[#101923] text-white">Medium</option>
                  <option value="High" className="bg-[#101923] text-white">High</option>
                  <option value="Urgent" className="bg-[#101923] text-white">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Inadvertent blur strike during SOC Module 2 assessment"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Details & Message</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your inquiry with relevant context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white placeholder-[#64748B] font-mono focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#1B2530] text-xs font-mono text-[#94A3B8] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl glass-button-primary font-royal font-bold text-xs flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Dispatching via Resend...' : 'Submit Support Ticket'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
