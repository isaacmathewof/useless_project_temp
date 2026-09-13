/**
 * ============================================================================
 * DIALOGUE BOX - ACTOR & AUDIO DATA CONFIGURATION
 * ============================================================================
 * 
 * HOW TO CUSTOMIZE THIS FILE:
 * 
 * 1. REPLACE OR ADD ACTOR NAMES:
 *    - Change the "name" property (e.g., name: "Your Actor Name").
 *    - Each actor must have a unique "id" (e.g., id: "actor-1").
 * 
 * 2. REPLACE IMAGES:
 *    - Drop your image files (JPG or PNG) into: `public/images/actors/`
 *    - Update the "image" path (e.g., image: "/images/actors/my-actor.jpg").
 * 
 * 3. REPLACE OR ADD AUDIO (MP3 FILES):
 *    - Drop your audio files into: `public/audio/`
 *    - Update the "audio" path (e.g., audio: "/audio/my-audio-clip.mp3").
 *    - Update "text" with the spoken dialogue or quote.
 * 
 * 4. SEQUENTIAL TAP PLAYBACK:
 *    - When a user taps an actor's card, the app plays dialogues[0].
 *    - Tapping again automatically plays dialogues[1], dialogues[2], etc.
 *    - After the last dialogue, it seamlessly loops back to dialogues[0].
 * ============================================================================
 */

export interface Dialogue {
  id: string;
  text: string;
  audio: string;
}

export interface Actor {
  id: string;
  name: string;
  image: string;
  dialogues: Dialogue[];
}

export const actors: Actor[] = [
  // --------------------------------------------------------------------------
  // ACTOR 1: Dileep
  // --------------------------------------------------------------------------
  {
    id: "actor-1",
    name: "Dileep",
    image: "/images/actors/actor-1.jpg",
    dialogues: [
      {
        id: "dialogue-1-1",
        text: "",
        audio: "/audio/dileepcomedy2.mp3"
      },
      {
        id: "dialogue-1-2",
        text: "",
        audio: "/audio/dileepcomedy3.mp3"
      },
      {
        id: "dialogue-1-3",
        text: "",
        audio: "/audio/dileepcomedy4.mp3"
      },
      {
        id: "dialogue-1-4",
        text: "",
        audio: "/audio/actor-1-roast-2.mp3"
      },
      {
        id: "dialogue-1-5",
        text: "Do not announce your triumphs before the battle begins. Let your silence do the preparation, and let your victory do the roaring.",
        audio: "/audio/actor-1-motivation-1.mp3"
      },
      {
        id: "dialogue-1-6",
        text: "If I were to live through a thousand lives across ten thousand cities, every single path would still lead me straight to your door.",
        audio: "/audio/actor-1-romance-1.mp3"
      },
      {
        id: "dialogue-1-7",
        text: "You have five seconds to step aside and rethink your life choices. Four... three... time is up.",
        audio: "/audio/actor-1-action-1.mp3"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ACTOR 2: Suraj
  // --------------------------------------------------------------------------
  {
    id: "actor-2",
    name: "Suraj",
    image: "/images/actors/actor-2.jpg",
    dialogues: [
      {
        id: "dialogue-2-1",
        text: "I do not run from danger. I casually jog, because looking panicked ruins my hair and destroys my aesthetic.",
        audio: "/audio/surajcomedy1.mp3"
      },
      {
        id: "dialogue-2-2",
        text: "Technically speaking, jumping out of the second-story window was not reckless. It was a rapid vertical relocation.",
        audio: "/audio/surajcomedy2.mp3"
      },
      {
        id: "dialogue-2-3",
        text: "You talk like a warlord, but you panic when the microwave beeps too aggressively.",
        audio: "/audio/surajcomedy3.mp3"
      },
      {
        id: "dialogue-2-4",
        text: "Scars are not reminders of where you fell. They are living proof that whatever tried to destroy you failed miserably.",
        audio: "/audio/surajcomedy4.mp3"
      },
      {
        id: "dialogue-2-5",
        text: "Forget the world. If everything crashes down tonight, I am staying right here next to you until the dust clears.",
        audio: "/audio/actor-2-romance-1.mp3"
      },
      {
        id: "dialogue-2-6",
        text: "You wanted a war? You have got one. Just remember: you fired the first shot, but I will be firing the last.",
        audio: "/audio/actor-2-action-1.mp3"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ACTOR 3: Innocent
  // --------------------------------------------------------------------------
  {
    id: "actor-3",
    name: "Innocent",
    image: "/images/actors/Innoicent.jpg",
    dialogues: [
      {
        id: "dialogue-3-1",
        text: "Do not speak to me until my coffee is finished. In fact, do not speak to me until my second coffee has kicked in.",
        audio: "/audio/innocentcomedy2.mp3"
      },
      {
        id: "dialogue-3-2",
        text: "I envy the people who haven’t met you yet. They still believe common sense is evenly distributed across humanity.",
        audio: "/audio/innocentcomedy3.mp3"
      },
      {
        id: "dialogue-3-3",
        text: "Never lower your standards to make someone else feel comfortable. Wear your ambition like iron armor.",
        audio: "/audio/innocentcomedy4.mp3"
      },
      {
        id: "dialogue-3-4",
        text: "Every crowded room turns completely silent when our eyes meet. It’s like the universe clears space just for us.",
        audio: "/audio/actor-3-romance-1.mp3"
      },
      {
        id: "dialogue-3-5",
        text: "You thought I needed your permission to rule this empire? Stand back and watch how a real leader commands.",
        audio: "/audio/actor-3-action-1.mp3"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ACTOR 4: Prithviraj
  // --------------------------------------------------------------------------
  {
    id: "actor-4",
    name: "Prithviraj",
    image: "/images/actors/actor-4.jpg",
    dialogues: [
      {
        id: "dialogue-4-1",
        text: "",
        audio: "/audio/raju.mp3"
      },
      {
        id: "dialogue-4-2",
        text: "",
        audio: "/audio/raju1.mp3"
      },
      {
        id: "dialogue-4-3",
        text: "",
        audio: "/audio/actor-4-motivation-1.mp3"
      },
      {
        id: "dialogue-4-4",
        text: "",
        audio: "/audio/actor-4-romance-1.mp3"
      },
      {
        id: "dialogue-4-5",
        text: "",
        audio: "/audio/actor-4-action-1.mp3"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ACTOR 5: Lal
  // --------------------------------------------------------------------------
  {
    id: "actor-5",
    name: "Lal",
    image: "/images/actors/lal.jpg",
    dialogues: [
      {
        id: "dialogue-5-1",
        text: "",
        audio: "/audio/lal.mp3"
      },
      {
        id: "dialogue-5-2",
        text: "",
        audio: "/audio/lal1.mp3"
      },
      {
        id: "dialogue-5-3",
        text: "",
        audio: "/audio/actor-5-motivation-1.mp3"
      },
      {
        id: "dialogue-5-4",
        text: "",
        audio: "/audio/actor-5-romance-1.mp3"
      },
      {
        id: "dialogue-5-5",
        text: "",
        audio: "/audio/actor-5-action-1.mp3"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ACTOR 6: joju george
  // --------------------------------------------------------------------------
  {
    id: "actor-6",
    name: "joju george",
    image: "/images/actors/actor-6.jpg",
    dialogues: [
      {
        id: "dialogue-6-1",
        text: "People tell me I should use diplomacy. I tried diplomacy once, but my biceps kept flexing and broke the table.",
        audio: "/audio/actor-6-comedy-1.mp3"
      },
      {
        id: "dialogue-6-2",
        text: "I could snap your arguments in half as easily as a stale pretzel. Come back when you have actual leverage.",
        audio: "/audio/actor-6-roast-1.mp3"
      },
      {
        id: "dialogue-6-3",
        text: "Discipline is doing what must be done, especially when every fiber of your body wants to quit. Push harder!",
        audio: "/audio/actor-6-motivation-1.mp3"
      },
      {
        id: "dialogue-6-4",
        text: "My entire life has been war and walls. But with you, I want to lower the drawbridge and lay down my shield.",
        audio: "/audio/actor-6-romance-1.mp3"
      },
      {
        id: "dialogue-6-5",
        text: "I don’t dodge bullets. I advance through them. Let’s see whose resolve breaks first!",
        audio: "/audio/actor-6-action-1.mp3"
      }
    ]
  }
];
