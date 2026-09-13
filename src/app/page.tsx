'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { actors, Actor } from '@/data/actors';
import { CharacterCard } from '@/components/character-card';
import { SearchBar } from '@/components/search-bar';
import { useAudio } from '@/context/AudioContext';
import { 
  LayoutGrid, 
  List, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack, 
  Shuffle, 
  Repeat, 
  Download, 
  FileText, 
  SearchX, 
  Disc, 
  ArrowDownRight, 
  Volume2, 
  VolumeX,
  Sparkles
} from 'lucide-react';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [turntableImageError, setTurntableImageError] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

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
    isLooping,
    togglePlayPause,
    replay,
    playNextDialogue,
    playPreviousDialogue,
    shufflePlay,
    toggleLoop,
    seek,
    setVolume,
    toggleMute,
    playActorDialogue,
    downloadCurrentDialogue,
    setTranscriptOpen
  } = useAudio();

  // Filter actors only by actor names and dialogue text
  const filteredActors = useMemo(() => {
    if (!searchQuery.trim()) return actors;
    const q = searchQuery.toLowerCase();

    return actors.filter((a) => {
      const nameMatch = a.name.toLowerCase().includes(q);
      const dialogueMatch = a.dialogues.some((d) =>
        d.text.toLowerCase().includes(q)
      );

      return nameMatch || dialogueMatch;
    });
  }, [searchQuery]);

  const handleDownload = () => {
    setDownloading(true);
    downloadCurrentDialogue();
    setTimeout(() => setDownloading(false), 1200);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Selected actor or fallback to first actor
  const activeActor: Actor | null = currentActor || (actors.length > 0 ? actors[0] : null);

  const initials = activeActor?.name
    ? activeActor.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'DB';

  const scrollToAllActors = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('all-actors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* ========================================================================= */}
      {/* TOP SECTION: LARGE "NOW PLAYING" PLAYER AREA                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT: Square Turntable / Vinyl Record Deck */}
        <div className="lg:col-span-5 rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-5 sm:p-7 shadow-[2px_2px_0px_#151515] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle Turntable Deck Corner Accents */}
          <div className="absolute top-3 left-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#151515]" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#151515]">
              MODEL DB-33
            </span>
          </div>

          {/* Tonearm Visual at Top Right */}
          <div className="absolute top-3 right-4 flex items-center gap-1.5 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-[#A8A39A] border border-[#151515]" />
            <div 
              className={`w-12 h-[2px] bg-[#151515] transition-transform duration-700 origin-left ${
                isPlaying ? 'rotate-12' : '-rotate-6'
              }`} 
            />
          </div>

          {/* Turntable Platter Mat & Vinyl Disc */}
          <div className="my-3 relative flex items-center justify-center">
            {/* Turntable Platter Ring */}
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-[#151515] bg-[#1f1e1b] flex items-center justify-center p-2 shadow-inner">
              {/* Vinyl Record Disc: Rotates slowly ONLY while audio is playing */}
              <div 
                className={`w-full h-full rounded-full vinyl-deck-grooves border border-[#151515] flex items-center justify-center relative transition-transform ${
                  isPlaying ? 'animate-vinyl-spin' : ''
                }`}
              >
                {/* Grooves highlight rings */}
                <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />

                {/* Center Record Label: Selected Actor Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#151515] bg-[#F3F0E8] overflow-hidden relative flex items-center justify-center shadow-md">
                  {activeActor?.image && !turntableImageError ? (
                    <Image
                      src={activeActor.image}
                      alt={activeActor.name}
                      fill
                      sizes="96px"
                      className="object-cover rounded-full"
                      onError={() => setTurntableImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#151515] flex items-center justify-center font-black text-lg text-[#F3F0E8]">
                      {initials}
                    </div>
                  )}

                  {/* Center Spindle Hole */}
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-[#151515] border border-white shadow-inner z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Live Audio Status Badge */}
          <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F0E8] border border-[#151515] text-[10px] font-mono font-bold text-[#151515]">
            <span className={`w-2 h-2 rounded-full border border-[#151515] ${isPlaying ? 'bg-[#D97745] animate-ping' : 'bg-[#A8A39A]'}`} />
            <span>{isPlaying ? 'ROTATING • 33 RPM' : 'TURNTABLE IDLE • PAUSED'}</span>
          </div>
        </div>

        {/* RIGHT: "Select a Voice" Panel with Expanded Actor Quick-Select Pills */}
        <div 
          id="voices-section" 
          className="lg:col-span-7 rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-5 sm:p-7 shadow-[2px_2px_0px_#151515] flex flex-col justify-between space-y-5"
        >
          {/* Header Row: "Select a Voice" + Subtitle + "View all" link */}
          <div className="flex items-center justify-between border-b border-[#151515] pb-3.5">
            <div>
              <h2 className="font-black text-lg sm:text-2xl tracking-tight uppercase text-[#151515] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D97745]" />
                <span>Select a Voice</span>
              </h2>
              <p className="text-xs font-mono text-[#A8A39A] mt-1">
                Choose an actor to explore their dialogues.
              </p>
            </div>

            <a
              href="#all-actors"
              onClick={scrollToAllActors}
              className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-[#151515] hover:text-[#D97745] underline underline-offset-4 cursor-pointer"
            >
              <span>View all</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Visually Balanced, Expanded Quick-Select Area */}
          <div className="flex-1 flex flex-col justify-center space-y-3 py-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-[#151515]/70">
              <span>QUICK-SELECT ACTOR ARCHIVE</span>
              <span>{actors.length} VOICES</span>
            </div>

            {/* Generous Grid of Horizontal Actor Quick-Select Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {actors.map((actor) => {
                const isSelected = activeActor?.id === actor.id;
                const isThisPlaying = isSelected && isPlaying;
                const totalTracks = actor.dialogues.length;

                return (
                  <button
                    key={actor.id}
                    onClick={() => playActorDialogue(actor)}
                    className={`flex items-center justify-between p-2 sm:p-2.5 pr-3.5 rounded-full border border-[#151515] transition-all soundboard-tap cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#151515] text-[#F3F0E8] shadow-[2px_2px_0px_#151515]'
                        : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Avatar */}
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#151515] bg-[#E7E3DB] flex-shrink-0">
                        {actor.image ? (
                          <Image
                            src={actor.image}
                            alt={actor.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-black text-xs">
                            {actor.name[0]}
                          </div>
                        )}

                        {/* Playing wave overlay */}
                        {isThisPlaying && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D97745] animate-ping" />
                          </div>
                        )}
                      </div>

                      {/* Name & Subtitle */}
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-tight block truncate">
                          {actor.name}
                        </span>
                        <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#D97745]' : 'text-[#A8A39A]'}`}>
                          {totalTracks} {totalTracks === 1 ? 'dialogue' : 'dialogues'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Play Status Icon */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-current flex-shrink-0 text-xs ${
                      isSelected ? 'bg-white/10' : 'bg-[#E7E3DB]'
                    }`}>
                      {isThisPlaying ? (
                        <Pause className="w-2.5 h-2.5 fill-current" />
                      ) : (
                        <Play className="w-2.5 h-2.5 fill-current translate-x-0.2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Issue Tagline */}
          <div className="border-t border-[#151515] pt-3 flex items-center justify-between text-[11px] font-mono text-[#A8A39A]">
            <span>EDITORIAL MUSIC-MAGAZINE ISSUE #01</span>
            <span className="text-[#D97745] font-bold">MONOCHROME TURNTABLE</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PLAYBACK CONTROLS: FULL SUITE DIRECTLY CONNECTED TO AUDIO LOGIC           */}
      {/* ========================================================================= */}
      <div className="rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-5 sm:p-7 shadow-[2px_2px_0px_#151515] space-y-4">
        {/* Row 1: Actor Name, Spoken Dialogue Quote, and Track Number (No Genre Badge) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#151515] pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#151515]" />
              <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight text-[#151515] truncate">
                {currentActor?.name || 'Pick a voice to begin'}
              </h3>
            </div>

            <p className="mt-1 text-sm sm:text-base font-serif italic text-[#151515] truncate max-w-3xl">
              {currentDialogue ? `“${currentDialogue.text}”` : 'Click any character or playlist track below to start playback.'}
            </p>
          </div>

          {currentActor && (
            <div className="flex-shrink-0 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#F3F0E8] border border-[#151515] text-[#151515]">
              TRACK {dialogueIndex + 1} OF {totalDialogues}
            </div>
          )}
        </div>

        {/* Row 2: Elapsed Time, Waveform Bars, Progress Bar, and Duration */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#151515] w-10 text-right">
              {formatTime(currentTime)}
            </span>

            {/* Scrubbable Progress Track */}
            <div
              className="flex-1 h-2.5 bg-[#F3F0E8] border border-[#151515] rounded-full cursor-pointer relative overflow-hidden group"
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
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#151515] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <span className="font-mono text-xs font-bold text-[#151515] w-10">
              {formatTime(duration)}
            </span>

            {/* Animated Waveform Equalizer Bars */}
            <div className="hidden sm:flex items-end gap-1 h-5 pl-2">
              <span className={`w-1 bg-[#151515] rounded-full ${isPlaying ? 'eq-bar-1' : 'h-1.5'}`} />
              <span className={`w-1 bg-[#D97745] rounded-full ${isPlaying ? 'eq-bar-2' : 'h-2.5'}`} />
              <span className={`w-1 bg-[#151515] rounded-full ${isPlaying ? 'eq-bar-3' : 'h-1.5'}`} />
              <span className={`w-1 bg-[#D97745] rounded-full ${isPlaying ? 'eq-bar-4' : 'h-3'}`} />
              <span className={`w-1 bg-[#151515] rounded-full ${isPlaying ? 'eq-bar-5' : 'h-1.5'}`} />
            </div>
          </div>
        </div>

        {/* Row 3: Buttons (Shuffle, Previous, Large Circular Play/Pause, Next, Repeat, Quote, Download, Volume) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Main Playback Center Controls */}
          <div className="flex items-center gap-2 sm:gap-3 mx-auto sm:mx-0">
            {/* Shuffle */}
            <button
              onClick={shufflePlay}
              title="Shuffle: Pick random voice clip"
              className="p-2 sm:p-2.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous */}
            <button
              onClick={playPreviousDialogue}
              title="Previous clip"
              className="p-2 sm:p-2.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Large Circular Play / Pause Button */}
            <button
              onClick={togglePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-all flex items-center justify-center border-2 border-[#151515] shadow-md soundboard-tap cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={playNextDialogue}
              title="Next clip"
              className="p-2 sm:p-2.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Repeat / Loop */}
            <button
              onClick={toggleLoop}
              title={isLooping ? 'Looping enabled' : 'Enable loop'}
              className={`p-2 sm:p-2.5 rounded-full border border-[#151515] transition-colors soundboard-tap cursor-pointer ${
                isLooping
                  ? 'bg-[#151515] text-[#D97745]'
                  : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Replay */}
            <button
              onClick={replay}
              title="Replay from start"
              className="p-2 sm:p-2.5 rounded-full border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Right Action Controls: Quote, Download, Volume */}
          <div className="flex items-center gap-2 sm:gap-3 mx-auto sm:mx-0">
            {/* Quote Modal */}
            <button
              onClick={() => setTranscriptOpen(true)}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase border border-[#151515] bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors flex items-center gap-1.5 soundboard-tap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Quote</span>
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase border border-[#151515] bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors flex items-center gap-1.5 soundboard-tap cursor-pointer"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
              <span>Save</span>
            </button>

            {/* Volume */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#151515]">
              <button
                onClick={toggleMute}
                className="text-[#151515] hover:text-[#D97745] p-1 cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#D97745]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-16 h-1.5 accent-[#151515] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTOR SECTION: "FEATURED VOICES" PLAYLIST TILES & ROWS                    */}
      {/* ========================================================================= */}
      <div id="all-actors" className="space-y-4 pt-2">
        {/* Section Heading & View Mode Switch */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#151515] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-[#151515] flex items-center gap-2">
              <Disc className="w-5 h-5 text-[#D97745]" />
              <span>Featured Voices</span>
            </h2>
            <p className="text-xs font-mono text-[#A8A39A] mt-0.5">
              CLICK ANY ACTOR TILE OR PLAY BUTTON TO TRIGGER DIALOGUES
            </p>
          </div>

          {/* View Mode Toggle: Grid or List */}
          <div className="flex items-center p-1 rounded-full border border-[#151515] bg-[#E7E3DB]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              aria-label="Grid view"
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#151515] text-[#F3F0E8] shadow-sm'
                  : 'text-[#151515] hover:bg-[#F3F0E8]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              aria-label="List view"
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#151515] text-[#F3F0E8] shadow-sm'
                  : 'text-[#151515] hover:bg-[#F3F0E8]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Search Bar (Searches only actor names and dialogue text) */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredActors.length}
        />
      </div>

      {/* ========================================================================= */}
      {/* ACTOR LIST / GRID                                                         */}
      {/* ========================================================================= */}
      {filteredActors.length === 0 ? (
        <div className="rounded-[16px] border border-[#151515] p-12 text-center flex flex-col items-center justify-center bg-[#E7E3DB] space-y-3 shadow-[2px_2px_0px_#151515]">
          <SearchX className="w-12 h-12 text-[#A8A39A]" />
          <h3 className="text-lg font-black uppercase text-[#151515]">No characters found</h3>
          <p className="text-sm font-mono text-[#151515]/80 max-w-sm">
            {searchQuery
              ? `No character or dialogue matched "${searchQuery}". Try a different search term or reset search.`
              : 'No characters available in the archive.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors border border-[#151515] soundboard-tap cursor-pointer"
            >
              Reset Search
            </button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
              : 'flex flex-col space-y-4'
          }
        >
          {filteredActors.map((actor, idx) => (
            <CharacterCard
              key={actor.id}
              actor={actor}
              viewMode={viewMode}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
