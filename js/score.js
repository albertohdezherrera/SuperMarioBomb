class Score {
  constructor(ctx) {
    this.ctx = ctx
  }

  draw(score) {
    this.ctx.font = '70px Super Mario World'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    this.ctx.fillText(
      score,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height * 0.1
    )
  }

}