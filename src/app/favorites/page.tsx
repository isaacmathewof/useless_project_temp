'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { actors } from '@/data/actors';
import { useFavorites } from '@/context/FavoritesContext';
import { CharacterCard } from '@/components/character-card';
import { Heart, ArrowLeft, Disc } from 'lucide-react';

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  const favoritedActors = useMemo(() => {
    return actors.filter((a) => favoriteIds.includes(a.id));
  }, [favoriteIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#151515] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="p-2 rounded-[10px] border border-[#151515] bg-[#E7E3DB] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#151515] flex items-center gap-2.5">
              <Heart className="w-6 h-6 fill-[#D97745] text-[#D97745]" />
              <span>Saved Voices</span>
            </h1>
          </div>
          <p className="text-xs font-mono text-[#A8A39A] mt-1 pl-10 uppercase">
            YOUR CURATED PLAYLIST OF MALAYALAM DIALOGUE ICONS
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#E7E3DB] text-[#151515] border border-[#151515] shadow-sm">
          {favoritedActors.length} {favoritedActors.length === 1 ? 'TRACKLIST' : 'TRACKLISTS'}
        </span>
      </div>

      {/* Content */}
      {favoritedActors.length === 0 ? (
        <div 
          className="rounded-[16px] border border-[#151515] p-12 text-center flex flex-col items-center justify-center bg-[#E7E3DB] space-y-4 shadow-[2px_2px_0px_#151515]"
        >
          <div className="w-16 h-16 rounded-full bg-[#F3F0E8] border border-[#151515] flex items-center justify-center text-[#151515]">
            <Heart className="w-8 h-8 stroke-1 text-[#A8A39A]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black uppercase text-[#151515]">No favorites saved yet</h3>
            <p className="text-sm font-mono text-[#151515]/80 max-w-sm">
              Click the heart icon on any character card to add their dialogue soundboard to your collection.
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors border border-[#151515] soundboard-tap"
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Discover Voices</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {favoritedActors.map((actor, idx) => (
            <CharacterCard key={actor.id} actor={actor} viewMode="grid" index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
