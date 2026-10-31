import React, { useState, useRef } from 'react';
import {
  UploadCloud, FileText, CheckCircle2, AlertTriangle,
  RotateCcw, Trash2, X, Check, FileCheck, Loader2
} from 'lucide-react';

/**
 * Format bytes to human readable format (B, KB, MB, GB)
 */
export function getReadableFileSize(bytes) {
  if (typeof bytes !== 'number' || isNaN(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const unitIndex = Math.min(i, units.length - 1);
  const size = (bytes / Math.pow(1024, unitIndex)).toFixed(unitIndex === 0 ? 0 : 1);
  return `${size} ${units[unitIndex]}`;
}

/**
 * FileUpload.Root
 */
const Root = ({ children, className = '' }) => {
  return (
    <div className={`w-full space-y-4 select-none ${className}`}>
      {children}
    </div>
  );
};

/**
 * FileUpload.DropZone
 */
const DropZone = ({
  isDisabled = false,
  onDropFiles,
  accept = '.pdf,application/pdf',
  maxSizeBytes = 25 * 1024 * 1024,
  title = 'Drag & drop your lab report here',
  subtitle = 'Verified .PDF documents only (Maximum 25 MB)',
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (isDisabled) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0 && typeof onDropFiles === 'function') {
      onDropFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target?.files;
    if (files && files.length > 0 && typeof onDropFiles === 'function') {
      onDropFiles(files);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        if (!isDisabled && inputRef.current) {
          inputRef.current.click();
        }
      }}
      className={`relative group rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer border-2 border-dashed ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed border-white/10 bg-[#05140e]/40'
          : isDragOver
            ? 'border-[#65F58A] bg-[#092218]/90 shadow-[0_0_25px_rgba(101,245,138,0.25)] scale-[1.01]'
            : 'border-[#65F58A]/30 bg-[#040e0a]/80 hover:border-[#65F58A]/70 hover:bg-[#071811] shadow-lg'
      } ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={isDisabled}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Upload Icon with Glowing Aura */}
        <div className={`p-3.5 rounded-2xl transition-transform duration-300 ${
          isDragOver
            ? 'bg-[#65F58A] text-[#071018] scale-110 shadow-[0_0_20px_rgba(101,245,138,0.6)]'
            : 'bg-[#092218] text-[#65F58A] border border-[#65F58A]/30 group-hover:scale-105 group-hover:border-[#65F58A]/60'
        }`}>
          <UploadCloud className="w-7 h-7 stroke-[2]" />
        </div>

        {/* Main Directive */}
        <div className="space-y-1">
          <p className="text-sm font-lora font-bold text-white group-hover:text-[#C9EFE0] transition-colors">
            {title}
          </p>
          <p className="text-xs font-mono text-[#8BA2B5]">
            or <span className="text-[#65F58A] underline decoration-[#65F58A]/50 font-semibold group-hover:text-[#35E6B5]">browse files</span> from your local system
          </p>
        </div>

        {/* Requirements Tag */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#061510] border border-white/10 text-[11px] font-mono text-[#72A88E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65F58A]" />
          <span>{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * FileUpload.List
 */
const List = ({ children, className = '' }) => {
  if (!children || React.Children.count(children) === 0) return null;
  return (
    <div className={`space-y-2.5 pt-1 ${className}`}>
      {children}
    </div>
  );
};

/**
 * FileUpload.ListItemProgressBar
 */
const ListItemProgressBar = ({
  id,
  name,
  size,
  type = 'pdf',
  progress = 0,
  failed = false,
  error = null,
  onDelete,
  onRetry,
  className = ''
}) => {
  const isDone = progress >= 100 && !failed;
  const isUploading = progress > 0 && progress < 100 && !failed;
  const displaySize = typeof size === 'number' ? getReadableFileSize(size) : size;

  return (
    <div
      className={`group relative rounded-xl p-3.5 transition-all duration-300 border ${
        failed
          ? 'bg-[#1a0808]/80 border-[#EF4444]/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
          : isDone
            ? 'bg-[#061510] border-[#65F58A]/35 shadow-[0_0_15px_rgba(101,245,138,0.15)]'
            : 'bg-[#061510]/90 border-[#35E6B5]/30'
      } ${className}`}
    >
      {/* Top Row: File Details & Actions */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Icon & Name */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className={`p-2 rounded-lg flex-shrink-0 flex items-center justify-center ${
            failed
              ? 'bg-[#EF4444]/20 text-[#EF4444]'
              : isDone
                ? 'bg-[#65F58A]/20 text-[#65F58A]'
                : 'bg-[#35E6B5]/20 text-[#35E6B5]'
          }`}>
            <FileText className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="min-w-0 truncate">
            <h5 className="text-xs font-mono font-bold text-white truncate group-hover:text-[#C9EFE0] transition-colors">
              {name}
            </h5>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#8BA2B5] mt-0.5">
              <span>{displaySize}</span>
              <span>&bull;</span>
              <span className="uppercase text-[#72A88E]">{type || 'PDF'}</span>
              {failed && (
                <>
                  <span>&bull;</span>
                  <span className="text-[#EF4444] font-semibold">{error || 'Upload failed'}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Status Indicator & Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Progress % or Status Badge */}
          {failed ? (
            <span className="px-2 py-0.5 rounded-md bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-mono font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Failed</span>
            </span>
          ) : isDone ? (
            <span className="px-2 py-0.5 rounded-md bg-[#65F58A]/20 border border-[#65F58A]/30 text-[#65F58A] text-[10px] font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% Uploaded</span>
            </span>
          ) : (
            <span className="text-xs font-mono font-bold text-[#35E6B5] tabular-nums">
              {Math.round(progress)}%
            </span>
          )}

          {/* Retry Button (if failed) */}
          {failed && typeof onRetry === 'function' && (
            <button
              type="button"
              onClick={onRetry}
              className="p-1.5 rounded-lg text-[#8BA2B5] hover:text-white hover:bg-white/10 transition-colors"
              title="Retry Upload"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Delete Button */}
          {typeof onDelete === 'function' && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 rounded-lg text-[#8BA2B5] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
              title="Remove File"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Animated Progress Bar */}
      <div className="pt-2">
        <div className="w-full bg-[#040e0a] h-1.5 rounded-full overflow-hidden border border-white/5 relative">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              failed
                ? 'bg-[#EF4444]'
                : isDone
                  ? 'bg-[#65F58A] shadow-[0_0_8px_rgba(101,245,138,0.7)]'
                  : 'bg-gradient-to-r from-[#65F58A] to-[#35E6B5] shadow-[0_0_10px_rgba(53,230,181,0.5)]'
            }`}
            style={{ width: `${failed ? 100 : Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const FileUpload = {
  Root,
  DropZone,
  List,
  ListItemProgressBar
};

export default FileUpload;
