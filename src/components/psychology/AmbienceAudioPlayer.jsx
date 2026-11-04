import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1, Sliders } from 'lucide-react';

/**
 * AmbienceAudioPlayer
 * Sleek, audible, and calming 528 Hz Solfeggio Healing Frequency Player.
 * Features:
 * - Pure 528 Hz harmonic tone + 4 Hz Theta binaural beat + warm Tibetan singing bowl
 * - Mastered at 44.1kHz stereo, crystal clear & soothing
 * - Deterministic play/pause with zero race conditions (default 72% volume)
 * - Rock-solid volume popover with:
 *     1) Zero-gap continuous hit area (never vanishes when moving cursor)
 *     2) 450ms debounced hover grace period
 *     3) Dedicated volume click button that pins the slider open
 *     4) Click-outside detection to cleanly close
 *     5) Presets (Mute, 40%, 72%, 100%)
 * - Web Audio API synthesizer fallback
 * - Obsidian & turquoise glassmorphic pill matching RedKross Psychology theme
 */
export default function AmbienceAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const containerRef = useRef(null);

  const startSynth = () => {
    try {
      if (synthRef.current) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const masterGain = ctx.createGain();
      const currentVol = isMuted ? 0 : volume;
      masterGain.gain.setValueAtTime(currentVol * 0.45, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      const osc528 = ctx.createOscillator();
      osc528.type = 'sine';
      osc528.frequency.setValueAtTime(528, ctx.currentTime);

      const osc524 = ctx.createOscillator();
      osc524.type = 'sine';
      osc524.frequency.setValueAtTime(524, ctx.currentTime);

      const osc264 = ctx.createOscillator();
      osc264.type = 'sine';
      osc264.frequency.setValueAtTime(264, ctx.currentTime);
      const gain264 = ctx.createGain();
      gain264.gain.setValueAtTime(0.40, ctx.currentTime);
      osc264.connect(gain264);
      gain264.connect(filter);

      const osc132 = ctx.createOscillator();
      osc132.type = 'sine';
      osc132.frequency.setValueAtTime(132, ctx.currentTime);
      const gain132 = ctx.createGain();
      gain132.gain.setValueAtTime(0.30, ctx.currentTime);
      osc132.connect(gain132);
      gain132.connect(filter);

      osc528.connect(filter);
      osc524.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc528.start();
      osc524.start();
      osc264.start();
      osc132.start();

      synthRef.current = { ctx, masterGain, oscs: [osc528, osc524, osc264, osc132] };
    } catch (e) {
      console.warn('Web Audio synth fallback error:', e);
    }
  };

  const stopSynth = () => {
    if (synthRef.current) {
      try {
        const { ctx, oscs } = synthRef.current;
        oscs.forEach(o => {
          try { o.stop(); o.disconnect(); } catch {}
        });
        try { ctx.close(); } catch {}
      } catch {}
      synthRef.current = null;
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused || synthRef.current) {
      audio.pause();
      stopSynth();
      setIsPlaying(false);
    } else {
      const targetVol = isMuted ? 0 : volume;
      audio.volume = targetVol;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('HTML5 audio play blocked, starting Web Audio API fallback:', err);
          startSynth();
          setIsPlaying(true);
        });
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (synthRef.current) {
      const { ctx, masterGain } = synthRef.current;
      masterGain.gain.setValueAtTime(newVol * 0.45, ctx.currentTime);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(volume > 0 ? volume : 0.72);
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
      if (synthRef.current) {
        const { ctx, masterGain } = synthRef.current;
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
      }
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setShowVolumeSlider(true);
  };

  const handleMouseLeave = () => {
    if (isPinned) return; // If user clicked to pin, keep it open
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 450);
  };

  const toggleVolumePopover = (e) => {
    e.stopPropagation();
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (showVolumeSlider) {
      setShowVolumeSlider(false);
      setIsPinned(false);
    } else {
      setShowVolumeSlider(true);
      setIsPinned(true);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowVolumeSlider(false);
        setIsPinned(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
      stopSynth();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Native HTML5 Audio Element with Loop */}
      <audio
        ref={audioRef}
        src="/assets/528hz-healing-ambience.wav"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Volume Slider Card with ZERO-GAP padding container */}
      {showVolumeSlider && (
        <div 
          className="absolute bottom-full right-0 pb-3 z-50 pointer-events-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-3.5 rounded-2xl bg-[#0E0C09]/95 backdrop-blur-2xl border border-[#FF7A00]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-col gap-2.5 min-w-[190px] animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Header with Volume Label and Percentage */}
            <div className="flex items-center justify-between text-[11px] font-royal uppercase tracking-wider text-slate-300">
              <span className="text-[#FFA439] font-bold flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#FF7A00]" />
                <span>Audio Volume</span>
              </span>
              <span className="font-mono text-xs text-amber-200 font-semibold">
                {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Slider Control Row */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-[#FFA439] transition-colors p-1 rounded-lg hover:bg-[#FF7A00]/10 focus:outline-none"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4 text-[#FFA439]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#FFA439]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF7A00] focus:outline-none"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex justify-between gap-1 pt-1.5 border-t border-[#FF7A00]/20">
              {[
                { label: 'Mute', val: 0 },
                { label: '40%', val: 0.40 },
                { label: '72%', val: 0.72 },
                { label: '100%', val: 1.0 }
              ].map((p) => {
                const isActive = p.val === 0 ? isMuted : (volume === p.val && !isMuted);
                return (
                  <button
                    key={p.label}
                    onClick={() => {
                      if (p.val === 0) toggleMute({ stopPropagation: () => {} });
                      else handleVolumeChange(p.val);
                    }}
                    className={`text-[10px] font-mono px-2 py-1 rounded-md transition-all ${
                      isActive
                        ? 'bg-[#FF7A00]/30 text-amber-200 border border-[#FFA439]/60 font-bold' 
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Control Pill - Pure Icon Minimal Design */}
      <div className="flex items-center p-1.5 rounded-full bg-[#0E0C09]/95 backdrop-blur-2xl border border-[#FF7A00]/40 hover:border-[#FFA439] shadow-[0_8px_32px_rgba(0,0,0,0.65)] hover:shadow-[0_0_25px_rgba(255,122,0,0.35)] transition-all duration-300 ring-1 ring-white/5">
        
        {/* Play / Pause Circular Icon Button */}
        <button
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${
            isPlaying 
              ? 'bg-gradient-to-r from-[#FF7A00] to-[#E56A00] text-black shadow-[0_0_15px_rgba(255,122,0,0.6)] scale-105' 
              : 'bg-[#FF7A00]/20 text-[#FFA439] border border-[#FF7A00]/40 hover:bg-[#FF7A00]/30 hover:scale-105'
          }`}
          title={isPlaying ? "Pause 528 Hz Ambience" : "Play 528 Hz Ambience"}
          aria-label={isPlaying ? "Pause 528 Hz Ambience" : "Play 528 Hz Ambience"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Vertical Divider */}
        <div className="w-[1px] h-5 bg-[#FF7A00]/25 mx-1" />

        {/* Dedicated Volume Icon Button */}
        <button
          onClick={toggleVolumePopover}
          className={`w-9 h-9 rounded-full text-slate-300 hover:text-amber-200 hover:bg-[#FF7A00]/15 transition-all focus:outline-none cursor-pointer flex items-center justify-center ${
            showVolumeSlider ? 'text-[#FFA439] bg-[#FF7A00]/20' : ''
          }`}
          title="Adjust Volume"
          aria-label="Adjust Volume"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : volume < 0.5 ? (
            <Volume1 className="w-4 h-4 text-[#FFA439]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#FFA439]" />
          )}
        </button>
      </div>
    </div>
  );
}
