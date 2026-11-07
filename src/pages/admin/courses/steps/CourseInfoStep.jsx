import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CourseInfoStep({
  courseFormData,
  setCourseFormData,
  onProceed
}) {
  return (
    <div className="space-y-6 animate-slide-left">
      <div className="p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 space-y-4">
        <h4 className="font-bold text-sm text-white">Basic Course Identification</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Course Title *</label>
            <input
              type="text"
              value={courseFormData.title}
              onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
              placeholder="e.g. Incident Response & Telemetry Fundamentals"
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">URL Slug (Auto-Generated)</label>
            <input
              type="text"
              value={courseFormData.slug}
              onChange={(e) => setCourseFormData({ ...courseFormData, slug: e.target.value })}
              placeholder="e.g. incident-response-fundamentals"
              className="w-full bg-[#080705] rounded-xl p-3 text-xs font-mono text-[#FF7A00] border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Academic Category</label>
            <select
              value={courseFormData.category}
              onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="Defensive Cyber Operations">Defensive Cyber Operations</option>
              <option value="Offensive Security & Pentesting">Offensive Security & Pentesting</option>
              <option value="Digital Forensics & Incident Response">Digital Forensics & Incident Response (DFIR)</option>
              <option value="Threat Intelligence & Hunting">Threat Intelligence & Hunting</option>
              <option value="Cloud & Infrastructure Security">Cloud & Infrastructure Security</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Difficulty Tier</label>
            <select
              value={courseFormData.level}
              onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="Beginner">Beginner (Foundations)</option>
              <option value="Intermediate">Intermediate (Practitioner)</option>
              <option value="Advanced">Advanced (Tactical Expert)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Duration (Display Format)</label>
            <input
              type="text"
              value={courseFormData.duration}
              onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
              placeholder="e.g. 4 Weeks"
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A3907C]">Total Completion Tokens Reward</label>
            <input
              type="number"
              value={courseFormData.total_tokens_reward}
              onChange={(e) => setCourseFormData({ ...courseFormData, total_tokens_reward: e.target.value })}
              placeholder="150"
              className="w-full bg-[#080705] rounded-xl p-3 text-xs font-mono text-[#65F58A] border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs font-mono text-[#A3907C]">Course Overview & Pitch</label>
          <textarea
            rows={3}
            value={courseFormData.overview}
            onChange={(e) => setCourseFormData({ ...courseFormData, overview: e.target.value })}
            placeholder="Comprehensive description of the course and operational skills taught..."
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-[#A3907C]">
            What You Will Learn (1 objective per line)
          </label>
          <textarea
            rows={4}
            value={
              Array.isArray(courseFormData.what_you_will_learn)
                ? courseFormData.what_you_will_learn.join('\n')
                : courseFormData.what_you_will_learn || ''
            }
            onChange={(e) =>
              setCourseFormData({ ...courseFormData, what_you_will_learn: e.target.value.split('\n') })
            }
            placeholder="Master continuous host and network telemetry inspection&#10;Execute MITRE ATT&CK mapping..."
            className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00] font-mono"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <span>Proceed to Step 2: Course Cover Art</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
