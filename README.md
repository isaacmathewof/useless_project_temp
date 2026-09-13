# 🎙️ Dialogue Box — Character Soundboard & Audio Portal

A mobile-first web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Users browse fictional character profiles, trigger authorized audio dialogue clips with interactive "tap-to-cycle" soundboard playback, download audio files, search and filter by genre, save favorites, and manage content via a protected Administrator CMS.

---

## ✏️ How to Edit Actors, Images & Audio

All character profiles, dialogue lines, and audio files are configured in a single, easy-to-edit file:
👉 **[src/data/actors.ts](file:///c:/Users/Isaac%20Mathew/Desktop/useless/dialogue-box/src/data/actors.ts)**

### Format:
```typescript
{
  id: "actor-1",
  name: "Alexander Vance",
  image: "/images/actors/actor-1.jpg",
  dialogues: [
    {
      id: "dialogue-1-1",
      genre: "Comedy",
      text: "I told my doctor I broke my arm in two places...",
      audio: "/audio/actor-1-comedy-1.mp3"
    }
  ]
}
```

### Steps to Replace Content:
1. **Change Names & Text**: Simply edit the `"name"`, `"text"`, and `"genre"` fields in `src/data/actors.ts`.
2. **Change Images**: Drop your image file (e.g. `actor-1.jpg`) into `public/images/actors/` and update the `"image"` path.
3. **Change Audio Files**: Drop your MP3 files into `public/audio/` and update the `"audio"` path (e.g. `"/audio/my-clip.mp3"`).
4. **Sequential Playback**: The soundboard plays the dialogues in the exact order they appear in the array on repeated clicks!

---

### 2. Protected Admin / Content Management Dashboard (`/admin`)
- **Profile Management (`/admin/profiles`)**:
  - Create, edit, and delete character profiles.
  - Upload avatar images to Supabase Storage `avatars` bucket or provide an image URL.
  - Manage bio and multi-genre tags.
  - Toggle published/draft status.
- **Audio Clip Management & Sequencing (`/admin/clips`)**:
  - Filter by character.
  - **Sequential Reordering**: Use Up / Down arrow buttons to change the exact order clips play on repeated clicks.
  - Single clip creator: Title, audio upload, dialogue transcript, genre, sort order, and published toggle.
  - **Multi-Clip Bulk Upload**: Upload multiple audio files in sequence with one click.
  - Built-in audio preview player to listen to clips before publishing.
- **Authentication**:
  - Supabase Auth (Email + Password) with `admin` role validation via Row-Level Security (RLS).
  - Built-in Demo Admin bypass mode for offline/local evaluation.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS soundboard design system
- **Icons**: Lucide React
- **Database & Auth**: Supabase (PostgreSQL with Row-Level Security)
- **Storage**: Supabase Storage (`audio-files`, `avatars`)
- **Audio Engine**: Native HTML5 Audio with Web Speech API assistance

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 18+ (tested with Node v20/v26)
- npm or pnpm

### 2. Installation
```bash
# Navigate to project directory
cd dialogue-box

# Install dependencies
npm install

# Generate royalty-free audio files into public/audio (if not already present)
node scripts/generate-audio.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Configuration & Setup

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. Under **Project Settings** > **API**, copy:
   - **Project URL**
   - **Project API Anon Key**

### 2. Configure Environment Variables
Create a file named `.env.local` in `dialogue-box`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run Database Migrations (Schema & RLS)
1. In your Supabase Dashboard, open the **SQL Editor**.
2. Copy and execute the contents of [supabase/migrations/01_schema.sql](file:///c:/Users/Isaac%20Mathew/Desktop/useless/dialogue-box/supabase/migrations/01_schema.sql).
   This creates:
   - `profiles` table
   - `audio_clips` table
   - `favorites` table
   - `user_roles` table
   - Row-Level Security (RLS) policies
   - Storage buckets: `audio-files` and `avatars`

### 4. Run Seed Data
In the **SQL Editor**, execute [supabase/seed.sql](file:///c:/Users/Isaac%20Mathew/Desktop/useless/dialogue-box/supabase/seed.sql) to populate:
- 6 fictional characters (*Alexander Vance, Marcus Drake, Maya Sterling, Elena Rostova, Rohan Kapoor, Viktor Stone*)
- 30 dialogue audio clips with transcripts, sort orders, and genres.

### 5. Assign Administrator Role
To give an authenticated user admin access:
1. Create a user via Supabase Auth (or sign up on `/admin/login`).
2. Run this SQL in the SQL Editor:
```sql
insert into public.user_roles (user_id, role)
values ('<USER_UUID_HERE>', 'admin')
on conflict (user_id, role) do nothing;
```

---

## 📱 Offline / Demo Fallback Mode

If Supabase credentials are not provided:
- The application automatically switches to **Offline / Demo Mode**.
- High-fidelity pre-seeded fictional characters and audio files in `/public/audio` load immediately.
- The Admin Portal allows full editing, creating, and reordering clips, saving changes to local storage.
- When you are ready to connect to production Supabase, simply provide `.env.local`!

---

## 🔒 Content & Rights Compliance

All characters, backstories, dialogues, and audio stingers included in this repository are **100% original, fictional, and royalty-free**:
- **Zero copyrighted material**: No celebrity names, likenesses, movie quotes, or unauthorized voice recordings.
- **Audio generation**: Generated via standard algorithmic PCM synthesis in `scripts/generate-audio.js`.
- **Safe downloads**: Download links generated with sanitized character/title names.

---

## 🚢 Production Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In Project Settings, add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy! The project builds automatically with `npm run build`.
