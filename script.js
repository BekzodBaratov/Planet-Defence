const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// ui
const gameOverPopup = document.querySelector(".gameOver");
const currScore = document.querySelector(".currScore");
const highScore = document.querySelector(".highScore");
const retryBtn = document.querySelector(".retryBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particlesArray = [];
let enemiesArray = [];
const enemiesAnimation = [];
let hue = 0;
let counter = 0;
let enemyEvery = 120;
let score = 0;
let animationId = null;

let circle = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 40,
};

let bullet = {
  x: circle.x,
  y: circle.y,
  dx: 6,
  dy: 6,
  radius: 5,
};

let mouse = {
  x: undefined,
  y: undefined,
};

function gameLoop() {
  animationId = requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
}
function draw() {
  drawCircle(ctx, circle.x, circle.y, circle.radius, "#fff");
  drawScore();
  gameOver();
}
function update() {
  newEnemy();
  handleArray();
  handleArrayEnemies();
  bang();
  enemiesAnimaFunction();

  hue += 5;
}

function newEnemy() {
  counter++;
  if (counter < enemyEvery) return;
  enemiesArray.push(new Enemy());
  counter = 0;
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.font = "1.5rem Arial";
  ctx.textAlign = "center";
  ctx.fillText(score == 0 ? "" : score, canvas.width / 2, canvas.height / 2 + 7);
  ctx.fill();
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}
function gameOver() {
  for (let i = 0; i < enemiesArray.length; i++) {
    let distanceX = circle.x - enemiesArray[i].x;
    let distanceY = circle.y - enemiesArray[i].y;
    let realDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (realDistance < circle.radius + enemiesArray[i].size) {
      cancelAnimationFrame(animationId);
      gameOverPopup.style.display = "flex";
      currScore.innerHTML = score;
      if (highScore.innerHTML < score) {
        highScore.innerHTML = score;
      }
    }
  }
}

function handleArray() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (
      particlesArray[i].x > canvas.width ||
      particlesArray[i].x < 0 ||
      particlesArray[i].y > canvas.height ||
      particlesArray[i].y < 0
    ) {
      particlesArray.splice(i, 1);
    }
  }
}
function handleArrayEnemies() {
  for (let i = 0; i < enemiesArray.length; i++) {
    enemiesArray[i].draw();
    enemiesArray[i].update();
    enemiesArray[i].drawRange();

    if (
      enemiesArray[i].x > canvas.width ||
      enemiesArray[i].x < 0 ||
      enemiesArray[i].y > canvas.height ||
      enemiesArray[i].y < 0
    ) {
      enemiesArray.splice(i, 1);
    }
  }
}
function bang() {
  for (var i = 0; i < enemiesArray.length; i++) {
    for (var j = 0; j < particlesArray.length; j++) {
      if (!enemiesArray[i]) continue;
      let distanceX = particlesArray[j].x - enemiesArray[i].x;
      let distanceY = particlesArray[j].y - enemiesArray[i].y;
      let realDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (realDistance < particlesArray[j].size + enemiesArray[i].size) {
        particlesArray.splice(j, 1);
        enemiesArray[i].size--;
        enemiesAnimation.push(new Anima(enemiesArray[i].x, enemiesArray[i].y, enemiesArray[i].color));

        score++;
        if (enemiesArray[i].size > 10) continue;
        if (score > 125) {
          enemyEvery -= 1;
        }
        enemiesArray.splice(i, 1);
      }
    }
  }
}
function enemiesAnimaFunction() {
  if (!enemiesAnimation?.length) return;
  for (let i = 0; i < enemiesAnimation.length; i++) {
    enemiesAnimation[i].draw();
    enemiesAnimation[i].update();
    if (enemiesAnimation[i].size < 1) enemiesAnimation.splice(i, 1);
  }
}

function randomInc(min, max) {
  return Math.floor(Math.random() * (max - min)) + Math.min;
}
function eventPlugin(x, y) {
  mouse.x = x;
  mouse.y = y;
  particlesArray.push(new Particle({ x: circle.x, y: circle.y }));
}
////////////////////////////////////// events
canvas.addEventListener("click", function (e) {
  eventPlugin(e.x, e.y);
});
canvas.addEventListener("mousemove", function (e) {
  eventPlugin(e.x, e.y);
});
window.addEventListener("touchmove", function (e) {
  eventPlugin(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
});
retryBtn.addEventListener("click", function () {
  enemiesArray = [];
  particlesArray = [];
  gameOverPopup.style.display = "none";
  score = 0;
  gameLoop();
});

///////////// run
gameLoop();
