import { Actor, Dialogue } from '@/data/actors';

export type { Actor, Dialogue };


export interface CurrentPlayingState {
  actor: Actor;
  dialogue: Dialogue;
  dialogueIndex: number;
  totalDialogues: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}
