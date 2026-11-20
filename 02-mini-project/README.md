# Mini Project — Pong

<!-- Replace "Title" with the name of your project, e.g. "Mini Project — Pong Remix" -->

---

### The Project

<!-- What did you build and what makes it yours? A few sentences is enough.
     What did you change, add, or push beyond the scaffold? -->

     I built a complete two-player Pong game from the starter scaffold with full paddle controls, live score tracking, and a first-to-10 win condition. Beyond the base setup, I added faster randomized ball launches, paddle-hit angle variation for more dynamic rallies, and separate win states for each player. When a player reaches 10 points, an animated curtain transition reveals the winner alongside an interactive Restart button with mouse hover feedback.

---

### Output

![screenshot](readme-assets/screenshot-01.png)

<!-- Drop a screenshot or GIF of your finished project.
     Save it to a readme-assets/ folder inside this project folder.
     Got more than one good screenshot? Add them. -->
     <img width="637" height="360" alt="image" src="https://github.com/user-attachments/assets/1fc268a4-9c32-4705-a3ae-efd6c118b1d5" />


[Watch Online](https://your-link-here)

<!-- Replace the link above with a URL to a screen recording or video of your project.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

### ✍️ Reflection

<!-- 200–300 words on your process. Write freely — this isn't an essay.
     Some prompts to get you started:
     — What did you set out to make, and how did the result compare?
     — What inputs does your sketch respond to, and how did you approach that?
     — What was your biggest challenge, and how did you work through it?
     — What would you push further if you had more time? -->
I set out to turn the starter scaffold into a complete, responsive two-player Pong game with a clear win condition and a polished ending sequence. The final sketch delivers a smooth arcade loop that feels snappy to play from start to finish.

The game responds to both keyboard and mouse inputs. During gameplay, `keyIsDown()` tracks continuous movement—`W` and `S` for the left paddle, and `UP_ARROW` and `DOWN_ARROW` for the right—while `keyReleased()` stops each paddle when the keys are released. On the game-over screen, input shifts to the mouse: checking `mouseX` and `mouseY` bounds adds a hover color change to the Restart button, and `mousePressed()` resets the scores, animation counter, and game state.

My biggest challenge was building a game-over transition that felt intentional rather than abrupt. Instead of jumping straight to static text, I used an incrementing variable (`a`) to drop a curtain across the canvas and stagger the appearance of the winner text and Restart button. Managing the reset state also took careful testing to make sure `a` and both scores cleared properly before starting a new round.

With more time, I would add a start screen, sound effects for bounces and scoring, and a speed cap so long rallies stay challenging without becoming impossible. I would also combine the two win states into one shared function to eliminate repeated code.

---

<!-- ─────────────────────────────────────────────────────
     GOING FURTHER — want to document more? Try any of these:

     ### ✨ What I Changed
     A short list of the additions and modifications you made to the scaffold.
     - Changed the paddle to use mouse tracking instead of keyboard
     - Redesigned the visual language with a retro CRT aesthetic

     ### 🔍 Code Structure
     Briefly explain how your files are organised.
     - `sketch.js` — main game loop
     - `Ball.js` — ball class with collision logic
     - `assets/` — sprites and sounds

     ### 🧩 Something I'm Proud Of
     A snippet of code, a design decision, a moment where it clicked.
     ```js
     // your code here
     ```

     ### 🔗 References
     Anything that helped or inspired you — tutorials, artworks, tools.
     ───────────────────────────────────────────────────── -->
