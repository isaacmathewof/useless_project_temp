import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { AudioProvider } from '@/context/AudioContext';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { StickyAudioPlayer } from '@/components/sticky-audio-player';
import { TranscriptModal } from '@/components/transcript-modal';

export const metadata: Metadata = {
  title: 'Dialogue Box | Retro Monochrome Audio Player',
  description: 'Editorial music-player archive of Malayalam film dialogue soundboards, featuring iconic voices, vinyl turntable player, and audio quotes.',
  keywords: ['soundboard', 'character dialogue', 'malayalam actors', 'audio clips', 'vinyl player', 'dialogue box'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#151515] selection:text-[#F3F0E8] bg-[#F3F0E8] text-[#151515]">
        <ThemeProvider>
          <FavoritesProvider>
            <AudioProvider>
              <Sidebar />
              <div className="flex-1 flex flex-col lg:pl-20 pb-28 lg:pb-12 min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <StickyAudioPlayer />
                <TranscriptModal />
              </div>
            </AudioProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
