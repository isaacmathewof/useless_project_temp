'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';
import { useAudio } from '@/context/AudioContext';
import { 
  Home, 
  Heart, 
  Layers, 
  SlidersHorizontal, 
  X, 
  Volume2, 
  VolumeX, 
  Disc,
  Info
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();
  const { volume, setVolume, isMuted, toggleMute, isPlaying } = useAudio();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isHome = pathname === '/';
  const isFavorites = pathname === '/favorites';

  const handleVoicesClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById('voices-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP SLIM LEFT SIDEBAR (lg and up)                                      */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 bg-[#E7E3DB] border-r border-[#151515] flex-col items-center justify-between py-6 z-40 select-none">
        {/* Logo / Monogram */}
        <Link 
          href="/" 
          className="group flex flex-col items-center gap-1.5 focus:outline-none"
          title="Dialogue Box — Editorial Audio Archive"
        >
          <div className="w-12 h-12 rounded-[12px] bg-[#151515] text-[#F3F0E8] flex items-center justify-center font-black text-lg tracking-tighter shadow-sm group-hover:bg-[#D97745] transition-colors">
            DB
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#151515]">
            VOL.01
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-6">
          {/* Home */}
          <Link
            href="/"
            title="Home"
            className={`w-11 h-11 rounded-[12px] flex flex-col items-center justify-center transition-all ${
              isHome
                ? 'bg-[#151515] text-[#F3F0E8] shadow-sm'
                : 'text-[#151515] hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515]'
            }`}
          >
            <Home className="w-5 h-5" />
          </Link>

          {/* Favourites */}
          <Link
            href="/favorites"
            title="Favourites"
            className={`w-11 h-11 rounded-[12px] flex flex-col items-center justify-center relative transition-all ${
              isFavorites
                ? 'bg-[#151515] text-[#F3F0E8] shadow-sm'
                : 'text-[#151515] hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515]'
            }`}
          >
            <Heart className={`w-5 h-5 ${favoriteIds.length > 0 && isFavorites ? 'fill-[#D97745] text-[#D97745]' : ''}`} />
            {favoriteIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D97745] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#151515]">
                {favoriteIds.length}
              </span>
            )}
          </Link>

          {/* Select a Voice */}
          <Link
            href="/#voices-section"
            onClick={handleVoicesClick}
            title="Select a Voice"
            className="w-11 h-11 rounded-[12px] flex flex-col items-center justify-center text-[#151515] hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515] transition-all cursor-pointer"
          >
            <Layers className="w-5 h-5" />
          </Link>

          {/* Settings */}
          <button
            onClick={() => setSettingsOpen(true)}
            title="Settings & Audio"
            className="w-11 h-11 rounded-[12px] flex flex-col items-center justify-center text-[#151515] hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515] transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </nav>

        {/* Bottom Audio Indicator */}
        <div className="flex flex-col items-center gap-1">
          <div 
            className={`w-3 h-3 rounded-full border border-[#151515] transition-all ${
              isPlaying ? 'bg-[#D97745] animate-ping' : 'bg-[#A8A39A]'
            }`}
            title={isPlaying ? 'Audio Playing' : 'Idle'}
          />
          <span className="text-[8px] font-mono font-bold text-[#151515]">
            {isPlaying ? 'ON' : 'OFF'}
          </span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR (< lg screens)                                */}
      {/* ========================================================================= */}
      <nav className="flex lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#E7E3DB] border-t border-[#151515] items-center justify-around z-40 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] select-none">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-bold transition-all ${
            isHome ? 'text-[#151515] bg-[#F3F0E8] border border-[#151515]' : 'text-[#A8A39A] hover:text-[#151515]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Favourites */}
        <Link
          href="/favorites"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-bold relative transition-all ${
            isFavorites ? 'text-[#151515] bg-[#F3F0E8] border border-[#151515]' : 'text-[#A8A39A] hover:text-[#151515]'
          }`}
        >
          <Heart className={`w-5 h-5 ${favoriteIds.length > 0 && isFavorites ? 'fill-[#D97745] text-[#D97745]' : ''}`} />
          <span className="text-[10px] mt-0.5">Favourites</span>
          {favoriteIds.length > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#D97745] text-white text-[8px] font-black rounded-full flex items-center justify-center border border-[#151515]">
              {favoriteIds.length}
            </span>
          )}
        </Link>

        {/* Voices */}
        <Link
          href="/#voices-section"
          onClick={handleVoicesClick}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-bold text-[#A8A39A] hover:text-[#151515] transition-all"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Voices</span>
        </Link>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-xs font-bold text-[#A8A39A] hover:text-[#151515] transition-all cursor-pointer"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Settings</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* RETRO SETTINGS MODAL                                                      */}
      {/* ========================================================================= */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-6 shadow-[4px_4px_0px_#151515] text-[#151515]">
            <div className="flex items-center justify-between border-b border-[#151515] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] bg-[#151515] text-[#F3F0E8] flex items-center justify-center font-bold text-xs">
                  DB
                </div>
                <h3 className="font-black text-lg tracking-tight uppercase">Player Settings</h3>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1 rounded-md hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515] transition-all cursor-pointer"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              {/* Volume Slider */}
              <div className="p-3.5 rounded-[12px] bg-[#F3F0E8] border border-[#151515] space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#D97745]" />
                    Master Volume
                  </span>
                  <span className="font-mono text-xs">{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-md border border-[#151515] bg-[#E7E3DB] hover:bg-[#151515] hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-[#D97745]" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 accent-[#D97745] cursor-pointer"
                  />
                </div>
              </div>

              {/* Archive Info */}
              <div className="p-3.5 rounded-[12px] bg-[#F3F0E8] border border-[#151515] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#151515]">
                  <Info className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>Editorial Soundboard Archive</span>
                </div>
                <p className="text-xs text-[#151515]/80 leading-relaxed">
                  Dialogue Box is an editorial audio magazine archiving iconic Malayalam film quotes. Click on any character or vinyl record to trigger dialogues.
                </p>
              </div>

              {/* Version pill */}
              <div className="flex items-center justify-between text-xs text-[#A8A39A] font-mono pt-2">
                <span>STYLE: RETRO MONOCHROME</span>
                <span className="text-[#D97745] font-bold">ACCENT #D97745</span>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              className="mt-6 w-full py-2.5 rounded-[12px] bg-[#151515] text-[#F3F0E8] font-bold text-sm hover:bg-[#D97745] transition-colors border border-[#151515] cursor-pointer soundboard-tap"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
