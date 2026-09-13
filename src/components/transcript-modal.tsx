'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { X, Quote, Volume2, Square, Copy, Check } from 'lucide-react';

export function TranscriptModal() {
  const { currentActor, currentDialogue, transcriptOpen, setTranscriptOpen } = useAudio();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [transcriptOpen, currentDialogue]);

  if (!transcriptOpen || !currentActor || !currentDialogue) {
    return null;
  }

  const handleCopy = () => {
    if (currentDialogue.text) {
      navigator.clipboard.writeText(currentDialogue.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReadAloud = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (currentDialogue.text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentDialogue.text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-6 shadow-[4px_4px_0px_#151515] text-[#151515] transition-all"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#151515] pb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#151515] bg-[#F3F0E8]">
              {currentActor.image ? (
                <Image
                  src={currentActor.image}
                  alt={currentActor.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#151515] flex items-center justify-center font-bold text-[#F3F0E8]">
                  {currentActor.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight leading-tight">{currentActor.name}</h3>
              <p className="text-[11px] font-mono text-[#A8A39A] uppercase mt-0.5">
                Spoken Dialogue Quote
              </p>
            </div>
          </div>

          <button
            onClick={() => setTranscriptOpen(false)}
            className="p-1 rounded-md text-[#151515] hover:bg-[#F3F0E8] border border-transparent hover:border-[#151515] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dialogue Text Quote Box */}
        <div className="mt-5 relative p-5 rounded-[12px] bg-[#F3F0E8] border border-[#151515]">
          <Quote className="w-8 h-8 text-[#A8A39A]/40 absolute -top-3 -left-2 rotate-180" />
          <p className="text-base sm:text-lg italic font-serif leading-relaxed text-[#151515] pl-3">
            &ldquo;{currentDialogue.text}&rdquo;
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#151515] pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReadAloud}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase flex items-center gap-1.5 border border-[#151515] transition-colors soundboard-tap cursor-pointer ${
                isSpeaking
                  ? 'bg-[#151515] text-[#D97745]'
                  : 'bg-[#F3F0E8] text-[#151515] hover:bg-[#151515] hover:text-[#F3F0E8]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D97745]" />
                  <span>Read</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase flex items-center gap-1.5 border border-[#151515] bg-[#F3F0E8] hover:bg-[#151515] hover:text-[#F3F0E8] transition-colors soundboard-tap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D97745]" />
                  <span className="text-[#D97745]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setTranscriptOpen(false)}
            className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-[#151515] text-[#F3F0E8] hover:bg-[#D97745] hover:text-white transition-colors border border-[#151515] soundboard-tap cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
