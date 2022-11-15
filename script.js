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
let count = 0;

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

let enemy = {
  x: undefined,
  y: undefined,
  speed: 5,
  radius: Math.floor(Math.random() * 50) + 10,
};

let mouse = {
  x: undefined,
  y: undefined,
};

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

class Particle {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.size = 10;
    this.speed = 10;
    this.rad = Math.atan2(mouse.y - circle.y, mouse.x - circle.x);
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speed * Math.cos(this.rad);
    this.y += this.speed * Math.sin(this.rad);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function randomInc(min, max) {
  return Math.floor(Math.random() * (max - min)) + Math.min;
}

function enemyFunc() {
  let x;
  let y;
  if (Math.random() > 0.5) {
    x = Math.floor(Math.random() * canvas.width);
    y = Math.random() > 0.5 ? 0 : canvas.height;
  } else {
    x = Math.random() > 0.5 ? 0 : canvas.width;
    y = Math.floor(Math.random() * canvas.height);
  }

  enemiesArray.push(new Particle({ x, y }));
}

// -----------------------------------------------------------------------
function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleArray();
  drawCircle(ctx, circle.x, circle.y, circle.radius, "#fff");
  enemyFunc(randomInc);

  console.log(enemiesArray);

  hue += 5;
}

gameLoop();
