'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Volume2, 
  VolumeX, 
  Download, 
  FileText, 
  AlertCircle,
  X
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function StickyAudioPlayer() {
  const {
    currentActor,
    currentDialogue,
    dialogueIndex,
    totalDialogues,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackError,
    togglePlayPause,
    replay,
    playNextDialogue,
    playPreviousDialogue,
    seek,
    setVolume,
    toggleMute,
    downloadCurrentDialogue,
    setTranscriptOpen,
    clearPlaybackError
  } = useAudio();

  const [imageError, setImageError] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!currentActor || !currentDialogue) {
    return null;
  }

  const handleDownloadClick = () => {
    setDownloading(true);
    downloadCurrentDialogue();
    setTimeout(() => setDownloading(false), 1200);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const initials = currentActor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div 
      className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 bg-[#E7E3DB] border-t border-[#151515] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:pl-20 select-none"
    >
      {playbackError && (
        <div className="bg-[#151515] text-[#D97745] text-xs px-4 py-1 flex items-center justify-between font-mono">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{playbackError}</span>
          </div>
          <button onClick={clearPlaybackError} className="p-0.5 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Scrubbable Progress Bar */}
      <div 
        className="group relative w-full h-1 bg-[#F3F0E8] border-b border-[#151515] cursor-pointer overflow-hidden hover:h-2 transition-all"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          seek(ratio * (duration || 1));
        }}
      >
        <div
          className="h-full bg-[#D97745] transition-all duration-75 relative"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Player Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Dialogue title */}
        <div className="flex items-center gap-2.5 min-w-0 max-w-[45%] sm:max-w-[35%]">
          <div className="relative flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-[#151515] bg-[#F3F0E8]">
            {currentActor.image && !imageError ? (
              <Image
                src={currentActor.image}
                alt={currentActor.name}
                fill
                sizes="36px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#151515] flex items-center justify-center font-black text-xs text-[#F3F0E8]">
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-black uppercase text-[#151515] truncate">
                {currentActor.name}
              </p>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#F3F0E8] text-[#151515] border border-[#151515] hidden sm:inline-block">
                {dialogueIndex + 1}/{totalDialogues}
              </span>
            </div>
            <p className="text-[11px] font-serif italic text-[#151515] truncate">
              &ldquo;{currentDialogue.text}&rdquo;
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={playPreviousDialogue}
            title="Previous track"
            className="p-1.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlayPause}
            title={isPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 rounded-full bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors border border-[#151515] flex items-center justify-center soundboard-tap cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={playNextDialogue}
            title="Next track"
            className="p-1.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono text-[#151515] hidden md:inline-block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTranscriptOpen(true)}
            className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            <span className="hidden sm:inline">Quote</span>
          </button>

          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase border border-[#151515] bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
