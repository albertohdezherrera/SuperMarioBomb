class Explosion {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.w = 100
    this.h = 100
    this.x = x
    this.y = y
    this.finishAnimate = false
    this.tick = 0

    this.img = new Image()
    this.img.src = 'img/explosion.png'
    this.img.frames = 9
    this.img.frameIndex = 0
  }

  animate() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this._frames()
  }
  _frames() {
    this.tick++
    if(this.tick > 2) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.finishAnimate = true
    }
  }

}