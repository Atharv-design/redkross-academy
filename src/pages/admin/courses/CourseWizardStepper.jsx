import React from 'react';
import { Check } from 'lucide-react';

export default function CourseWizardStepper({ currentStep, onSelectStep }) {
  const steps = [
    { step: 1, title: '1. Course Info & About' },
    { step: 2, title: '2. Course Cover Art' },
    { step: 3, title: '3. Modules & Units' },
    { step: 4, title: '4. Questions & Assessments' }
  ];

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 border-b border-[#FF7A00]/20 pb-3 overflow-x-auto">
      {steps.map(({ step, title }) => {
        const isActive = currentStep === step;
        const isDone = currentStep > step;

        return (
          <button
            key={step}
            type="button"
            onClick={() => onSelectStep(step)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-[#FF7A00] text-[#071018] font-bold shadow-[0_0_15px_rgba(255,122,0,0.3)]'
                : isDone
                  ? 'bg-[#1A1208] text-[#65F58A] border border-[#65F58A]/30'
                  : 'text-[#A3907C] hover:text-white bg-[#0E0C09] border border-white/5'
            }`}
          >
            {isDone && <Check className="w-3 h-3 text-[#65F58A]" />}
            <span>{title}</span>
          </button>
        );
      })}
    </div>
  );
}
