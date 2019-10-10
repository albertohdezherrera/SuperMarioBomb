class Explosion {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.w = 120
    this.h = 120
    this.x = x
    this.y = y
    this.finishAnimate = false
    this.tick = 0

    this.img = new Image()
    this.img.src = 'img/explosion.png'
    this.img.frames = 9
    this.img.frameIndex = 0

    //SOUND
    this.fire = new Audio('sounds/fire.mp3')
    this.fire.loop = false
    this.fire.volume = 0.1
    this.fire.play()
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
    )

    this._frames()
  }

  _frames() {
    this.tick++
    if(this.tick > 3) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.finishAnimate = true
    }
  }

}