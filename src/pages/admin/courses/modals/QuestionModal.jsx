import React from 'react';
import { X, Check } from 'lucide-react';

const QuestionModal = ({
  isOpen,
  onClose,
  editingQuestionIdx,
  questionForm,
  setQuestionForm,
  onSaveQuestion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-6 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#FF7A00]/20 pb-3">
          <div>
            <span className="text-[10px] font-mono text-[#FF7A00] font-bold uppercase tracking-wider block">
              MANUAL QUESTION AUTHORING
            </span>
            <h3 className="font-bold text-base text-white">
              {editingQuestionIdx !== null ? 'Edit Question' : 'Add Question to Assessment'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Statement */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C] flex items-center justify-between">
            <span>Question Statement / Problem Text *</span>
            <span className="text-[10px] text-slate-400">Clear & unambiguous</span>
          </label>
          <textarea
            rows={3}
            required
            value={questionForm.text}
            onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
            placeholder="e.g. Which Wireshark filter syntax isolates all TCP SYN packets with no ACK flag set?"
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>

        {/* Four Options with Radio Button */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[#A3907C]">
              Answer Choices (Select the Radio Button for the Verified Correct Option) *
            </label>
            <span className="text-[10px] font-mono text-[#FF7A00]">
              Option {String.fromCharCode(65 + questionForm.correctIndex)} is designated Correct
            </span>
          </div>

          {[
            { key: 'optionA', label: 'Option A', index: 0 },
            { key: 'optionB', label: 'Option B', index: 1 },
            { key: 'optionC', label: 'Option C', index: 2 },
            { key: 'optionD', label: 'Option D', index: 3 }
          ].map((opt) => {
            const isSelected = questionForm.correctIndex === opt.index;
            return (
              <div
                key={opt.key}
                className={`p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#1A1208] border-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.15)]'
                    : 'bg-[#080705] border-[#FF7A00]/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id={`radio_${opt.key}`}
                    name="correct_answer_choice"
                    checked={isSelected}
                    onChange={() => setQuestionForm({ ...questionForm, correctIndex: opt.index })}
                    className="w-4 h-4 accent-[#FF7A00] cursor-pointer"
                  />
                  <label
                    htmlFor={`radio_${opt.key}`}
                    className={`text-xs font-mono font-bold cursor-pointer w-20 flex-shrink-0 ${
                      isSelected ? 'text-[#FF7A00]' : 'text-slate-300'
                    }`}
                  >
                    {opt.label}:
                  </label>
                  <input
                    type="text"
                    value={questionForm[opt.key]}
                    onChange={(e) => setQuestionForm({ ...questionForm, [opt.key]: e.target.value })}
                    placeholder={`Enter text for ${opt.label}...`}
                    className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-[#FF7A00] px-2 py-0.5 rounded bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex-shrink-0">
                      CORRECT
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Points & Explanation */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
          <div className="sm:col-span-1 space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Points</label>
            <input
              type="number"
              min={1}
              max={100}
              value={questionForm.points}
              onChange={(e) => setQuestionForm({ ...questionForm, points: Number(e.target.value) || 1 })}
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">
              Technical Explanation / Rationale *
            </label>
            <textarea
              rows={2}
              value={questionForm.explanation}
              onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
              placeholder="Explain why the selected option is correct and why other choices are invalid."
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-3 border-t border-[#FF7A00]/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveQuestion}
            className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] font-bold text-xs font-mono flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)] cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Question to Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
