const canava = document.querySelector(".canva");
const ctx = canava.getContext("2d"); //todo ctx=context
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// creating scale
const scale = 20;
const row = canava.height / scale;
const columns = canava.width / scale;

//creating snake
let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * row) * scale,
};
// creating Food
let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * row) * scale,
};

let d = "right";
// setting direction
document.onkeydown = SnakeDirection;
//todo a big function
function SnakeDirection(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  }
  if (key == 38 && d != "down") {
    d = "up";
  }
  if (key == 39 && d != "left") {
    d = "right";
  }
  if (key == 40 && d != "up") {
    d = "down";
  }
}
let playGame;
startBtn.addEventListener("click", function () {
  if (!playGame) {
    // Check if the game is already running
    playGame = setInterval(draw, 100); // Start the game loop
  }
});

function draw() {
  ctx.clearRect(0, 0, canava.width, canava.height);

  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // todo Draw FOOD
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "black";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  //intial head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  console.log(snakeX);

  //   direction defnition

  if (d == "left") snakeX = snakeX - scale;
  if (d == "right") snakeX = snakeX + scale;
  if (d == "up") snakeY = snakeY - scale;
  if (d == "down") snakeY = snakeY + scale;

  // to make the snake move only in the canavas
  if (snakeX > canava.width) {
    snakeX = 0;
  }
  if (snakeY > canava.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canava.width - scale;
  }
  if (snakeY < 0) {
    snakeY = canava.height - scale;
  }

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * row) * scale,
    };
  } else {
    snake.pop();
  }

  // creating new array to take the new array
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  if (eatSelf(newHead, snake)) {
    clearInterval(playGame);
  }

  snake.unshift(newHead);
}

// to stop the game if the snake eats it self
function eatSelf(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}
stopBtn.addEventListener("click", function () {
  clearInterval(playGame); 
  playGame = null;
  ctx.clearRect(0, 0, canava.width, canava.height);
});
