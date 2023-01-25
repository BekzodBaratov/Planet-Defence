class Enemy {
  constructor() {
    this.random = Math.random();
    this.x = this.random > 0.5 ? (Math.random() > 0.5 ? 0 : canvas.width) : Math.random() * canvas.width;
    this.y = this.random > 0.5 ? Math.random() * canvas.height : Math.random() > 0.5 ? 0 : canvas.height;
    this.size = parseInt(Math.random() * 15) + 30;
    this.speed = 1;
    this.rad = Math.atan2(circle.y - this.y, circle.x - this.x);
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  drawRange() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.size - 10, this.x, this.y + 10);
    ctx.fill();
  }
  update() {
    this.x += this.speed * Math.cos(this.rad);
    this.y += this.speed * Math.sin(this.rad);
  }
}
