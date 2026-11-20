// DM2008 — Activity 3a [Guided]
// Array Sampler (25 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let size = [10, 40, 100, 230, 500];
let palette = ["#f06449", "#24c6b3", "#f9f224", "#eeeeee"];
let currentIndexS = 0;
let currentIndexP = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220, 5);

  // Draw the ellipse using the current color in the array
  fill(random(palette));
  ellipse(random(0, 400), random(0, 400), size[currentIndexS]);
}

// Advance to the next color each time a key is pressed
function keyPressed() {
  currentIndexS++; // shorthand for currentIndex += 1
  currentIndexP++;

  // Wrap back to the start when we reach the end
  if (currentIndexP >= palette.length) {
    currentIndexP = 0;
  }
  if (currentIndexS >= size.length) {
    currentIndexS = 0;
  }
}


