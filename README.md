# IEEE Quiz Odyssey — Live System

An install-free, browser-based control room and auditorium screen for an 8-team, 10-round quiz event.

## Run it

Open `index.html` in a modern browser. The organizer control panel appears on the right of the show screen.

Use **OPEN DISPLAY** to open `?screen=display` in a second browser window for the projector. Both windows use the same browser's local event state and synchronize through `BroadcastChannel` (with local storage as a fallback).

## Live flow

1. Choose the round and assigned team.
2. Press **Round Intro**, then **Return to Question**.
3. Start, pause, reset, or stop the circular countdown timer.
4. Mark a verbal answer **Correct** (+10 automatically) or **Wrong**.
5. For a wrong answer, cue **Audience Challenge** then **Reveal Answer**.
6. Cue the live leaderboard or final results whenever needed, then move to the next assigned question.

The app includes ten round slots, eight teams, configurable 10/20/30/45-second timers, pre-seeded AI/ML question examples, a compact question editor, and persistent scores for the current browser.
