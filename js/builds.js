class Builds {
  constructor(ctx) {
    this.ctx = ctx,
    this.x = 0,
    this.y = this.ctx.canvas.height - FLOORHEIGHT - BUILDS,
    this.w = this.ctx.canvas.width,
    this.h = BUILDS,

    this.img = new Image()
    this.img.src = "img/builds.png"
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }
}