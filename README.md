# Dialogue Box 🎙️

## Basic Details

### Team Name: Amicis

### Team Members

- Team Lead: Neha Maria Pullatt — Mar Athanasius College of Engineering
- Member 2: Isaac Mathew — Mar Athanasius College Of Engineering<img width="1280" height="764" alt="Screenshot 2026-09-13 163556" src="https://github.com/user-attachments/assets/30602f70-6cf6-484a-9311-a9c4054f0fd7" />
<img width="1280" height="764" alt="Screenshot 2026-09-13 163549" src="https://github.com/user-attachments/assets/5a3b74d1-fb5c-42cb-adf7-32d5aff18a76" />


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

## Project Documentation

### Screenshots

Add screenshots to a `docs/screenshots/` folder and replace the placeholders below.

![Home screen](docs/screenshots/home.png)
*The home screen shows the turntable-style player, voice quick-select panel, and dialogue archive.*

![Voice archive](docs/screenshots/voice-archive.png)
*The voice archive lets users search, switch between grid and list views, play clips, and save a voice.*

![Saved voices](docs/screenshots/saved-voices.png)
*The Saved Voices page displays the user's locally stored favourite dialogue voices.*

### Workflow

```mermaid
flowchart LR
