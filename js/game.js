class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalId = null

    this.bg = new Background(ctx)
    this.floor = new Floor(ctx)
    this.build = new Builds(ctx)
    this.bombs = []

    this.tick = 0
  }

  start() {
    this._runAnimationLoop()
  }

  _runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._checkCollisions()
      this._addBomb()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, FPS)
  }

  _addBomb() {
    if (this.tick % 400) return 

    this.bombs.push(
      new Bomb(this.ctx)
    )
  }

  _checkCollisions() {
    this.bombs.forEach((b) => {
      if (b.y + b.h > this.ctx.canvas.height - FLOORHEIGHT) {
        this._gameOver()
      }
    })
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.floor.draw()
    this.build.draw()
    this.bombs.forEach(b => b.draw()) 
  }
  
  _move() {
    this.bg.move()
    this.bombs.forEach(b => b.move()) 
  }

  _gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}