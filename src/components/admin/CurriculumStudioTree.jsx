import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  BookOpen,
  FolderTree,
  FileVideo,
  FileText,
  Terminal,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Play,
  CheckCircle2,
  ShieldAlert,
  Save
} from 'lucide-react';
import VideoManagerModal from './VideoManagerModal';

export default function CurriculumStudioTree({ courses = [], onUpdateCourses, onSave }) {
  const [learningPaths, setLearningPaths] = useState([
    {
      id: 'lp-ocw',
      title: 'Offensive Cyber Warfare (OCW)',
      description: 'Advanced exploit engineering, memory corruption, and kernel direct manipulation.',
      tier: 'Tier III (Elite)',
      courses: [
        {
          id: 'crs-kernel-902',
          title: 'Advanced Process Injection & Evasion',
          slug: 'advanced-process-injection',
          tier: 'Tier III',
          safeguard: 'Air-Gapped',
          embargoed: false,
          modules: [
            {
              id: 'mod-01',
              title: 'Module 01: Memory Forensics & Evasion',
              duration: 214,
              lessons: [
                {
                  id: 'lsn-01',
                  title: '1.1 Walking EPROCESS Lists in Volatile Memory',
                  type: 'video',
                  duration: 46,
                  videoUrl: 'https://cdn.redkross.tactical/streams/hls/sec-kernel-402/master.m3u8',
                  chapters: [
                    { id: 'ch-1', time: 0, label: 'Introduction to Direct Kernel Object Manipulation' },
                    { id: 'ch-2', time: 375, label: 'Navigating the EPROCESS Linked List' },
                    { id: 'ch-3', time: 870, label: 'DKOM Unlinking Active Processes' },
                    { id: 'ch-4', time: 1620, label: 'Evading Sysmon & EDR Callbacks' }
                  ]
                },
                {
                  id: 'lsn-02',
                  title: '1.2 DKOM: Kernel Object Manipulation Theory',
                  type: 'markdown',
                  duration: 24,
                  content: '# DKOM Architecture\n\nDirect Kernel Object Manipulation allows stealth execution.\n\n```c\nPLIST_ENTRY ActiveProcessLinks = (PLIST_ENTRY)((PCHAR)EProcess + 0x448);\nRemoveEntryList(ActiveProcessLinks);\n```'
                },
                {
                  id: 'lsn-03',
                  title: '1.3 Interactive EDR Evasion Sandbox',
                  type: 'lab',
                  duration: 60,
                  targetHost: 'kali-kernel-env-v3'
                },
                {
                  id: 'lsn-04',
                  title: '1.4 Kernel Memory Forensics Checkpoint',
                  type: 'quiz',
                  duration: 15,
                  passScore: 85
                }
              ]
            },
            {
              id: 'mod-02',
              title: 'Module 02: Resilient C2 & Covert Channels',
              duration: 168,
              lessons: [
                { id: 'lsn-05', title: '2.1 C2 Taxonomy & Beacon Profiles', type: 'video', duration: 32 },
                { id: 'lsn-06', title: '2.2 DNS & ICMP Tunneling Lab', type: 'lab', duration: 45 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'lp-cir',
      title: 'Cloud Incident Response & Threat Hunting',
      description: 'Defensive cloud forensics, IAM credential harvesting detection, and container IR.',
      tier: 'Tier II (Tactical)',
      courses: [
        {
          id: 'crs-cloud-ir',
          title: 'Identity Compromise & Session Hijacking',
          slug: 'identity-compromise-forensics',
          tier: 'Tier II',
          safeguard: 'Hardened',
          embargoed: false,
          modules: [
            {
              id: 'mod-c1',
              title: 'Module 01: Token Theft & STS Session Replay',
              duration: 122,
              lessons: [
                { id: 'lsn-c1', title: '1.1 OAuth Token Forensics', type: 'video', duration: 28 },
                { id: 'lsn-c2', title: '1.2 Session Replay Analysis', type: 'markdown', duration: 18 }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const [selectedPathId, setSelectedPathId] = useState('lp-ocw');
  const [selectedCourseId, setSelectedCourseId] = useState('crs-kernel-902');
  const [expandedModules, setExpandedModules] = useState({ 'mod-01': true, 'mod-02': false, 'mod-c1': true });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [newLessonType, setNewLessonType] = useState('video');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [addingToModuleId, setAddingToModuleId] = useState(null);

  const activePath = learningPaths.find((p) => p.id === selectedPathId) || learningPaths[0];
  const activeCourse = activePath?.courses?.find((c) => c.id === selectedCourseId) || activePath?.courses?.[0];

  const toggleModuleExpand = (modId) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleToggleCourseEmbargo = (courseId) => {
    setLearningPaths((prev) =>
      prev.map((path) => ({
        ...path,
        courses: path.courses.map((c) => (c.id === courseId ? { ...c, embargoed: !c.embargoed } : c))
      }))
    );
  };

  const handleAddLesson = (modId) => {
    if (!newLessonTitle.trim()) return;
    const newLesson = {
      id: `lsn-${Date.now()}`,
      title: newLessonTitle.trim(),
      type: newLessonType,
      duration: 30,
      chapters: newLessonType === 'video' ? [{ id: 'ch-0', time: 0, label: 'Introduction' }] : []
    };

    setLearningPaths((prev) =>
      prev.map((path) => ({
        ...path,
        courses: path.courses.map((c) =>
          c.id === activeCourse.id
            ? {
                ...c,
                modules: c.modules.map((m) =>
                  m.id === modId ? { ...m, lessons: [...m.lessons, newLesson] } : m
                )
              }
            : c
        )
      }))
    );
    setNewLessonTitle('');
    setAddingToModuleId(null);
  };

  const handleDeleteLesson = (modId, lessonId) => {
    setLearningPaths((prev) =>
      prev.map((path) => ({
        ...path,
        courses: path.courses.map((c) =>
          c.id === activeCourse.id
            ? {
                ...c,
                modules: c.modules.map((m) =>
                  m.id === modId
                    ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
                    : m
                )
              }
            : c
        )
      }))
    );
  };

  const handleSaveLessonVideo = (updatedLesson) => {
    setLearningPaths((prev) =>
      prev.map((path) => ({
        ...path,
        courses: path.courses.map((c) =>
          c.id === activeCourse.id
            ? {
                ...c,
                modules: c.modules.map((m) => ({
                  ...m,
                  lessons: m.lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
                }))
              }
            : c
        )
      }))
    );
    setSelectedLesson(updatedLesson);
  };

  const lessonTypeBadge = (type) => {
    switch (type) {
      case 'video':
        return { label: 'VIDEO', icon: FileVideo, color: 'text-[#65F58A] bg-[#65F58A]/10 border-[#65F58A]/30' };
      case 'markdown':
        return { label: 'THEORY', icon: FileText, color: 'text-[#35E6B5] bg-[#35E6B5]/10 border-[#35E6B5]/30' };
      case 'lab':
        return { label: 'LIVE LAB', icon: Terminal, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' };
      case 'quiz':
        return { label: 'QUIZ', icon: HelpCircle, color: 'text-purple-400 bg-purple-400/10 border-purple-400/30' };
      default:
        return { label: 'LESSON', icon: BookOpen, color: 'text-[#94A3B8] bg-white/5 border-white/10' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Path Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#263440]">
        <div className="flex items-center gap-2 overflow-x-auto">
          {learningPaths.map((path) => {
            const isActive = path.id === selectedPathId;
            return (
              <button
                key={path.id}
                onClick={() => {
                  setSelectedPathId(path.id);
                  if (path.courses[0]) setSelectedCourseId(path.courses[0].id);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1B2530] text-white border border-[#35E6B5]/40 shadow-[0_0_15px_rgba(53,230,181,0.15)]'
                    : 'bg-[#101923] text-[#94A3B8] border border-[#263440] hover:text-white'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isActive ? 'text-[#35E6B5]' : 'text-[#94A3B8]'}`} />
                <span className="font-semibold">{path.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#65F58A]">
                  {path.tier}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (onSave) onSave(learningPaths);
            }}
            className="px-4 py-2 rounded-xl bg-[#65F58A] hover:bg-[#52db74] text-[#071018] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Deploy Curriculum Changes</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Curriculum Orchestration Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Course & Module Tree Navigator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#101923] border border-[#263440] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#263440]">
              <div className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#65F58A]" />
                <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                  Curriculum Hierarchy
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#94A3B8]">
                {activeCourse?.modules?.length || 0} Modules Active
              </span>
            </div>

            {/* Course Information Banner */}
            <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white font-mono">{activeCourse?.title}</p>
                <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
                  Tier: <span className="text-[#65F58A]">{activeCourse?.tier}</span> | Safeguard:{' '}
                  <span className="text-[#35E6B5]">{activeCourse?.safeguard}</span>
                </p>
              </div>
              <button
                onClick={() => handleToggleCourseEmbargo(activeCourse?.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 border transition-colors ${
                  activeCourse?.embargoed
                    ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                    : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                }`}
              >
                {activeCourse?.embargoed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{activeCourse?.embargoed ? 'EMBARGOED' : 'PUBLIC'}</span>
              </button>
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-3">
              {activeCourse?.modules?.map((module, modIdx) => {
                const isExpanded = expandedModules[module.id];
                return (
                  <div
                    key={module.id}
                    className="rounded-xl border border-[#263440] bg-[#0A121A] overflow-hidden transition-all"
                  >
                    {/* Module Header Bar */}
                    <div
                      onClick={() => toggleModuleExpand(module.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#131D27] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-[#65F58A]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        )}
                        <span className="text-xs font-mono font-semibold text-white">
                          {module.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#94A3B8] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}m
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-[#35E6B5] font-mono">
                          {module.lessons?.length || 0} items
                        </span>
                      </div>
                    </div>

                    {/* Lessons list inside Module */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[#263440]/60 divide-y divide-[#263440]/40 bg-[#071018]"
                        >
                          {module.lessons?.map((lesson) => {
                            const badge = lessonTypeBadge(lesson.type);
                            const BadgeIcon = badge.icon;
                            const isSelected = selectedLesson?.id === lesson.id;
                            return (
                              <div
                                key={lesson.id}
                                className={`p-3 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#1B2530] border-l-2 border-[#65F58A]'
                                    : 'hover:bg-[#101923]'
                                }`}
                                onClick={() => setSelectedLesson(lesson)}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono border flex items-center gap-1 shrink-0 ${badge.color}`}
                                  >
                                    <BadgeIcon className="w-2.5 h-2.5" />
                                    <span>{badge.label}</span>
                                  </span>
                                  <span className="text-white font-mono text-[11px] truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] font-mono text-[#94A3B8]">
                                    {lesson.duration}m
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteLesson(module.id, lesson.id);
                                    }}
                                    className="p-1 text-[#94A3B8] hover:text-rose-400 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          {/* Quick Add Lesson Form */}
                          {addingToModuleId === module.id ? (
                            <div className="p-3 bg-[#101923] space-y-2.5">
                              <div className="flex items-center gap-2">
                                <select
                                  value={newLessonType}
                                  onChange={(e) => setNewLessonType(e.target.value)}
                                  className="bg-[#071018] border border-[#263440] text-white text-[11px] font-mono rounded-lg px-2 py-1"
                                >
                                  <option value="video">🎥 Video Lesson</option>
                                  <option value="markdown">📖 Theory Markdown</option>
                                  <option value="lab">🧪 Live Lab Pod</option>
                                  <option value="quiz">📝 Quiz Checkpoint</option>
                                </select>
                                <input
                                  type="text"
                                  placeholder="Lesson Title..."
                                  value={newLessonTitle}
                                  onChange={(e) => setNewLessonTitle(e.target.value)}
                                  className="flex-1 bg-[#071018] border border-[#263440] text-white text-[11px] font-mono rounded-lg px-2 py-1 focus:outline-none focus:border-[#65F58A]"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setAddingToModuleId(null)}
                                  className="px-2.5 py-1 text-[10px] font-mono text-[#94A3B8] hover:text-white"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleAddLesson(module.id)}
                                  className="px-3 py-1 rounded-lg bg-[#35E6B5] text-[#071018] font-mono text-[10px] font-bold"
                                >
                                  Add Lesson
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddingToModuleId(module.id)}
                              className="w-full py-2 px-3 text-[11px] font-mono text-[#65F58A] hover:bg-[#65F58A]/5 flex items-center justify-center gap-1 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Lesson to {module.title.split(':')[0]}</span>
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Lesson Inspector & Video Orchestrator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedLesson ? (
            <div className="p-5 rounded-2xl bg-[#101923] border border-[#263440] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#35E6B5]/10 text-[#35E6B5] border border-[#35E6B5]/30">
                      {selectedLesson.type} LESSON
                    </span>
                    <span className="text-[11px] font-mono text-[#94A3B8]">ID: {selectedLesson.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono mt-1">
                    {selectedLesson.title}
                  </h3>
                </div>

                {selectedLesson.type === 'video' && (
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1B2530] hover:bg-[#263440] border border-[#65F58A]/40 text-[#65F58A] text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Open Video Studio</span>
                  </button>
                )}
              </div>

              {/* Video Inspector Preview if Video */}
              {selectedLesson.type === 'video' && (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-[#263440] bg-black aspect-video flex items-center justify-center group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="text-center space-y-2 z-10">
                      <button
                        onClick={() => setVideoModalOpen(true)}
                        className="w-12 h-12 rounded-full bg-[#65F58A] text-[#071018] flex items-center justify-center shadow-[0_0_20px_rgba(101,245,138,0.5)] hover:scale-105 transition-transform"
                      >
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                      <p className="text-xs font-mono text-white/90">
                        {selectedLesson.chapters?.length || 0} Timestamp Markers Configured
                      </p>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>{selectedLesson.videoUrl || 'HLS Stream: Default Master Feed'}</span>
                      <span className="text-[#65F58A] font-bold">{selectedLesson.duration}m</span>
                    </div>
                  </div>

                  {/* Chapter Markers Strip */}
                  <div className="p-3.5 rounded-xl bg-[#071018] border border-[#263440] space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-white">
                      Configured Chapter Markers:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {selectedLesson.chapters?.map((ch, idx) => (
                        <div
                          key={ch.id || idx}
                          className="p-2 rounded-lg bg-[#101923] border border-[#263440] text-[11px] font-mono flex items-center justify-between"
                        >
                          <span className="text-[#65F58A] font-bold">
                            [{Math.floor(ch.time / 60)}:
                            {String(ch.time % 60).padStart(2, '0')}]
                          </span>
                          <span className="text-white truncate ml-2 text-right">{ch.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Markdown Theory Editor if Markdown */}
              {selectedLesson.type === 'markdown' && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#94A3B8]">Markdown Theory Content:</span>
                  <textarea
                    rows={8}
                    value={selectedLesson.content || ''}
                    onChange={(e) => {
                      const updated = { ...selectedLesson, content: e.target.value };
                      handleSaveLessonVideo(updated);
                    }}
                    className="w-full p-3 rounded-xl bg-[#071018] border border-[#263440] text-xs font-mono text-white focus:outline-none focus:border-[#35E6B5]"
                  />
                </div>
              )}

              {/* Lab configuration if Lab */}
              {selectedLesson.type === 'lab' && (
                <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                    <Terminal className="w-4 h-4" />
                    <span>Tactical Pod Configuration</span>
                  </div>
                  <p className="text-xs font-mono text-[#94A3B8]">
                    Container Target Host: <span className="text-white">{selectedLesson.targetHost || 'kali-kernel-env-v3'}</span>
                  </p>
                  <p className="text-[11px] font-mono text-[#65F58A]">
                    Automated sandbox spin-up with isolated root privileges and proctor network tap.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#101923] border border-dashed border-[#263440] flex flex-col items-center justify-center text-center space-y-3">
              <BookOpen className="w-10 h-10 text-[#263440]" />
              <p className="text-xs font-mono text-white font-semibold">Select a Lesson from the Left Hierarchy</p>
              <p className="text-[11px] font-mono text-[#94A3B8] max-w-sm">
                Click any video, theory markdown, live lab, or quiz checkpoint to configure its streaming parameters, chapter marks, and proctoring constraints.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Video Manager Modal Dialog */}
      {videoModalOpen && selectedLesson && (
        <VideoManagerModal
          lesson={selectedLesson}
          onClose={() => setVideoModalOpen(false)}
          onSave={handleSaveLessonVideo}
        />
      )}
    </div>
  );
}
