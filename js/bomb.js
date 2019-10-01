class Bomb {
  constructor(ctx) {
    this.ctx = ctx
    this.h = 60
    this.w = 60
    this.x = Math.random() * (this.ctx.canvas.width - this.w)
    this.y = this.h * - 1
    this.vy = 1
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.stroke();
  }

  move() {
    this.y += this.vy
  }

  inFloor() {
    return true
    // return (
    //   this.x + this.w > 0
    // )
  }
}