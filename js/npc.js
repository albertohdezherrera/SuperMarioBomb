class Npc {
  constructor(ctx) {
    this.ctx = ctx
    this.h = 65
    this.w = 35
    this.x = this.ctx.canvas.width / 2  - this.w / 2
    this.y0 = this.ctx.canvas.height - FLOORHEIGHT - this.h
    this.y = this.y0
    this.vx = 1.5
    this.ay = 1
    this.vy = 0

    //SOUND
    this.jumpSound = new Audio('sounds/jump.wav')
    this.jumpSound.loop = false
    this.jumpSound.volume = 0.3;
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.w, this.h)
    this.ctx.stroke()
  }

  move() {
    if (this.x + this.w > this.ctx.canvas.width || this.x < 0) this.vx *= -1
    this.x += this.vx

    if (this.y < this.y0) {
      this.vy += this.ay
      this.y += this.vy
    } else {
      this.vy = 0
    }
  }

  jump() {
    if (!this._isJumping()) {
      this.y -= 50
      this.jumpSound.play();
    }
  }

  _isJumping() {
    if (this.y0 > this.y) {
      return true
    } 
    return false
  }
}