// Класс Particle
export class Particle {
  angle: number;
  radius: number;
  opacity: number;
  distance: number;
  speed: number;
  position: { x: number; y: number };
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, distance: number, ctx: CanvasRenderingContext2D) {
    this.angle = Math.random() * 2 * Math.PI;
    this.radius = Math.random() * 6;
    this.opacity = (Math.random() * 5 + 2) / 10;
    this.distance = (1 / this.opacity) * distance;
    this.speed = this.distance * 0.00003;
    this.ctx = ctx;

    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle),
    };
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "rgba(250,95,28," + this.opacity + ")";
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(x: number, y: number) {
    this.angle += this.speed;
    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle),
    };
    this.draw();
  }
}

// Класс Emitter
export class Emitter {
  position: { x: number; y: number };
  radius: number;
  count: number;
  particles: Particle[];
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.position = { x, y };
    this.radius = 186;
    this.count = 2000;
    this.particles = [];
    this.ctx = ctx;

    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(x, y, this.radius, ctx));
    }
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update(this.position.x, this.position.y);
    });
    this.draw();
  }
}
