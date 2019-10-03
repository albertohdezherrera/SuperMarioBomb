class Bomb {
  constructor(ctx, y) {
    this.ctx = ctx
    this.h = 100
    this.w = 100
    this.x = Math.random() * (this.ctx.canvas.width - this.w)
    this.y = this.h * - 1
    this.letter = this._randomLetter()
    this.vy = y

    this.img = new Image()
    this.img.src = 'img/bomb.png'
    this.img.frames = 14
    this.img.frameIndex = 0

    this.tick = 0
  }

  draw() {
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

    this.ctx.textAlign = "center"
    this.ctx.fillText(
      this.letter,
      this.x + this.w / 2,
      this.y + this.h / 2
    );
  }

  _frames() {
    this.tick++
    if(this.tick > 4) {
      this.tick = 0
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  move() {
    this.y += this.vy
  }

  _randomLetter() {
    const abc = 'QWEASDZXC'
    return abc[Math.floor(Math.random() * abc.length)]
  }

  checkLetter(key) {
    if(key === this.letter) {
      this.vy = 0
      return true
    } else {
      return false
    }
  }
}