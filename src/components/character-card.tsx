'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Actor } from '@/data/actors';
import { useAudio } from '@/context/AudioContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Play, Pause, Heart } from 'lucide-react';

interface CharacterCardProps {
  actor: Actor;
  viewMode?: 'grid' | 'list';
  index?: number;
}

export function CharacterCard({ actor, viewMode = 'grid', index = 0 }: CharacterCardProps) {
  const { 
    currentActor, 
    isPlaying, 
    playActorDialogue, 
    togglePlayPause 
  } = useAudio();

  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageError, setImageError] = useState<boolean>(false);

  const isCurrent = currentActor?.id === actor.id;
  const isActorFav = isFavorite(actor.id);
  const totalDialogues = actor.dialogues.length;

  // Initials for avatar fallback
  const initials = actor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlayPause();
    } else {
      playActorDialogue(actor);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(actor.id);
  };

  const delayMs = Math.min(index * 30, 300);

  if (viewMode === 'list') {
    return (
      <div
        style={{ animationDelay: `${delayMs}ms` }}
        className={`card-entrance group relative rounded-[16px] border border-[#151515] bg-[#E7E3DB] transition-all duration-200 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-[2px_2px_0px_#151515] hover:shadow-[4px_4px_0px_#151515] hover:-translate-y-0.5 ${
          isCurrent ? 'ring-2 ring-[#151515] bg-[#ded9cf]' : ''
        }`}
      >
        {/* Left: Avatar with Overlapping Play Button */}
        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
          <div className="relative flex-shrink-0">
            <div
              onClick={handlePlayButtonClick}
              title={`Play ${actor.name}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 border border-[#151515] bg-[#F3F0E8] cursor-pointer transition-all"
            >
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#151515] flex items-center justify-center border border-[#151515]">
                {actor.image && !imageError ? (
                  <Image
                    src={actor.image}
                    alt={actor.name}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-[#151515] flex items-center justify-center font-black text-base sm:text-lg text-[#F3F0E8]">
                    {initials}
                  </div>
                )}

                {/* Animated Equalizer Wave Overlay when playing */}
                {isCurrent && isPlaying && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="flex items-end gap-1 h-5">
                      <span className="w-1 bg-[#F3F0E8] rounded-full eq-bar-1" />
                      <span className="w-1 bg-[#D97745] rounded-full eq-bar-3" />
                      <span className="w-1 bg-[#F3F0E8] rounded-full eq-bar-5" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Overlapping Play Button */}
            <button
              onClick={handlePlayButtonClick}
              aria-label={isCurrent && isPlaying ? `Pause ${actor.name}` : `Play ${actor.name}`}
              title={isCurrent && isPlaying ? 'Pause' : 'Play voice'}
              className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] transition-colors border border-[#151515] flex items-center justify-center shadow-sm soundboard-tap cursor-pointer z-10"
            >
              {isCurrent && isPlaying ? (
                <Pause className="w-3 h-3 fill-current" />
              ) : (
                <Play className="w-3 h-3 fill-current translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Actor Info */}
          <div className="min-w-0">
            <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-[#151515] truncate">
              {actor.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F3F0E8] text-[#151515] border border-[#151515]">
                {totalDialogues} {totalDialogues === 1 ? 'DIALOGUE' : 'DIALOGUES'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePlayButtonClick}
            aria-label={isCurrent && isPlaying ? `Pause ${actor.name}` : `Play ${actor.name}`}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-[#151515] transition-colors cursor-pointer soundboard-tap ${
              isCurrent
                ? 'bg-[#151515] text-[#F3F0E8]'
                : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
            }`}
          >
            {isCurrent && isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleToggleFavorite}
            aria-label={isActorFav ? 'Remove from favorites' : 'Add to favorites'}
            className={`w-9 h-9 rounded-full flex items-center justify-center border border-[#151515] transition-colors cursor-pointer ${
              isActorFav
                ? 'bg-[#151515] text-[#D97745]'
                : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isActorFav ? 'fill-[#D97745] text-[#D97745]' : ''
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div
      style={{ animationDelay: `${delayMs}ms` }}
      className={`card-entrance group relative rounded-[16px] border border-[#151515] bg-[#E7E3DB] transition-all duration-200 p-5 sm:p-6 flex flex-col items-center text-center justify-between overflow-hidden shadow-[2px_2px_0px_#151515] hover:shadow-[4px_4px_0px_#151515] hover:-translate-y-0.5 ${
        isCurrent ? 'ring-2 ring-[#151515] bg-[#ded9cf]' : ''
      }`}
    >
      {/* Top-Right Favorite Button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={handleToggleFavorite}
          aria-label={isActorFav ? 'Remove from favorites' : 'Add to favorites'}
          className={`w-8 h-8 rounded-full flex items-center justify-center border border-[#151515] transition-colors cursor-pointer ${
            isActorFav
              ? 'bg-[#151515] text-[#D97745]'
              : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isActorFav ? 'fill-[#D97745] text-[#D97745]' : ''
            }`}
          />
        </button>
      </div>

      {/* Profile Image with Overlapping Play Button */}
      <div className="relative my-2 select-none flex-shrink-0">
        <div
          onClick={handlePlayButtonClick}
          title={`Play ${actor.name}`}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border border-[#151515] bg-[#F3F0E8] transition-all cursor-pointer"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#151515] flex items-center justify-center border border-[#151515]">
            {actor.image && !imageError ? (
              <Image
                src={actor.image}
                alt={actor.name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#151515] flex items-center justify-center font-black text-xl text-[#F3F0E8]">
                {initials}
              </div>
            )}

            {/* Animated Equalizer Wave Overlay when playing */}
            {isCurrent && isPlaying && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                <div className="flex items-end gap-1 h-6">
                  <span className="w-1 bg-[#F3F0E8] rounded-full eq-bar-1" />
                  <span className="w-1 bg-[#D97745] rounded-full eq-bar-3" />
                  <span className="w-1 bg-[#F3F0E8] rounded-full eq-bar-5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overlapping Circular Play Button */}
        <button
          onClick={handlePlayButtonClick}
          aria-label={isCurrent && isPlaying ? `Pause ${actor.name}` : `Play ${actor.name}`}
          title={isCurrent && isPlaying ? 'Pause' : 'Play voice'}
          className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] transition-colors border border-[#151515] flex items-center justify-center shadow-sm soundboard-tap cursor-pointer z-10"
        >
          {isCurrent && isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Info: Actor Name & Number of Dialogues */}
      <div className="w-full mt-2">
        <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-[#151515] truncate">
          {actor.name}
        </h3>

        <div className="flex justify-center mt-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F3F0E8] text-[#151515] border border-[#151515]">
            {totalDialogues} {totalDialogues === 1 ? 'DIALOGUE' : 'DIALOGUES'}
          </span>
        </div>
      </div>
    </div>
  );
}
