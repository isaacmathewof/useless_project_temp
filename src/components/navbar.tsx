'use client';

import React from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Disc, Heart, Volume2 } from 'lucide-react';

export function Navbar() {
  const { currentActor, currentDialogue, isPlaying } = useAudio();
  const { favoriteIds } = useFavorites();

  return (
    <header className="w-full bg-[#E7E3DB] border-b border-[#151515] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Editorial Masthead / Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-black text-base sm:text-lg tracking-tight uppercase text-[#151515]">
              Dialogue Box
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#F3F0E8] border border-[#151515] font-bold text-[#151515]">
              ARCHIVE
            </span>
          </Link>
        </div>

        {/* Center Live Ticker (when playing) */}
        {currentActor && currentDialogue ? (
          <div className="hidden md:flex items-center gap-2 text-xs font-mono truncate max-w-md px-3 py-1 rounded-full bg-[#F3F0E8] border border-[#151515]">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#D97745] animate-ping' : 'bg-[#A8A39A]'}`} />
            <span className="font-bold text-[#151515] truncate">{currentActor.name}:</span>
            <span className="text-[#151515]/80 truncate italic">&ldquo;{currentDialogue.text}&rdquo;</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A8A39A]">
            <Disc className="w-3.5 h-3.5" />
            <span>MALAYALAM DIALOGUE ARCHIVE • 33 ICONIC VOICES</span>
          </div>
        )}

        {/* Right Quick Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-[#151515] bg-[#F3F0E8] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${favoriteIds.length > 0 ? 'fill-[#D97745] text-[#D97745]' : ''}`} />
            <span className="hidden sm:inline">Saved:</span>
            <span>{favoriteIds.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
