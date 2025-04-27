let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
let direction = "right";
let food;
let game;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let speed = 100; // Tempo inicial (em ms)

function init() {
  snake = [{ x: 10 * box, y: 10 * box }];
  direction = "right";
  createFood();
  score = 0;
  speed = 100;
  document.getElementById("score").innerText = `Pontuação: 0 | Recorde: ${bestScore}`;
  clearInterval(game);
  game = setInterval(startGame, speed);
}

function createFood() {
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function createBG() {
  context.fillStyle = "black";
  context.fillRect(0, 0, 400, 400);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function setDirection(dir) {
  if (dir == "left" && direction != "right") direction = "left";
  if (dir == "up" && direction != "down") direction = "up";
  if (dir == "right" && direction != "left") direction = "right";
  if (dir == "down" && direction != "up") direction = "down";
}

function startGame() {
  if (snake[0].x >= 400) snake[0].x = 0;
  if (snake[0].x < 0) snake[0].x = 400;
  if (snake[0].y >= 400) snake[0].y = 0;
  if (snake[0].y < 0) snake[0].y = 400;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
      }
      alert(`Fim de jogo! Sua pontuação foi: ${score}`);
      init(); // Reinicia automaticamente
      return;
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    document.getElementById("score").innerText = `Pontuação: ${score} | Recorde: ${bestScore}`;
    createFood();

    // 🚀 Acelerar a cada 5 pontos
    if (score % 5 === 0 && speed > 40) { // Limite mínimo de velocidade
      speed -= 10; // Diminui 10ms no intervalo
      clearInterval(game);
      game = setInterval(startGame, speed);
    }

  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

function restartGame() {
  init();
}

// Inicia o jogo na primeira vez
init();
