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
