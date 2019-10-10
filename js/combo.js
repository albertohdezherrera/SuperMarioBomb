class Combo {
  constructor(ctx, num) {
    this.ctx = ctx
    this.num = num
    this.tick = 0
  }

  animate() {
    if (this.tick++ < 80) {
      this.ctx.font = "40px Super Mario World"
      this.ctx.textAlign = "center"
      this.ctx.fillText(
        `Combo x${this.num}`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )
    } 
  }

}