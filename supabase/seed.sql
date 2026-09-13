-- =======================================================
-- DIALOGUE BOX: SEED DATA FOR 6 FICTIONAL CHARACTERS
-- =======================================================

-- 1. Profiles
insert into public.profiles (id, name, avatar_url, bio, genres, is_published)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Alexander Vance',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'A suave, sharp-tongued strategist and corporate mastermind known for ruthless wit and calculated diplomacy.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Marcus Drake',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    'A fearless rogue operative and tactical daredevil who treats danger like an extreme weekend hobby.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Maya Sterling',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'A high-powered tech mogul and visionary leader whose relentless ambition cuts through nonsense effortlessly.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Elena Rostova',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    'A covert counter-intelligence officer with dry sarcastic humor and an unexpected poetic heart.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Rohan Kapoor',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    'An inventive architect and charismatic storyteller who disarms high-pressure situations with effortless charm.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'Viktor Stone',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    'A towering, stoic defender with an unbreakable moral compass and deadpan warrior wisdom.',
    array['comedy', 'roast', 'motivation', 'romance', 'action'],
    true
  )
on conflict (id) do update set
  name = excluded.name,
  avatar_url = excluded.avatar_url,
  bio = excluded.bio,
  genres = excluded.genres,
  is_published = excluded.is_published;

-- 2. Audio Clips
-- Clean existing clips for seeded profiles
delete from public.audio_clips where profile_id in (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666'
);

insert into public.audio_clips (profile_id, title, audio_url, transcript, genre, sort_order, is_published)
values
  -- Alexander Vance
  ('11111111-1111-1111-1111-111111111111', 'The Smartest Move', '/audio/av_com_1.wav', 'I told my doctor I broke my arm in two places. He told me to stop going to those places. Pure medical genius!', 'comedy', 1, true),
  ('11111111-1111-1111-1111-111111111111', 'Unmatched Potential', '/audio/av_roast_1.wav', 'You have an unbelievable knack for talking for ten straight minutes without conveying a single usable idea.', 'roast', 2, true),
  ('11111111-1111-1111-1111-111111111111', 'Quiet Storm', '/audio/av_mot_1.wav', 'Do not announce your triumphs before the battle begins. Let your silence do the preparation, and let your victory do the roaring.', 'motivation', 3, true),
  ('11111111-1111-1111-1111-111111111111', 'In All Timelines', '/audio/av_rom_1.wav', 'If I were to live through a thousand lives across ten thousand cities, every single path would still lead me straight to your door.', 'romance', 4, true),
  ('11111111-1111-1111-1111-111111111111', 'Final Ultimatum', '/audio/av_act_1.wav', 'You have five seconds to step aside and rethink your life choices. Four... three... time is up.', 'action', 5, true),

  -- Marcus Drake
  ('22222222-2222-2222-2222-222222222222', 'Safety Hazard', '/audio/md_com_1.wav', 'I do not run from danger. I casually jog, because looking panicked ruins my hair and destroys my aesthetic.', 'comedy', 1, true),
  ('22222222-2222-2222-2222-222222222222', 'Threat Level Zero', '/audio/md_roast_1.wav', 'You talk like a warlord, but you panic when the microwave beeps too aggressively.', 'roast', 2, true),
  ('22222222-2222-2222-2222-222222222222', 'No Hesitation', '/audio/md_mot_1.wav', 'Scars are not reminders of where you fell. They are living proof that whatever tried to destroy you failed miserably.', 'motivation', 3, true),
  ('22222222-2222-2222-2222-222222222222', 'Ride or Die', '/audio/md_rom_1.wav', 'Forget the world. If everything crashes down tonight, I am staying right here next to you until the dust clears.', 'romance', 4, true),
  ('22222222-2222-2222-2222-222222222222', 'Locked and Loaded', '/audio/md_act_1.wav', 'You wanted a war? You have got one. Just remember: you fired the first shot, but I will be firing the last.', 'action', 5, true),

  -- Maya Sterling
  ('33333333-3333-3333-3333-333333333333', 'Morning Energy', '/audio/ms_com_1.wav', 'Do not speak to me until my coffee is finished. In fact, do not speak to me until my second coffee has kicked in.', 'comedy', 1, true),
  ('33333333-3333-3333-3333-333333333333', 'Empty Confidence', '/audio/ms_roast_1.wav', 'I envy the people who haven’t met you yet. They still believe common sense is evenly distributed across humanity.', 'roast', 2, true),
  ('33333333-3333-3333-3333-333333333333', 'Unshakable Crown', '/audio/ms_mot_1.wav', 'Never lower your standards to make someone else feel comfortable. Wear your ambition like iron armor.', 'motivation', 3, true),
  ('33333333-3333-3333-3333-333333333333', 'Gravity', '/audio/ms_rom_1.wav', 'Every crowded room turns completely silent when our eyes meet. It’s like the universe clears space just for us.', 'romance', 4, true),
  ('33333333-3333-3333-3333-333333333333', 'Take the Throne', '/audio/ms_act_1.wav', 'You thought I needed your permission to rule this empire? Stand back and watch how a real leader commands.', 'action', 5, true),

  -- Elena Rostova
  ('44444444-4444-4444-4444-444444444444', 'The Budget', '/audio/er_com_1.wav', 'I am on a strict 30-day diet. So far, I have lost 15 days and 0 pounds, but gained great appreciation for cheesecake.', 'comedy', 1, true),
  ('44444444-4444-4444-4444-444444444444', 'Audacity Award', '/audio/er_roast_1.wav', 'I would explain why you are wrong, but I don’t have the crayons or the patience to simplify it for you.', 'roast', 2, true),
  ('44444444-4444-4444-4444-444444444444', 'The Phoenix', '/audio/er_mot_1.wav', 'When everything falls into ashes, remember: that is the natural birthplace of royalty.', 'motivation', 3, true),
  ('44444444-4444-4444-4444-444444444444', 'Heartbeat Rhythm', '/audio/er_rom_1.wav', 'I didn’t choose you because you were flawless. I chose you because even your flaws make the world feel like poetry.', 'romance', 4, true),
  ('44444444-4444-4444-4444-444444444444', 'The Trap', '/audio/er_act_1.wav', 'You think you lured me into your trap? Look closely at the perimeter. You are the one surrounded.', 'action', 5, true),

  -- Rohan Kapoor
  ('55555555-5555-5555-5555-555555555555', 'Gym Membership', '/audio/rk_com_1.wav', 'I go to the gym faithfully every January first. The other 364 days are reserved for resting and recovery.', 'comedy', 1, true),
  ('55555555-5555-5555-5555-555555555555', 'Overrated', '/audio/rk_roast_1.wav', 'You have the confidence of a superhero with the competence of a dial-up modem in a storm.', 'roast', 2, true),
  ('55555555-5555-5555-5555-555555555555', 'Keep Moving', '/audio/rk_mot_1.wav', 'Small steps every single day beat grand intentions that never leave the couch. Just take the next step.', 'motivation', 3, true),
  ('55555555-5555-5555-5555-555555555555', 'Warmth', '/audio/rk_rom_1.wav', 'Home isn’t four walls and a roof anymore. For me, home is anywhere you are standing.', 'romance', 4, true),
  ('55555555-5555-5555-5555-555555555555', 'Underestimated', '/audio/rk_act_1.wav', 'You thought the quiet guy was harmless? Big mistake. The quiet ones take mental notes and strike without warning.', 'action', 5, true),

  -- Viktor Stone
  ('66666666-6666-6666-6666-666666666666', 'Subtle Approaches', '/audio/vs_com_1.wav', 'People tell me I should use diplomacy. I tried diplomacy once, but my biceps kept flexing and broke the table.', 'comedy', 1, true),
  ('66666666-6666-6666-6666-666666666666', 'Paper Weight', '/audio/vs_roast_1.wav', 'I could snap your arguments in half as easily as a stale pretzel. Come back when you have actual leverage.', 'roast', 2, true),
  ('66666666-6666-6666-6666-666666666666', 'Iron Discipline', '/audio/vs_mot_1.wav', 'Discipline is doing what must be done, especially when every fiber of your body wants to quit. Push harder!', 'motivation', 3, true),
  ('66666666-6666-6666-6666-666666666666', 'The Fortress', '/audio/vs_rom_1.wav', 'My entire life has been war and walls. But with you, I want to lower the drawbridge and lay down my shield.', 'romance', 4, true),
  ('66666666-6666-6666-6666-666666666666', 'Titan Clash', '/audio/vs_act_1.wav', 'I don’t dodge bullets. I advance through them. Let’s see whose resolve breaks first!', 'action', 5, true);
