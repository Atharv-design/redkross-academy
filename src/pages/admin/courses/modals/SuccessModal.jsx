import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Eye, BookOpen } from 'lucide-react';

const SuccessModal = ({ data, onClose }) => {
  if (!data?.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-lg w-full p-8 rounded-3xl bg-[#0E0C09] border-2 border-[#FF7A00]/50 shadow-[0_0_60px_rgba(255,122,0,0.25)] space-y-6 text-center relative overflow-hidden">
        {/* Ambient Corner Glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF7A00]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#FFA439]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Glowing Icon Badge */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1A1208] to-[#0d3324] border border-[#FF7A00]/50 flex items-center justify-center shadow-[0_0_25px_rgba(255,122,0,0.35)]">
          <CheckCircle2 className="w-9 h-9 text-[#FF7A00] animate-pulse" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-[11px] font-mono border border-[#FF7A00]/35 bg-[#1A1208]/90 text-[#FF7A00]">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
          <span>{data.isNew ? 'CURRICULUM CREATED & PUBLISHED' : 'CURRICULUM SYNCHRONIZED'}</span>
        </div>

        {/* Main Header & Proper English Message */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-lora">
            {data.isNew ? 'Your Course Has Been Created!' : 'Course Updated Successfully!'}
          </h3>
          <p className="text-xs sm:text-sm text-[#E2D9CE] leading-relaxed font-lora">
            {data.message}
          </p>
        </div>

        {/* Metadata Summary Card */}
        <div className="p-4 rounded-xl bg-[#080705] border border-[#FF7A00]/20 text-left space-y-2 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span>Course Title:</span>
            <span className="text-white font-bold truncate max-w-[240px] text-right">{data.title}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Catalog Status:</span>
            <span className="text-[#FF7A00] font-bold">PUBLISHED • ACTIVE</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Sync Network:</span>
            <span className="text-[#FFA439]">PostgreSQL & Socket.io Live</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to={data.slug ? `/courses/${data.slug}` : '/courses'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(255,122,0,0.3)] cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View in Catalog</span>
            </Link>
            <Link
              to="/student"
              className="px-4 py-3 rounded-xl bg-[#1A1208] hover:bg-[#0c2a1e] border border-[#FF7A00]/40 text-[#FF7A00] hover:text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Student Portal</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-mono text-[#A3907C] hover:text-white transition-colors cursor-pointer"
          >
            Continue Managing in Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
