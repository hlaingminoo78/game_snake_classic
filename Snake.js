class Snake {
  constructor(size) {
    this.x = 0;
    this.y = 0;
    this.xd = 0;
    this.yd = 1;
    this.tail = [{ x: this.x, y: this.y }];
    this.size = size;
  }

  // -function to show snake body
  show() {
    c.fillStyle = "#23FF00";
    this.tail.map((elt) => c.fillRect(elt.x, elt.y, this.size, this.size));
  }

  // -function to set snake direction
  setDirection(xd, yd) {
    this.xd = xd;
    this.yd = yd;
  }

  // -function to update snake body
  update() {
    // -shift the body by one move
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = this.tail[i - 1];
    }

    // -update the head
    this.x += this.xd * this.size;
    this.y += this.yd * this.size;
    this.tail[0] = { x: this.x, y: this.y };
  }

  // -function to increase the snake body length by 1
  increaseBodySize() {
    this.tail.push(this.tail[this.tail.length - 1]);
  }

  // -function to check if the snake touchs food
  eat(food) {
    if (this.x === food.x && this.y === food.y) return true;
    return false;
  }

  // -function to check if snake head collide with wall
  collideWall() {
    if (this.tail[0].x > WIDTH - this.size) return true;
    if (this.tail[0].y > HEIGHT - this.size) return true;
    if (this.tail[0].x < 0) return true;
    if (this.tail[0].y < 0) return true;
    return false;
  }

  // -function to check if the snake bites its tail
  collideBody() {
    for (let i = 1; i < this.tail.length; i++)
      // -if the snake eats one of its body part, then game over
      if (this.eat(this.tail[i])) return true;
    return false;
  }
}
