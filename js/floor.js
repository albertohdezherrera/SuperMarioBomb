class Floor {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 0
    this.y = this.ctx.canvas.height - FLOORHEIGHT
    this.w = this.ctx.canvas.width
    this.h = FLOORHEIGHT

    this.img = new Image()
    this.img.src = "img/floor.png"
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