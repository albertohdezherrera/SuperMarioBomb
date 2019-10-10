class Score {
  constructor(ctx) {
    this.ctx = ctx
    // this.w = 30
    // this.h = 30
    // this.x = x
    // this.y = y
  }

  draw(score) {
    this.ctx.font = '70px Super Mario World'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = '#81d5f9'
    this.ctx.fillText(
      score,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height * 0.1
    )
  }

}