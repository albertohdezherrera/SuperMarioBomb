class Bomb {
  constructor(ctx) {
    this.ctx = ctx
    this.h = 60
    this.w = 60
    this.x = Math.random() * (this.ctx.canvas.width - this.w)
    this.y = this.h * - 1
    this.letter = this._randomLetter()

    //Quiero que esto sea variable en el tiempo.
    this.vy = 1
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.w, this.h)
    this.ctx.stroke()
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      this.letter,
      this.x + this.w / 2,
      this.y + this.h / 2
    );
  }

  move() {
    this.y += this.vy
  }

  _randomLetter() {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return abc[Math.floor(Math.random() * abc.length)]
  }

  checkLetter(key) {
    if(key === this.letter) {
      this.vy = 0
      return true
    }
  }
}