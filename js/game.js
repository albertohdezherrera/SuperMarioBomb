class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.intervalId = null

    this.bg = new Background(ctx)
    this.floor = new Floor(ctx)
    this.build = new Builds(ctx)
    this.scoreTable = new Score(ctx)
    this.npc = new Npc(ctx) 
    this.pause = new Pause(ctx)
    this.powerUpObj = new PowerUp(ctx)

    this.bombs = []
    this.explosion = [] 
    this.combos = [] 
    this.score = 0
    this.tick = 1
    this.isPaused = false
    this._setListeners()
    this.gameOver = false

    this.canPowerUp = true
    this.PowerUp = false

    this.canvasOffsetLeft = this.ctx.canvas.offsetLeft
    this.canvasOffsetTop = this.ctx.canvas.offsetTop

    //IMG
    this.imgReset = new Image()
    this.imgReset.src = 'img/reset.png'


    //Sounds
    this.audioMain = new Audio('sounds/main.mp3')
    this.audioOver = new Audio('sounds/gameOver.wav')
    this.audioPause = new Audio('sounds/pause.wav')
    this.audioCombo = new Audio('sounds/combo.wav')
    this.audioPower = new Audio('sounds/power.wav')

    this.audioMain.loop = true
    this.audioMain.volume = 0.2
    this.audioCombo.volume = 0.5

  }

  start() {
    this._runAnimationLoop()
    this.audioMain.play()
    if (this.isPaused) {
      this.isPaused = !this.isPaused
      this.audioPause.play()
    }
  }

  _reset() {
    this.bombs = []
    this.explosion = [] 
    this.combos = [] 
    this.score = 0
    this.tick = 1
    this.gameOver = false
    this.audioMain.currentTime = 0
    this.npc = new Npc(ctx)
    this.audioMain.playbackRate = 1
    this.start()
  }
  _runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._inFloor()
      this._difficulty()
      
      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, FPS)
  }

  _setListeners() {
    document.onkeypress = e => this._deleteElement(e.key)

    this.ctx.canvas.onclick = e => {
      const xVal = e.pageX - this.canvasOffsetLeft
      const yVal = e.pageY - this.canvasOffsetTop
      if (this.gameOver) {
        if ( xVal > this.ctx.canvas.width / 2 - 40  && 
             xVal < this.ctx.canvas.width / 2 + 40 &&
             yVal > 349 && 
             yVal < 382 ) {
              this._reset()
        }
        return
      }
      if (xVal > this.ctx.canvas.width - this.pause.w - 10 && 
          xVal < this.ctx.canvas.width - 10 &&
          yVal > 10 && 
          yVal < 40 ) {
            if (this.isPaused) {
              this.start()
            } else {
              this._pause()
            }
      }
    }
  }

  _inFloor() {
    this.bombs.forEach((b) => {
      if (b.y + b.h > this.ctx.canvas.height - FLOORHEIGHT) {
        this._gameOver()
      }
    })
  }

  _deleteElement(key) {
    let elToDelete
    if (key === " " && this.PowerUp) {
      elToDelete = this.bombs.filter(b => b)
      this.PowerUp = false
      this.canPowerUp = true
    } else {
      elToDelete = this.bombs.filter((b) => b.checkLetter(key.toUpperCase()))
    }
    elToDelete.forEach((b) => {
      const x = b.x
      const y = b.y
      this.explosion.push(new Explosion(this.ctx, x, y))
      this.npc.jump()

      //SCORE CONTROL (Quizas deberia sacarlo a otra funcion)
      if(elToDelete.length < 2) {
        this.score++
      } else {
        this.combos.push(new Combo(this.ctx, elToDelete.length))
        this.audioCombo.play()
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
    this.npc.draw()
    this.combos.forEach(e => e.animate())
    this.pause.draw()
    this._powerUpChance()
    if (this.PowerUp) {
      this.powerUpObj.draw()
    }
  }
  
  _move() {
    this.bg.move()
    this.bombs.forEach(b => b.move())
    this.npc.move()
  }

  _gameOver() {
    this.gameOver = true
    clearInterval(this.intervalId)
    this.audioMain.pause()
    this.audioOver.play()

    this.ctx.beginPath()
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.stroke()
    this.ctx.font = "20px Super Mario World"
    this.ctx.fillStyle = '#FFF'
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      `Your score is ${this.score}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 100
    )
    this.ctx.font = "40px Super Mario World"
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 50
    )

    //Hecho a pelo por falta de tiempo
    this.ctx.drawImage(
      this.imgReset,
      this.ctx.canvas.width / 2 - 40,
      350,
      80,
      31
    )

  }

  _pause() {
    this.ctx.font = '40px Super Mario World'
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = '#FFF'
    this.ctx.fillText(
      "PAUSE",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    )
    clearInterval(this.intervalId)
    this.isPaused = true
    this.audioPause.play()
    this.audioMain.pause()
  }

  _addBomb(vel) {
    this.bombs.push(new Bomb(this.ctx, vel))
  }

  _powerUpChance() {
    if (this.score === 0) return
    if (this.score % 10 === 0 && this.canPowerUp) {
      this.canPowerUp = false
      const posibility = 2
      let randomNum = Math.floor((Math.random() * 6) + 1)
      console.log(randomNum)
      if (randomNum === posibility) {
        this.PowerUp = true
        this.audioPower.play()
      }
    } else if (this.score % 10 !== 0 && !this.canPowerUp && !this.PowerUp) {
      this.canPowerUp = !this.canPowerUp
    }
  }

  _difficulty() {
    if (this.score <= 5 && this.tick % 100 === 0) {
      this._addBomb(Math.floor(Math.random() * 2) + 1)
    } else if (this.score > 5 && this.score <= 15 && this.tick % 90 === 0) {
      this._addBomb(Math.floor(Math.random() * 3) + 1)
    } else if (this.score > 15 && this.score <= 30 && this.tick % 90 === 0) {
      this._addBomb(Math.floor(Math.random() * 3) + 2)
      this._addBomb(Math.floor(Math.random() * 3) + 1)
      this.audioMain.playbackRate = 1.05
    } else if (this.score > 30 && this.score <= 60 && this.tick % 80 === 0) {
      this._addBomb(Math.floor(Math.random() * 3) + 2)
      this._addBomb(Math.floor(Math.random() * 4) + 2)
      this.audioMain.playbackRate = 1.15
    } else if (this.score > 50 && this.tick % 70 === 0) {
      this._addBomb(Math.floor(Math.random() * 3) + 2)
      this._addBomb(Math.floor(Math.random() * 3) + 2)
      this._addBomb(Math.floor(Math.random() * 4) + 2)
      this.audioMain.playbackRate = 1.2
    }
  }
}