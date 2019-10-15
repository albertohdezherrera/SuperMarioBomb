class Pause {
  constructor(ctx) {
    this.ctx = ctx
    this.h = 30
    this.w = 30
    this.x = this.ctx.canvas.width - this.w - 10
    this.y = 10

    this.img = new Image()
    this.img.src = 'img/pause.png'
  }

  draw() {
    // this.ctx.beginPath()
    // this.ctx.rect(this.x, this.y, this.w, this.h)
    // this.ctx.stroke()

    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }
}