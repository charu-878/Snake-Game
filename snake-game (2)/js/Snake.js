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
  this.img = document.createElement('img');
  this.img.src = 'images/snake2.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
  // create initial number of snake sections (snake length)

  var max_X = Math.floor(Math.random()*maxX/2);
  var max_Y = Math.floor(Math.random()*maxY/2);
  this.setX(max_X);
  this.setY(max_Y);
  this.sections = [];
  for(var i=0; i <NUM_INITIAL_SECTIONS; i++){
      this.sections.unshift(new SnakeSection(max_X,(max_Y+i+1)));
  }
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  var max_X = this.getX();
  var max_Y = this.getY();
  if(max_X<0 || max_X>=maxX || max_Y<0 || max_Y>=maxY)
  return true;

  for(var j=0;j<this.sections.length; j++){
      if(this.isSameLocation(this.sections[j]))
      return true;
  }
  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here

  var a = this.getX();
  var b = this.getY();
  if(this.direction==LEFT){
      this.setX(a-1);
  }
  else if(this.direction==RIGHT){
      this.setX(a+1);
  }
  else if(this.direction==UP){
      this.setY(b-1);
  }else if(this.direction==DOWN){
      this.setY(b+1);
  }
  this.sections.push(new SnakeSection(a,b));
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake

  for(var k=0; k<this.sections.length; k++){
      this.sections[k].draw(context,spacing);
  }
  DrawUtil.drawSnake(
      context,
      this.img,
      spacing*this.getX(),
      spacing*this.getY(),
      spacing,
      spacing
  );
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var snake_dir = this;
  document.addEventListener('keydown', function(e) {
    // Set snake's nextDirection based on keypress.

    if(e.keyPress==LEFT_KEY_CODE && snake_dir.direction!==RIGHT){
        snake_dir.nextDirection=LEFT;
    }
     else if(e.keyPress==RIGHT_KEY_CODE && snake_dir.direction!==LEFT){
        snake_dir.nextDirection=RIGHT;
    }
    else if(e.keyPress==UP_KEY_CODE && snake_dir.direction!==DOWN){
        snake_dir.nextDirection=UP;
    }
    else if(e.keyPress==DOWN_KEY_CODE && snake_dir.direction!==UP){
        snake_dir.nextDirection=DOWN;
    }
    else return;
    e.preventDefault();
  });
};
