class Npc {
  constructor(ctx) {
    this.ctx = ctx
    this.w = 45
    this.h = 75
    this.x = this.ctx.canvas.width / 2  - this.w / 2
    this.y0 = this.ctx.canvas.height - FLOORHEIGHT - this.h
    this.y = this.y0
    this.vx = 1.5
    this.ay = 0.5
    this.vy = 0
    this.tick = 0
    this.orientation = true

    //IMG
    this.imgWalk = new Image()
    this.imgWalk.src = 'img/mario.png'
    this.imgWalk.frames = 3
    this.imgWalk.frameIndex = 0

    this.imgWalkR = new Image()
    this.imgWalkR.src = 'img/marioReverse.png'
    this.imgWalkR.frames = 3
    this.imgWalkR.frameIndex = 0

    this.imgJump = new Image()
    this.imgJump.src = 'img/jumping.png'

    this.imgJumpR = new Image()
    this.imgJumpR.src = 'img/jumpingReverse.png'

    //SOUND
    this.jumpSound = new Audio('sounds/jump.wav')
    this.jumpSound.loop = false
    this.jumpSound.volume = 0.3
  }

  draw() {
    if (this.orientation) {
      if(!this._isJumping()) {
        this.ctx.drawImage(
          this.imgWalk,
          this.imgWalk.frameIndex * this.imgWalk.width / this.imgWalk.frames,
          0,
          this.imgWalk.width / this.imgWalk.frames,
          this.imgWalk.height,
          this.x,
          this.y,
          this.w,
          this.h
        )
        this._frames()
      } else {
        this.ctx.drawImage(
          this.imgJump,
          this.x,
          this.y,
          this.w,
          this.h
        )
      }
    } else {
      if(!this._isJumping()) {
        this.ctx.drawImage(
          this.imgWalkR,
          this.imgWalkR.frameIndex * this.imgWalk.width / this.imgWalkR.frames,
          0,
          this.imgWalk.width / this.imgWalkR.frames,
          this.imgWalk.height,
          this.x,
          this.y,
          this.w,
          this.h
        )
        this._frames()
      } else {
        this.ctx.drawImage(
          this.imgJumpR,
          this.x,
          this.y,
          this.w,
          this.h
        )
      }
    }

  }

  _frames() {
    this.tick++
    if(this.tick > 4) {
      this.tick = 0
      this.imgWalk.frameIndex++
      this.imgWalkR.frameIndex++
    }
    if (this.imgWalk.frameIndex >= this.imgWalk.frames || this.imgWalkR.frameIndex >= this.imgWalkR.frames) {
      this.imgWalk.frameIndex = 0
      this.imgWalkR.frameIndex = 0
    }
  }

  move() {
    if (this.x + this.w > this.ctx.canvas.width - 70 || this.x < 70) {
      this.vx *= -1
      this.orientation =  !this.orientation
    }
    
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
      this.jumpSound.play()
    }
  }

  _isJumping() {
    if (this.y0 > this.y) {
      return true
    } 
    return false
  }
}