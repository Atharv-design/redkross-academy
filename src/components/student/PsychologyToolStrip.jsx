import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Brain,
  Headphones,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Save,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  Bookmark,
  Layers,
  HeartPulse,
  Activity,
  Award,
  AlertCircle,
  Clock,
  Compass
} from 'lucide-react';

/**
 * PsychologyToolStrip.jsx
 * 
 * Dedicated Clinical Floating / Docked Tool Strip for Psychology Lessons in LessonPlayerPage.
 * Strictly adheres to:
 * - Soothing Clinical Sage/Teal/Amber liquid glass aesthetic (#2DD4BF, #0F766E, #FFA439)
 * - Obsidian black foundations (#06101B, #081524)
 * - Lora / Cinzel typography (font-royal / font-serif)
 * - Strictly ZERO green matrix hacker styling or terminal icons
 * 
 * Interactive Features:
 * 1. Clinical Reflection Journal (categorized notes with local persistence)
 * 2. Case Study Notes Quick View (de-identified vignettes with Beckian Cognitive Triad decomposition)
 * 3. Acoustic / Audio Ambience Player (528Hz Solfeggio, 432Hz Harmonic Flow, Theta 4Hz Binaural Calm via Web Audio API)
 */
export default function PsychologyToolStrip({
  course,
  enrolment,
  enrolmentId,
  activeUnit,
  onCollapse
}) {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'reflection' | 'casestudy' | 'ambience' | null
  const [isMinimized, setIsMinimized] = useState(false);

  const REFLECTION_CATEGORIES = [
    { id: 'cognitive_formulation', label: 'Cognitive Formulation', color: '#FF7A00' },
    { id: 'therapeutic_alliance', label: 'Therapeutic Alliance', color: '#FFA439' },
    { id: 'ethical_deliberation', label: 'Ethical Deliberation', color: '#F59E0B' },
    { id: 'countertransference', label: 'Countertransference', color: '#A78BFA' }
  ];

  const storageKey = `rk_psych_reflections_${enrolmentId || course?.id || 'general'}`;
  const [selectedCategory, setSelectedCategory] = useState(REFLECTION_CATEGORIES[0].id);
  const [noteContent, setNoteContent] = useState('');
  const [patientContext, setPatientContext] = useState('');
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveReflection = (e) => {
    e?.preventDefault();
    if (!noteContent.trim()) return;

    const newNote = {
      id: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      category: selectedCategory,
      content: noteContent.trim(),
      patientContext: patientContext.trim() || 'General Clinical Formulation',
      lessonId: activeUnit?.id || 'general_unit',
      lessonTitle: activeUnit?.lesson?.title || activeUnit?.moduleTitle || 'Clinical Practicum',
      createdAt: new Date().toISOString()
    };

    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save reflection note to localStorage:', err);
    }

    setNoteContent('');
    setPatientContext('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteReflection = (id) => {
    const updated = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to update reflections in localStorage:', err);
    }
  };

  const CASE_STUDIES = [
    {
      id: 'case_cbt_01',
      code: 'CASE STUDY // ARCH-402',
      title: 'Generalized Social Anxiety & Catastrophic Anticipation',
      patientDemographics: '34yo Senior Engineer • Severe anticipatory autonomic panic • Onset 6 months prior',
      presentingComplaint: 'Patient experiences debilitating tachycardia, diaphoresis, and executive freezing prior to technical design presentations. Avoidance of collaborative forums threatens professional tenure.',
      cognitiveTriad: {
        self: '“I am fundamentally incompetent, fragile, and bound to be exposed as an imposter under scrutiny.”',
        world: '“Peers and clinical supervisors are hyper-vigilant critics waiting to exploit technical flaws.”',
        future: '“Any stammer or momentary hesitation will permanently destroy professional credibility.”'
      },
      distortions: [
        'Catastrophizing: Forecasting total reputational ruin from minor verbal slips.',
        'Mind Reading: Assuming audience neutrality signifies negative appraisal.',
        'Emotional Reasoning: “I feel terrified; therefore, catastrophic failure is imminent.”'
      ],
      exposureInterventions: [
        'Interoceptive Exposure: Intentional hyperventilation for 60 seconds to disconfirm panic-collapse association (SUDS: 85 → 30).',
        'Decatastrophizing Thought Record: Calculating statistical historical frequency of presentation interruptions vs catastrophized outcomes.',
        'In-Vivo Graded Task: Purposeful deliberate 4-second pause during morning scrum standup with eye contact.'
      ]
    },
    {
      id: 'case_cbt_02',
      code: 'CASE STUDY // DEPR-118',
      title: 'Major Depressive Episode with Executive Inertia & Anhedonia',
      patientDemographics: '29yo Research Fellow • Profound behavioral withdrawal • Onset 9 months prior',
      presentingComplaint: 'Pervasive vegetative fatigue, psychomotor slowing, and total withdrawal from scholarly pursuits following research project grant rejection.',
      cognitiveTriad: {
        self: '“I am an intellectual void incapable of generating original or clinically valid contributions.”',
        world: '“The academic landscape demands effortless perfection; no support exists for struggling practitioners.”',
        future: '“Any renewed effort will inevitably terminate in deeper exhaustion and public humiliation.”'
      },
      distortions: [
        'All-or-Nothing Thinking: “If the primary hypothesis was rejected, the entire year was wasted.”',
        'Discounting the Positive: Dismissing co-authored publications as accidental flukes.',
        'Tunnel Vision: Focusing exclusively on reviewer criticisms while ignoring methodological praise.'
      ],
      exposureInterventions: [
        'Behavioral Activation (BA): Micro-task scheduling (15 minutes reading clinical journals daily regardless of subjective motivation).',
        'Mastery & Pleasure Monitoring: Recording 0–10 ratings before and after tasks to combat emotional forecasting errors.',
        'Continuum Technique: Placing research outcome on a 0–100 spectrum to dismantle binary success/failure schema.'
      ]
    },
    {
      id: 'case_cbt_03',
      code: 'CASE STUDY // CRISIS-009',
      title: 'Acute Post-Traumatic Intrusions with Hyperarousal',
      patientDemographics: '42yo Healthcare Worker • Intrusive flashbacks & somatic alarm • Post-pandemic onset',
      presentingComplaint: 'Flashbacks triggered by hospital odors, severe insomnia, hyper-vigilance in crowded clinical settings, and emotional detachment from family.',
      cognitiveTriad: {
        self: '“I was powerless to save everyone; my ethical integrity is permanently stained.”',
        world: '“No environment is safe; catastrophe can re-occur at any millisecond without warning.”',
        future: '“Peace of mind is permanently gone; I will remain trapped in chronic alert forever.”'
      },
      distortions: [
        'Personalization & Blame: Assuming personal culpability for systemic healthcare triage constraints.',
        'Overgeneralization: Viewing clinical emergency protocols as universal predictors of doom.',
        'Selective Abstraction: Reliving terminal resuscitation attempts while omitting countless recoveries.'
      ],
      exposureInterventions: [
        'Graded In-Vivo Stimulus Exposure: Re-entering hospital lobby environment for progressive 5-to-20 minute intervals.',
        'Grounding & Dual-Attention Protocols: 5-4-3-2-1 sensory orientation during trauma-memory recall.',
        'Ethical Responsibility Pie Chart: Reallocating moral injury across systemic shortages, pandemic severity, and individual actions.'
      ]
    }
  ];

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = CASE_STUDIES[activeCaseIndex];

  const [isPlayingAmbience, setIsPlayingAmbience] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('528'); // '528' | '432' | 'theta'
  const [volume, setVolume] = useState(0.25);
  const [audioError, setAudioError] = useState(null);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const FREQUENCY_PRESETS = [
    {
      id: '528',
      name: '528 Hz Solfeggio',
      subtitle: 'Cellular Restoration & Clarity',
      tag: 'Restoration',
      baseFreq: 528,
      harmonicFreq: 1056,
      desc: 'Golden ratio harmonic tuning promoting parasympathetic nervous tone and deep somatic relaxation.'
    },
    {
      id: '432',
      name: '432 Hz Harmonic Flow',
      subtitle: 'Natural Mathematical Resonance',
      tag: 'Coherence',
      baseFreq: 432,
      harmonicFreq: 864,
      desc: 'Verdi tuning aligned with natural wave frequencies, reducing mental agitation and heart rate variability spikes.'
    },
    {
      id: 'theta',
      name: 'Theta 4 Hz Binaural Calm',
      subtitle: 'Deep Cognitive Consolidation',
      tag: 'Binaural',
      baseFreq: 216,
      binauralOffset: 4,
      desc: 'Stereo binaural frequency difference inducing slow theta neural oscillations for case formulation depth.'
    }
  ];

  const stopAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.3);
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscillatorsRef.current = [];
      }, 350);
    } catch (e) {
      console.warn('Audio cleanup exception:', e);
    }
    setIsPlayingAmbience(false);
  };

  const startAudio = async (presetId = selectedFrequency) => {
    stopAudio();

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) {
        setAudioError('Web Audio API not supported on this browser.');
        return;
      }

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.5); // Safe, gentle volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const preset = FREQUENCY_PRESETS.find((p) => p.id === presetId) || FREQUENCY_PRESETS[0];
      const newOscs = [];

      if (preset.id === 'theta') {
        const merger = ctx.createChannelMerger(2);

        const oscLeft = ctx.createOscillator();
        oscLeft.type = 'sine';
        oscLeft.frequency.setValueAtTime(preset.baseFreq, now);

        const oscRight = ctx.createOscillator();
        oscRight.type = 'sine';
        oscRight.frequency.setValueAtTime(preset.baseFreq + (preset.binauralOffset || 4), now);

        oscLeft.connect(merger, 0, 0);
        oscRight.connect(merger, 0, 1);
        merger.connect(masterGain);

        oscLeft.start(now);
        oscRight.start(now);
        newOscs.push(oscLeft, oscRight);
      } else {
        const fundamental = ctx.createOscillator();
        fundamental.type = 'sine';
        fundamental.frequency.setValueAtTime(preset.baseFreq, now);

        const subHarmonic = ctx.createOscillator();
        subHarmonic.type = 'sine';
        subHarmonic.frequency.setValueAtTime(preset.baseFreq / 2, now);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.2, now);
        subHarmonic.connect(subGain);
        subGain.connect(masterGain);

        fundamental.connect(masterGain);

        fundamental.start(now);
        subHarmonic.start(now);
        newOscs.push(fundamental, subHarmonic);
      }

      oscillatorsRef.current = newOscs;
      setIsPlayingAmbience(true);
      setAudioError(null);
    } catch (err) {
      console.error('Failed to initialize Web Audio ambience:', err);
      setAudioError('Audio playback requires student interaction.');
      setIsPlayingAmbience(false);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current && isPlayingAmbience) {
      const now = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.linearRampToValueAtTime(volume * 0.15, now + 0.1);
    }
  }, [volume, isPlayingAmbience]);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  const toggleAmbiencePlay = () => {
    if (isPlayingAmbience) {
      stopAudio();
    } else {
      startAudio(selectedFrequency);
    }
  };

  const handleSelectFrequency = (presetId) => {
    setSelectedFrequency(presetId);
    if (isPlayingAmbience) {
      startAudio(presetId);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-2.5 py-3 rounded-l-xl bg-[#0E0C09]/95 backdrop-blur-xl border-y border-l border-[#FF7A00]/40 text-[#FFA439] hover:bg-[#FF7A00]/25 hover:border-[#FFA439] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
          title="Expand Clinical Psychology Tools"
          aria-label="Expand Clinical Psychology Tools"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <Brain className="w-4 h-4 text-[#FFA439]" />
          <span className="text-[11px] font-royal uppercase tracking-wider writing-vertical select-none font-semibold">
            Clinical Tools
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Vertical Tool Strip */}
      <aside
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-2 rounded-2xl bg-[#0E0C09]/95 backdrop-blur-2xl border border-[#FF7A00]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,122,0,0.08)] animate-fade-in select-none"
        aria-label="Clinical Psychology Classroom Tools"
      >
        {/* Strip Header */}
        <div className="flex items-center justify-between pb-2 px-1 border-b border-[#FF7A00]/20 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="text-[10px] font-royal uppercase tracking-widest text-[#FFA439] font-semibold">
              Clinical
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Minimize Strip"
              aria-label="Minimize Strip"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Close Tools"
                aria-label="Close Tools"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tool Action Buttons */}
        <div className="flex flex-col gap-2">
          {/* 1. Clinical Reflection Journal */}
          <button
            onClick={() => setActiveDrawer(activeDrawer === 'reflection' ? null : 'reflection')}
            className={`relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all border ${
              activeDrawer === 'reflection'
                ? 'bg-[#FF7A00]/20 border-[#FFA439] text-[#FFA439] shadow-[0_0_16px_rgba(255,122,0,0.35)]'
                : 'bg-[#0E0C09]/90 border-slate-700/60 text-slate-300 hover:border-[#FFA439]/50 hover:text-white hover:bg-[#FF7A00]/15'
            }`}
            title="Open Clinical Reflection Journal"
            aria-label="Clinical Reflection Journal"
          >
            <BookOpen className="w-5 h-5 mb-1 text-[#FFA439] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-royal uppercase tracking-wider font-semibold">Journal</span>
            {savedNotes.length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FF7A00] text-black">
                {savedNotes.length}
              </span>
            )}
          </button>

          {/* 2. Case Study Notes Quick View */}
          <button
            onClick={() => setActiveDrawer(activeDrawer === 'casestudy' ? null : 'casestudy')}
            className={`relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all border ${
              activeDrawer === 'casestudy'
                ? 'bg-[#FFA439]/20 border-[#FFA439] text-[#FFA439] shadow-[0_0_16px_rgba(255,164,57,0.3)]'
                : 'bg-[#0E0C09]/90 border-slate-700/60 text-slate-300 hover:border-[#FFA439]/50 hover:text-white hover:bg-[#FFA439]/10'
            }`}
            title="Open Case Study Formulations"
            aria-label="Case Study Formulations"
          >
            <Brain className="w-5 h-5 mb-1 text-[#FFA439] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-royal uppercase tracking-wider font-semibold">Cases</span>
            <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full text-[9px] font-bold bg-[#FFA439]/30 text-[#FFA439] border border-[#FFA439]/50">
              3
            </span>
          </button>

          {/* 3. Acoustic / Audio Ambience Player */}
          <button
            onClick={() => setActiveDrawer(activeDrawer === 'ambience' ? null : 'ambience')}
            className={`relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all border ${
              activeDrawer === 'ambience' || isPlayingAmbience
                ? 'bg-[#FF7A00]/25 border-[#FFA439] text-[#FFA439] shadow-[0_0_16px_rgba(255,122,0,0.3)]'
                : 'bg-[#0E0C09]/90 border-slate-700/60 text-slate-300 hover:border-[#FFA439]/50 hover:text-white hover:bg-[#FF7A00]/15'
            }`}
            title="Open Acoustic Ambience Player"
            aria-label="Acoustic Ambience Player"
          >
            <Headphones className={`w-5 h-5 mb-1 text-[#FFA439] group-hover:scale-110 transition-transform ${isPlayingAmbience ? 'animate-pulse' : ''}`} />
            <span className="text-[10px] font-royal uppercase tracking-wider font-semibold">Ambience</span>
            {isPlayingAmbience && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-ping" />
            )}
          </button>
        </div>

        {/* Ambient Frequency Indicator Pill */}
        {isPlayingAmbience && (
          <div className="mt-2 pt-2 border-t border-[#FF7A00]/20 flex flex-col items-center">
            <span className="text-[9px] font-mono text-[#FFA439] font-bold tracking-wider">
              {selectedFrequency === 'theta' ? '4Hz THETA' : `${selectedFrequency}Hz`}
            </span>
            <div className="flex items-center gap-0.5 mt-1">
              <span className="w-1 h-3 bg-[#FF7A00] rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1 h-4 bg-[#FF7A00] rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1 h-2 bg-[#FF7A00] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </aside>

      {/* =====================================================================
          DRAWER 1: Clinical Reflection Journal
          ===================================================================== */}
      {activeDrawer === 'reflection' && (
        <div className="fixed inset-y-0 right-20 z-50 w-full max-w-lg bg-[#0E0C09]/95 backdrop-blur-2xl border-l border-y border-[#FF7A00]/30 shadow-[-16px_0_40px_rgba(0,0,0,0.7)] flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-5 border-b border-[#FF7A00]/20 flex items-center justify-between bg-[#0E0C09]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA439]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-royal font-bold text-white tracking-wide">
                  Clinical Reflection Journal
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Structured formulation & thought record portfolio
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDrawer(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close Journal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form & Previous Entries */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* Context Badge */}
            <div className="p-3 rounded-xl bg-[#081524] border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Current Unit:</span>
              <span className="font-royal text-[#FFA439] truncate max-w-[280px]">
                {activeUnit?.lesson?.title || activeUnit?.moduleTitle || course?.title || 'Clinical Lesson'}
              </span>
            </div>

            {/* Reflection Category Selector */}
            <div>
              <label className="block text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Reflection Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REFLECTION_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-royal transition-all text-left border flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#FF7A00]/20 border-[#FFA439] text-white shadow-[0_0_12px_rgba(45,212,191,0.2)]'
                          : 'bg-[#0E0C09]/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Case / Patient Context Field */}
            <div>
              <label className="block text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Vignette / Patient Formulation Focus
              </label>
              <input
                type="text"
                value={patientContext}
                onChange={(e) => setPatientContext(e.target.value)}
                placeholder="e.g. Case 402 — Somatic Panic Anticipation"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081524] border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFA439] transition-colors font-sans"
              />
            </div>

            {/* Reflection Text Area */}
            <div>
              <label className="block text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Clinical Observations & Deliberation
              </label>
              <textarea
                rows={5}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Record qualitative reflection: cognitive distortion identified, behavioral hypotheses, countertransference awareness, or ethical considerations..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#081524] border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFA439] transition-colors font-sans resize-none leading-relaxed"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-1">
              {saveSuccess ? (
                <div className="flex items-center gap-1.5 text-xs text-[#FFA439] font-royal font-medium">
                  <Check className="w-4 h-4" />
                  <span>Saved to practitioner portfolio</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 font-sans">
                  Persisted to browser portfolio
                </span>
              )}
              <button
                onClick={handleSaveReflection}
                disabled={!noteContent.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-royal uppercase tracking-wider font-bold bg-[#FF7A00] text-black hover:bg-[#26bba7] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(255,122,0,0.35)]"
              >
                <Save className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </div>

            {/* Saved Notes History */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold">
                  Saved Portfolio Entries ({savedNotes.length})
                </h4>
              </div>

              {savedNotes.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#0E0C09]/80 border border-slate-800/80 text-center">
                  <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-sans">
                    No reflections recorded for this lesson yet.
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Your notes formulate evidence for clinical certification.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedNotes.map((note) => {
                    const catObj = REFLECTION_CATEGORIES.find((c) => c.id === note.category);
                    return (
                      <div
                        key={note.id}
                        className="p-3.5 rounded-xl bg-[#081524] border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-royal font-semibold tracking-wide"
                            style={{
                              backgroundColor: `${catObj?.color || '#2DD4BF'}15`,
                              color: catObj?.color || '#2DD4BF',
                              border: `1px solid ${catObj?.color || '#2DD4BF'}40`
                            }}
                          >
                            {catObj?.label || note.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => handleDeleteReflection(note.id)}
                              className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                              title="Delete reflection"
                              aria-label="Delete reflection"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {note.patientContext && (
                          <div className="text-[11px] font-royal text-slate-300 font-medium mb-1">
                            {note.patientContext}
                          </div>
                        )}

                        <p className="text-xs text-slate-400 font-sans whitespace-pre-wrap leading-relaxed">
                          {note.content}
                        </p>

                        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="truncate max-w-[260px] font-royal">
                            Unit: {note.lessonTitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER 2: Case Study Notes Quick View
          ===================================================================== */}
      {activeDrawer === 'casestudy' && (
        <div className="fixed inset-y-0 right-20 z-50 w-full max-w-xl bg-[#0E0C09]/95 backdrop-blur-2xl border-l border-y border-[#FFA439]/30 shadow-[-16px_0_40px_rgba(0,0,0,0.7)] flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-5 border-b border-[#FFA439]/20 flex items-center justify-between bg-[#0E0C09]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFA439]/15 border border-[#FFA439]/40 flex items-center justify-center text-[#FFA439]">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-royal font-bold text-white tracking-wide">
                  Clinical Case Formulations
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  De-identified vignettes & Beckian Cognitive Triad decomposition
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDrawer(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close Case Formulations"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Case Navigation Tabs */}
          <div className="px-5 pt-3 pb-2 border-b border-slate-800/80 bg-[#0E0C09] flex gap-2">
            {CASE_STUDIES.map((c, idx) => {
              const isSelected = activeCaseIndex === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCaseIndex(idx)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-royal font-bold transition-all border text-center ${
                    isSelected
                      ? 'bg-[#FFA439]/20 border-[#FFA439] text-[#FFA439] shadow-[0_0_12px_rgba(255,164,57,0.2)]'
                      : 'bg-[#0E0C09]/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="block text-[10px] opacity-75 font-mono">{c.code.split('//')[1]?.trim()}</span>
                  <span className="truncate block mt-0.5">{c.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Vignette Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* Title & Demographics */}
            <div className="p-4 rounded-xl bg-[#081524] border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#FFA439] font-bold">
                  {currentCase.code}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-royal bg-[#FFA439]/15 text-[#FFA439] border border-[#FFA439]/30">
                  De-Identified Formulation
                </span>
              </div>
              <h4 className="text-base font-royal font-bold text-white mb-2">
                {currentCase.title}
              </h4>
              <p className="text-xs text-slate-400 font-sans mb-3">
                {currentCase.patientDemographics}
              </p>
              <div className="p-3 rounded-lg bg-[#0E0C09] border border-slate-800/80">
                <div className="text-[11px] font-royal text-[#FFA439] font-semibold mb-1">
                  Presenting Clinical Complaint:
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {currentCase.presentingComplaint}
                </p>
              </div>
            </div>

            {/* Beckian Cognitive Triad Decomposition */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FFA439]" />
                <h5 className="text-xs font-royal uppercase tracking-wider text-slate-200 font-bold">
                  Beckian Cognitive Triad Decomposition
                </h5>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {/* 1. Self */}
                <div className="p-3.5 rounded-xl bg-[#081524] border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-royal text-[#FFA439] font-semibold">
                      1. Schema Regarding Self
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Core Belief</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans italic leading-relaxed">
                    {currentCase.cognitiveTriad.self}
                  </p>
                </div>

                {/* 2. World / Others */}
                <div className="p-3.5 rounded-xl bg-[#081524] border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-royal text-[#38BDF8] font-semibold">
                      2. Schema Regarding World & Others
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Relational Intermediary</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans italic leading-relaxed">
                    {currentCase.cognitiveTriad.world}
                  </p>
                </div>

                {/* 3. Future */}
                <div className="p-3.5 rounded-xl bg-[#081524] border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-royal text-[#FFA439] font-semibold">
                      3. Schema Regarding Future
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Prognostic Expectation</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans italic leading-relaxed">
                    {currentCase.cognitiveTriad.future}
                  </p>
                </div>
              </div>
            </div>

            {/* Identified Cognitive Distortions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                <h5 className="text-xs font-royal uppercase tracking-wider text-slate-200 font-bold">
                  Identified Cognitive Distortions
                </h5>
              </div>
              <div className="space-y-2">
                {currentCase.distortions.map((dist, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl bg-[#0E0C09]/80 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed"
                  >
                    {dist}
                  </div>
                ))}
              </div>
            </div>

            {/* Active Exposure & Behavioral Interventions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#FFA439]" />
                <h5 className="text-xs font-royal uppercase tracking-wider text-slate-200 font-bold">
                  Active Exposure & Behavioral Interventions
                </h5>
              </div>
              <div className="space-y-2">
                {currentCase.exposureInterventions.map((exp, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-xl bg-[#081524] border border-[#FF7A00]/20 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FFA439] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {eIdx + 1}
                    </span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER 3: Acoustic / Audio Ambience Player
          ===================================================================== */}
      {activeDrawer === 'ambience' && (
        <div className="fixed inset-y-0 right-20 z-50 w-full max-w-md bg-[#0E0C09]/95 backdrop-blur-2xl border-l border-y border-[#FF7A00]/30 shadow-[-16px_0_40px_rgba(0,0,0,0.7)] flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-5 border-b border-[#FF7A00]/20 flex items-center justify-between bg-[#0E0C09]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FFA439]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-royal font-bold text-white tracking-wide">
                  Acoustic Ambience Player
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Solfeggio harmonic & binaural therapeutic frequencies
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveDrawer(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close Ambience Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls & Frequency Selector */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {/* Master Play / Pause Deck */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#081524] to-[#06101B] border border-[#FF7A00]/30 text-center shadow-[inset_0_0_24px_rgba(45,212,191,0.08)]">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#FF7A00]/10 border-2 border-[#FFA439]/50 flex items-center justify-center mb-4 relative">
                {isPlayingAmbience && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#FFA439] animate-ping opacity-25" />
                )}
                <button
                  onClick={toggleAmbiencePlay}
                  className="w-14 h-14 rounded-full bg-[#FF7A00] text-black flex items-center justify-center hover:bg-[#26bba7] hover:scale-105 active:scale-95 transition-all shadow-[0_0_24px_rgba(45,212,191,0.5)]"
                  title={isPlayingAmbience ? 'Pause Ambience' : 'Play Therapeutic Tone'}
                  aria-label={isPlayingAmbience ? 'Pause Ambience' : 'Play Therapeutic Tone'}
                >
                  {isPlayingAmbience ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  )}
                </button>
              </div>

              <div className="text-sm font-royal font-bold text-white mb-1">
                {isPlayingAmbience ? 'Acoustic Ambience Active' : 'Ambience Synthesizer Standby'}
              </div>
              <p className="text-xs text-slate-400 font-sans">
                {isPlayingAmbience
                  ? 'Pure sinusoidal tone streaming to headphone monitors'
                  : 'Select harmonic frequency below and activate study resonance'}
              </p>

              {audioError && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {audioError}
                </div>
              )}
            </div>

            {/* Frequency Selection Cards */}
            <div>
              <label className="block text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold mb-2.5">
                Harmonic Frequency Presets
              </label>
              <div className="space-y-2.5">
                {FREQUENCY_PRESETS.map((preset) => {
                  const isSelected = selectedFrequency === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectFrequency(preset.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FF7A00]/15 border-[#FFA439] shadow-[0_0_16px_rgba(45,212,191,0.2)]'
                          : 'bg-[#081524] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-royal font-bold text-white">
                          {preset.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF7A00]/20 text-[#FFA439] border border-[#FF7A00]/40">
                          {preset.tag}
                        </span>
                      </div>
                      <div className="text-[11px] font-royal text-[#FFA439] mb-1">
                        {preset.subtitle}
                      </div>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {preset.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Volume Control */}
            <div className="p-4 rounded-xl bg-[#081524] border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-royal uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#FFA439]" />
                  Acoustic Output Level
                </span>
                <span className="text-xs font-mono text-[#FFA439] font-bold">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#FF7A00] cursor-pointer"
                aria-label="Volume Slider"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Subtle (0%)</span>
                <span>Optimized (25%)</span>
                <span>Intense (100%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
