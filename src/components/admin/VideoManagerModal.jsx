import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Clock,
  Link as LinkIcon,
  CheckCircle2,
  Tv,
  Film
} from 'lucide-react';

export default function VideoManagerModal({ lesson, onClose, onSave }) {
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || '');
  const [duration, setDuration] = useState(lesson.duration || 30);
  const [chapters, setChapters] = useState(lesson.chapters || [
    { id: 'ch-1', time: 0, label: 'Introduction' }
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [newChapterLabel, setNewChapterLabel] = useState('');
  const [saveNotice, setSaveNotice] = useState(false);
  const timerRef = useRef(null);

  const totalSeconds = duration * 60;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 250); // fast scrub for simulation
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAddChapter = () => {
    if (!newChapterLabel.trim()) return;
    const newCh = {
      id: `ch-${Date.now()}`,
      time: Math.floor(currentTime),
      label: newChapterLabel.trim()
    };
    const updated = [...chapters, newCh].sort((a, b) => a.time - b.time);
    setChapters(updated);
    setNewChapterLabel('');
  };

  const handleDeleteChapter = (id) => {
    setChapters(chapters.filter((ch) => ch.id !== id));
  };

  const handleApplyChanges = () => {
    const updatedLesson = {
      ...lesson,
      videoUrl,
      duration: Number(duration),
      chapters
    };
    onSave(updatedLesson);
    setSaveNotice(true);
    setTimeout(() => {
      setSaveNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl bg-[#0B131B] border border-[#263440] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#263440] bg-[#101923]">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#65F58A]" />
            <div>
              <h2 className="text-sm font-mono font-bold text-white">Video Lesson Studio & Chapter Sequencer</h2>
              <p className="text-[10px] font-mono text-[#94A3B8]">Lesson: {lesson.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Stream Configuration Input */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#94A3B8] font-semibold flex items-center gap-1.5">
                <LinkIcon className="w-3 h-3 text-[#35E6B5]" />
                <span>HLS / CDN Master Stream URL</span>
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://cdn.redkross.tactical/streams/master.m3u8 or MP4 link..."
                className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs font-mono text-white focus:outline-none focus:border-[#65F58A]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#94A3B8] font-semibold flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#65F58A]" />
                <span>Duration (Minutes)</span>
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs font-mono text-white focus:outline-none focus:border-[#65F58A]"
              />
            </div>
          </div>

          {/* Interactive Player Mockup HUD */}
          <div className="rounded-2xl border border-[#263440] bg-black overflow-hidden relative shadow-inner">
            {/* Screen Viewport */}
            <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-[#071018] to-[#04080D]">
              <div className="text-center space-y-2 select-none">
                <Tv className="w-12 h-12 text-[#263440] mx-auto" />
                <p className="text-xs font-mono text-[#94A3B8]">{lesson.title}</p>
                <p className="text-[10px] font-mono text-[#65F58A]">
                  STREAM TIME: {formatTime(currentTime)} / {formatTime(totalSeconds)}
                </p>
              </div>

              {/* Chapter Pips along the Bottom Scrub Bar */}
              <div className="absolute bottom-12 left-4 right-4 h-1.5 bg-[#263440] rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#65F58A] transition-all"
                  style={{ width: `${(currentTime / totalSeconds) * 100}%` }}
                />
              </div>

              {/* Markers Diamonds */}
              <div className="absolute bottom-12 left-4 right-4 pointer-events-none">
                {chapters.map((ch) => {
                  const pct = (ch.time / totalSeconds) * 100;
                  return (
                    <div
                      key={ch.id}
                      className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-sm bg-[#35E6B5] rotate-45 border border-black shadow"
                      style={{ left: `calc(${pct}% - 5px)` }}
                      title={`[${formatTime(ch.time)}] ${ch.label}`}
                    />
                  );
                })}
              </div>

              {/* Transport Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 h-11 bg-[#101923]/90 backdrop-blur-md border-t border-[#263440] px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-[#65F58A] text-[#071018] hover:bg-[#52db74] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-white tabular-nums">
                    {formatTime(currentTime)} / {formatTime(totalSeconds)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#65F58A] border border-[#65F58A]/30">
                    HLS 1080p60
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Markers Sequencer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-white">
                Chapter Markers ({chapters.length})
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8]">
                Scrub video to desired frame and add marker
              </span>
            </div>

            {/* Quick Add at Current Frame */}
            <div className="p-3 rounded-xl bg-[#071018] border border-[#263440] flex items-center gap-2">
              <span className="text-xs font-mono text-[#65F58A] font-bold shrink-0">
                [{formatTime(currentTime)}]
              </span>
              <input
                type="text"
                placeholder="Chapter topic (e.g. Memory Unlinking Phase)..."
                value={newChapterLabel}
                onChange={(e) => setNewChapterLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddChapter();
                }}
                className="flex-1 bg-transparent border-0 text-xs font-mono text-white placeholder-[#94A3B8] focus:outline-none"
              />
              <button
                onClick={handleAddChapter}
                className="px-3 py-1.5 rounded-lg bg-[#35E6B5] hover:bg-[#25c49b] text-[#071018] font-mono text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Marker</span>
              </button>
            </div>

            {/* Markers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="p-2.5 rounded-xl bg-[#101923] border border-[#263440] flex items-center justify-between text-xs font-mono group hover:border-[#65F58A]/30 transition-colors"
                >
                  <div
                    onClick={() => setCurrentTime(ch.time)}
                    className="flex items-center gap-2 cursor-pointer min-w-0"
                  >
                    <span className="text-[#65F58A] font-bold">[{formatTime(ch.time)}]</span>
                    <span className="text-white truncate">{ch.label}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteChapter(ch.id)}
                    className="text-[#94A3B8] hover:text-rose-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#263440] bg-[#101923] flex items-center justify-between">
          <div>
            {saveNotice && (
              <span className="text-xs font-mono text-[#65F58A] flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Video chapter sequence synced!</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-[#94A3B8] hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyChanges}
              className="px-5 py-2 rounded-xl bg-[#65F58A] hover:bg-[#52db74] text-[#071018] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Save Video Settings</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
