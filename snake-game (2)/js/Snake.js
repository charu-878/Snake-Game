var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement("img");
  this.img.src = "images/snake2.png";
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function (maxX, maxY) {
  var startX = Math.floor(maxX / 2);
  var startY = Math.floor(maxY / 2);
  this.setX(startX);
  this.setY(startY);
  this.sections = [];
  //intializing snake
  for (var i = 0; i < NUM_INITIAL_SECTIONS; i++) {
    var tal = startY + i + 1;
    this.sections.unshift(new SnakeSection(startX, tal));
  }
};
Snake.prototype.hasCollided = function (maxX, maxY) {
  var m = this.getX();
  var j = this.getY();
  //out of bound case
  if (m < 0 || m >= maxX || j < 0 || m >= maxY) {
    return true;
  }

  // collide with its tail case
  for (var i = 0; i < this.sections.length; i++) {
    if (this.isSameLocation(this.sections[i])) {
      return true;
    }
  }

  return false;
};

Snake.prototype.endMove = function (didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function () {
  this.direction = this.nextDirection;
  // Move snake here
  var x = this.getX();
  var y = this.getY();
  if (this.direction === UP) {
    this.setY(y - 1);
  } else if (this.direction === DOWN) {
    this.setY(y + 1);
  } else if (this.direction === LEFT) {
    this.setX(x - 1);
  } else if (this.direction === RIGHT) {
    this.setX(x + 1);
  }
  this.sections.push(new SnakeSection(x, y));
};

Snake.prototype.draw = function (context, spacing) {
  // Draw the complete snake
  for (var i = 0; i < this.sections.length; i++) {
    this.sections[i].draw(context, spacing);
  }
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};

Snake.prototype.init = function (maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function () {
  this.direction = UP;
  this.nextDirection = UP;
  var snake = this;
  document.addEventListener("keydown", function (e) {
    // Set snake's nextDirection based on keypress.
    if (e.keyCode === UP_KEY_CODE && snake.direction !== DOWN) {
      snake.nextDirection = UP;
    } else if (e.keyCode === DOWN_KEY_CODE && snake.direction !== UP) {
      snake.nextDirection = DOWN;
    } else if (e.keyCode === RIGHT_KEY_CODE && snake.direction !== LEFT) {
      snake.nextDirection = RIGHT;
    } else if (e.keyCode === LEFT_KEY_CODE && snake.direction !== RIGHT) {
      snake.nextDirection = LEFT;
    } else {
      return;
    }
    e.preventDefault();
  });
};
