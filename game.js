let canvas, c, frame;
let WIDTH, HEIGHT;
let snake, food, totalFood;
let then;
let isGameOver;
const FPS = 10;
// -calculate the time (in second) that one frame should have
const INTERVAL = 1 / FPS;
const SNAKE_SIZE = 10;

document.getElementById("start_button").onclick = () => {
  if (isGameOver) return alert("Game Over! Please restart the game!");
  // -if the game is not over, then start the game & listen the event again
  addListener();
  draw();
};
document.getElementById("stop_button").onclick = () => stopFrame();
document.getElementById("restart_button").onclick = () => reset();

function setup() {
  canvas = document.getElementById("canvas");
  c = canvas.getContext("2d");

  // -set width and height of canvas
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  alert("You can play with your keyboard or buttons!");
  reset();
}

function draw() {
  // -calculate the time elapsed in second
  let now = Date.now();
  let delta = (now - then) / 1000;

  // -if the time elapsed is greater than the INTERVAL that FPS should have, then redraw
  if (delta > INTERVAL) {
    // -recalculate the previous time, also subtract back the exceeded amount of time
    then = now - (delta % INTERVAL);

    // -clean the canvas
    c.clearRect(0, 0, WIDTH, HEIGHT);

    // -draw background
    c.fillStyle = "RGBA(0,0,0,0.8)";
    c.fillRect(0, 0, WIDTH, HEIGHT);

    // -draw snake
    snake.show();

    // -update snake
    snake.update();

    // -draw food
    c.fillStyle = "RED";
    c.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);

    // -if the snake collides with the wall, then game over
    if (snake.collideWall()) return gameOver("Collided with the wall!");

    // -if the snake eats one of its body part, then game over
    if (snake.collideBody()) return gameOver("You ate yourself!");

    // -if the snake eats the food, increase size and update food
    if (snake.eat(food)) {
      snake.increaseBodySize();
      food = getRandomFood();
      // -set the number of food on the page
      document.getElementById("total_food").innerHTML = ++totalFood;
    }
  }

  // -restart animation loop
  frame = requestAnimationFrame(draw);
}

// -function to get random coordinates of food
function getRandomFood() {
  let x = Math.floor(Math.random() * (WIDTH / SNAKE_SIZE));
  let y = Math.floor(Math.random() * (HEIGHT / SNAKE_SIZE));
  return { x: x * SNAKE_SIZE, y: y * SNAKE_SIZE };
}

// -function to reset all variables
function reset() {
  snake = new Snake(SNAKE_SIZE);
  food = getRandomFood();
  totalFood = 0;
  isGameOver = false;
  document.getElementById("total_food").innerHTML = totalFood;

  then = Date.now();

  c.clearRect(0, 0, WIDTH, HEIGHT);
  c.fillStyle = "RGBA(0,0,0,0.8)";
  c.fillRect(0, 0, WIDTH, HEIGHT);

  draw();
  addListener();
}

// -function to show game over text in canvas
function gameOver(str) {
  isGameOver = true;
  c.fillStyle = "RED";
  c.font = "30px Comic Sans MS";
  c.textAlign = "center";
  c.fillText("Oop! Game Over", WIDTH / 2, HEIGHT / 2);
  c.font = "20px Comic Sans MS";
  c.fillText(str, WIDTH / 2, HEIGHT / 2 + 40);

  return 0;
}

// -function to set the snake directions based on user input
function setDirections(e) {
  if (e.key == "ArrowUp") snake.setDirection(0, -1);
  if (e.key == "ArrowDown") snake.setDirection(0, 1);
  if (e.key == "ArrowLeft") snake.setDirection(-1, 0);
  if (e.key == "ArrowRight") snake.setDirection(1, 0);
}

function stopFrame() {
  cancelAnimationFrame(frame);
  removeListener();
}
function setDirectionUp() {
  snake.setDirection(0, -1);
}
function setDirectionDown() {
  snake.setDirection(0, 1);
}
function setDirectionLeft() {
  snake.setDirection(-1, 0);
}
function setDirectionRight() {
  snake.setDirection(1, 0);
}
function removeListener() {
  document.removeEventListener("keydown", setDirections);
  document
    .getElementById("up_arrow")
    .removeEventListener("click", setDirectionUp);
  document
    .getElementById("down_arrow")
    .removeEventListener("click", setDirectionDown);
  document
    .getElementById("left_arrow")
    .removeEventListener("click", setDirectionLeft);
  document
    .getElementById("right_arrow")
    .removeEventListener("click", setDirectionRight);
}
function addListener() {
  // -add event handler keydown event for keyboard input
  document.addEventListener("keydown", setDirections);

  // -add event handler for arrow buttons
  document.getElementById("up_arrow").addEventListener("click", setDirectionUp);
  document
    .getElementById("down_arrow")
    .addEventListener("click", setDirectionDown);
  document
    .getElementById("left_arrow")
    .addEventListener("click", setDirectionLeft);
  document
    .getElementById("right_arrow")
    .addEventListener("click", setDirectionRight);
}
window.onload = function () {
  setup();
};
