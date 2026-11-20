// DM2008 — Activity 1a
// Simple Creatures (20 min)

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature within the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  
  // YOUR CODE HERE
  fill(255, 255, 255)
  rect(200, 200, 200, 120)
  rectMode(CENTER)

   fill(255, 255, 255)
  triangle(120, 90, 100, 140, 140, 140)
     fill(255, 255, 255)
  triangle(280, 90, 260, 140, 300, 140)

  fill("#000000")
  ellipse(150, 190, 7)
    fill("#000000")
  ellipse(250, 190, 7)
    fill("#000000")
  ellipse(200, 230, 25, 5)

  fill(255, 255, 255)
  rect(200, 300, 100, 80)

  fill(255, 255, 255)
  rect(180, 330, 20, 40)
   fill(255, 255, 255)
  rect(220, 330, 20, 40)

     fill(255, 255, 255)
  rect(270, 315, 40, 20)

  stroke("#000000")
  line(100, 211, 130, 211)
  stroke("#000000")
  line(100, 230, 130, 230)
    stroke("#000000")
  line(270, 211, 300, 211)
  stroke("#000000")
  line(270, 230, 300, 230)
  
  // YOUR CODE HERE
  
  helperGrid(); // do not edit or remove this line
}
