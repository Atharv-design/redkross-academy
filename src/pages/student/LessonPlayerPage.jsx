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
  RotateCcw
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

  // Active lesson state (default to first incomplete or first lesson)
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [progressData, setProgressData] = useState({ percentage: 0, completed: 0, total: 0 });
  const [unlockedFinal, setUnlockedFinal] = useState({ is_unlocked: false, reasons: [] });
  // Responsive mobile tab switcher ('lesson' | 'syllabus' | 'resources')
  const [mobileTab, setMobileTab] = useState('lesson');
  const [savingProgress, setSavingProgress] = useState(false);

  // Video Telemetry & Playback Gating State
  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [watchProgressMap, setWatchProgressMap] = useState({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (enrolment && allLessons.length > 0) {
      const firstIncomplete = allLessons.find(
        (l) => !enrolment.completed_mandatory_lessons.includes(l.id)
      );
      setActiveLessonId(firstIncomplete ? firstIncomplete.id : allLessons[0].id);
      setProgressData(mockEngine.getCourseProgress(enrolmentId));
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));
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
      <div className="min-h-screen bg-[#071018] py-24 text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2 font-royal">Enrolment Not Found</h2>
        <p className="text-xs text-slate-400 mb-4 font-mono">Please verify that you are enrolled in this training course.</p>
        <Link to="/student" className="px-5 py-2.5 bg-redkross-600 rounded-lg text-white text-xs font-semibold inline-flex items-center space-x-2 font-royal">
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const isLessonCompleted = enrolment.completed_mandatory_lessons.includes(activeLesson?.id);

  // Sequential Unlock Rule: Lesson 0 is unlocked. Lesson N is unlocked IF all previous lessons (0..N-1) are completed
  const isLessonUnlocked = (idx) => {
    if (idx === 0) return true;
    for (let i = 0; i < idx; i++) {
      if (!enrolment.completed_mandatory_lessons.includes(allLessons[i].id)) {
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
  const hasVideo = Boolean(resolvedVideoUrl);
  // Strict completion gating: requires >= 80% video watch if video exists
  const canMarkComplete = !hasVideo || isLessonCompleted || currentWatchPct >= 80;

  // Handle Video Time Update Telemetry
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

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Cloud Stream Embed Resolver (YouTube / Vimeo / Cloudflare)
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

  // Simulated Telemetry Checkpoint for Cloud Iframe Embeds
  const handleSimulateEmbedTelemetry = () => {
    if (!activeLesson) return;
    setWatchProgressMap((prev) => ({
      ...prev,
      [activeLesson.id]: {
        percentage: 100,
        maxTime: 600,
        duration: 600
      }
    }));
  };

  const handleMarkComplete = async () => {
    if (!activeLesson || !canMarkComplete) return;
    setSavingProgress(true);

    try {
      // Complete in backend PostgreSQL and local mock engine
      await apiClient.completeLesson(enrolmentId, activeLesson.id);
      const newProgress = mockEngine.getCourseProgress(enrolmentId);
      setProgressData(newProgress);
      refreshBalance();
      setUnlockedFinal(mockEngine.checkFinalAssessmentUnlock(enrolmentId));

      // Auto-advance to next lesson if available
      if (activeIndex < allLessons.length - 1) {
        setActiveLessonId(allLessons[activeIndex + 1].id);
        setMobileTab('lesson');
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071018] flex flex-col">
      {/* Top Bar Navigation */}
      <div className="h-14 bg-surface-card border-b border-surface-border px-3 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center space-x-2 sm:space-x-3 truncate">
          <Link
            to="/student"
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-slate-300 transition-colors flex-shrink-0"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] xs:max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <div className="text-[10px] text-slate-400 font-mono truncate">
              {activeIndex + 1}/{allLessons.length} • {activeLesson?.title}
            </div>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="hidden sm:inline text-slate-400">Progress:</span>
            <span className="text-redkross-400 font-bold tabular-nums">{progressData.percentage}%</span>
          </div>
          <div className="w-16 sm:w-28 h-2 rounded-full bg-surface-100 overflow-hidden border border-surface-border">
            <div
              className="h-full bg-gradient-to-r from-redkross-600 to-rose-400 rounded-full transition-all duration-300"
              style={{ width: `${progressData.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Segmented Tab Bar (< lg screens) */}
      <div className="lg:hidden bg-surface-card/90 border-b border-surface-border px-3 py-2 flex items-center justify-between gap-1.5 sticky top-14 z-10 backdrop-blur-md">
        <button
          onClick={() => setMobileTab('lesson')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'lesson'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Lesson</span>
        </button>
        <button
          onClick={() => setMobileTab('syllabus')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'syllabus'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Modules</span>
        </button>
        <button
          onClick={() => setMobileTab('resources')}
          className={`flex-1 py-1.5 px-2 rounded-md text-[11px] font-mono font-medium flex items-center justify-center space-x-1.5 transition-all ${
            mobileTab === 'resources'
              ? 'bg-redkross-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-slate-200 bg-surface-100/50'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resources</span>
        </button>
      </div>

      {/* Responsive Workstation Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Curriculum Syllabus Navigation */}
        <div
          className={`w-full lg:w-80 bg-surface-card border-r border-surface-border overflow-y-auto p-4 space-y-6 ${
            mobileTab === 'syllabus' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Course Syllabus</span>
            <span className="text-slate-500">{course.modules.length} Modules</span>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-300 font-mono uppercase tracking-wider px-2 py-1 bg-surface-100/60 rounded flex items-center justify-between">
                  <span className="truncate">{mod.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{mod.lessons.length} Lessons</span>
                </div>

                <div className="space-y-1 pl-1">
                  {mod.lessons.map((les) => {
                    const globalIdx = allLessons.findIndex((l) => l.id === les.id);
                    const isDone = enrolment.completed_mandatory_lessons.includes(les.id);
                    const isActive = les.id === activeLessonId;
                    const isUnlocked = isLessonUnlocked(globalIdx);

                    return (
                      <button
                        key={les.id}
                        disabled={!isUnlocked}
                        onClick={() => {
                          if (isUnlocked) {
                            setActiveLessonId(les.id);
                            setMobileTab('lesson');
                          }
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-redkross-600/15 border border-redkross-600/40 text-white font-semibold'
                            : isUnlocked
                            ? 'hover:bg-surface-100 text-slate-300'
                            : 'opacity-40 cursor-not-allowed text-slate-500 bg-surface-100/20'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          ) : isUnlocked ? (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0 text-[10px] font-mono text-slate-400">
                          {les.video_url && <Play className="w-2.5 h-2.5 text-[#65F58A]" />}
                          <span>{les.duration}</span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Chapter Quiz Trigger */}
                  {mod.quiz && (
                    <Link
                      to={`/student/quiz/${enrolmentId}/${mod.quiz.id}`}
                      className={`w-full p-2.5 rounded-lg text-xs flex items-center justify-between transition-all mt-1 ${
                        enrolment.passed_quizzes.includes(mod.quiz.id)
                          ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Award className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-semibold truncate">Chapter Quiz: {mod.quiz.title}</span>
                      </div>
                      {enrolment.passed_quizzes.includes(mod.quiz.id) ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">PASSED</span>
                      ) : (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">+100 T</span>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Final Assessment Gate Trigger */}
            {course.final_assessment && (
              <div className="pt-4 border-t border-surface-border">
                <Link
                  to={`/student/final-exam/${enrolmentId}`}
                  className={`w-full p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                    unlockedFinal.is_unlocked
                      ? 'bg-redkross-600 hover:bg-redkross-700 text-white shadow-lg cyber-glow-red'
                      : 'bg-surface-100/60 border border-surface-border text-slate-400 cursor-pointer hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {unlockedFinal.is_unlocked ? (
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Final Certification Exam</span>
                  </div>
                  <span className="text-[10px] font-mono">
                    {unlockedFinal.is_unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </Link>
                {!unlockedFinal.is_unlocked && (
                  <div className="text-[10px] text-slate-400 font-mono mt-1.5 leading-tight">
                    Requires 100% lessons + all quizzes passed + 80% token quota.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center Column: Active Lesson Viewport */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 ${
            mobileTab === 'lesson' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          {activeLesson ? (
            <>
              {/* Progress Bar & Telemetry (User Enhancement 3) */}
              <div className="p-3.5 rounded-xl bg-[#101923] border border-[#263440] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-[#94A3B8]">Course Progress:</span>
                  <span className="text-[#65F58A] font-bold">{progressData.percentage}%</span>
                  <span className="text-[#64748B]">({progressData.completed}/{progressData.total} Lessons)</span>
                </div>
                <div className="w-full sm:w-48 bg-[#071018] rounded-full h-2 overflow-hidden border border-[#263440]">
                  <div
                    className="bg-gradient-to-r from-[#65F58A] to-[#35E6B5] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressData.percentage}%` }}
                  />
                </div>
              </div>

              {/* Embedded Video Player & Playback Gating (User Enhancement 3 & PRD Specification) */}
              <div className="bg-[#071018] rounded-2xl p-3 sm:p-4 border border-[#263440] shadow-2xl relative overflow-hidden space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  {hasVideo ? (
                    embedInfo?.type === 'youtube' || embedInfo?.type === 'vimeo' ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={embedInfo.embedUrl}
                          title={activeLesson.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-full group">
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
                          onError={(e) => {
                            console.warn('Video failed, applying local fallback:', e.currentTarget.src);
                            if (!e.currentTarget.src.includes('/assets/sample-lesson.mp4')) {
                              e.currentTarget.src = '/assets/sample-lesson.mp4';
                              e.currentTarget.load();
                            }
                          }}
                          poster={course.art || '/assets/course-art/art-01.jpg'}
                          className="w-full h-full object-cover"
                        >
                          <source src={resolvedVideoUrl} type="video/mp4" />
                          <source src="/assets/sample-lesson.mp4" type="video/mp4" />
                        </video>

                        {/* Central Play Overlay Button */}
                        {!isVideoPlaying && (
                          <button
                            type="button"
                            onClick={() => {
                              if (videoRef.current) {
                                videoRef.current.play().catch((err) => console.warn('Play error:', err));
                              }
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-all cursor-pointer z-10"
                            aria-label="Play Lesson Video"
                          >
                            <div className="w-16 h-16 rounded-full bg-[#101923]/90 border-2 border-[#65F58A] flex items-center justify-center text-[#65F58A] shadow-[0_0_30px_rgba(101,245,138,0.5)] group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 ml-1 fill-[#65F58A]" />
                            </div>
                          </button>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#101923] to-[#071018] p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#1B2530] border border-[#65F58A]/40 flex items-center justify-center text-[#65F58A] mb-3 shadow-[0_0_20px_rgba(101,245,138,0.2)]">
                        <Play className="w-7 h-7 ml-1" />
                      </div>
                      <div className="font-royal text-base font-bold text-white mb-1">
                        {activeLesson.title}
                      </div>
                      <div className="text-xs font-mono text-[#94A3B8]">
                        Text-Based Curriculum Unit • {activeLesson.duration} • Interactive Defensive Lab Below
                      </div>
                    </div>
                  )}
                </div>

                {/* Player Toolbar: Speed Controls & Stream Sync */}
                {hasVideo && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#263440] text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span className="text-[#94A3B8]">Speed:</span>
                      {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedChange(rate)}
                          className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                            playbackSpeed === rate
                              ? 'bg-[#1B2530] text-[#65F58A] border border-[#65F58A]/40 font-bold'
                              : 'text-slate-400 hover:text-white bg-[#101923]'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>

                    {embedInfo?.type === 'youtube' || embedInfo?.type === 'vimeo' ? (
                      <button
                        onClick={handleSimulateEmbedTelemetry}
                        className="px-2.5 py-1 rounded-lg bg-[#1B2530] hover:bg-[#263440] text-[#35E6B5] border border-[#35E6B5]/30 text-[11px] font-mono flex items-center gap-1 transition-all"
                        title="Sync playback progress from cloud stream"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Sync Telemetry ({currentWatchPct}%)</span>
                      </button>
                    ) : (
                      <div className="text-[11px] text-[#94A3B8]">
                        Watched: <strong className="text-white">{currentWatchPct}%</strong> / 80% gate
                      </div>
                    )}
                  </div>
                )}

                {/* Strict Playback Gating Indicator Badge */}
                {hasVideo && (
                  <div
                    className={`p-3 rounded-xl border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      canMarkComplete
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {canMarkComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
                      )}
                      <span>
                        {canMarkComplete
                          ? 'Playback requirement satisfied (≥ 80% watched). Ready to mark complete.'
                          : `Strict Playback Gating Enforced: Watch at least 80% of video to unlock the next lesson.`}
                      </span>
                    </div>
                    <div className="font-bold flex items-center gap-1.5 self-end sm:self-auto">
                      <span>{currentWatchPct}% / 80%</span>
                      {canMarkComplete && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">UNLOCKED</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Header */}
              <div className="pb-4 sm:pb-6 border-b border-surface-border">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#65F58A] mb-2">
                  <span className="truncate max-w-[200px]">{activeLesson.module_title}</span>
                  <span>•</span>
                  <span>{activeLesson.duration}</span>
                  {activeLesson.is_mandatory && (
                    <span className="px-2 py-0.5 rounded bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-[10px] font-bold">
                      MANDATORY
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 sm:mb-3 font-royal">
                  {activeLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  {activeLesson.summary}
                </p>
              </div>

              {/* Formatted Content Body with Enhanced Code Syntax Highlighting */}
              <div className="max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4">
                <div
                  className="bg-[#101923] border border-[#263440] rounded-2xl p-5 sm:p-7 leading-relaxed font-lora shadow-xl"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownToHtml(activeLesson?.content || 'No lesson content provided.')
                  }}
                />
              </div>

              {/* Lesson Action Footer */}
              <div className="pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                  {isLessonCompleted ? (
                    <span className="flex items-center space-x-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span>Pending Completion</span>
                  )}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={handleMarkComplete}
                    disabled={savingProgress || !canMarkComplete}
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-xs transition-all flex items-center justify-center space-x-2 ${
                      isLessonCompleted
                        ? 'bg-surface-100 hover:bg-surface-200 text-slate-300 border border-surface-border'
                        : canMarkComplete
                        ? 'bg-redkross-600 hover:bg-redkross-700 text-white shadow-lg hover:cyber-glow-red'
                        : 'bg-surface-100/50 border border-surface-border text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!canMarkComplete ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Watch 80% to Complete ({currentWatchPct}%)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {savingProgress
                            ? 'Saving to Database...'
                            : isLessonCompleted
                            ? 'Marked as Complete (Advance)'
                            : 'Mark Complete & Next Lesson'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-400">Select a lesson to begin.</div>
          )}
        </div>

        {/* Right Column: Downloadable Resources & Cheat Sheets */}
        <div
          className={`w-full lg:w-72 bg-surface-card border-l border-surface-border p-5 space-y-6 overflow-y-auto ${
            mobileTab === 'resources' ? 'block' : 'hidden lg:block'
          } lg:max-h-[calc(100vh-3.5rem)]`}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Download className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span>Lesson Resources</span>
          </div>

          <div className="space-y-3">
            {(activeLesson?.resources || [
              { name: 'SOC Triage Standard Operating Procedure (PDF)', size: '1.4 MB' },
              { name: 'Windows Event ID Reference Matrix', size: '890 KB' }
            ]).map((res, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface-100/70 border border-surface-border hover:border-slate-600 transition-colors space-y-1.5"
              >
                <div className="text-xs font-semibold text-white flex items-start space-x-2">
                  <FileText className="w-4 h-4 text-redkross-400 flex-shrink-0 mt-0.5" />
                  <span>{res.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pl-6">
                  <span>{res.size}</span>
                  <button
                    onClick={() => alert(`Simulating download for ${res.name}`)}
                    className="text-[#35E6B5] hover:underline"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Token Milestone Notice */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-amber-300">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Token Milestones</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Every 20% course progress milestone rewards +50 RedKross Tokens to your wallet!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
