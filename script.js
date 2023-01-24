const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particlesArray = [];
const enemiesArray = [];
let hue = 0;
let counter = 0;
const enemyFps = 2;
let score = 0;

let circle = {
  x: canvas.width / 2 - 40,
  y: canvas.height / 2 - 40,
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
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();
  draw();
}
function draw() {
  drawCircle(ctx, circle.x, circle.y, circle.radius, "#fff");
}
function update() {
  newEnemy();
  handleArray();
  handleArrayEnemies();
  bang();
  hue += 5;
}

function newEnemy() {
  counter++;
  if (counter !== 60 / enemyFps) return;
  enemiesArray.push(new Enemy());
  counter = 0;
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
      let distanceX = particlesArray[j].x - enemiesArray[i].x;
      let distanceY = particlesArray[j].y - enemiesArray[i].y;
      let realDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (realDistance < particlesArray[j].size + enemiesArray[i].size) {
        console.log("bang");
        particlesArray.splice(j, 1);
        enemiesArray[i].size--;

        if (enemiesArray[i].size < 10) {
          enemiesArray.splice(i, 1);
        }
        score++;
      }
    }
  }
}

function randomInc(min, max) {
  return Math.floor(Math.random() * (max - min)) + Math.min;
}

////////////////////////////////////// events
canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  particlesArray.push(new Particle({ x: circle.x, y: circle.y }));
});
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  particlesArray.push(new Particle({ x: circle.x, y: circle.y }));
});

///////////// run
gameLoop();
