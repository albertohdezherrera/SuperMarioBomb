class PowerUp {
  constructor(ctx) {
    this.ctx = ctx
    this.w = 40
    this.h = 40
    this.x = 10
    this.y = 10
    this.tick = 0

    //IMG
    this.coin = new Image()
    this.coin.src = 'img/power.png'
    this.coin.frames = 4
    this.coin.frameIndex = 0
  }

  draw() {
    this.ctx.drawImage(
      this.coin,
      this.coin.frameIndex * this.coin.width / this.coin.frames,
      0,
      this.coin.width / this.coin.frames,
      this.coin.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
    this._frames()
  }

  _frames() {
    this.tick++
    if(this.tick > 8) {
      this.tick = 0
      this.coin.frameIndex++
    }
    if (this.coin.frameIndex >= this.coin.frames) {
      this.coin.frameIndex = 0
    }
  }
}