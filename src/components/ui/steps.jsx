import React from 'react';
import { Steps } from '@ark-ui/react/steps';
import { Check } from 'lucide-react';

/**
 * Ark UI Steps Component tailored for RedKross Curriculum Studio Stepped Wizard.
 * Strictly adheres to Zero-Blue Obsidian & Lora typography standard.
 */
export default function BasicSteps({
  steps = [
    { id: 1, title: 'Modules & Hierarchy', description: 'Structure curriculum' },
    { id: 2, title: 'Content Editor', description: 'Notes & terminal labs' },
    { id: 3, title: 'Video Studio', description: 'Stream & lesson binding' },
    { id: 4, title: 'Quiz Constructor', description: 'Knowledge checks' },
    { id: 5, title: 'Full Live Preview', description: 'Interactive course preview' },
  ],
  currentStep = 1,
  onStepChange,
}) {
  return (
    <div className="w-full bg-[#101923] border border-[#263440] px-4 py-4 sm:py-5 rounded-2xl shadow-xl font-lora">
      <Steps.Root
        count={steps.length}
        step={currentStep}
        onStepChange={(details) => onStepChange && onStepChange(details.step)}
        className="w-full max-w-5xl mx-auto"
      >
        <Steps.List className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 md:gap-0">
          {steps.map((item, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <Steps.Item
                key={item.id}
                index={index}
                className="relative flex not-last:flex-1 items-center flex-shrink-0 md:flex-shrink"
              >
                <Steps.Trigger
                  onClick={() => onStepChange && onStepChange(stepNum)}
                  className="flex items-center gap-3 text-left rounded-xl p-1.5 hover:bg-[#1B2530] transition-all cursor-pointer group"
                >
                  <Steps.Indicator
                    className={`flex justify-center items-center shrink-0 rounded-full font-lora font-bold w-9 h-9 text-xs border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                        : isCurrent
                        ? 'bg-[#1B2530] text-[#65F58A] border-[#65F58A] shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                        : 'bg-[#071018] text-[#94A3B8] border-[#263440] group-hover:border-[#94A3B8]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                  </Steps.Indicator>

                  <div className="hidden lg:block space-y-0.5">
                    <div
                      className={`text-xs font-lora font-bold transition-colors ${
                        isCurrent
                          ? 'text-[#65F58A]'
                          : isCompleted
                          ? 'text-white'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[10px] font-lora text-[#64748B] truncate max-w-[130px]">
                      {item.description}
                    </div>
                  </div>
                </Steps.Trigger>

                <Steps.Separator
                  hidden={index === steps.length - 1}
                  className={`hidden md:block flex-1 h-0.5 mx-3 rounded-full transition-all duration-300 ${
                    stepNum < currentStep ? 'bg-[#65F58A]' : 'bg-[#263440]'
                  }`}
                />
              </Steps.Item>
            );
          })}
        </Steps.List>
      </Steps.Root>
    </div>
  );
}
