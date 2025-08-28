# **App Name**: Focumon Focus

## Core Features:

- Interactive Portal: Display a portal page with central interactive Focumon in a teal/blue square (#00A8E8) with wavy green patterns.
- Stats Display: Show the current date (August 29th, 2025), focus stats (Focused for: 00:07, Time in focus: 100%), and a bottom navigation bar with icons for Focumon, Library, Home, Party, and Profile.
- Focus Timer: Implement a focus timer with start/stop functionality, reflecting the current timer state on the /focus page.
- Monster Library: Create a library for monster inventory and information, displayed on the /library page.
- Events Display: Implement a quests or events UI, displayed on the /events page, to provide goals and activities for the user.
- Page Routing: Implement navigation between the portal (/), focus timer (/focus), events (/events), library (/library), home (/home), party (/party), profile (/profile), and designer (/designer) pages using a bottom navigation bar.
- Session Persistence: Implement basic focus session data persistence using local storage, without a central database, to remember user progress.

## Style Guidelines:

- Primary color: Teal blue (#00A8E8) reminiscent of a clear sky, representing focus and calmness.
- Background color: Dark gray (#1A1A1A), almost black, creating a deep, immersive environment that minimizes distractions.
- Accent color: Lime green (#BFFF00) provides contrast and a sense of energetic accomplishment, and is analogous to teal.
- Font for titles: 'Press Start 2P', a pixel-art font (monospace) for a retro game aesthetic. Note: currently only Google Fonts are supported.
- Body font: 'Inter' (sans-serif) is recommended if longer text is required. If not, 'Press Start 2P' can serve for both.
- Use pixel-art style icons to maintain visual consistency, in a bright white or light yellow color to ensure they're visible on the dark gray background.
- Mobile-first responsive design using Tailwind CSS grid and flexbox for adaptability to different screen sizes, specifically targeting iPhone portrait layout.
- Subtle animations using CSS keyframes for the Focumon in the portal and transitions between pages, without over-taxing mobile hardware. Example: monster tail wagging.