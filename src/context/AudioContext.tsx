'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Actor, Dialogue, actors } from '@/data/actors';

interface AudioContextType {
  currentActor: Actor | null;
  currentDialogue: Dialogue | null;
  dialogueIndex: number;
  totalDialogues: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  transcriptOpen: boolean;
  playbackError: string | null;
  playActorDialogue: (actor: Actor) => void;
  playSpecificDialogue: (actor: Actor, dialogue: Dialogue) => void;
  togglePlayPause: () => void;
  replay: () => void;
  playNextDialogue: () => void;
  playPreviousDialogue: () => void;
  shufflePlay: () => void;
  toggleLoop: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  downloadCurrentDialogue: () => void;
  setTranscriptOpen: (open: boolean) => void;
  clearPlaybackError: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentActor, setCurrentActor] = useState<Actor | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [transcriptOpen, setTranscriptOpen] = useState<boolean>(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize single HTML5 Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setPlaybackError(null);
    };
    const handleEnded = () => {
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };
    const handleError = () => {
      setIsPlaying(false);
      setPlaybackError('Unable to load or play audio clip. Check file path.');
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sync loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const startPlayback = (actor: Actor, dialogue: Dialogue, index: number) => {
    if (!audioRef.current) return;
    setPlaybackError(null);

    // Stop current audio immediately
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setCurrentActor(actor);
    setCurrentDialogue(dialogue);
    setDialogueIndex(index);

    audioRef.current.src = dialogue.audio;
    audioRef.current.load();

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error or autoplay blocked:', err);
          setIsPlaying(false);
          setPlaybackError('Tap Play to listen.');
        });
    }
  };

  /**
   * Main soundboard behavior:
   * Clicking an actor:
   * - First click (or different actor): plays dialogues[0].
   * - Clicking same actor again: cycles to dialogues[1], dialogues[2], etc.
   * - After the final dialogue: returns to dialogues[0].
   */
  const playActorDialogue = (actor: Actor) => {
    if (!actor.dialogues || actor.dialogues.length === 0) {
      setPlaybackError(`No dialogues found for ${actor.name}.`);
      return;
    }

    let nextIndex = 0;
    if (currentActor?.id === actor.id) {
      // Same actor clicked again -> cycle to next dialogue
      nextIndex = (dialogueIndex + 1) % actor.dialogues.length;
    } else {
      // Different actor clicked -> start at first dialogue
      nextIndex = 0;
    }

    const nextDialogue = actor.dialogues[nextIndex];
    startPlayback(actor, nextDialogue, nextIndex);
  };

  const playSpecificDialogue = (actor: Actor, dialogue: Dialogue) => {
    const index = actor.dialogues.findIndex((d) => d.id === dialogue.id);
    startPlayback(actor, dialogue, index >= 0 ? index : 0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (!currentDialogue) {
      // If nothing selected yet, start with first actor
      if (actors.length > 0 && actors[0].dialogues.length > 0) {
        playActorDialogue(actors[0]);
      }
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.warn);
    }
  };

  const replay = () => {
    if (!audioRef.current || !currentDialogue) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(console.warn);
  };

  const playNextDialogue = () => {
    if (!currentActor || !currentActor.dialogues.length) {
      if (actors.length > 0) playActorDialogue(actors[0]);
      return;
    }
    const nextIdx = (dialogueIndex + 1) % currentActor.dialogues.length;
    startPlayback(currentActor, currentActor.dialogues[nextIdx], nextIdx);
  };

  const playPreviousDialogue = () => {
    if (!currentActor || !currentActor.dialogues.length) {
      if (actors.length > 0) playActorDialogue(actors[0]);
      return;
    }
    const prevIdx = (dialogueIndex - 1 + currentActor.dialogues.length) % currentActor.dialogues.length;
    startPlayback(currentActor, currentActor.dialogues[prevIdx], prevIdx);
  };

  const shufflePlay = () => {
    if (!actors.length) return;
    // Pick random actor
    const randomActorIdx = Math.floor(Math.random() * actors.length);
    const targetActor = actors[randomActorIdx];
    if (!targetActor.dialogues.length) return;
    const randomDlgIdx = Math.floor(Math.random() * targetActor.dialogues.length);
    startPlayback(targetActor, targetActor.dialogues[randomDlgIdx], randomDlgIdx);
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  /**
   * Safe file download for currently playing audio
   */
  const downloadCurrentDialogue = () => {
    if (!currentDialogue || !currentActor) return;
    const safeActorName = currentActor.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = currentDialogue.audio.split('.').pop() || 'mp3';
    const fileName = `${safeActorName}_${currentDialogue.id}.${ext}`;

    const link = document.createElement('a');
    link.href = currentDialogue.audio;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalDialogues = currentActor?.dialogues?.length || 0;

  return (
    <AudioContext.Provider
      value={{
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
        transcriptOpen,
        playbackError,
        playActorDialogue,
        playSpecificDialogue,
        togglePlayPause,
        replay,
        playNextDialogue,
        playPreviousDialogue,
        shufflePlay,
        toggleLoop,
        seek,
        setVolume,
        toggleMute,
        downloadCurrentDialogue,
        setTranscriptOpen,
        clearPlaybackError: () => setPlaybackError(null)
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
