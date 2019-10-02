class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalId = null

    this.bg = new Background(ctx)
    this.floor = new Floor(ctx)
    this.build = new Builds(ctx)
    this.scoreTable = new Score(ctx)
    this.bombs = []
    this.explosion= [] 

    this.tick = 1
    this.score = 0

    this._setListeners()

    //SONG
    this.audioMain = new Audio('sounds/main.mp3')
    this.audioMain.loop = true;
    this.audioMain.volume = 0.2;

    this.audioOver = new Audio('sounds/gameOver.wav')

  }

  start() {
    this._runAnimationLoop()
    this.audioMain.play()
  }

  _runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._inFloor()
      this._addBomb()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, FPS)
  }

  _setListeners() {
    document.onkeypress = e => this._deleteElement(e.key)
  }

  _addBomb() {
    if (this.tick % 200) return
    this.bombs.push(new Bomb(this.ctx))
  }

  _inFloor() {
    this.bombs.forEach((b) => {
      if (b.y + b.h > this.ctx.canvas.height - FLOORHEIGHT) {
        this._gameOver()
      }
    })
  }

  _deleteElement(key) {
    const elToDelete = this.bombs.filter((b) => b.checkLetter(key.toUpperCase()))
    elToDelete.forEach((b) => {
      const x = b.x
      const y = b.y
      this.explosion.push(new Explosion(this.ctx, x, y))
      //SCORE CONTROL
      if(elToDelete.length < 2) {
        this.score++
      } else {
        this.score += elToDelete.length
      }
      this.bombs.splice(this.bombs.indexOf(b), 1)
    })
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.scoreTable.draw(this.score)
    this.floor.draw()
    this.build.draw()
    this.explosion.forEach(e => e.animate())
    this.bombs.forEach(b => b.draw()) 
  }
  
  _move() {
    this.bg.move()
    this.bombs.forEach(b => b.move()) 
  }

  _gameOver() {
    clearInterval(this.intervalId)
    this.audioMain.pause()
    this.audioOver.play()
    this.ctx.font = "40px Super Mario World";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}