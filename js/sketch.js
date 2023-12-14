let bigFish;
let smallFishGroup = [];
let numSmallFish = 5;
let maxFishSize = 300;

function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("p5container");
     // Create a big fish
  bigFish = new Fish(width / 2, height / 2, 30, color(0, 0, 255));

  // Create a group of small fish
  for (let i = 0; i < numSmallFish; i++) {
    let smallFish = new Fish(random(width), random(height), 10, color(255, 0, 0));
    smallFishGroup.push(smallFish);
  }
}

function draw() {
    // Draw ocean background
    background(0, 0, 95);
  
    // Display and move the big fish
    bigFish.display();
    bigFish.move();
  
    // Display and move the group of small fish
    for (let smallFish of smallFishGroup) {
      smallFish.display();
      smallFish.move();
  
      // Big fish eats small fish
      if (bigFish.eats(smallFish)) {
        smallFish.reset();
      }
    }
  }
  
  function keyPressed() {
    // Control the movement of the big fish when a key is pressed
    if (keyCode === UP_ARROW) {
      bigFish.y -= 10;
    } else if (keyCode === DOWN_ARROW) {
      bigFish.y += 10;
    } else if (keyCode === LEFT_ARROW) {
      bigFish.x -= 10;
    } else if (keyCode === RIGHT_ARROW) {
      bigFish.x += 10;
    }
  }
  
  class Fish {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.maxSize = maxFishSize;
    }
  
    display() {
      fill(this.color);
      noStroke();
  
      // Big fish is a triangle
      if (this.size > 20) {
        triangle(this.x, this.y - this.size / 2, this.x - this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2);
      } else { // Small fish is a circle
        ellipse(this.x, this.y, this.size, this.size);
      }
    }
  
    move() {
      // Allow small fish to move freely within the map
      this.x += random(-1, 1);
      this.y += random(-1, 1);
      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height);
    }
  
    eats(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      if (d < this.size / 2 + other.size / 2) {
        // Avoid size exceeding the maximum value
        this.size = min(this.size + 1, this.maxSize);
        return true;
      } else {
        return false;
      }
    }
  
    reset() {
      this.x = random(width);
      this.y = random(height);
    }
  }
  