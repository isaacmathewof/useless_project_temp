# Dialogue Box 🎙️

## Basic Details

### Team Name: Amicis

### Team Members

- Team Lead: Isaac Mathew — Mar Athanasius College of Engineering
- Member 2: Neha Maria Pullatt — Mar Athanasius College of Engineering
### Project Description

Dialogue Box is a mobile-friendly Malayalam dialogue soundboard and audio archive. Users can browse featured voices, play and cycle through dialogue clips, search the collection, control playback, save favourite voices, view transcripts, and download the active clip.

### The Problem (that doesn't exist)

Everyone has experienced the tragedy of knowing the perfect Malayalam film dialogue but being unable to reproduce the timing, tone, or dramatic pause in front of friends. Re-enacting it from memory is risky; the awkward silence afterwards is even riskier.

### The Solution (that nobody asked for)

Dialogue Box turns that pressure into a tap. Pick a voice, and the app plays its dialogues in sequence—complete with a vinyl-style player, shuffle, repeat, saved voices, and transcript tools—so the punchline arrives with significantly less personal embarrassment.

## Technical Details

### Technologies/Components Used

For Software:

- **Languages:** TypeScript, JavaScript, CSS
- **Framework:** Next.js (App Router), React
- **Libraries:** Lucide React, Tailwind CSS, canvas-confetti, lamejs
- **Browser APIs:** HTML5 Audio, Web Speech API, Clipboard API, Local Storage
- **Tools:** Node.js, npm, ESLint, Git

### Key Features

- Browse Malayalam dialogue voices in responsive grid or list layouts.
- Play a voice's clips sequentially by tapping it repeatedly.
- Use play/pause, replay, previous/next, shuffle, repeat, seek, mute, and volume controls.
- Search voices and dialogue transcript text.
- Save favourite voices locally and revisit them on the **Saved Voices** page.
- Open a transcript modal to copy or read a dialogue aloud.
- Download the currently selected audio clip.

### Implementation

The application stores actor metadata and local audio/image paths in `src/data/actors.ts`. A React audio context owns one HTML5 audio player and synchronizes playback state across the interface. The favourites context persists selected voice IDs in browser local storage.

## Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd useless_project_temp

# Install dependencies
npm install
```

## Run

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

For a production build:

```bash
npm run build
npm start
```

### Screenshots
<img width="1280" height="764" alt="Screenshot 2026-09-13 163556" src="https://github.com/user-attachments/assets/d600bea6-112b-4a38-890f-f61b0c7a99fe" />
<img width="1280" height="764" alt="Screenshot 2026-09-13 163549" src="https://github.com/user-attachments/assets/42ac6177-58c4-4a35-96eb-9c9fc185e314" />
