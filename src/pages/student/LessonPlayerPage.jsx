import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Award,
  Coins,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Menu,
  FileDown,
  Gauge,
  AlertTriangle,
  RotateCcw,
  Search,
  Check,
  Clock,
  FileCheck,
  UploadCloud,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { resolveVideoUrl } from '../../services/db/videoStorage';
import { renderMarkdownToHtml } from '../../utils/markdownParser';

export default function LessonPlayerPage() {
  const { enrolmentId } = useParams();
  const navigate = useNavigate();
  const { refreshBalance, currentUser } = useAuth();

  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;

  // Flatten lessons for navigation
  const allLessons = [];
  if (course && course.modules) {
    course.modules.forEach((mod) => {
      (mod.lessons || []).forEach((les) => {
        allLessons.push({ ...les, module_id: mod.id, module_title: mod.title, quiz: mod.quiz });
      });
    });
  }

  // Active lesson state
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [progressData, setProgressData] = useState({ percentage: 0, completed: 0, total: 0 });
  const [unlockedFinal, setUnlockedFinal] = useState({ is_unlocked: false, reasons: [] });
  const [savingProgress, setSavingProgress] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'assignment'
  const [expandedModules, setExpandedModules] = useState({});

  // Video Telemetry & Playback Gating State
  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [watchProgressMap, setWatchProgressMap] = useState({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // PDF Assignment Submission State
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [uploadingDataUrl, setUploadingDataUrl] = useState('');
  const [submittingPdf, setSubmittingPdf] = useState(false);

  const loadAssignmentSubmission = () => {
    if (!enrolmentId) return;
    const subs = mockEngine.getAssignmentSubmissions({ enrolment_id: enrolmentId });
    const currentSub = subs[0] || null;
    setAssignmentSubmission(currentSub);
  };

  useEffect(() => {
    loadAssignmentSubmission();
    const unsub = mockEngine.subscribe(() => {
      loadAssignmentSubmission();
    });
    return () => unsub();
  }, [enrolmentId, activeLessonId]);

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Strict Security Policy: Only valid PDF documents (.pdf) are permitted.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25 MB limit.');
      return;
    }

    setUploadingFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadingDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const confirmAssignmentSubmit = () => {
    if (!uploadingDataUrl || !uploadingFileName || !activeLesson) return;
    setSubmittingPdf(true);

    try {
      mockEngine.submitAssignment({
        cadetId: currentUser?.cadet_id || 'RK-89421',
        userId: currentUser?.id || enrolment.user_id,
        enrolmentId,
        courseId: course.id,
        moduleId: activeLesson.module_id,
        assignmentId: activeLesson.id || `asg_${activeLesson.module_id}`,
        assignmentTitle: activeLesson.title || `${activeLesson.module_title} Practical Lab Report`,
        fileName: uploadingFileName,
        fileDataUrl: uploadingDataUrl
      });

      setUploadingFileName('');
      setUploadingDataUrl('');
      loadAssignmentSubmission();
      alert('Assignment submitted successfully! Your practical investigation report is under assessment.');
    } catch (e) {
      alert('Submission failed: ' + e.message);
    } finally {
      setSubmittingPdf(false);
    }
  };

  useEffect(() => {
    if (enrolment && allLessons.length > 0) {
      const firstIncomplete = allLessons.find(
        (l) => !enrolment.completed_mandatory_lessons.includes(l.id)
      );
      const chosenLesson = firstIncomplete ? firstIncomplete.id : allLessons[0].id;
      setActiveLessonId(chosenLesson);
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));

      // Auto expand module containing active lesson
      const activeObj = allLessons.find((l) => l.id === chosenLesson);
      if (activeObj) {
        setExpandedModules({ [activeObj.module_id]: true });
      }
    }

    const unsubscribe = mockEngine.subscribe((event) => {
      if (event.type === 'CURRICULUM_MUTATED' || event.type === 'DB_MUTATED') {
        setProgressData(mockEngine.getCourseProgress(enrolmentId));
        setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));
      }
    });

    return () => unsubscribe();
  }, [enrolmentId]);

  if (!enrolment || !course) {
    return (
      <div className="min-h-screen bg-[#071018] py-24 text-center px-4 flex items-center justify-center">
        <div className="max-w-md p-8 rounded-2xl ultra-glass-panel border border-[#263440] space-y-4">
          <h2 className="text-xl font-bold text-white font-lora">Enrolment Not Found</h2>
          <p className="text-xs text-[#8BA2B5] font-mono">Please verify that you are enrolled in this training course.</p>
          <Link to="/student" className="px-5 py-2.5 bg-[#65F58A] rounded-xl text-[#071018] text-xs font-bold font-mono inline-flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const isLessonCompleted = enrolment.completed_mandatory_lessons?.includes(activeLesson?.id);
  const isAssignment = activeLesson?.type === 'assignment';

  // Sequential Unlock Rule
  const isLessonUnlocked = (idx) => {
    if (idx === 0) return true;
    for (let i = 0; i < idx; i++) {
      if (!enrolment.completed_mandatory_lessons?.includes(allLessons[i].id)) {
        return false;
      }
    }
    return true;
  };

  // Video Watch Progress for active lesson
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState('/assets/sample-lesson.mp4');

  useEffect(() => {
    let active = true;
    if (activeLesson?.video_url) {
      resolveVideoUrl(activeLesson.video_url).then((url) => {
        if (active) setResolvedVideoUrl(url);
      });
    } else {
      setResolvedVideoUrl('/assets/sample-lesson.mp4');
    }
    return () => { active = false; };
  }, [activeLesson?.video_url, activeLesson?.id]);

  const currentWatchPct = isLessonCompleted ? 100 : (watchProgressMap[activeLesson?.id]?.percentage || 0);
  const hasVideo = Boolean(resolvedVideoUrl) && !isAssignment;
  const canMarkComplete = isLessonCompleted || isAssignment || currentWatchPct >= 80;

  // Video Telemetry
  const handleTimeUpdate = () => {
    if (!videoRef.current || !activeLesson) return;
    const { currentTime, duration } = videoRef.current;
    if (!duration || isNaN(duration)) return;

    setWatchProgressMap((prev) => {
      const currentEntry = prev[activeLesson.id] || { maxTime: 0, percentage: 0 };
      const newMaxTime = Math.max(currentEntry.maxTime, currentTime);
      const computedPct = Math.min(100, Math.round((newMaxTime / duration) * 100));

      return {
        ...prev,
        [activeLesson.id]: {
          currentTime,
          duration,
          maxTime: newMaxTime,
          percentage: Math.max(currentEntry.percentage, computedPct)
        }
      };
    });
  };

  // Cloud Stream Embed Resolver
  const getEmbedInfo = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${vidId}?autoplay=0&rel=0` };
    }
    if (url.includes('youtube.com/embed/')) {
      return { type: 'youtube', embedUrl: url };
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${vidId}?autoplay=0&rel=0` };
    }
    if (url.includes('vimeo.com/')) {
      const vidId = url.split('vimeo.com/')[1]?.split('?')[0];
      return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vidId}` };
    }
    return { type: 'direct', embedUrl: url };
  };

  const embedInfo = getEmbedInfo(resolvedVideoUrl);

  const handleDownloadResource = (name) => {
    const docContent = `# REDKROSS ACADEMY - TECHNICAL STUDY REFERENCE\n` +
      `Asset: ${name}\n` +
      `Course: ${course.title}\n` +
      `Module: ${activeLesson?.module_title || 'Core Curriculum'}\n` +
      `Date Generated: ${new Date().toISOString().split('T')[0]}\n\n` +
      `## Standard Operating Procedures & Field Laboratory Reference\n` +
      `1. Telemetry Ingestion Source: Windows Security Log (Event IDs 4624, 4625, 4672, 4720)\n` +
      `2. Network Volatility: Memory capture before host reboot\n` +
      `3. Playbook Alignment: NIST SP 800-61r2 Computer Security Incident Handling Guide\n` +
      `4. MITRE ATT&CK Matrix: T1059 (Command Execution), T1078 (Valid Accounts)\n`;

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name.replace(/[^a-zA-Z0-9._-]/g, '_') + '.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleMarkComplete = async () => {
    if (!activeLesson || !canMarkComplete) return;
    setSavingProgress(true);

    try {
      await apiClient.completeLesson(enrolmentId, activeLesson.id);
      const newProgress = mockEngine.getCourseProgress(enrolmentId);
      setProgressData(newProgress);
      refreshBalance();
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));

      // Advance to next lesson if available
      if (activeIndex < allLessons.length - 1) {
        const nextLes = allLessons[activeIndex + 1];
        setActiveLessonId(nextLes.id);
        setExpandedModules((prev) => ({ ...prev, [nextLes.module_id]: true }));
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  const handleNextLesson = () => {
    if (activeIndex < allLessons.length - 1) {
      const nextLes = allLessons[activeIndex + 1];
      setActiveLessonId(nextLes.id);
      setExpandedModules((prev) => ({ ...prev, [nextLes.module_id]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (activeIndex > 0) {
      const prevLes = allLessons[activeIndex - 1];
      setActiveLessonId(prevLes.id);
      setExpandedModules((prev) => ({ ...prev, [prevLes.module_id]: true }));
    }
  };

  // SVG Circular Gauge calculation
  const circumference = 2 * Math.PI * 34; // radius 34
  const strokeDashoffset = circumference - (progressData.percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#071018] text-[#F1F5F9] font-sans pb-12">
      {/* 1. TOP BREADCRUMB & METRICS HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#071018]/90 backdrop-blur-xl border-b border-[#1B2530] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 truncate">
            <Link
              to="/student"
              className="p-2 rounded-xl bg-[#0F1722] hover:bg-[#1B2530] text-[#CBD5E1] border border-[#263440] transition-colors flex-shrink-0"
              title="Return to Student Dashboard"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="truncate">
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8BA2B5]">
                <span>{course.category || 'Specialist Training'}</span>
                <span>/</span>
                <span className="text-[#65F58A] font-bold">{course.title}</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white font-lora truncate">
                {activeLesson?.title || 'Course Lesson'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Quick Completion Button */}
            <button
              onClick={handleMarkComplete}
              disabled={savingProgress || isLessonCompleted || !canMarkComplete}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all border ${
                isLessonCompleted
                  ? 'bg-[#65F58A]/15 text-[#65F58A] border-[#65F58A]/40'
                  : canMarkComplete
                  ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] hover:bg-[#52d674] shadow-[0_0_15px_rgba(101,245,138,0.3)]'
                  : 'bg-[#1B2530] text-[#8BA2B5] border-[#263440] opacity-50 cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isLessonCompleted ? 'Completed' : savingProgress ? 'Saving...' : 'Mark Complete'}</span>
            </button>

            {/* Next Lesson Action */}
            <button
              onClick={handleNextLesson}
              disabled={activeIndex >= allLessons.length - 1}
              className={`p-2 rounded-xl border font-mono text-xs flex items-center space-x-1 transition-colors ${
                activeIndex < allLessons.length - 1
                  ? 'bg-[#0F1722] hover:bg-[#1B2530] text-white border-[#263440]'
                  : 'bg-[#0A121A] text-[#8BA2B5]/40 border-[#1B2530] cursor-not-allowed'
              }`}
              title="Next Lesson"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Cadet Identity Badge */}
            <div className="hidden md:flex items-center space-x-2 pl-3 border-l border-[#1B2530]">
              <div className="w-8 h-8 rounded-full bg-[#101923] border border-[#65F58A]/40 flex items-center justify-center font-bold text-xs text-[#65F58A]">
                {currentUser?.name?.charAt(0) || 'C'}
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-white block leading-tight">
                  {currentUser?.name || 'Cadet'}
                </span>
                <span className="text-[10px] font-mono text-[#65F58A]">
                  {progressData.percentage}% Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN 12-COLUMN EDUNEX WORKSTATION (ZERO VOIDS, DENSE & CRISP) */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-8 pt-6">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT 8 COLUMNS: VIDEO PLAYER + LEARNING PROGRESS + TABS  */}
          {/* ========================================================= */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Top Section Header */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[11px] font-mono text-[#8BA2B5] uppercase tracking-wider block">
                  {activeLesson?.module_title || 'Current Chapter'}
                </span>
                <h2 className="text-lg font-bold text-white font-lora">
                  Online Video Lessons
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0F1722] border border-[#263440] text-[#CBD5E1]">
                  Lesson {activeIndex + 1} of {allLessons.length}
                </span>
              </div>
            </div>

            {/* Video Player Card / Assignment Viewer */}
            <div className="ultra-glass-panel rounded-2xl overflow-hidden border border-[#65F58A]/30 border-t-white/20 shadow-2xl">
              {isAssignment ? (
                /* Practical Assignment Stage */
                <div className="p-8 space-y-6 bg-emerald-950/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#65F58A]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                          Practical Lab Assessment
                        </span>
                        <h3 className="text-xl font-bold text-white font-lora">
                          {activeLesson.title}
                        </h3>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                      +{activeLesson.points || 100} XP BOUNTY
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl ultra-glass-card border border-[#65F58A]/25 text-xs font-mono leading-relaxed text-[#C9EFE0] whitespace-pre-wrap">
                      {activeLesson.instructions || 'Download the lab template, complete your analysis, and submit your PDF investigation report.'}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl ultra-glass-card border border-[#65F58A]/25">
                      <div className="flex items-center space-x-3">
                        <FileDown className="w-5 h-5 text-[#65F58A]" />
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {activeLesson.template_name || 'Lab_Investigation_Brief.pdf'}
                          </span>
                          <span className="text-[10px] text-[#B8E6CE] font-mono">
                            Mandatory Worksheet Template • PDF Format
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadResource(activeLesson.template_name || 'Lab_Brief.pdf')}
                        className="px-4 py-2 rounded-lg bg-[#0A241A] hover:bg-[#123828] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Brief</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Native Video / Cloud Stream Player */
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  {hasVideo ? (
                    embedInfo?.type === 'youtube' || embedInfo?.type === 'vimeo' ? (
                      <iframe
                        src={embedInfo.embedUrl}
                        title={activeLesson.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        key={resolvedVideoUrl}
                        ref={videoRef}
                        src={resolvedVideoUrl}
                        controls
                        playsInline
                        preload="auto"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => {
                          setIsVideoPlaying(false);
                          setWatchProgressMap((prev) => ({
                            ...prev,
                            [activeLesson.id]: { percentage: 100, maxTime: 9999, duration: 9999 }
                          }));
                        }}
                        poster={course.art || '/assets/course-art/art-01.jpg'}
                        className="w-full h-full object-cover"
                      >
                        <source src={resolvedVideoUrl} type="video/mp4" />
                      </video>
                    )
                  ) : (
                    <div className="p-8 text-center space-y-3">
                      <BookOpen className="w-12 h-12 text-[#65F58A]/40 mx-auto" />
                      <h4 className="text-white font-bold text-sm">Interactive Study Document</h4>
                      <p className="text-xs text-[#B8E6CE]">Review curriculum notes, terminal commands, and protocols below.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Player Bottom Control & Quick Action Bar */}
              <div className="p-4 bg-emerald-950/30 backdrop-blur-xl border-t border-[#65F58A]/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-xs font-mono text-[#B8E6CE]">
                    <span>Playback Speed:</span>
                    {[0.75, 1.0, 1.25, 1.5, 2.0].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          if (videoRef.current) videoRef.current.playbackRate = spd;
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          playbackSpeed === spd
                            ? 'bg-[#65F58A] text-[#071018] font-bold'
                            : 'bg-[#0A241A] text-[#C9EFE0] hover:text-white border border-[#65F58A]/30'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-[#65F58A]/20 text-xs font-mono">
                    <span className="text-[#B8E6CE]">Watched:</span>
                    <span className="text-[#65F58A] font-bold">{currentWatchPct}%</span>
                    <span className="text-[#8BA2B5] text-[10px]">(&ge;80% required)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeIndex === 0}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 border ${
                      activeIndex > 0
                        ? 'bg-[#141E28] text-white hover:bg-[#1B2530] border-[#263440]'
                        : 'bg-[#0A121A] text-[#8BA2B5]/40 border-[#1B2530] cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={activeIndex >= allLessons.length - 1}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 border transition-all ${
                      activeIndex < allLessons.length - 1
                        ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] hover:bg-[#52d674] shadow-sm'
                        : 'bg-[#141E28] text-[#8BA2B5]/40 border-[#263440] cursor-not-allowed'
                    }`}
                  >
                    <span>Next Lesson</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 3. YOUR LEARNING PROGRESS PANEL (Directly Modeled after Image 4 / Edunex) */}
            {/* ========================================================================= */}
            <div className="ultra-glass-panel rounded-2xl p-6 border border-[#65F58A]/30 border-t-white/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#65F58A]/20">
                <div>
                  <span className="text-[10px] font-mono text-[#65F58A] uppercase tracking-wider block">
                    Telemetry Analytics
                  </span>
                  <h3 className="text-base font-bold text-white font-lora">
                    Your Learning Progress
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#B8E6CE]">
                  <span>Track ID: {course.slug || 'DEF-CYB'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                {/* 1. Overall Circular Progress Donut Gauge */}
                <div className="p-4 rounded-xl ultra-glass-card border border-[#65F58A]/25 border-t-white/15 flex items-center space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="text-[#0D2418]"
                        strokeWidth="7"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="text-[#65F58A] transition-all duration-700 ease-out"
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute font-mono text-base font-black text-white">
                      {progressData.percentage}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#B8E6CE] uppercase tracking-wider block">
                      Overall Completion
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {progressData.percentage >= 100 ? 'Course Completed' : 'In Active Progress'}
                    </h4>
                    <span className="text-[11px] font-mono text-[#65F58A] mt-1 block">
                      {progressData.completed} of {progressData.total} Lessons Done
                    </span>
                  </div>
                </div>

                {/* 2. Lessons Completed Weekly Activity Bar Chart */}
                <div className="p-4 rounded-xl ultra-glass-card border border-[#65F58A]/25 border-t-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#B8E6CE]">Lessons Completed:</span>
                    <span className="text-[#65F58A] font-bold">{progressData.completed}/{progressData.total}</span>
                  </div>

                  {/* Dynamic Vertical Bar Chart */}
                  <div className="h-14 flex items-end justify-between gap-1.5 pt-2 px-1">
                    {[
                      { day: 'M', val: 40 },
                      { day: 'T', val: 70 },
                      { day: 'W', val: 55 },
                      { day: 'T', val: 85 },
                      { day: 'F', val: progressData.percentage || 65 },
                      { day: 'S', val: 90 },
                      { day: 'S', val: 45 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-[#0D2418] rounded-t h-10 flex items-end overflow-hidden">
                          <div
                            className="w-full bg-[#65F58A] rounded-t transition-all duration-500"
                            style={{ height: `${Math.min(100, item.val)}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-[#B8E6CE]">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Module Performance Horizontal Status Bars */}
                <div className="p-4 rounded-xl ultra-glass-card border border-[#65F58A]/25 border-t-white/15 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#B8E6CE]">Module Performance</span>
                    <span className="text-[#35E6B5] font-bold">Passing Pace</span>
                  </div>

                  <div className="space-y-1.5">
                    {(course.modules || []).slice(0, 3).map((mod, idx) => {
                      const modCompleted = mod.lessons?.filter((l) =>
                        enrolment.completed_mandatory_lessons?.includes(l.id)
                      ).length || 0;
                      const modTotal = mod.lessons?.length || 1;
                      const pct = Math.round((modCompleted / modTotal) * 100);

                      return (
                        <div key={mod.id || idx} className="space-y-0.5">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white truncate max-w-[140px]">{mod.title}</span>
                            <span className="text-[#65F58A]">{pct}%</span>
                          </div>
                          <div className="w-full bg-[#0D2418] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#65F58A] h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Workspace: Lesson Notes vs Practical Assignment Submission */}
            <div className="ultra-glass-panel rounded-2xl p-6 border border-[#65F58A]/30 border-t-white/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#65F58A]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeTab === 'notes'
                        ? 'bg-[#65F58A] text-[#071018] shadow-sm'
                        : 'bg-[#0A241A] text-[#B8E6CE] hover:text-white border border-[#65F58A]/25'
                    }`}
                  >
                    Lesson Notes & Terminal Protocols
                  </button>
                  <button
                    onClick={() => setActiveTab('assignment')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'assignment'
                        ? 'bg-amber-500 text-[#071018] shadow-sm'
                        : 'bg-[#0A241A] text-[#B8E6CE] hover:text-white border border-[#65F58A]/25'
                    }`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Practical Assignment Submission</span>
                  </button>
                </div>
              </div>

              {activeTab === 'notes' ? (
                /* Lesson Notes Markdown View */
                <div className="space-y-4">
                  <div
                    className="prose prose-invert max-w-none text-xs sm:text-sm font-sans leading-relaxed text-[#CBD5E1]"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownToHtml(
                        activeLesson?.content ||
                        `### ${activeLesson?.title}\n\nReview defensive cybersecurity protocols, packet inspection steps, and mitigation strategies.\n\n\`\`\`bash\n# Inspect active operational telemetry\nss -tulpn\n\`\`\``
                      )
                    }}
                  />
                </div>
              ) : (
                /* Practical PDF Assignment Submission Card */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#09121B] border border-[#1B2530] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-white font-mono uppercase">
                          Upload Investigation Report (PDF Only)
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#8BA2B5]">
                        Max Size: 25 MB • Signed PDF
                      </span>
                    </div>

                    <div className="border-2 border-dashed border-[#263440] hover:border-amber-400/50 rounded-xl p-6 text-center space-y-2 transition-colors">
                      <UploadCloud className="w-8 h-8 text-amber-400 mx-auto" />
                      <div className="text-xs text-white font-medium">
                        Drag and drop your signed PDF lab submission here
                      </div>
                      <p className="text-[10px] text-[#8BA2B5] font-mono">
                        Supports Wireshark captures, memory analysis screenshots, and MITRE mapping.
                      </p>
                      <label className="inline-block px-4 py-2 mt-2 rounded-lg bg-[#1B2530] hover:bg-[#263440] text-amber-400 border border-amber-400/40 text-xs font-mono font-bold cursor-pointer transition-colors">
                        Browse PDF File
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {uploadingFileName && (
                      <div className="p-3 bg-[#0F1722] border border-amber-500/40 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-mono text-white">
                          <FileText className="w-4 h-4 text-amber-400" />
                          <span>{uploadingFileName}</span>
                        </div>
                        <button
                          onClick={confirmAssignmentSubmit}
                          disabled={submittingPdf}
                          className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#071018] font-mono font-bold text-xs transition-colors flex items-center space-x-1"
                        >
                          {submittingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                          <span>Submit for Review</span>
                        </button>
                      </div>
                    )}

                    {assignmentSubmission && (
                      <div className="p-3.5 rounded-xl bg-[#091712] border border-[#65F58A]/30 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
                          <div>
                            <span className="text-white font-bold block">{assignmentSubmission.file_name}</span>
                            <span className="text-[10px] text-[#8BA2B5]">
                              Submitted {assignmentSubmission.submitted_at?.split('T')[0]} • Status: <strong className="text-[#65F58A]">{assignmentSubmission.status?.toUpperCase()}</strong>
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                          UNDER ASSESSMENT
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ==================================================================== */}
          {/* RIGHT 4 COLUMNS: COURSE CURRICULUM ACCORDION + TECHNICAL RESOURCES   */}
          {/* ==================================================================== */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Curriculum Accordion Container */}
            <div className="ultra-glass-panel rounded-2xl p-5 border border-[#65F58A]/25 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#65F58A]/15">
                <div>
                  <span className="text-[10px] font-mono text-[#B8E6CE] uppercase tracking-wider block">
                    Course Curriculum
                  </span>
                  <h3 className="text-sm font-bold text-white font-lora">
                    {course.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#092218]/60 border border-[#65F58A]/25 text-[#65F58A]">
                  {course.modules?.length || 0} Chapters
                </span>
              </div>

              {/* Accordion Chapter Modules */}
              <div className="space-y-3">
                {(course.modules || []).map((mod, modIdx) => {
                  const isExpanded = expandedModules[mod.id] !== false;
                  const modCompletedCount = (mod.lessons || []).filter((l) =>
                    enrolment.completed_mandatory_lessons?.includes(l.id)
                  ).length;
                  const modTotalCount = mod.lessons?.length || 0;
                  const isModCompleted = modTotalCount > 0 && modCompletedCount >= modTotalCount;
                  const isCurrentMod = mod.lessons?.some((l) => l.id === activeLessonId);

                  return (
                    <div
                      key={mod.id || modIdx}
                      className={`border rounded-xl overflow-hidden transition-all backdrop-blur-md ${
                        isCurrentMod
                          ? 'border-[#65F58A]/45 bg-[#0c2a1e]/60 shadow-[0_0_15px_rgba(101,245,138,0.12)]'
                          : 'border-[#65F58A]/15 bg-[#071912]/50'
                      }`}
                    >
                      {/* Chapter Accordion Header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedModules((prev) => ({
                            ...prev,
                            [mod.id]: !isExpanded
                          }))
                        }
                        className="w-full p-3 flex items-center justify-between text-left hover:bg-[#0e2f22]/50 transition-colors"
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          {isModCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
                          ) : isCurrentMod ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#65F58A] animate-pulse flex-shrink-0" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#65F58A]/30 flex-shrink-0" />
                          )}
                          <span className="text-xs font-bold text-white truncate font-lora">
                            {modIdx + 1}. {mod.title}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span className="text-[10px] font-mono text-[#B8E6CE]">
                            ({modCompletedCount}/{modTotalCount})
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-[#B8E6CE] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Chapter Lessons List */}
                      {isExpanded && (
                        <div className="p-2 space-y-1 bg-[#05130e]/60 border-t border-[#65F58A]/15">
                          {(mod.lessons || []).map((les) => {
                            const globalIdx = allLessons.findIndex((l) => l.id === les.id);
                            const isDone = enrolment.completed_mandatory_lessons?.includes(les.id);
                            const isActive = les.id === activeLessonId;
                            const isUnlocked = isLessonUnlocked(globalIdx);
                            const isAsn = les.type === 'assignment';

                            return (
                              <button
                                key={les.id}
                                disabled={!isUnlocked}
                                onClick={() => {
                                  if (isUnlocked) {
                                    setActiveLessonId(les.id);
                                    if (isAsn) setActiveTab('assignment');
                                  }
                                }}
                                className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                                  isActive
                                    ? 'bg-[#65F58A]/20 border border-[#65F58A]/50 text-white font-bold shadow-[0_0_12px_rgba(101,245,138,0.18)]'
                                    : isUnlocked
                                    ? 'hover:bg-[#0e2f22]/50 text-[#C9EFE0] border border-transparent'
                                    : 'opacity-40 cursor-not-allowed text-[#72A88E] border border-transparent'
                                }`}
                              >
                                <div className="flex items-center space-x-2 truncate pr-2">
                                  {isDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65F58A] flex-shrink-0" />
                                  ) : isUnlocked ? (
                                    isAsn ? (
                                      <FileCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                    ) : (
                                      <Play className="w-3 h-3 text-[#65F58A] flex-shrink-0" />
                                    )
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-[#72A88E] flex-shrink-0" />
                                  )}
                                  <span className="truncate">{les.title}</span>
                                </div>

                                <div className="flex items-center space-x-1.5 flex-shrink-0 text-[10px] font-mono">
                                  {isActive ? (
                                    <span className="text-[#65F58A] font-bold">In Progress</span>
                                  ) : isDone ? (
                                    <span className="text-[#65F58A]">Completed</span>
                                  ) : !isUnlocked ? (
                                    <span className="text-[#72A88E]">Locked</span>
                                  ) : (
                                    <span className="text-[#B8E6CE]">{les.duration || '15 mins'}</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}

                          {/* Chapter Quiz Node */}
                          {mod.quiz && (
                            <Link
                              to={`/student/quiz/${mod.quiz.id}`}
                              className={`w-full p-2.5 rounded-lg text-xs flex items-center justify-between transition-all mt-1 ${
                                (enrolment.passed_quizzes || []).includes(mod.quiz.id)
                                  ? 'bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A]'
                                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate">
                                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="font-semibold truncate">Quiz: {mod.quiz.title}</span>
                              </div>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">
                                {(enrolment.passed_quizzes || []).includes(mod.quiz.id) ? 'PASSED' : '+100 XP'}
                              </span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Final Certification Exam Gate */}
                {course.final_assessment && (
                  <div className="pt-2">
                    <Link
                      to={`/student/final-exam/${enrolmentId}`}
                      className={`w-full p-3 rounded-xl text-xs font-mono font-bold flex items-center justify-between transition-all border ${
                        unlockedFinal.is_unlocked
                          ? 'bg-[#65F58A] text-[#071018] border-[#65F58A] hover:bg-[#52d674] shadow-[0_0_20px_rgba(101,245,138,0.4)]'
                          : 'bg-[#081a13]/60 border-[#65F58A]/25 text-[#B8E6CE] hover:border-[#65F58A]/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {unlockedFinal.is_unlocked ? (
                          <Sparkles className="w-4 h-4 text-[#071018]" />
                        ) : (
                          <Lock className="w-4 h-4 text-[#B8E6CE]" />
                        )}
                        <span>Final Certification Exam</span>
                      </div>
                      <span className="text-[10px]">
                        {unlockedFinal.is_unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Resources Card */}
            <div className="ultra-glass-panel rounded-2xl p-5 border border-[#65F58A]/25 shadow-xl space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#65F58A]/15">
                <Download className="w-4 h-4 text-[#65F58A]" />
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Lesson Reference Resources
                </h4>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'SOC Triage Standard Operating Procedure (PDF)', size: '1.2 MB' },
                  { name: 'Windows Event ID Forensic Reference Matrix', size: '890 KB' },
                  { name: 'Network Packet Carving Cheatsheet', size: '540 KB' }
                ].map((res, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#081a13]/50 border border-[#65F58A]/20 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5 truncate pr-2">
                      <FileDown className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
                      <div className="truncate">
                        <span className="text-white font-medium block truncate text-[11px]">{res.name}</span>
                        <span className="text-[10px] font-mono text-[#B8E6CE]">{res.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadResource(res.name)}
                      className="px-2.5 py-1 rounded bg-[#0a261a]/70 hover:bg-[#0f3827] text-[#65F58A] border border-[#65F58A]/30 text-[10px] font-mono transition-colors flex-shrink-0"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
