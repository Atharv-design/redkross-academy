import React from 'react';

const ModuleModal = ({
  isOpen,
  onClose,
  moduleTitleInput,
  setModuleTitleInput,
  onAddModule,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-4">
        <h3 className="font-bold text-base text-white">Create New Curriculum Module</h3>
        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C]">Module Title *</label>
          <input
            type="text"
            value={moduleTitleInput}
            onChange={(e) => setModuleTitleInput(e.target.value)}
            placeholder="e.g. Module 2: Threat Detection & MITRE ATT&CK"
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAddModule}
            className="px-4 py-2 rounded-xl bg-[#FF7A00] text-[#071018] font-bold text-xs font-mono cursor-pointer"
          >
            Add Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
